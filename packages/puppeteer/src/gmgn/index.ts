import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import userAgent from "user-agents";
import schedule,{RescheduleJob} from "node-schedule";
import { BIRDEYE_API, BIRDEYE_TOKEN_BALANCE, COMPLETED, DEX_SEARCH_PAIR, PUMP_LIST, TOKEN_INFO } from "../type";
import { InitializeDB } from "sql";
import { sleep } from "../utils";
import { Cluster } from "puppeteer-cluster";
import fetch from "cross-fetch";
import { BUY_REASON } from "sql/src/entity/HoldToken";
import { Dbot } from "../utils/Dbot";

puppeteer.use(StealthPlugin());

interface TokenConfig {
  pairId:string
  priceUsd: string
  address: string,
  name: string
  symbol: string
  timestamp: number
}


export class Smart_Gmgn extends Dbot{
  db: InitializeDB
  vioMarketCap: number
  // 监听token列表
  tokenAddress: Map<string, TokenConfig > = new Map()
  // 订单列表
  orders:Set<string> = new Set()
  inquireStatus: boolean = false
  MarketCapJob: RescheduleJob
  cluster:Cluster
  // 买入交易限制数量
  maxNum = 2;
  num = 0

  constructor(db: InitializeDB){
    super();
    this.vioMarketCap = +process.env.VIO_MARKET_CAP || 3000;
    this.db = db;
  }

  async initialize(){
    // d Bot 初始化
    await this.initializeBot()

    this.cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_BROWSER,
      maxConcurrency: 2,
      puppeteer,
      puppeteerOptions: {
        headless: true,
        devtools: true,
        // 注入浏览器插件
        args: [
          "--no-sandbox",
          "--disable-ipc-flooding-protection",
          "--no-first-run",
        ],
      },
    });
    await this.initTokens()
    await this.openGmgn()
    this.inquireMarketCap()
  }

  // 获取监听token截止时间的秒值
  getMs(){
    const TOKEN_EXPIRE = (+process.env.TOKEN_EXPIRE) || 24
    const ms =  ((+new Date()) - TOKEN_EXPIRE * 60 * 60 * 1000) /1000 
    return ms
  }

  async initTokens(){
    const ms = this.getMs()
    // 初始化token列表
    const data = await this.db.getNotByTokens(ms)
    console.log(`从数据库中获取了${data.length} tokens`)
    data.forEach(token =>{
      this.tokenAddress.set(token.address,{
        pairId: token.pair_id,
        priceUsd: token.price,
        address: token.address,
        name: token.name,
        symbol: token.symbol,
        timestamp: token.timestamp,
      })
    })
  }

  async getPairId(address:string){
    await this.cluster.queue(
      `https://gmgn.ai/sol/token/${address}`,
      async ({ page, data: url }) => {
        await page.goto(url, { timeout: 900_000 })
        // 获取pair 数据信息
        const json = await page.waitForResponse(
          (res) => res.url() === `https://gmgn.ai/api/v1/token_info/sol/${address}`,
          { timeout: 90_000 }
        );

        const data = (await json.json()).data as TOKEN_INFO;
        const pairId = data.biggest_pool_address
        
        await this.db.updateToken({
          address: address,
          pair_id: pairId
        })
        
        this.tokenAddress.set(address,{
          pairId,
          priceUsd: '',
          address: address,
          name: data?.name || "--",
          symbol: data?.symbol || "--",
          timestamp: data.open_timestamp
        })  

        await sleep(1000)

        await page.close();
      })
  }

  async openGmgn(){
    this.cluster.on("taskerror", (err, data, willRetry) => {
      if (willRetry) {
        console.warn(
          `Encountered an error while crawling ${data}. ${err.message}\nThis job will be retried`
        );
      } else {
        console.error(`Failed to crawl ${data}: ${err.message}`);
      }
    });
    this.cluster.queue(
      "https://gmgn.ai/meme/uwc7zMHc?chain=sol&tab=home",
      async ({ page, data: url }) => {
        const browser = page.browser();
        let token_completeds: COMPLETED[];
        const agent = new userAgent(
          {
            platform: "MacIntel",
          },
          {
            platform: "macOS",
          }
        );
        await page.goto("https://gmgn.ai/meme/uwc7zMHc?chain=sol&tab=home");
        const [homePage] = await browser.pages();
        await homePage.setUserAgent(agent.toString());
        await homePage.setViewport({ width: 1580, height: 1024 });
        await homePage.goto("https://gmgn.ai/meme/uwc7zMHc?chain=sol&tab=home");
        await homePage.bringToFront();
        // 确保在pump内
        let pumpBtn = await homePage.waitForSelector(
          "div[class='css-gstdun'] div:first-child"
        );
        await pumpBtn.click({ delay: 500 });

        // 监听响应
        homePage.on("response", async (response) => {
          const baseUrl =
            "https://gmgn.ai/defi/quotation/v1/rank/sol/pump_ranks/1h";
          const url = response.url();
          // console.log('url', url)
          if (url.indexOf(baseUrl) === -1) return false;
          const status = response.status();
          if (status !== 200) {
            console.error("sol/pump_ranks/1h api error", status);
            return false;
          }
          const json = (await response.json()).data as PUMP_LIST;
          const completeds = json.completeds;
          // 第一次记录token
          if (!token_completeds) {
            token_completeds = completeds;
            console.log("第一次记录");
            return false;
          }
          console.log("开始校验");
          // 校验新的token列表与旧token列表区别
          for (let i = 0; i < completeds.length; i++) {
            const token = completeds[i];
            // 当遇到相同token时,说明后续都是旧数据
            if (token_completeds.find((t) => t.address === token.address)) {
              token_completeds = completeds;
              return false;
            }
            console.log("新数据来了");
            // 服务器中存储需要跟踪的数据
            await this.db.setToken({
              pair_id: '',
              address: token.address,
              created_timestamp: new Date(token.created_timestamp * 1000),
              holders: token.holder_count,
              name: token.name,
              timestamp: token.open_timestamp,
              open_timestamp: new Date(token.open_timestamp * 1000),
              price: token.price,
              symbol: token.symbol,
            });
            // 获取pair id并且入库
            await this.getPairId(token.address)

            // try {
            //   // 打开token详情页
            //   await tokenDetail(browser, db, token.address);
            //   console.log(`现在一共有${(await browser.pages())?.length}个页面`);
            //   // !当token详情页打开后,主页的response事件将会无响应
            //   // !必须重新激活gmgn首页
            //   await homePage.bringToFront();
            // } catch (error) {
            //   console.error("open token detail error", error);
            // }
          }
        });
      }
    );
  }

  checkOrder(id:string,tokenAddress:string, reason:BUY_REASON){
    setTimeout(async () => {
      const data = await this.swapOrders(id)

      data.forEach(async (order) => {
        console.log(`Order ${id} state: ${order.state}, ${order.errorCode}: ${order.errorMessage}`)
        // 初始化和进行中,重新查询
        if(order.state === 'processing' || order.state === 'init'){
          this.checkOrder(id, tokenAddress, reason)
          return false
        }
        // 失败或过期
        if(order.state === 'fail' || order.state === 'expired') return false
        // 订单已完成,查询交易信息
       try {
         const info =  await this.queryAmount(this.defaultWallet.address ,tokenAddress)
         console.log('order info', info)
         await this.db.updatesHoldToken({
            id,
            address:tokenAddress,
            buy_reason:reason,
            buy_price: `${order.txPriceUsd}`,
            buy_amount: `${info.uiAmount}`
          })
       } catch (error) {
        console.error(`订单信息查询失败error`, error)
       }
      })
      // 确认交易成功上链,并且其他三方api能成功返回数据
    }, 10000)
  }

  inquireMarketCap(){
    this.MarketCapJob = schedule.scheduleJob(
      `* */1 * * *`,
      async () => {
        if(!this.tokenAddress.size) {
          console.log('没有可查询的token列表')
          return false
        }
        if(this.inquireStatus){
          console.log('还在查询中,退出这次查询')
          return false
        }

        console.time('查询mc所用时间')
        this.inquireStatus = true
        const ms = this.getMs()
        console.log(`当前一共有:${this.tokenAddress.size} 个token`)
        const entries = this.tokenAddress.entries()
        for (let [address, tokenData] of entries) {
          if(ms > tokenData.timestamp){
            this.tokenAddress.delete(address)
            console.error(`${address} 超出了 ${process.env.TOKEN_EXPIRE}H 时间`)
            continue
          }
          if(!tokenData.pairId){
            console.log(`${address} 没有pairId,需要再次获取`)
            await this.getPairId(address)
          }
          const pairId = this.tokenAddress.get(address).pairId
          if(!pairId) {
            console.log('pairId 还未抓到跳出mc查询')
            continue
          }
          try {
            const res =  await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/${pairId}`)
            const {pairs} = await res.json() as DEX_SEARCH_PAIR
            const pair = pairs?.[0]
            if(!pair){
              console.error(`${address} pair not found`)
              continue
            }

            tokenData.priceUsd = pair.priceUsd
            console.log(`${address} 市值${pair.marketCap}`)
            if(pair.marketCap>this.vioMarketCap) continue
            
            // 低于暴力买入市值,优先存储基础数据类型
            console.log('低于暴力买入市值缓存数据')
            const baseToken = pair?.baseToken
            // 快速买入操作
            const {id} = await this.violenceOrder(pairId, this.num<=this.maxNum)
            this.num++
            console.log('id', id)
            // 存储基础数据
            await this.db.setHoldToken({
              id: id,
              address: address,
              name: baseToken.name,
              symbol: baseToken.symbol,
              buy_reason: BUY_REASON.VIOLENCE,
              buy_timestamp: new Date()
            });

            this.tokenAddress.delete(address)
            this.checkOrder(id, address, BUY_REASON.VIOLENCE)
          } catch (error) {
            console.error(`${address} 老鹰查询市场失败了`,error)
          }
        }
        this.inquireStatus = false
        console.timeEnd('查询mc所用时间')
      }
    );
  }

  // 查询amount数量
  async queryAmount(wallet:string, tokenAddress: string) {
      let res = await fetch(`https://public-api.birdeye.so/v1/wallet/token_balance?wallet=${wallet}&token_address=${tokenAddress}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-chain': 'solana',
          'X-API-KEY': process.env.BIRDEYE_API_KEY
        }
      })
      const json = await res.json() as BIRDEYE_API<BIRDEYE_TOKEN_BALANCE>;
      console.log('json', json)
      if(json.data){
        return json.data
      }else{
        return await this.queryAmount(wallet, tokenAddress)
      }
  }
}
