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
