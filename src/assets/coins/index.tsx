const COINS = {
  BCH: require('./BCH.png'),
  BTC: require('./BTC.png'),
  CRD: require('./CRD.png'),
  DASH: require('./DASH.png'),
  DOGE: require('./DOGE.png'),
  ETH: require('./ETH.png'),
  LEVELG: require('./LEVELG.png'),
  LTC: require('./LTC.png'),
  USDT: require('./USDT.png'),
  XLM: require('./XLM.png'),
};

function GetImageForCoin(COIN: string) {
  COIN = COIN.toUpperCase();
  if (COIN === 'BCH') {
    return COINS.BCH;
  } else if (COIN === 'BTC') {
    return COINS.BTC;
  } else if (COIN === 'CRD') {
    return COINS.CRD;
  } else if (COIN === 'DASH') {
    return COINS.DASH;
  } else if (COIN === 'DOGE') {
    return COINS.DOGE;
  } else if (COIN === 'ETH') {
    return COINS.ETH;
  } else if (COIN === 'LEVELG') {
    return COINS.LEVELG;
  } else if (COIN === 'LTC') {
    return COINS.LTC;
  } else if (COIN === 'WEENUS' || COIN === 'USDT') {
    return COINS.USDT;
  } else if (COIN === 'XLM' || COIN === 'native') {
    return COINS.XLM;
  }
}
export {GetImageForCoin, COINS};
