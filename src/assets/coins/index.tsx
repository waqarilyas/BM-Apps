const COINS = {
  BTC: require('./btc.png'),
  ETH: require('./eth.png'),
  WEENUS: require('./weenus.png'),
};

function GetImageForCoin(COIN: string) {
  COIN = COIN.toUpperCase();
  if (COIN === 'BTC') {
    return COINS.BTC;
  } else if (COIN === 'ETH') {
    return COINS.ETH;
  } else if (COIN === 'WEENUS' || COIN === 'USDT') {
    return COINS.WEENUS;
  }
}
export {GetImageForCoin, COINS};
