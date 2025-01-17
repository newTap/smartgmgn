import { violence } from "../static/tactics";
import { D_BOT_ORDER, D_BOT_ORDERS, D_BOT_RESPONSE, D_BOT_WALLETS_RESPONSE } from "../type";

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
  async violenceOrder(pair:string, state?: boolean){
    const data = violence
    data.pair = pair;
    data.walletId = this.defaultWallet.id
    
    const res = await this.send_d_bot<D_BOT_ORDER>('/automation/swap_order', {body: JSON.stringify(data),method: 'POST'})
    if(!res.err){
      console.log('buy order success', res.res)
      return res.res
    }
    console.log('buy order error', res.res)
  }

  // 查询买买交易
  async swapOrders(ids:string|string[]){
    const res = await this.send_d_bot<D_BOT_ORDERS>(`/automation/swap_orders?ids=${typeof ids === 'string' ? ids : ids.join(',')}`)
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