export interface PUMP_LIST {
  pumps: any[];
  new_creations: any[];
  completeds: COMPLETED[];
}

export interface COMPLETED {
  symbol: string;
  name: string;
  logo: string;
  total_supply: number;
  price: string;
  holder_count: number;
  launchpad_status: number;
  price_change_percent1m: string;
  price_change_percent5m: string;
  price_change_percent1h: string;
  burn_ratio: string;
  burn_status: string;
  is_show_alert: boolean;
  hot_level: number;
  liquidity: string;
  top_10_holder_rate: number;
  renounced_mint: number;
  renounced_freeze_account: number;
  market_cap: string;
  is_wash_trading: boolean;
  creator_balance_rate: string;
  creator_token_status: string;
  rat_trader_amount_rate: number;
  bluechip_owner_percentage: number;
  smart_degen_count: number;
  renowned_count: number;
  volume: string;
  swaps: number;
  buys: number;
  sells: number;
  buy_tax: any;
  sell_tax: any;
  is_honeypot: any;
  renounced: any;
  dev_token_burn_amount: any;
  dev_token_burn_ratio: any;
  dexscr_ad: number;
  dexscr_update_link: number;
  cto_flag: number;
  twitter_change_flag: number;
  address: string;
  complete: boolean;
  progress: string;
  twitter: string;
  website: string;
  telegram: any;
  open_timestamp: number;
  created_timestamp: number;
  usd_market_cap: string;
  swaps_1h: number;
  volume_1h: string;
  buys_1h: number;
  sells_1h: number;
}
export interface TOKEN_POOL_INFO {
  address: string;
  pool_address: string;
  quote_address: string;
  quote_symbol: string;
  liquidity: string;
  base_reserve: string;
  quote_reserve: string;
  initial_liquidity: string;
  initial_base_reserve: string;
  initial_quote_reserve: string;
  creation_timestamp: number;
  base_reserve_value: string;
  quote_reserve_value: string;
  quote_vault_address: string;
  base_vault_address: string;
  creator: string;
}

export interface TOKEN_INFO {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logo: string;
  biggest_pool_address: string;
  open_timestamp: number;
  holder_count: number;
  circulating_supply: string;
  total_supply: string;
  max_supply: string;
  liquidity: string;
  creation_timestamp: number;
}


export interface BIRDEYE_API<T> {
  success: boolean;
  data:T;
  message?: string;
}

export interface BIRDEYE_TOKEN_BALANCE {
   address: string;
    decimals: number;
    balance: number;
    uiAmount: number;
    chainId: string;
    logoURI: string;
    priceUsd: number;
    valueUsd: number;
}

export interface BIRDEYE_TOKEN_MARKER {
  address: string;
  liquidity: number;
  price: number;
  supply: number;
  marketcap: number;
  circulating_supply: number;
  circulating_marketcap: number;
}


export interface D_BOT_RESPONSE <T>{
  err: boolean
  res:T
  docs:string
}

export interface D_BOT_WALLETS{
  id:string;
  name:string;
  type: string;
  address:string;
}

export interface D_BOT_ORDER {
  id: string;
}

export type D_BOT_ORDERS = D_BOT_ORDER_INFO[]

export interface D_BOT_ORDER_INFO {
  id: string;
  state: 'init' | 'processing' | 'done' | 'fail' | 'expired';
  chain: string;
  tradeType: string;
  txPriceUsd: number;
  swapHash: string;
  errorCode: string;
  errorMessage: string;
}

export type D_BOT_WALLETS_RESPONSE = D_BOT_WALLETS[]

export interface DEX_SEARCH_PAIR {
  schemaVersion: string;
  pairs: DEX_Pair[];
}

interface DEX_Pair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: DEX_BaseToken;
  quoteToken: DEX_BaseToken;
  priceNative: string;
  priceUsd: string;
  txns: DEX_Txns;
  volume: DEX_Volume;
  priceChange: DEX_Volume;
  liquidity: DEX_Liquidity;
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
}

interface DEX_Liquidity {
  usd: number;
  base: number;
  quote: number;
}

interface DEX_Volume {
  h24: number;
  h6: number;
  h1: number;
  m5: number;
}

interface DEX_Txns {
  m5: DEX_M5;
  h1: DEX_M5;
  h6: DEX_M5;
  h24: DEX_M5;
}

interface DEX_M5 {
  buys: number;
  sells: number;
}

interface DEX_BaseToken {
  address: string;
  name: string;
  symbol: string;
}
