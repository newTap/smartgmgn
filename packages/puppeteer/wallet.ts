import { Dbot } from './src/utils/Dbot';

const PRIVATE_KEY = '4qa3yG5c8XBKmNLx9YtFw5qkyd7wpBHdZpP1Njk83xs9o457DguNgmvRE524bie7UXwupTeMdxGBHRXnuXubakCj';
const API_KEY = '3gdd2164cp8knajhu3nxoix6i8bpngut';
(async function () {

  const dbot = new Dbot()
  // await dbot.initialize()
  dbot.bindWallets(PRIVATE_KEY)
  console.log(dbot.wallets)
})()
