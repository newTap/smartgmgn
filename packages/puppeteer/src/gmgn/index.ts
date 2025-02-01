import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import userAgent from "user-agents";
import schedule,{RescheduleJob} from "node-schedule";
import { BIRDEYE_API, BIRDEYE_API_PRICES, BIRDEYE_TOKEN_BALANCE, BIRDEYE_TOKEN_MARKER, COMPLETED, NEW_CREATIONS, PUMP_LIST } from "../type";
import { InitializeDB, BUY_REASON } from "sql";
import { compareSmallNumbers, sleep } from "../utils";
import { Cluster } from "puppeteer-cluster";
import fetch from "cross-fetch";
import { Dbot } from "../utils/Dbot";

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
  tokenSellTime: number
  inquireStatus: boolean = false
  MarketCapJob: RescheduleJob
  cluster:Cluster
  // token清仓最大尝试次数
  trySellToken = 3

  constructor(db: InitializeDB){
    super();
    this.vioPriceNative = process.env.VIO_MARKET_CAP;
    this.vioMinPrice = process.env.VIO_MIN_MARKET_CAP
    this.tokenSellTime = +process.env.TOKEN_SELL_TIME||24
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
          // '--proxy-server=http://212.76.118.242:97',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          "--no-sandbox",
          "--disable-ipc-flooding-protection",
          "--no-first-run",
        ],
      },
    });
    await this.initTokens()
    await this.initSellToken()
    await this.openGmgn()
    this.task()
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
    console.log(`从数据库中获取了${data.length} tokens`)
    data.forEach(async token => {
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

  async getPairId(address:string, isError=false){
    await this.cluster.queue(
      `https://gmgn.ai/sol/token/${address}`,
      async ({ page, data: url }) => {
       try {
          console.log(`inter ${address} token info`)
          await page.goto(url, { waitUntil: 'load', timeout: 900_000 })
          console.log('页面打开了')
          // 获取pair 数据信息
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
            console.error('未找到指定的 <script> 标签');
          }
          console.info(`${address} pair is ${pairId}`)
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
       } catch (error) {
        console.error(`${address} pair获取失败:`,error);
        if(isError){
          console.error(`${address} 获取失败过,不再尝试`)
        }else{
          this.getPairId(address, true)
          console.error('再次重试一次获取pairId')
        }
       }
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
        let new_creations: NEW_CREATIONS[];
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
        console.log('gmgn首页打开,开始监听请求')
        // 监听响应
        homePage.on("response", async (response) => {
          const baseUrl =
            "https://gmgn.ai/defi/quotation/v1/rank/sol/pump_ranks/1h";
          const url = response.url();
          if (url.indexOf(baseUrl) === -1) return false;
          const status = response.status();
          if (status !== 200) {
             console.error("sol/pump_ranks/1h api error", status);
            return false;
          }
          // console.log('sol/pump_ranks/1h is ok')
          const json = (await response.json()).data as PUMP_LIST;
          const completeds = json.completeds;
          // 第一次记录token
          if (!token_completeds) {
            token_completeds = completeds;
            new_creations = json.new_creations;
             console.log("第一次记录");
            return false;
          }
          // new_creations数据对比
          this.compareNewCreations(new_creations, json.new_creations);
          // 校验新的token列表与旧token列表区别
          for (let i = 0; i < completeds.length; i++) {
            const token = completeds[i];
            // 当遇到相同token时,说明后续都是旧数据
            if (token_completeds.find((t) => t.address === token.address)) {
              token_completeds = completeds;
              return false;
            }
             console.log(`新token${token.address}`);
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
            //    console.log(`现在一共有${(await browser.pages())?.length}个页面`);
            //   // !当token详情页打开后,主页的response事件将会无响应
            //   // !必须重新激活gmgn首页
            //   await homePage.bringToFront();
            // } catch (error) {
            //    console.error("open token detail error", error);
            // }
          }
        });
      }
    );
  }

  async compareNewCreations(old_creations:NEW_CREATIONS[], new_creations:NEW_CREATIONS[]){
    for (let i = 0; i < new_creations.length; i++) {
        const token = new_creations[i];
        // 当遇到相同token时,说明后续都是旧数据
        if (old_creations.find((t) => t.address === token.address)) {
          old_creations = new_creations;
          return false;
        }
        // 服务器中存储需要跟踪的数据
        try {
          await this.db.setNewCreationToken({
            address: token.address,
            name: token.name,
            symbol: token.symbol,
            price: token.price,
            created_timestamp: new Date(token.created_timestamp * 1000),
            creator: token.creator,
            creator_balance: token.creator_balance,
            creator_token_balance: token.creator_token_balance,
            website:token.website,
            twitter:token.twitter,
            telegram:token.telegram,
            logo:token.logo,
            holder_count:token.holder_count,
          });
        } catch (error) {
          console.log('error',error)
          console.log('token', token)
        } 
      }
  }

  checkOrder(data:{
    id:string
    tokenAddress:string
    pairId:string
  }, reason:BUY_REASON): void;
  checkOrder(data:{
    id:string[],
    tokenAddress:string[],
    pairId:string[],
  }, reason:BUY_REASON): void;
  checkOrder({id, tokenAddress, pairId}:{
    id:string|string[],
    tokenAddress:string|string[],
    pairId:string|string[],
  }, reason:BUY_REASON){
    setTimeout(async () => {
      let data
      try {
         data = await this.swapOrders(id)
      } catch (error) {
        console.log(`查询交易失败${id}: ${tokenAddress}`)
        this.checkOrder({
          id:id as string, tokenAddress:tokenAddress as string, pairId: pairId as string
        },reason)
        return false
      }
      console.log(`checkOrder data: `, data)
      data.forEach(async (order,index) => {
        let address:string
        let pair: string
        if(typeof tokenAddress === 'string') {
          address = tokenAddress
        }else{
          address = tokenAddress[index]
        }

        if(typeof pairId === 'string') {
          pair = pairId
        }else{
          pair = pairId[index]
        }

         console.log(`${address}: Order ${order.id} state: ${order.state}, ${order.errorCode}: ${order.errorMessage}`)
        // 初始化和进行中,重新查询
        if(order.state === 'processing' || order.state === 'init'){
          console.log(`${order.id} 状态未完成,重新等待查询`)
          this.checkOrder({
            id:id as string, tokenAddress:tokenAddress as string, pairId: pairId as string
          }, reason)
          return false
        }
        // 失败或过期
        if(order.state === 'fail' || order.state === 'expired') return false
        // 订单已完成,查询交易信息
        try {
          const info =  await this.queryAmount(this.defaultWallet.address ,address)
          console.log('order info', info)
          if(!info){
            console.log('ord info 为空,重新查询check');
            this.checkOrder({
              id:id as string, tokenAddress:tokenAddress as string, pairId: pairId as string
            }, reason)
            return false
          }
          // 增加止盈订单
          let orderId = await this.violenceOrderStopEarn(pair, this.defaultWallet.id, order.txPriceUsd)
          console.log('添加的额外订单数据', orderId)
          await this.db.updatesHoldToken({
              id:order.id,
              address:address,
              buy_reason:reason,
              buy_price: `${order.txPriceUsd}`,
              buy_amount: `${info.uiAmount}`
            })
          // 成功买入之后开启自动卖出定任务
          this.autoSellToken(address, pair)
        } catch (error) {
           console.error(`订单信息查询失败error`, error)
        }
      })
      // 确认交易成功上链,并且其他三方api能成功返回数据
    }, 20000)
  }

  async task(){
    if(!this.tokenAddress.size) {
        console.log('没有可查询的token列表')
      return false
    }
    if(this.inquireStatus){
      console.log('还在查询中,退出这次查询')
      return false
    }

    console.info('查询mc所用时间-1')
    this.inquireStatus = true
    const ms = this.getMs()
    console.log(`当前一共有:${this.tokenAddress.size} 个token`)
    try {
        // 拿sol价格
      const {price:solPrice} = await this.getTokenAc("So11111111111111111111111111111111111111112")
      if(!solPrice) {
        console.error("sol price not found", solPrice)
        this.task()
      }
      console.log(`current sol price is ${solPrice}`)
      const entries = this.tokenAddress.entries()
      let tokens = []
      let index = 0;
      for (let [address, tokenData] of entries) {
        index++;
        if(ms > tokenData.timestamp){
          this.tokenAddress.delete(address)
          console.error(`${address} 超出了 ${process.env.TOKEN_EXPIRE}H 时间`)
          continue
        }
        if(!tokenData.pairId){
          console.log(`${address} 没有pairId,需要再次获取`)
          await this.getPairId(address)
        }
        if(!this.tokenAddress.get(address).pairId) {
          console.log('pairId 还未抓到跳出mc查询')
          continue
        }
        tokens.push(address)
        if( index === this.tokenAddress.size){
          console.info(`已经是最后一个token了,一共查询了token:${index}`)
        }
        if(tokens.length === 100 || index === this.tokenAddress.size){
          // try {
            // 走批量的查询 一次性查询100个token
            const res =  await fetch(`https://public-api.birdeye.so/defi/multi_price?include_liquidity=true`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-chain': 'solana',
                'X-API-KEY': process.env.BIRDEYE_API_KEY
              },
              body: JSON.stringify({
                list_address: tokens.join(',')
              })
            })
    
            const json = await res.json() as BIRDEYE_API<BIRDEYE_API_PRICES>
            const data = json.data

            for (const address in data) {
              if(!address)  {
                console.log(`${address} is not found`)
                continue
              }
              const tokenPriceInfo = data[address]
              // !可能会返回一个null
              if(!tokenPriceInfo){
                console.error(`${address} price data is null`)
                continue
              }
              const {value:price} = tokenPriceInfo
              if(!price){
                console.error(`${address} price is null`)
                continue
              }

              const pairId = this.tokenAddress.get(address).pairId

              const priceNative = `${price/solPrice}`
              // console.log(`${address} price:  ${price}`)
              // console.log(`${address} price native: ${priceNative}`)
              tokenData.priceUsd = `${price}`
              // ! 超过1小时高于60k,减少监听不必要的token
              // if(pair.marketCap > 60_000 && this.getMs(1) > tokenData.timestamp){
              //   console.log(`超过了1小时,并且市值超过了60_000`)
              //   this.tokenAddress.delete(address)
              //   continue
              // }
              if(compareSmallNumbers(priceNative, this.vioPriceNative)) continue
              // 若价格太低了,则说明数据异常
              if(compareSmallNumbers(this.vioMinPrice, priceNative)){
                console.error(`${address}:价格 低于 ${this.vioMinPrice} 数据出错不做买入操作`)
                continue
              }
              console.log(`${address} - ${priceNative}: 低于暴力买入sol价格-${pairId}`)
              const baseToken = this.tokenAddress.get(address)

              // 提交快速买入订单
              const {id} = await this.violenceOrder(pairId, 'buy')

              console.log(`${address} order id: ${id}`)
              console.log('baseToken', baseToken)
              // 存储基础数据
              await this.db.setHoldToken({
                id: id,
                address: address,
                name: baseToken.name,
                sell_id:'',
                symbol: baseToken.symbol,
                buy_reason: BUY_REASON.VIOLENCE,
                buy_timestamp: new Date()
              });
      
              this.tokenAddress.delete(address)
              this.checkOrder({id, tokenAddress:address, pairId}, BUY_REASON.VIOLENCE)
              
            }
            tokens = []

            
            // // 通过鸟眼,再次查询token市值,确保市值的正确性
            // const { price } = await this.getTokenAc(address)
            // // 拿sol价格
            // const birdEyePriceNative = price/solPrice
            // console.log(`当前sol价格:${solPrice}`)
            // console.log(`birdEye 价格:${price}`)
            // console.log(`bird 计算后的价格, ${birdEyePriceNative}`)
            // if(compareSmallNumbers(birdEyePriceNative, this.vioPriceNative)) {
            //   console.log(`birdEye 数据未能达到暴力买入市值`)
            //   continue
            // }
            // console.log(`已达到入市值,执行暴力买入操作`)
            // 低于暴力买入市值,优先存储基础数据类型
            // const baseToken = pair?.baseToken
            // 快速买入操作

          // } catch (error) {
          //   console.error(`${address} 老鹰查询市场失败了`,error)
          //   const tokenInfo = this.tokenAddress.get(address)
          //   this.isDecrepit(tokenInfo)
          // }
        }
      }
    } catch (error) {
      console.error('获取token价值失败', error);
    }
    this.inquireStatus = false
    console.info('查询mc所用时间-2')
  }

  inquireMarketCap(){
    this.MarketCapJob = schedule.scheduleJob(
      `*/20 * * * *`,
      this.task.bind(this)
    );
  }

  async initSellToken(){
    const tokens = await this.db.getTokensBought(this.tokenSellTime)
    console.log(`一共有${tokens.length}个token需要定时清仓`)
    
    tokens.forEach(async ({address}) => {
      const {pair_id} = await this.db.getToken(address)
      this.autoSellToken(address, pair_id)
    });
  }

  async autoSellToken(address:string, pairId:string){
    let max_time = (this.tokenSellTime) * 60 * 60 * 1000;
    const tokenInfo = await this.db.getHoldToken(address)
    if(!pairId){
      console.error(`${address}: pairId 不存在`)
      return false
    }
    if(!tokenInfo) {
      console.error('并没有从数据库找到token信息')
      return false
    }

    const {buy_timestamp} = tokenInfo;
    const token_timestamp = +new Date(buy_timestamp)
    let time = ( token_timestamp + max_time)
    // console.log(`${address} 添加定时任务,清仓时间:${(time - (+new Date()))/60_60_1000} 小时后`)
    schedule.scheduleJob(time, async() => {
      // 快速止损,增加快速订单
      this.sellToken(address, pairId)
    })
  }

  async sellToken(address: string, pairId: string, tryNum = 1){
    if(tryNum> this.trySellToken) {
      console.error(`${address} token重试清仓${tryNum}次失败!!不再卖出`)
      await this.db.updatesHoldToken({
        address: address,
        sell_id: '',
        buy_reason: BUY_REASON.VIOLENCE
      })
      return false
    }
    tryNum++
    console.log(`${address} token 购入时间已经达到:${this.tokenSellTime}小时,开始清仓`)
    try {
      const {id} =  await this.violenceOrder(pairId, 'sell')
      console.log(`${address} token清仓id:`, id)
      if(!id){
        console.error('没有成功提交订单,重新卖出')
        this.sellToken(address, pairId, tryNum)
        return false
      }
      
      await this.db.updatesHoldToken({
        address: address,
        sell_id: id,
        buy_reason: BUY_REASON.VIOLENCE
      })

      this.checkSellOrder(id, address, pairId, tryNum)
      return id
    } catch (error) {
      console.error(`${address} 清仓失败`, error)
      if(tryNum> this.trySellToken) {
        console.error(`${address} token重试清仓${tryNum}次失败!!不再卖出`)
        return false
      }
      console.log('重新清仓')
      this.sellToken(address, pairId, tryNum)
    }
  }

  async checkSellOrder(id:string, address:string, pairId:string, tryNum:number){
    setTimeout(async() => {
      try {
        const [order] =  await this.swapOrders(id)
          console.log(`清仓订单${id}: Order ${order.id} state: ${order.state}, ${order.errorCode}: ${order.errorMessage}`)
        if(order.state === 'processing' || order.state === 'init'){
          console.error(`${order.id} 状态未完成,重新等待查询`)
          this.checkSellOrder(id,address, pairId, tryNum)
          return false
        }
        if(order.errorCode === 'E_TOKEN_BALANCE_NOT_ENOUGH'){
          console.error(`${address} 已经被出售完了,不再清仓`)
          return false
        }
        if(order.state === 'fail'){
          console.log(` 清仓订单 出售失败,重新卖出${id}`)
          this.sellToken(address, pairId, tryNum)
        }
      } catch (error) {
        this.checkSellOrder(id,address, pairId, tryNum)
        console.log(`${id}: 查询交易订单状态失败`,error)
      }
    },20000)
  }

  // 校验token是否存在超过一小时
  isDecrepit(tokenInfo: TokenConfig){
    const {tryNum, timestamp, address} = tokenInfo
    const MAX_H = 24
    // 记录查询失败次数
    // 当失败三次之后,则不再需要跟踪该token
    if(tryNum >=3){
      console.log(`${address} 错误次数${tryNum}, 不再监听`)
      this.tokenAddress.delete(address)
      return false
    }
    // 超出24小时之后,增加错误次数
    if(tryNum > 0 || (this.getMs(MAX_H)) > timestamp) {
      console.log(`${address} 存在超过${MAX_H}小时,增加错误次数`)
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
       console.log('json', json)
      return json.data
  }
  // 查询token市场信息
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
}
