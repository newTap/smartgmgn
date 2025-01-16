import { D_BOT_RESPONSE, D_BOT_WALLETS_RESPONSE } from "../type";

export class Dbot {
  apiKey: string;
  wallets: D_BOT_WALLETS_RESPONSE = [];
  baseUrl = 'https://api-bot-v1.dbotx.com'

  constructor(){
    this.apiKey = process.env.X_API_KEY
    if(!this.apiKey){
      console.error("Please provide a valid API key")
      // process.exit(1)
    }
  }

  // 获取默认钱包
  get defaultWallet(){
    return this.wallets[0]
  }

  async initializeBot(){
    console.log("初始化")
    await this.bindWallets(process.env.WALLET_SECRET)
    await this.queryWallets()
    if(!this.wallets.length){
      console.error('DBot not available, please enter your private key')
      return false
    }
  }

  // 查询钱包
  async queryWallets(){
    const res = await this.send_d_bot<D_BOT_WALLETS_RESPONSE>('/account/wallets?type=solana')
    if(!res.err){
      this.wallets = res.res
      return false
    }
    console.error('query wallets error:',res.res);
  }

  // 绑定钱包
  async bindWallets(privateKey:string|Array<string>){
    if(!privateKey) {
      console.error("Please enter a private key")
      return false
    }
    const res = await this.send_d_bot<D_BOT_WALLETS_RESPONSE>('/account/wallets',{
      body: JSON.stringify({
        type:'solana',
        privateKeys: typeof privateKey === 'string' ? [privateKey]: privateKey
      }),
      method: "POST"
    })

    if(!res.err){
      console.log('bind wallets success', res.res)
      return false
    }

    console.error('bind wallets error:',res.res);
  }

  // 暴力买入
  async violenceOrder(pair){
    const data = {
        "chain": "solana",
        // 交易地址
        "pair": pair,
        "walletId": this.defaultWallet.id,
        "type": "buy",
        // - 优先费 (SOL)，对Solana有效，空字符串表示使用自动优先费
        "priorityFee": "0.00001",
        // evn额外gas费
        "gasFeeDelta": 0,
        // env最大gas费
        "maxFeePerGas": 100,
        // 开启防夹模式
        "jitoEnabled": true,
        // 防夹模式最大贿赂
        "jitoTip": 0.00001,
        // !最大滑点
        "maxSlippage": 0.2,
        // 并发数量
        "concurrentNodes": 2,
        // 失败后的重启次数(1-10)
        "retries": 1,
        // !买入/卖出 金额 ETH/SOL/BNB/TRX(0.00-1.00)
        "amountOrPercent": 0.01,
        // Raydium开盘卖出比例（0.00-1.00），对Pump代币有效，0表示不自动卖
        "migrateSellPercent": 1,
        // 触发比例 (0-1)，当Dev卖出超过这个比例时卖出你的代币
        "minDevSellPercent": 0.5,
        // 当跟随Dev卖出任务触发时，你卖出的比例，为0表示不创建跟随Dev卖出任务
        "devSellPercent": 0,
        // !止盈比例，0.5表示上涨50%时卖出
        "stopEarnPercent": '',
        // !止损比例（0.00-1.00），0.5表示下跌50%时卖出
        "stopLossPercent": '',
        // !止盈分组，在快速买卖的type为“buy”时，和跟单的卖出设置中有效，最多支持设置6个，
        "stopEarnGroup": [
            {
              // 价格涨跌百分比 (0.5表示50%)，当在止盈分组里时，表示上涨多少卖出，当在止损分组里时，表示下跌多少卖出
                "pricePercent": 1,
                // 卖出比例 (0-1，0.5表示50%)
                "amountPercent": 0.5
            },
            {
                "pricePercent": 2,
                "amountPercent": 0.2
            },
            {
                "pricePercent": 3,
                "amountPercent": 0.1
            },
            {
                "pricePercent": 4,
                "amountPercent": 0.1
            }
        ],
        // 止损分组
        "stopLossGroup": [
        ],
        // 止盈止损任务的过期时间，最大值为864000000 (毫秒) /10天
        "pnlOrderExpireDelta": 864000000,
        // "true"表示止盈止损任务创建后若有效期内未触发，则在任务结束时自动执行
        "pnlOrderExpireExecute": false,
        // “true”表示将使用自定义参数创建止盈止损任务，否则将使用买入的参数
        "pnlCustomConfigEnabled": false,
        // 自定义的止盈止损参数
        "pnlCustomConfig": {
            "priorityFee": "",
            "gasFeeDelta": 5,
            "maxFeePerGas": 100,
            "jitoEnabled": true,
            "jitoTip": 0.00001,
            "maxSlippage": 0.2,
            "concurrentNodes": 2,
            "retries": 1
        }
    }
    const res = await this.send_d_bot('/automation/swap_order', {body: JSON.stringify(data),method: 'POST'})
    if(!res.err){
      console.log('buy order success', res.res)
      return res.res
    }
    console.log('buy order error', res.res)
  }

  // 查询买买交易
  async swapOrders(ids:string|string[]){
    const res = await this.send_d_bot(`/automation/swap_orders?ids=${typeof ids === 'string' ? ids : ids.join(',')}`)
    if(!res.err){
      console.log('query orders success', res.res)
      return res.res
    }
    console.error('query orders error', res.res)
  }


  async send_d_bot<T>(url:string, config:RequestInit={}){
    const res =  await fetch(`${this.baseUrl}${url}`,{
      headers:{
        ...config.headers,
        'Content-Type': 'application/json',
        "X-API-KEY": this.apiKey,
      },
      ...config
    })
    return await res.json() as Promise<D_BOT_RESPONSE<T>>
  }

}