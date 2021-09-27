const COINS = {
  BTC: require('./BTC.png'),
  ETH: require('./ETH.png'),
  WEENUS: require('./weenus.png'),
  BNB: require('./BNB.png'),
};

const GetImageForCoin = (COIN: string) => {
  COIN = COIN?.toUpperCase();
  if (COIN === 'BTC') {
    return COINS.BTC;
  } else if (COIN === 'ETH') {
    return COINS.ETH;
  } else if (COIN === 'WEENUS' || COIN === 'USDT') {
    return COINS.WEENUS;
  } else if (COIN === 'BNB') {
    return COINS.BNB;
  }
};
export {GetImageForCoin, COINS};
