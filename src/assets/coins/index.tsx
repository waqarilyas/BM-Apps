const COINS = {
  BTC: require('./BTC.png'),
  ETH: require('./ETH.png'),
  WEENUS: require('./weenus.png'),
  BNB: require('./BNB.png'),
  BUSD: require('./BUSD.png'),
  DOGE: require('./DOGE.png'),
  USDT: require('./USDT.png'),
};

const GetImageForCoin = (COIN: string) => {
  COIN = COIN?.toUpperCase();
  if (COIN === 'BTC') {
    return COINS.BTC;
  } else if (COIN === 'ETH') {
    return COINS.ETH;
  } else if (COIN === 'WEENUS') {
    return COINS.WEENUS;
  } else if (COIN === 'BNB') {
    return COINS.BNB;
  } else if (COIN === 'BUSD') {
    return COINS.BUSD;
  } else if (COIN === 'DOGE') {
    return COINS.DOGE;
  } else if (COIN === 'USDT') {
    return COINS.USDT;
  }
};
export {GetImageForCoin, COINS};
