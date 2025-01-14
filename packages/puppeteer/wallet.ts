import { createJupiterApiClient } from "@jup-ag/api";
import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import fetch from 'cross-fetch';
import { Wallet } from '@project-serum/anchor';
import bs58 from 'bs58';

const jupiterQuoteApi = createJupiterApiClient(); // config is optional
const PRIVATE_KEY = '4qa3yG5c8XBKmNLx9YtFw5qkyd7wpBHdZpP1Njk83xs9o457DguNgmvRE524bie7UXwupTeMdxGBHRXnuXubakCj';

// fdn2v21jc72me6n4lp3huajfyf4o4czn
(async function () {
  const connection = new Connection('https://neat-hidden-sanctuary.solana-mainnet.discover.quiknode.pro/2af5315d336f9ae920028bbb90a73b724dc1bbed/');
  const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY || '')));
  async function quote() {
    let data = await jupiterQuoteApi.quoteGet({
      inputMint: "So11111111111111111111111111111111111111112",
      outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      amount: 100000000,
      // platformFeeBps: 10,
      // asLegacyTransaction: true, // legacy transaction, default is versioned transaction
    });
    console.log(data);
    const body = {
	"chain": "solana",
	"pair": wallet.payer,
	"walletId": "",
	"type": "buy",
	"amountOrPercent": 0.1,
	"stopEarnPercent": 0.5,
	"stopLossPercent": 0.5,
	"stopEarnGroup": [
		{
			"pricePercent": 0.2,
			"amountPercent": 0.5
		},
		{
			"pricePercent": 0.8,
			"amountPercent": 1
		}
	],
	"stopLossGroup": [
		{
			"pricePercent": 0.2,
			"amountPercent": 0.5
		},
		{
			"pricePercent": 0.8,
			"amountPercent": 1
		}
	],
	"priorityFee": "",
	"gasFeeDelta": 5,
	"maxFeePerGas": 100,
	"slippage": 0.1
}
    const swap =  await fetch('https://api-bot-v1.dbotx.com/simulator/sim_swap_order',{
      headers:{
        'X-API-KEY': 'fdn2v21jc72me6n4lp3huajfyf4o4czn'
      },
      method: "POST",
      body:JSON.stringify(body)
    })
    console.log(await swap.json());
  }
  quote();
})();
