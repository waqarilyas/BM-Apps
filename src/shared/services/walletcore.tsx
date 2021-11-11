import axios from 'axios';
import * as bip39 from 'bip39';
import bip44Constants from 'bip44-constants';
import bs58check from 'bs58check';
import coininfo from 'coininfo';
import crypto, {createHash} from 'crypto';
import {derivePath, getPublicKey} from 'ed25519-hd-key';
import {Address} from 'ethereumjs-util';
import HDKey from 'hdkey';
import wif from 'wif';
import defaultConfig from '../../../block.config';
import {Coin} from '../models/types';
const BIP84 = require('bip84');

export const hdPath = (symbol: string, account_index = 0): string => {
  const coinType = bip44Constants.findIndex(
    (item: string[]) => item[1] === symbol.toUpperCase(),
  );

  //---- NEW CHANGES------ //

  //---- END NEW CHANGES------ //

  if (~coinType) {
    return `m/44'/${coinType}'/0'/0/${account_index}`;
  } else {
    throw new Error('not bip44 compliant');
  }
};

export const hardenHdPath = (symbol: any): string => {
  const coinType = bip44Constants.findIndex((item: any) => item[1] === symbol);
  return `m/44'/${coinType}'/0'`;
};

export const generateSeed = (mnemonic?: string): Buffer => {
  if (mnemonic) {
    return bip39.mnemonicToSeedSync(mnemonic);
  } else {
    /** create 512 bytes random seed*/
    return crypto.randomBytes(512);
  }
};

/**
 * generate master wallet from seed
 * we will use this master wallet to derive private/public keys
 * @param seed
 */
export const generateMasterHdWallet = (seed: Buffer, symbol: any) => {
  /**
   * version to prefix public and private keys for altcoins
   */
  const version = coininfo(symbol);

  return HDKey.fromMasterSeed(seed, version?.bip32);
};

/**
 * if not generating for altcoins, ignore the versions
 * @param masterWallet
 * @param path
 */
export const generateChild = (masterWallet: any, path: string) => {
  return masterWallet.derive(path);
};

/**
 * version
 * @param privateKey
 * @param version
 */
export const privateKeyToWif = (
  privateKey: any,
  version: any,
  compressed = true,
) => {
  return wif.encode(version, privateKey, compressed);
};

export const deriveBtcLikeAddress = (publicKey: any, symbol: any) => {
  const sha256 = createHash('sha256').update(publicKey).digest();
  const rmd160 = createHash('rmd160').update(sha256).digest();

  const buffer = Buffer.allocUnsafe(21);
  /** get coin symbol to get version */
  const coin = coininfo(symbol);

  /** to support blockcypher testnet, all altcoins except btc test will have version byte 0x1B */
  const version = btcLikeAddressVersion(symbol);
  buffer.writeUInt8(version, 0);

  rmd160.copy(buffer, 1);
  const address = bs58check.encode(buffer);
  return address;
};

/**
 * this method is used to create deposit addresses for each coin
 * @param symbol
 */
export const createECDSA = (
  symbol: string,
  mnemonic: string,
  hdPathArg?: string,
) => {
  /** get coin info */
  const coin = coininfo(symbol);
  /** step-1 generate seed */
  const seed = generateSeed(mnemonic);
  /** step-2 create master wallet */
  const masterWallet = generateMasterHdWallet(seed, symbol);
  /** step-3 get derivation path, this path wil return only 1 child */
  let path;
  if (coin?.testnet) {
    path = hdPath('');
  } else {
    path = hdPath(symbol);
  }
  /** overwrite the derivation path, use in account discovery */
  if (hdPathArg) {
    path = hdPathArg;
  }
  /** step-4 get child*/
  const child = generateChild(masterWallet, path);
  /** encode private keys wif format
   * https://en.bitcoin.it/wiki/Wallet_import_format
   * */
  if (coin) {
    const wif = privateKeyToWif(child.privateKey, coin.versions.private, true);
    return {
      wif,
      path,
      _publicKey: child._publicKey.toString('hex'),
      _privateKey: child._privateKey.toString('hex'),
      seed: seed.toString('hex'),
      address: deriveBtcLikeAddress(child._publicKey, symbol),
    };
  } else {
    return {
      /** ignore versions*/
      path,
      seed: seed.toString('hex'),
      _publicKey: child._publicKey.toString('hex'),
      _privateKey: child._privateKey.toString('hex'),
      address: Address.fromPrivateKey(child._privateKey).toString(),
    };
  }
};

/**
 * not using anywhere
 * hardened key derivation
 * @param symbol
 */
export const createEdDSA = (symbol: any) => {
  const seed = generateSeed().toString('hex');
  const path = hardenHdPath(symbol);
  const {key, chainCode} = derivePath(path, seed);
  const pub = getPublicKey(key);
  return {
    key,
    path: '',
    chainCode,
    pub,
  };
};
/**
 *
 * @param symbol
 * @param algo
 */
export const createHdWallet = (symbol: string, mnemonic: string) => {
  if (symbol === 'btc') {
    return createBech32Wallet(mnemonic);
  }
  return createECDSA(symbol, mnemonic);
};

export const createBech32Wallet = (mnemonic: string) => {
  var root = new BIP84.fromSeed(mnemonic);
  var child0 = root.deriveAccount(0);

  var account0 = new BIP84.fromZPrv(child0);

  const seed = generateSeed(mnemonic);

  return {
    /** ignore versions*/
    path: "m/84'/0'/0'/0/0",
    seed: seed.toString('hex'),
    _publicKey: account0.getPublicKey(0),
    _privateKey: account0.getPrivateKey(0),
    address: account0.getAddress(0),
  };
};

export const accountRecovery = async (
  coin: Coin,
  mnemonic: string,
  iteration = 2,
  validAddress: any,
  accountIndex = 0,
): Promise<any> => {
  if (iteration <= 0) {
    return validAddress;
  }

  const newAddress = await createAddress(coin, mnemonic);

  const isValidAddress = await checkValidAddress(coin, newAddress.address);
  if (!isValidAddress) {
    /** valid address is null for first time*/
    if (!validAddress) {
      validAddress = newAddress;
    }
    return await accountRecovery(
      coin,
      mnemonic,
      --iteration,
      validAddress,
      ++accountIndex,
    );
  } else {
    return newAddress;
  }
};

// export const createAddress = (coin: Coin, mnemonic: string) => {
//   let symbol = coin.coin_symbol;
//   if (coin.is_erc20 || coin.is_bep20 || coin.coin_symbol === 'bnb') {
//     symbol = 'eth';
//   }
//   return createHdWallet(symbol, mnemonic);
// };
export const createAddress = (coin: Coin, mnemonic: string) => {
  let symbol = coin.coin_symbol;
  if (coin.is_erc20 || coin.is_bep20 || coin.coin_symbol === 'bnb') {
    symbol = 'eth';
  }
  return createHdWallet(symbol, mnemonic);
};

export const BCNetwork = (symbol: any) => {
  if (defaultConfig.ENV === 'development') {
    return 'btc/test3';
  } else {
    return symbol + '/main';
  }
};

/**
 * this method will check if that address has any transactions on blockchain
 * @param coin
 * @param address
 */
export const checkValidAddress = async (
  coin: Coin,
  address: string,
): Promise<any> => {
  const coinType = await getCoinBlockchain(coin);
  if (coinType === 'isEth' || coinType === 'isERC20') {
    const txs = await axios
      .get(
        `${defaultConfig.ETHERSCAN_API_URL}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${defaultConfig.ETHERSCAN_API_KEY}`,
      )
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return txs?.length > 0 ? true : false;
  } else if (coinType === 'isBnb' || coinType === 'isBEP20') {
    const txs = await axios
      .get(
        `${defaultConfig.BSCSCAN_API_URL}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${defaultConfig.BSCSCAN_API_KEY}`,
      )
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return txs?.length > 0 ? true : false;
  } else {
    const txs = await axios
      .get(
        `${defaultConfig.BLOCKCYPHER_URL}/${
          defaultConfig.BLOCKCYPHER_API_VERSION
        }/${BCNetwork(coin)}/addrs/${address}/balance?token=${
          defaultConfig.BLOCKCYPHER_API_TOKEN
        }`,
      )
      .then(function (response) {
        return response.data?.n_tx;
      })
      .catch(function (error) {
        console.log(error);
      });
    return txs > 0 ? true : false;
  }
};

export const getCoinBlockchain = async (coin: Coin) => {
  let coinType;
  if (coin.coin_symbol == 'xlm') {
    coinType = 'xlm';
  } else if (coin.coin_symbol === 'eth') {
    coinType = 'isEth';
  } else if (coin.coin_symbol === 'bnb') {
    coinType = 'isBnb';
  } else if (coin.is_erc20) {
    coinType = 'isERC20';
  } else if (coin.is_bep20) {
    coinType = 'isBEP20';
  } else {
    coinType = 'btcLike';
  }
  return coinType;
};

export const btcLikeAddressVersion = (symbol: any) => {
  if (defaultConfig.ENV === 'development') {
    if (symbol !== 'btc') {
      return 0x1b;
    } else {
      const coin = coininfo(symbol + '-test');
      return coin.versions.public;
    }
  } else {
    const coin = coininfo(symbol);
    return coin.versions.public;
  }
};
