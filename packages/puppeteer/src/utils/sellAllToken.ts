import fetch from 'cross-fetch';
import { BUY_REASON, InitializeDB } from '../../../sql/index';
import { BIRDEYE_API, BIRDEYE_TOKEN_BALANCE } from '../type';
import { Dbot } from './Dbot';
import { sleep } from '.';

async function main(){
  const wallet = '5RLYauDu6UjDkhfQiQrC6r3g7Ma3dkoKeXFbm1Pg2Qx'
  // 获取所有token
  // 初始化数据库
    const db = new InitializeDB({
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    const d_bot = new Dbot()
    await d_bot.initializeBot()
    try {
      await db.initializeDB();
    } catch (error) {
      console.error("initializeDB error", error);
      return false;
    }
    // 查找到买入token列表
    let tokens = await db.getNotSellHoldTokens()
    console.log(`一共有${tokens.length}个token`)
    let ids = new Map<string, {
      address: string
      buy_id:string
    }>()
    console.log(tokens)
    await sellToken()
    
    // 查询快速交易订单数量

    async function sellToken(){
      for (let index = 0; index < tokens.length; index++) {
        const token = tokens[index];
        try {
          // api查询是否还有token余额
          let data =  await queryAmount(wallet, token.address)
          console.log('data', data)
          if(!data){
            console.error(`${token.address} token not found`)
            await db.updatesHoldToken({
              id: token.id,
              address: token.address,
              sell_id: 'sell',
              buy_reason: BUY_REASON.VIOLENCE
            })
            continue
          }
          // 再查数据库读取pair id ,
          let {pair_id} = token.token
          if(!pair_id){
            console.log('没有pairId')
            continue
          }
          console.log('pair_id', pair_id)
          // 根据pair id 出售快速交易订单
          let order  = await d_bot.violenceOrder(pair_id, 'sell')
          console.log('order', order)
          ids.set(order.id, {
            address: token.address,
            buy_id:token.id
          })
          await sleep(500)
        } catch (error) {
          console.log('订单异常', error)
        }
      }
      checkSellOrder(Array.from(ids.keys()))
    }

    // 写入数据库

  async function checkSellOrder(id:string[]){
    console.log('id',id)
    setTimeout(async() => {
     try {
        const orders =  await d_bot.swapOrders(id)
        console.log('orders', orders)
        if(orders){
          for (let index = 0; index < orders.length; index++) {
            const order = orders[index];
            const {buy_id, address} = ids.get(order.id)
            console.log(`清仓订单:Order ${order.id} state: ${order.state}, ${order.errorCode}: ${order.errorMessage}`)
            if(order.state === 'processing' || order.state === 'init'){
              console.error(`${order.id} 状态未完成,重新等待查询`)
              continue
            }
            if(order.errorCode === 'E_TOKEN_BALANCE_NOT_ENOUGH'){
              console.error(`${address} 已经被出售完了,不再清仓`)
              ids.delete(order.id)
              await db.updatesHoldToken({
                id: buy_id,
                address: address,
                sell_id: 'sell',
                buy_reason: BUY_REASON.VIOLENCE
              })
              return false
            }
            if(order.state === 'fail'){
              console.log(` 清仓订单 出售失败${order.id}:${address}`)
              continue
              // this.sellToken(address, pairId, tryNum)
            }
            ids.delete(order.id)
            await db.updatesHoldToken({
              address: address,
              id: buy_id,
              sell_id: order.id,
              buy_reason: BUY_REASON.VIOLENCE
            })
            await sleep(500)
          }
        }
      } catch (error) {
        console.log(` 查询交易订单状态失败`,error)
      }
      const id_array = Array.from(ids.keys())
      console.log('现在还有', id_array)
      if(id_array){
        checkSellOrder(id_array)
      }
    },20000)
  }

  async function queryAmount(wallet:string, tokenAddress: string) {
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
}

main()