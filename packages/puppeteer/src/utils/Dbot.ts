import BigNumber from 'bignumber.js';

import { orderStopEarnBaseConfig, violence } from "../static/tactics";
import { D_BOT_GROUP, D_BOT_GROUP_TYPE, D_BOT_ORDER, D_BOT_ORDERS, D_BOT_RESPONSE, D_BOT_WALLETS_RESPONSE } from "../type";

export class Dbot {
  apiKey: string;
  wallets: D_BOT_WALLETS_RESPONSE = [];
  groups: D_BOT_GROUP[] = [];
  baseUrl = 'https://api-bot-v1.dbotx.com'
  violenceStopEarnMap = [
    {
      pricePercent: '500',
      percent: '1'
    },
    // {
    //   pricePercent: '30',
    //   percent: '0.05'
    // },
    // {
    //   pricePercent: '50',
    //   percent: '0.05'
    // },
    // {
    //   pricePercent: '100',
    //   percent: '0.05'
    // },
  ]
  violenceGroupName = 'violence-order'


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
  // 获取暴利买入分组
  get violenceGroup(){
    return this.groups.filter(group => group.name === this.violenceGroupName)[0]
  }

  async initializeBot(){
    console.log("初始化")
    await this.bindWallets(process.env.WALLET_SECRET)
    await this.queryWallets()
    await this.queryGroups('limit_order')
    if(!this.wallets.length){
      console.error('DBot not available, please enter your private key')
      return false
    }
    // 没有暴力买入分组
    if(!this.violenceGroup){
      await this.addGroup('limit_order', this.violenceGroupName)
      await this.queryGroups('limit_order')
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

  // 暴力买入额外止盈
  async violenceOrderStopEarn(pairId:string, walletId:string, price:number){
    const config = {
      "chain": "solana",
      "pair": pairId,
      "walletId": walletId,
      "groupId": this.violenceGroup.id,
      "settings": [

      ]
    }
    this.violenceStopEarnMap.forEach(({pricePercent, percent}) => {
      const orderStopEarnItem = orderStopEarnBaseConfig
      orderStopEarnItem.currencyAmountUI = percent
      // 最长12位有效数字
      orderStopEarnItem.triggerPriceUsd = new BigNumber(price).multipliedBy(1 + (+pricePercent)).toFixed(12)
      console.log(`price:${price} percent:${orderStopEarnItem.currencyAmountUI};triggerPriceUsd:${orderStopEarnItem.triggerPriceUsd}`)
      config.settings.push(orderStopEarnItem)
    })
    const res =  await this.send_d_bot('/automation/limit_orders', {
      method: 'POST',
      body: JSON.stringify(config)
    })
    console.log('res', res)
     if(!res.err){
      return res.res
    }
    console.error('violenceOrderStopEarn:',res.res);
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

  // 获取钱包的分组信息
  async queryGroups(type: D_BOT_GROUP_TYPE = 'limit_order'){
    const res =  await this.send_d_bot<D_BOT_GROUP[]>(`/automation/groups?type=${type}`)
    if(!res.err){
      this.groups = res.res
      return false
    }
    console.error('query groups error:',res.res);
  }

  // 添加分组
  async addGroup(type:D_BOT_GROUP_TYPE = 'limit_order', name:string){
    const res =  await this.send_d_bot<D_BOT_GROUP[]>(`/automation/group`, {
      method: 'POST',
      body: JSON.stringify({
        type,name
      })
    })
    if(!res.err){
      return true
    }
    console.error('add groups error:',res.res);
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