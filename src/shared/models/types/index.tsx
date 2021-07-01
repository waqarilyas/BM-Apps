import {NavigationProp, RouteProp} from '@react-navigation/core';

export interface GenericNavigation {
  navigation?: NavigationProp<any>;
  route?: RouteProp<any, any>;
}

export interface ChartItem {
  key: number;
  amount: number;
  svg: {fill: string};
  onPress?: (key: string) => void;
}

export enum ScreenSelectionType {
  Currency = 'currency',
  Langugage = 'language',
}

//Store State Types
export interface Coin {
  public_key: string;
  private_key: string;
  address: string;
  wif: string;
  seed: string;
  hd_path: string;
  coin_symbol: string;
  order_index: string;
  coin_name: string;
  is_erc20: boolean;
  confirmed_balance: string;
  unconfirmed_balance: string;
  chart_data: any;
  balance: string;
  vs_currency_balance: string;
  tx_history: any;
  coin_color: string;
  asset_symbol: string;
  asset_name: string;
  is_active: boolean;
}

export interface Mnemonic {
  mnemonic_phrase: string;
  is_restore: boolean;
}

export interface PasswordProtection {
  password: string;
  is_restore: boolean;
}
export interface WalletState {
  wallet: Coin[];
  portfolio_age: string;
  isRendered: boolean;
  walletRendered: boolean;
  mnemonic: Mnemonic;
  password_protection: PasswordProtection;
  isProtected: boolean;
  wallet_data_available: boolean;
  walletDataLoaded: boolean;
  best24H: string;
  best24HBalance: string;
  worst24H: string;
  change24H: 0;
  defaultCurrency: string;
  portfolioChartData: any;
}
