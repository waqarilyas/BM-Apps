import {NavigationProp, RouteProp} from '@react-navigation/core';
import {PieChartData} from 'react-native-svg-charts';

export interface GenericNavigation {
  navigation?: NavigationProp<any>;
  route?: RouteProp<any, any>;
}

export interface ChartItem {
  key?: string | number;
  vs_currency_balance: number;
  svg: {fill: string};
  onPress?: (key: string) => void;
}

export enum ScreenSelectionType {
  Currency = 'currency',
  Langugage = 'language',
}

export interface Transaction {
  __v: number;
  _id: string;
  amount: string;
  blockHeight: number;
  coinSymbol: string;
  confirmations: number;
  createdAt: Date;
  explorer: string;
  explorerUrl: string;
  from: string;
  status: string;
  timeStamp: string;
  to: string;
  txId: string;
  updatedAt: Date;
  epoch?: number;
}

//Store State Types
export interface Coin {
  coin_name: string;
  coin_symbol: string;
  order_index: string;
  is_active: boolean;
  is_erc20: boolean;
  balance: string;
  coin_color: string;
  processingFee: string;
  //Remaining
  public_key: string;
  private_key: string;
  address: string;
  wif: string;
  seed: string;
  hd_path: string;
  confirmed_balance: string;
  unconfirmed_balance: string;
  chart_data: any;
  vs_currency_balance: string;
  tx_history: any;
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
  isRendered: boolean;
  walletRendered: boolean;
  mnemonic: Mnemonic;
  password_protection: PasswordProtection;
  isProtected: boolean;
  walletReady: boolean;
  walletDataLoaded: boolean;
  best24H: string;
  best24HBalance: string;
  worst24H: string;
  change24H: 0;
  defaultCurrency: string;
  portfolioChartData: any;
  walletLoading: boolean;
  walletRefreshing: boolean;
  bep20_fee: string;
  erc20_fee: string;
  doge_fee: string;
  btc_fee: string;
  showBalances: boolean;
  walletAddress: string;
}

export interface UserState {
  merchantEnabled: boolean;
  token: string;
  merchantData: any;
  merchantShop: any;
}
//Extra Funciton types
export interface GenerateWalletParams {
  coinSymbol: string;
  recovery: boolean;
  mnemonics: string;
}

export interface SendPayload {
  to: string;
  amount: string;
  from: string | undefined;
  symbol: string | undefined;
  private_key: string | undefined;
  public_key: string | undefined;
  is_erc20: boolean | undefined;
  processingFee: any;
  feeReceivingAccount: any;
  contractAbi: any;
  contractAddress: any;
}

//Add Public Info Payload
export interface PublicInfoPayload {
  address: string;
  coinSymbol: string;
  hdPath: string;
}

export interface CoinBalancesResEntity {
  address: string;
  balance: number;
  coinSymbol: string;
  vs_currency_balance: number;
}
