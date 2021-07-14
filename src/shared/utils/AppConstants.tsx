import {ChartItem} from '../models/types';
import {THEME} from '../theme';

export const currenciesEnum = {
  USD: '$',
  EUR: '€',
  MYR: 'RM',
  CNY: '¥',
  KRW: '₩',
  THB: '฿',
  GBP: '£',
  AUD: 'A$',
  INR: '₹',
  VND: '₫',
  TRY: '₺',
  AED: 'د.إ',
  IDR: 'Rp',
  PKR: 'PKR',
};

export const EMPTY_CHART_DATA: any = [
  {
    key: 1,
    vs_currency_balance: 100,
    svg: {fill: THEME.COLORS.secondaryBackground},
    onPress: () => console.log('Press'),
  },
];
