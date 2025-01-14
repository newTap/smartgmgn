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

  async initialize(){
    console.log("初始化")
    await this.queryWallets()
    // !钱包逻辑是否之需要含有一个钱包即可?
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

  // 快速买卖
  async swapOrder(){
    // const res = await this.send_d_bot('/automation/swap_order' )
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