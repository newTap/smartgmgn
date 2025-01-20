import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import userAgent from "user-agents";
import schedule,{RescheduleJob} from "node-schedule";
import { BIRDEYE_API, BIRDEYE_TOKEN_BALANCE, BIRDEYE_TOKEN_MARKER, COMPLETED, DEX_SEARCH_PAIR, PUMP_LIST } from "../type";
import { InitializeDB } from "sql";
import {Agent} from 'https';
import { compareSmallNumbers, sleep } from "../utils";
import { Cluster } from "puppeteer-cluster";
import fetch from "cross-fetch";
import { BUY_REASON } from "sql/src/entity/HoldToken";
import { Dbot } from "../utils/Dbot";
import { Loggers } from "../utils/logjs";

puppeteer.use(StealthPlugin());

interface TokenConfig {
  pairId:string
  priceUsd: string
  address: string,
  name: string
  symbol: string
  timestamp: number
  tryNum: number
}


export class Smart_Gmgn extends Dbot {
  db: InitializeDB
  vioPriceNative: string
  vioMinPrice: string
  // 监听token列表
  tokenAddress: Map<string, TokenConfig > = new Map()
  // 订单列表
  orders:Set<string> = new Set()
  inquireStatus: boolean = false
  MarketCapJob: RescheduleJob
  cluster:Cluster
  console: Loggers

  constructor(db: InitializeDB){
    super();
    this.vioPriceNative = process.env.VIO_MARKET_CAP;
    this.vioMinPrice = process.env.VIO_MIN_MARKET_CAP
    this.db = db;
    this.console = new Loggers()
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
  getMs(hours?: number){
    const TOKEN_EXPIRE = hours || (+process.env.TOKEN_EXPIRE) || 24
    const ms =  ((+new Date()) - TOKEN_EXPIRE * 60 * 60 * 1000) /1000 
    return ms
  }

  async initTokens(){
    const ms = this.getMs()
    // 初始化token列表
    const data = await this.db.getNotByTokens(ms)
     this.console.log(`从数据库中获取了${data.length} tokens`)
    data.forEach(async token =>{
      this.tokenAddress.set(token.address,{
        pairId: token.pair_id,
        priceUsd: token.price,
        address: token.address,
        name: token.name,
        symbol: token.symbol,
        timestamp: token.timestamp,
        tryNum: 0,
      })
    })
  }

  async getPairId(address:string){
    await this.cluster.queue(
      `https://gmgn.ai/sol/token/${address}`,
      async ({ page, data: url }) => {
        this.console.log(`inter ${address} token info`)
        await page.goto(url, { waitUntil: 'load', timeout: 900_000 })
        console.log('页面打开了')
        // 获取pair 数据信息
        // const json = await page.waitForResponse(
        //   (res) => res.url() === `https://gmgn.ai/api/v1/token_info/sol/${address}`,
        //   { timeout: 90_000 }
        // );

        // console.log('json', json)

        // const data = (await json.json()).data as TOKEN_INFO;
        // console.log('data', data)
        // const pairId = data.biggest_pool_address
        const scriptContent = await page.evaluate(() => {
          const script = document.querySelector('#__NEXT_DATA__');
          return script ? script.textContent : null;
        });
        let pairId = ''
        let name = ''
        let symbol = ''
        let open_timestamp = 0

        if (scriptContent) {
          // 解析 JSON 对象
          const data = JSON.parse(scriptContent);
          const tokenInfo = data.props.pageProps.tokenInfo
          pairId = tokenInfo.pair_address
          name = tokenInfo.name
          symbol = tokenInfo.symbol
          open_timestamp = tokenInfo.open_timestamp
        } else {
          this.console.error('未找到指定的 <script> 标签');
        }



        this.console.info(`${address} pair is ${pairId}`)
        if(pairId){
          await this.db.updateToken({
            address: address,
            pair_id: pairId
          })
        }

         this.tokenAddress.set(address,{
          pairId,
          tryNum: 0,
          priceUsd: '',
          address: address,
          name: name || "--",
          symbol: symbol || "--",
          timestamp: open_timestamp,
        })  
        await sleep(1000)

        await page.close();
      })
  }

  async openGmgn(){
    this.cluster.on("taskerror", (err, data, willRetry) => {
      if (willRetry) {
         this.console.warn(
          `Encountered an error while crawling ${data}. ${err.message}\nThis job will be retried`
        );
      } else {
         this.console.error(`Failed to crawl ${data}: ${err.message}`);
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
        this.console.log('gmgn首页打开,开始监听请求')
        // 监听响应
        homePage.on("response", async (response) => {
          const baseUrl =
            "https://gmgn.ai/defi/quotation/v1/rank/sol/pump_ranks/1h";
          const url = response.url();
          if (url.indexOf(baseUrl) === -1) return false;
          const status = response.status();
          if (status !== 200) {
             this.console.error("sol/pump_ranks/1h api error", status);
            return false;
          }
          console.log('sol/pump_ranks/1h is ok')
          const json = (await response.json()).data as PUMP_LIST;
          const completeds = json.completeds;
          // 第一次记录token
          if (!token_completeds) {
            token_completeds = completeds;
             this.console.log("第一次记录");
            return false;
          }
          // 校验新的token列表与旧token列表区别
          for (let i = 0; i < completeds.length; i++) {
            const token = completeds[i];
            // 当遇到相同token时,说明后续都是旧数据
            if (token_completeds.find((t) => t.address === token.address)) {
              token_completeds = completeds;
              return false;
            }
             this.console.log(`新token${token.address}`);
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
            //    this.console.log(`现在一共有${(await browser.pages())?.length}个页面`);
            //   // !当token详情页打开后,主页的response事件将会无响应
            //   // !必须重新激活gmgn首页
            //   await homePage.bringToFront();
            // } catch (error) {
            //    this.console.error("open token detail error", error);
            // }
          }
        });
      }
    );
  }

  checkOrder(id: string[], tokenAddress: string[], reason:BUY_REASON): void;
  checkOrder(id: string, tokenAddress: string, reason:BUY_REASON): void;
  checkOrder(id:string|string[],tokenAddress:string|string[], reason:BUY_REASON){
    setTimeout(async () => {
      let data
      try {
         data = await this.swapOrders(id)
      } catch (error) {
        this.console.log(`查询交易失败${id}: ${tokenAddress}`)
        this.checkOrder(id as string, tokenAddress as string,reason)
        return false
      }
      this.console.log(`checkOrder data: `, data)
      data.forEach(async (order,index) => {
        let address:string
        if(typeof tokenAddress === 'string') {
          address = tokenAddress
        }else{
          address = tokenAddress[index]
        }
         this.console.log(`${address}: Order ${order.id} state: ${order.state}, ${order.errorCode}: ${order.errorMessage}`)
        // 初始化和进行中,重新查询
        if(order.state === 'processing' || order.state === 'init'){
          this.console.log(`${order.id} 状态未完成,重新等待查询`)
          this.checkOrder(order.id, address, reason)
          return false
        }
        // 失败或过期
        if(order.state === 'fail' || order.state === 'expired') return false
        // 订单已完成,查询交易信息
        try {
          const info =  await this.queryAmount(this.defaultWallet.address ,address)
           this.console.log('order info', info)
          if(!info){
             this.console.log('ord info 为空,重新查询check');
            this.checkOrder(order.id, address, reason)
            return false
          }
          await this.db.updatesHoldToken({
              id:order.id,
              address:address,
              buy_reason:reason,
              buy_price: `${order.txPriceUsd}`,
              buy_amount: `${info.uiAmount}`
            })
        } catch (error) {
           this.console.error(`订单信息查询失败error`, error)
        }
      })
      // 确认交易成功上链,并且其他三方api能成功返回数据
    }, 20000)
  }

  async task(){
    if(!this.tokenAddress.size) {
        this.console.log('没有可查询的token列表')
      return false
    }
    if(this.inquireStatus){
        this.console.log('还在查询中,退出这次查询')
      return false
    }

      this.console.info('查询mc所用时间-1')
    this.inquireStatus = true
    const ms = this.getMs()
      this.console.log(`当前一共有:${this.tokenAddress.size} 个token`)
    const entries = this.tokenAddress.entries()
    for (let [address, tokenData] of entries) {
      if(ms > tokenData.timestamp){
        this.tokenAddress.delete(address)
          this.console.error(`${address} 超出了 ${process.env.TOKEN_EXPIRE}H 时间`)
        continue
      }
      if(!tokenData.pairId){
          this.console.log(`${address} 没有pairId,需要再次获取`)
        await this.getPairId(address)
      }
      const pairId = this.tokenAddress.get(address).pairId
      if(!pairId) {
          this.console.log('pairId 还未抓到跳出mc查询')
        continue
      }
      try {
        const res =  await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/${pairId}` ,{
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
          // @ts-ignore
          agent: new Agent({ rejectUnauthorized: false }) 
          // timeout: 10000, // 设置超时时间为 10 秒
        })
        const {pairs} = await res.json() as DEX_SEARCH_PAIR
        const pair = pairs?.[0]
        if(!pair){
            this.console.error(`${address} pair not found`)
          continue
        }

        tokenData.priceUsd = pair.priceUsd
        console.log(`${address} priceNative:  ${pair.priceNative}`)
        console.log(`${address} marketCap:  ${pair.marketCap}`)
        // ! 超过1小时高于60k,减少监听不必要的token
        if(pair.marketCap > 60_000 && this.getMs(1) > tokenData.timestamp){
          this.console.log(`超过了1小时,并且市值超过了60_000`)
          this.tokenAddress.delete(address)
          continue
        }
        if(pair.priceNative > this.vioPriceNative) continue
        // 若市值低于3k则说明老鹰数据出错不做处理
        // ???需要改特定的数值
        if(compareSmallNumbers(this.vioMinPrice, pair.priceNative)){
          console.log(`${address}:价格 低于 ${this.vioMinPrice} 老鹰数据出错不做买入操作`)
          continue
        }
        this.console.log(`${address} - ${pair.priceNative}: 低于暴力买入sol价格`)
        // 通过鸟眼,再次查询token市值,确保市值的正确性
        const { price } = await this.getTokenAc(address)
        // 拿sol价格
        const {price:solPrice} = await this.getTokenAc("So11111111111111111111111111111111111111112")
        const birdEyePriceNative = price/solPrice
        this.console.log(`当前sol价格:${solPrice}`)
        this.console.log(`birdEye 价格:${price}`)
        this.console.log(`bird 计算后的价格, ${birdEyePriceNative}`)
          if(compareSmallNumbers(birdEyePriceNative, this.vioPriceNative)) {
          this.console.log(`birdEye 数据未能达到暴力买入市值`)
          continue
          }
          this.console.log(`已达到入市值,执行暴力买入操作`)
        // 低于暴力买入市值,优先存储基础数据类型
        const baseToken = pair?.baseToken
        // 快速买入操作
        const {id} = await this.violenceOrder(pairId)
          this.console.log(`${address} order id: ${id}`)
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
        this.console.error(`${address} 老鹰查询市场失败了`,error)
        const tokenInfo = this.tokenAddress.get(address)
        this.isDecrepit(tokenInfo)
      }
    }
    this.inquireStatus = false
      this.console.info('查询mc所用时间-2')
  }

  inquireMarketCap(){
    this.MarketCapJob = schedule.scheduleJob(
      `*/25 * * * *`,
      this.task.bind(this)
    );
  }
  // 校验token是否存在超过一小时
  isDecrepit(tokenInfo: TokenConfig){
    const {tryNum, timestamp, address} = tokenInfo
    const MAX_H = 24
    // 记录查询失败次数
    // 当失败三次之后,则不再需要跟踪该token
    if(tryNum >=3){
      this.console.log(`${address} 错误次数${tryNum}, 不再监听`)
      this.tokenAddress.delete(address)
      return false
    }
    // 超出24小时之后,增加错误次数
    if(tryNum > 0 || (this.getMs(MAX_H)) > timestamp) {
      this.console.log(`${address} 存在超过${MAX_H}小时,增加错误次数`)
      this.tokenAddress.get(address).tryNum += 1
      return false
    }


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
       this.console.log('json', json)
      return json.data
  }
  // 查询市值
  async getTokenAc(tokenAddress:string){
    const res =  await fetch(`https://public-api.birdeye.so/defi/v3/token/market-data?address=${tokenAddress}` ,{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
          'x-chain': 'solana',
          'X-API-KEY': process.env.BIRDEYE_API_KEY
        },
      })
      const json = await res.json() as BIRDEYE_API<BIRDEYE_TOKEN_MARKER>
      return json.data
  }
  // 获取sol价格
  async getSolPrice(){
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`, {
          method: 'GET',
        headers: {'Content-Type': 'application/json',},
      })
      const json = await res.json()
      this.console.log('json', json)
      return json.solana.usd as number
  }
}
