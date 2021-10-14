import axios from 'axios';
import defaultConfig from '../../../block.config';
import {
  Coin,
  GenerateWalletParams,
  PublicInfoPayload,
  SendPayload,
} from '../models/types';
import {store} from '../store';
import {
  setCoin,
  setCoinBalance,
  setCoinRate,
  setIsWalletRendered,
  setMnemonic,
  setPortfolioAge,
  setWallet,
  setWalletLoading,
} from '../store/reducers/walletReducer';
import {ECPair, script, Transaction} from 'bitcoinjs-lib';
import Common from 'ethereumjs-common';
var Buffer = require('buffer');
import Web3 from 'web3';
import {Transaction as EthereumTx} from 'ethereumjs-tx';
import {getFixedAmount} from './helper.service';
import {accountRecovery, createAddress} from './walletcore';
import Toast from 'react-native-toast-message';
let bip39 = require('bip39');
const BIP84 = require('bip84');

export const generateMnemonic = async () => {
  try {
    const {mnemonic} = store.getState().wallet;
    if (!mnemonic.mnemonic_phrase) {
      const response = await bip39.generateMnemonic();

      let fetchedMnemonic = {mnemonic_phrase: response, is_restore: false};
      store.dispatch(setMnemonic(fetchedMnemonic));
      return response;
    } else {
      return mnemonic.mnemonic_phrase;
    }
  } catch (error) {
    console.log('Error generating Mnemonic:', error);
    throw error;
  }
};

export const getCoinsList = async () => {
  return await axios.get(`${defaultConfig.API_URL}/coin-rates/list/coins`);
};

export const setActiveAssets = async () => {
  const {wallet} = store.getState().wallet;
  try {
    const coinList = await getCoinsList();
    if (wallet.length < coinList.data.length) {
      const sortedCoinList = await coinList.data.sort((a: any, b: any) =>
        a.orderIndex > b.orderIndex ? 1 : -1,
      );
      const coinListForWalletGeneration = await sortedCoinList.map(
        (coin: any, index: number) => {
          return {
            index: index,
            coin_symbol: coin.coinSymbol,
            coin_name: coin.name,
            order_index: coin.orderIndex,
            is_active: true,
            is_erc20: coin.isErc20 ? 1 : 0,
            is_bep20: coin.isBep20 ? 1 : 0,
            icon: coin.icon,
            balance: 0,
            isMarketDataAvailable: coin.isMarketDataAvailable,
            coin_color: coin.coinColor,
            processingFee: coin.processingFee,
            blockchain: coin.blockchain,
            contractAddress: coin.contractAddress,
            contractAbi: coin.contractAbi,
          };
        },
      );
      store.dispatch(setWallet(coinListForWalletGeneration));
      return coinListForWalletGeneration;
    } else {
      return wallet;
    }
  } catch (error) {
    console.log('Error render active assets:', error);
  }
};

export const setAgeOfPortfolio = async () => {
  const {defaultCurrency} = store.getState().wallet;
  if (!defaultCurrency) {
    store.dispatch(setPortfolioAge(Date.now()));
    return defaultCurrency;
  } else {
    return defaultCurrency;
  }
};

export const renderIsRenderedState = () => {
  const {isRendered} = store.getState().wallet;
  if (!isRendered) {
    store.dispatch(setIsWalletRendered(true));
    return isRendered;
  } else {
    return isRendered;
  }
};

export const checkCoin = async (
  coinSymbol: string,
  _order_index: number,
  _name: string,
  _is_erc20: boolean,
) => {
  try {
    const {wallet, mnemonic} = store.getState().wallet;
    const {dispatch} = store;

    const isCoin = wallet.filter((c: Coin) => c.coin_symbol === coinSymbol);
    const coinIndex = wallet.findIndex(
      (c: Coin) => c.coin_symbol === coinSymbol,
    );

    if (mnemonic.is_restore) {
      const coinData = await generateWallet({
        coinSymbol: coinSymbol,
        recovery: mnemonic.is_restore,
        mnemonics: mnemonic.mnemonic_phrase,
      });
      let myCoinData = {
        ...isCoin[0],
        public_key: coinData._publicKey,
        private_key: coinData._privateKey,
        address: coinData.address,
        wif: coinData.wif || '',
        seed: coinData.seed || '',
        hd_path: coinData.path || '',
        coin_symbol: coinSymbol,
        order_index: _order_index,
        coin_name: _name,
        is_erc20: coinData.isErc20 || false,
        confirmed_balance: coinData.confirmed_balance || '',
        unconfirmed_balance: coinData.unconfirmed_balance || '',
        chart_data: [],
        vs_currency_balance: '',
        tx_history: [],
      };
      dispatch(setCoin({index: coinIndex, coinData: myCoinData}));
      dispatch(
        setMnemonic({
          mnemonic_phrase: mnemonic.mnemonic_phrase,
          is_restore: false,
        }),
      );
      return {
        address: coinData.address,
        coinSymbol: coinSymbol,
        hdPath: coinData.path,
      };
    }

    if (isCoin.length > 0 && isCoin[0].private_key) {
    } else {
      const coinData = await generateWallet({
        coinSymbol: coinSymbol,
        recovery: mnemonic.is_restore,
        mnemonics: mnemonic.mnemonic_phrase,
      });
      let myCoinData = {
        ...isCoin[0],
        public_key: coinData._publicKey,
        private_key: coinData._privateKey,
        address: coinData.address,
        wif: coinData.wif || '',
        seed: coinData.seed || '',
        hd_path: coinData.path || '',
        coin_symbol: coinSymbol,
        order_index: _order_index,
        coin_name: _name,
        is_erc20: coinData.isErc20 || false,
        confirmed_balance: coinData.confirmed_balance || '',
        unconfirmed_balance: coinData.unconfirmed_balance || '',
        chart_data: [],
        vs_currency_balance: '',
        tx_history: [],
      };
      dispatch(setCoin({index: coinIndex, coinData: myCoinData}));
      return {
        address: coinData.address,
        coinSymbol: coinSymbol,
        hdPath: coinData.path,
      };
    }
  } catch (e) {
    throw e;
  }
};

// export const generateWallet = async ({
//   coinSymbol,
//   recovery,
//   mnemonics,
// }: GenerateWalletParams) => {
//   try {
//     const response = await axios({
//       method: 'post',
//       url: `${defaultConfig.API_URL}/wallet/new`,
//       data: {
//         coinSymbol,
//         mnemonics,
//         recovery,
//       },
//     });
//     return response.data;
//   } catch (e) {
//     console.log('Error generating wallet:', e);
//     throw e;
//   }
// };

// export const generateWallet = async (body: {
//   coinSymbol: string;
//   recovery: boolean;
//   mnemonics: string;
// }) => {
//   /** coin info */
//   const {wallet} = store.getState().wallet;
//   const coin: Coin = wallet.find(
//     (c: Coin) => c.coin_symbol === body.coinSymbol,
//   );
//   try {
//     if (!body.recovery) {
//       const wallet = await createAddress(coin, body.mnemonics);
//       return {...wallet, isErc20: coin?.is_erc20, isBep20: coin?.is_bep20};
//     } else {
//       const wallet = await accountRecovery(coin, body.mnemonics, 2, null);
//       return {...wallet, isErc20: coin?.is_erc20, isBep20: coin?.is_bep20};
//     }
//   } catch (e) {
//     console.log('error generating wallet: ', e);
//     throw e;
//   }
// };

export const generateWallet = async (body: {
  coinSymbol: string;
  recovery: boolean;
  mnemonics: string;
}) => {
  /* coin info */
  const {wallet} = store.getState().wallet;
  const coin: Coin = wallet.find(
    (c: Coin) => c.coin_symbol === body.coinSymbol,
  );
  try {
    if (!body.recovery) {
      const wallet = await createAddress(coin, body.mnemonics);
      return {...wallet, isErc20: coin?.is_erc20, isBep20: coin?.is_bep20};
    } else {
      const wallet = await accountRecovery(coin, body.mnemonics, 2, null);
      return {...wallet, isErc20: coin?.is_erc20, isBep20: coin?.is_bep20};
    }
  } catch (e) {
    throw e;
  }
};

export const checkRate = async (
  coin: string,
  currency: string,
  index: number,
) => {
  try {
    const response = await axios.get(
      `${defaultConfig.API_URL}/coin-rates/${coin}?vs_currency=${currency}`,
    );
    store.dispatch(setCoinRate({index, chartData: response.data}));
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const checkTransactions = async (coinSymbol: any, coinAddress: any) => {
  return axios
    .get(
      `${defaultConfig.API_URL}/transaction/${coinAddress}/${coinSymbol}/txs`,
    )
    .then(res => res.data);
};

export const checkBalance = async (
  coinSymbol: any,
  _is_erc20: boolean,
  currency: any,
  index: number,
) => {
  const coinData = store
    .getState()
    .wallet.wallet.filter(c => c.coin_symbol === coinSymbol)[0];
  await axios
    .get(
      `${defaultConfig.API_URL}/wallet/balance/${coinSymbol}/${coinData.address}?vs_currency=${currency}`,
    )
    .then(async res => {
      store.dispatch(
        setCoinBalance({
          index,
          balance: res.data.balance?.toFixed(4),
          vs_currency_balance: getFixedAmount(res.data.vs_currency_balance),
        }),
      );
    })
    .catch(err => {
      console.log(`Check balance error for ${coinSymbol}:`, err);
      throw err;
    });
};

export const restoreWalletWithPhrase = async (recovery: any) => {
  try {
    const isValidated = await validateMnemonic(recovery);
    console.log('isValidated from restoreWalletWithPhrase', isValidated);
    let fetchedMnemonic = {mnemonic_phrase: recovery, is_restore: true};
    if (isValidated) {
      store.dispatch(setMnemonic(fetchedMnemonic));
      return isValidated;
    } else {
      return isValidated;
    }
  } catch (e) {
    console.log('Error restoring wallet:', e);
    throw e;
  }
};

export const validateMnemonic = async (recovery: string) => {
  try {
    const isValidated = await axios({
      method: 'post',
      url: `${defaultConfig.API_URL}/wallet/validate/mnemonic`,
      data: {
        mnemonic: recovery,
      },
    });
    return isValidated.data;
  } catch (error) {
    console.log('Error validating mnemonic:', error);
    throw error;
  }
};

// export const handleTx = async (txPayload: any) => {
//   try {
//     if (!txPayload.is_erc20 && txPayload.symbol !== 'eth') {
//       await handleBtcLikeTx(txPayload);
//     } else if (txPayload.is_erc20) {
//       await handleErc20LikeTx(txPayload);
//     } else {
//       await handleEthLikeTx(txPayload);
//     }
//   } catch (e) {
//     throw e;
//   }
// };

export const handleTx = async (txPayload: any) => {
  try {
    if (
      !txPayload.is_erc20 &&
      txPayload.symbol !== 'eth' &&
      !txPayload.is_bep20 &&
      txPayload.symbol !== 'bnb'
    ) {
      await handleBtcLikeTx(txPayload);
    } else if (txPayload.symbol === 'bnb') {
      await handleBnbLikeTx(txPayload);
    } else if (txPayload.is_erc20) {
      await handleErc20LikeTx(txPayload);
    } else if (txPayload.is_bep20) {
      await handleBEP20LikeTx(txPayload);
    } else {
      await handleEthLikeTx(txPayload);
    }
  } catch (e) {
    throw e;
  }
};

const handleBnbLikeTx = async (txPayload: any) => {
  try {
    const companyTxPayload = {
      to: txPayload.feeReceivingAccount,
      amount: txPayload.processingFee,
      from: txPayload.from,
      symbol: txPayload.symbol,
      private_key: txPayload.private_key,
      public_key: txPayload.public_key,
      is_bep20: txPayload.is_bep20,
    };
    const userTxPayload = {
      to: txPayload.to,
      amount: txPayload.amount,
      from: txPayload.from,
      symbol: txPayload.symbol,
      private_key: txPayload.private_key,
      public_key: txPayload.public_key,
      is_bep20: txPayload.is_bep20,
    };
    // await bnbLikeTx
    await bnbLikeTxToUser(userTxPayload);
  } catch (e) {
    throw e;
  }
};

const bnbLikeTxToUser = async (txPayload: any) => {
  try {
    console.log(`Running handleBnbLikeTx for {${txPayload.symbol}}`);
    const txHash = await createAndSignBnbTx(txPayload);
    await submitBnbLikeTx(txHash, txPayload);
  } catch (e) {
    throw e;
  }
};

export async function createAndSignBnbTx(txPayload: any) {
  try {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(defaultConfig.BNB_RPC),
    ); // Refactor this one

    const nonce = await web3.eth.getTransactionCount(txPayload.from);
    /**
     * create tx payload
     */
    const trx = {
      nonce: nonce,
      to: txPayload.to,
      value: web3.utils.toHex(
        web3.utils.toWei(txPayload.amount?.toString(), 'ether'),
      ),
      gasLimit: web3.utils.toHex(100000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
    };
    /**
     * sign tx
     */
    const common = Common.forCustomChain(
      'mainnet',
      {
        name: 'bnb',
        chainId: defaultConfig.BNB_CHAIN_ID,
      },
      'petersburg',
    );

    const tx = new EthereumTx(trx, {common});
    tx.sign(Buffer.Buffer.from(txPayload.private_key, 'hex'));

    /* send tx */
    const serializedTransaction = tx.serialize();
    const signedTx = await web3.eth.sendSignedTransaction(
      '0x' + serializedTransaction.toString('hex'),
    );
    console.log('Transaction Sent Successfully: ', signedTx);
    return signedTx.transactionHash;
  } catch (err) {
    console.log('Error signing bnb transaction!: ', err.response);
    throw err;
  }
}

const handleBEP20LikeTx = async (txPayload: any) => {
  try {
    const companyTxPayload = {
      to: txPayload.feeReceivingAccount,
      amount: txPayload.processingFee,
      from: txPayload.from,
      symbol: txPayload.symbol,
      private_key: txPayload.private_key,
      public_key: txPayload.public_key,
      is_bep20: txPayload.is_bep20,
      contractAbi: txPayload.contractAbi,
      contractAddress: txPayload.contractAddress,
    };
    const userTxPayload = {
      to: txPayload.to,
      amount: txPayload.amount,
      from: txPayload.from,
      symbol: txPayload.symbol,
      private_key: txPayload.private_key,
      public_key: txPayload.public_key,
      is_bep20: txPayload.is_bep20,
      contractAbi: txPayload.contractAbi,
      contractAddress: txPayload.contractAddress,
    };
    // if (Number(txPayload.processingFee) > 0) {
    //   // await bep20LikeTxToCompany(companyTxPayload);
    // }
    await bep20LikeTxToUser(userTxPayload);
  } catch (e) {
    throw e;
  }
};

export async function createAndSignBep20Tx(txPayload: any) {
  console.log(txPayload.contractAddress);
  try {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(defaultConfig.BNB_RPC),
    );
    /** add contract abi */
    let abi = txPayload.contractAbi.map((method: any) => ({...method}));
    const contract = new web3.eth.Contract(abi, txPayload.contractAddress);
    const tokenDecimal = await contract.methods.decimals().call();

    const privateKey = txPayload.private_key;
    const amount = parseFloat(txPayload.amount);
    const amountInWei = String(amount * Math.pow(10, Number(tokenDecimal)));
    const currentBalance = await contract.methods
      .balanceOf(txPayload.from)
      .call();

    const gasTxObject = {
      from: txPayload.from,
      to: txPayload.contractAddress,
      data: contract.methods.transfer(txPayload.to, amountInWei).encodeABI(),
    };
    const gasLimit = await contract.methods
      .transfer(txPayload.to, amountInWei)
      .estimateGas(gasTxObject); // the transaction object

    if (Number(currentBalance) < Number(amountInWei)) {
      throw new Error('Insufficient token balance');
    }
    const txCount = await web3.eth.getTransactionCount(txPayload.from);
    const txObject = {
      from: txPayload.from,
      nonce: web3.utils.toHex(txCount),
      gasLimit: gasLimit,
      gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
      to: txPayload.contractAddress,
      data: contract.methods.transfer(txPayload.to, amountInWei).encodeABI(),
    };

    const tx = new EthereumTx(txObject, {
      chain: {
        name: 'Smart Chain',
        networkId: defaultConfig.BNB_CHAIN_ID,
        chainId: defaultConfig.BNB_CHAIN_ID,
        url: defaultConfig.BNB_RPC,
        genesis: '',
        hardforks: 'petersburg',
        bootstrapNodes: '',
      },
    });
    tx.sign(Buffer.Buffer.from(privateKey, 'hex'));
    const serializedTx = tx.serialize();
    const rawTx = '0x' + serializedTx.toString('hex');
    const receipt = await web3.eth.sendSignedTransaction(rawTx);
    console.log('Transaction Successful', receipt);
    return receipt.transactionHash;
  } catch (err) {
    throw err;
  }
}

const bep20LikeTxToUser = async (txPayload: any) => {
  try {
    console.log(`Running User bep20 for {${txPayload.symbol}}`);
    const txHash = await createAndSignBep20Tx(txPayload);
    await submitBnbLikeTx(txHash!, txPayload);
  } catch (e) {
    throw e;
  }
};

const submitBnbLikeTx = async (txHash: string, txPayload: any) => {
  try {
    await axios({
      method: 'post',
      url: `${defaultConfig.API_URL}/transaction/monitorTx`,
      data: {
        txHash,
        coinSymbol: txPayload.symbol,
      },
    });
    console.log('\x1b[32m', 'Tx Hash Submitted Successfully!');
  } catch (e) {
    console.log('Error Submiting the Transaction:', e);
    throw e;
  }
};

const handleEthLikeTx = async (txPayload: any) => {
  try {
    const companyTxPayload = {
      to: txPayload.feeReceivingAccount,
      amount: txPayload.processingFee,
      from: txPayload.from,
      symbol: txPayload.symbol,
      private_key: txPayload.private_key,
      public_key: txPayload.public_key,
      is_erc20: txPayload.is_erc20,
    };
    const userTxPayload = {
      to: txPayload.to,
      amount: txPayload.amount,
      from: txPayload.from,
      symbol: txPayload.symbol,
      private_key: txPayload.private_key,
      public_key: txPayload.public_key,
      is_erc20: txPayload.is_erc20,
    };
    // if (Number(txPayload.processingFee) > 0) {
    //   await EthLikeTxToCompany(companyTxPayload);
    // }
    await EthLikeTxToUser(userTxPayload);
  } catch (e) {
    throw e;
  }
};

const EthLikeTxToUser = async (txPayload: any) => {
  try {
    console.log(`Running handleEthLikeTx for {${txPayload.symbol}}`);
    const createdTx = await createEthLikeTx(txPayload);
    const txHash = await signEthLikeTx(txPayload.private_key, createdTx);
    await submitEthLikeTx(txHash, txPayload);
  } catch (e) {
    throw e;
  }
};

const EthLikeTxToCompany = async (txPayload: any) => {
  try {
    console.log(`Running handleEthLikeTx for {${txPayload.symbol}}`);
    const createdTx = await createEthLikeTx(txPayload);
    const txHash = await signEthLikeTx(txPayload.private_key, createdTx);
    await submitEthLikeTx(txHash, txPayload);
  } catch (e) {
    throw e;
  }
};

async function createEthLikeTx(txPayload: any) {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(defaultConfig.INFURA_URL),
  );
  const nonce = await web3.eth.getTransactionCount(txPayload.from);
  const balance = await web3.eth.getBalance(txPayload.from);
  console.log('Balance against address: ', balance);
  /* get gas prices */
  const gasPrices = await getCurrentGasPrices();
  /* create tx payload */
  const trx = {
    to: txPayload.to,
    value: web3.utils.toHex(
      web3.utils.toWei(txPayload.amount?.toString(), 'ether'),
    ),
    gas: 21000,
    gasPrice: gasPrices.low * 1000000000,
    nonce: nonce,
    chainId: defaultConfig.CHAIN_ID, // EIP 155 chainId - mainnet: 1, rinkeby: 4
  };
  console.log('\x1b[32m', 'ETH Transaction created:', trx);
  return trx;
}

const handleErc20LikeTx = async (txPayload: any) => {
  try {
    const companyTxPayload = {
      to: txPayload.feeReceivingAccount,
      amount: txPayload.processingFee,
      from: txPayload.from,
      symbol: txPayload.symbol,
      private_key: txPayload.private_key,
      public_key: txPayload.public_key,
      is_erc20: txPayload.is_erc20,
      contractAbi: txPayload.contractAbi,
      contractAddress: txPayload.contractAddress,
    };
    const userTxPayload = {
      to: txPayload.to,
      amount: String(txPayload.amount),
      from: txPayload.from,
      symbol: txPayload.symbol,
      private_key: txPayload.private_key,
      public_key: txPayload.public_key,
      is_erc20: txPayload.is_erc20,
      contractAbi: txPayload.contractAbi,
      contractAddress: txPayload.contractAddress,
    };
    // if (Number(txPayload.processingFee) > 0) {
    //   await Erc20LikeTxToCompany(companyTxPayload);
    // }
    await Erc20LikeTxToUser(userTxPayload);
  } catch (e) {
    throw e;
  }
};

const Erc20LikeTxToUser = async (txPayload: any) => {
  try {
    console.log(`Running handleErc20LikeTx for {${txPayload.symbol}}`);
    const createdTx = await createErc20LikeTx(txPayload);
    const txHash = await signEthLikeTx(txPayload.private_key, createdTx);
    await submitEthLikeTx(txHash, txPayload);
  } catch (e) {
    throw e;
  }
};

const Erc20LikeTxToCompany = async (txPayload: any) => {
  try {
    console.log(`Running handleErc20LikeTx for {${txPayload.symbol}}`);
    const createdTx = await createErc20LikeTx(txPayload);
    const txHash = await signEthLikeTx(txPayload.private_key, createdTx);
    await submitEthLikeTx(txHash, txPayload);
  } catch (e) {
    throw e;
  }
};

async function createErc20LikeTx(txPayload: any) {
  try {
    let web3 = new Web3(
      new Web3.providers.HttpProvider(defaultConfig.INFURA_URL),
    );

    const gasPrices = await getCurrentGasPrices();

    const nonce = await web3.eth.getTransactionCount(
      web3.utils.toChecksumAddress(txPayload.from),
    );
    let abi = txPayload.contractAbi.map((method: any) => ({...method}));
    const contract = new web3.eth.Contract(abi, txPayload.contractAddress, {
      from: txPayload.from,
    });
    const trx = {
      from: web3.utils.toChecksumAddress(txPayload.from),
      to: txPayload.contractAddress,
      data: contract.methods
        .transfer(
          txPayload.to,
          web3.utils.toWei(txPayload.amount.toString(), 'ether'),
        )
        .encodeABI(),
      // value: web3.utils.toHex(web3.utils.toWei(txPayload.amount, 'ether')),
      gas: 80000,
      gasPrice: gasPrices.low * 1000000000,
      nonce: nonce,
      chainId: defaultConfig.CHAIN_ID, // EIP 155 chainId - mainnet: 1, rinkeby: 4
    };
    console.log('\x1b[32m', 'Eth Transaction Created:', trx);
    return trx;
  } catch (error) {
    console.log('Error creating erc20 like Tx:', error);
    throw error;
  }
}

const signEthLikeTx = async (privateKey: string, trx: any) => {
  try {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(defaultConfig.INFURA_URL),
    );
    /* sign tx */
    const transaction = new EthereumTx(trx, {chain: defaultConfig.CHAIN_ID});
    transaction.sign(Buffer.Buffer.from(privateKey, 'hex'));
    /* send tx */
    const serializedTransaction = transaction.serialize();
    const signedTx = await web3.eth.sendSignedTransaction(
      '0x' + serializedTransaction.toString('hex'),
    );
    console.log('\x1b[32m', 'Transaction signed:', signedTx.transactionHash);
    return signedTx.transactionHash;
  } catch (error) {
    throw 'Insuffient funds';
  }
};

const submitEthLikeTx = async (txHash: string, txPayload: any) => {
  try {
    await axios({
      method: 'post',
      url: `${defaultConfig.API_URL}/transaction/monitorTx`,
      data: {
        txHash,
        coinSymbol: txPayload.symbol,
      },
    });
    console.log('\x1b[32m', 'Tx Hash Submitted Successfully!');
  } catch (e) {
    console.log('Error Submiting the Transaction:', e);
    throw e;
  }
};

async function getCurrentGasPrices() {
  try {
    const response = await axios.get(defaultConfig.ETH_GAS_API);
    const prices = {
      low: response.data.safeLow / 10,
      medium: response.data.average / 10,
      high: response.data.fast / 10,
    };
    return prices;
  } catch (error) {
    console.log('Error getting gas fees:', error);
  }
}

export const handleBtcLikeTx = async (txPayload: any) => {
  try {
    const companyTxPayload = {
      to: txPayload.feeReceivingAccount,
      amount: txPayload.processingFee,
      from: txPayload.from,
      symbol: txPayload.symbol,
      private_key: txPayload.private_key,
      public_key: txPayload.public_key,
      is_erc20: txPayload.is_erc20,
    };
    const userTxPayload = {
      to: txPayload.to,
      amount: txPayload.amount,
      from: txPayload.from,
      symbol: txPayload.symbol,
      private_key: txPayload.private_key,
      public_key: txPayload.public_key,
      is_erc20: txPayload.is_erc20,
    };
    // if (Number(txPayload.processingFee) > 0) {
    //   await BtcLikeTxToCompany(companyTxPayload);
    // }
    await BtcLikeTxToUser(userTxPayload);
  } catch (e) {
    throw e;
  }
};

const BtcLikeTxToUser = async (txPayload: any) => {
  try {
    const createdTx = await createBtcLikeTx(txPayload);
    console.log('createdTx', createdTx);
    const signedTx = await signBtcLikeTx(createdTx, txPayload.private_key);
    const submittedTx = await submitBtcLikeTx(signedTx, txPayload.symbol);
    console.log('submittedTx: ', submittedTx);
  } catch (e) {
    throw e;
  }
};

export const BtcLikeTxToCompany = async (txPayload: any) => {
  try {
    const createdTx = await createBtcLikeTx(txPayload);
    console.log('createdTx', createdTx);
    const signedTx = await signBtcLikeTx(createdTx, txPayload.private_key);
    const submittedTx = await submitBtcLikeTx(signedTx, txPayload.symbol);
    console.log('submittedTx: ', submittedTx);
  } catch (e) {
    throw e;
  }
};

const createBtcLikeTx = async (txPayload: any) => {
  const createdTx = await axios({
    method: 'post',
    url: `${defaultConfig.API_URL}/transaction/btctest/send`,
    data: {
      to: txPayload.to,
      from: txPayload.from,
      amount: parseFloat(txPayload.amount) * 1000000000,
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      throw e;
    });

  return createdTx;
};

export const signBtcLikeTx = (
  tx: any,
  privateKey: string,
): {pubKeys: string[]; signatures: string[]} => {
  const keys = ECPair?.fromPrivateKey(Buffer.Buffer.from(privateKey, 'hex'));
  const pubKeys: string[] = [];
  const signatures = tx.tosign.map((toSign: string) => {
    pubKeys.push(keys.publicKey.toString('hex'));
    const signature = keys.sign(Buffer.Buffer.from(toSign, 'hex'));
    const encodedSignature = script.signature.encode(
      signature,
      Transaction.SIGHASH_ALL,
    );
    return encodedSignature.toString('hex').slice(0, -2);
  });

  return {pubKeys, signatures, ...tx};
};

export const submitBtcLikeTx = async (signedTx: any, symbol: any) => {
  const submittedTx = await axios({
    method: 'post',
    url: `${defaultConfig.API_URL}/transaction/${symbol}/submit`,
    data: signedTx,
  })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
    });
  return submittedTx;
};

export const getCoinBalance = async (body: {
  coinSymbol: string;
  address: string;
}) =>
  axios.get(
    `${defaultConfig.API_URL}/wallet/balance/${body.coinSymbol}/${body.address}`,
  );

export const updateCoinRates = async (wallet: Coin[], currency: string) => {
  for (let index = 0; index < wallet.length; index++) {
    const asset: Coin = wallet[index];
    await checkRate(asset.coin_symbol, currency, asset.index);
  }
};

export const updateCoinBalance = async (params: {
  coinSymbol: string;
  address: string;
  wallet: Coin[];
}) => {
  try {
    let coin = params.wallet.find(c => c.coin_symbol === params.coinSymbol);
    //Get Balance
    const res = await getCoinBalance({
      coinSymbol: params.coinSymbol,
      address: params.address,
    });
    //Update Balance for that Coin
    store.dispatch(
      setCoinBalance({
        index: coin?.index,
        balance: res.data.balance,
        vs_currency_balance: res.data.vs_currency_balance,
      }),
    );
  } catch (error) {
    console.log('Error while updating the balance:', error);
  }
};

export const getWallets = async () => {
  const {wallet} = store.getState().wallet;
  try {
    const coinList = await getCoinsList();

    if (wallet.length < coinList.data.length) {
      const sortedCoinList = await coinList.data.sort((a: any, b: any) =>
        a.orderIndex > b.orderIndex ? 1 : -1,
      );
      const coinListForWalletGeneration = sortedCoinList.map(
        (coin: any, index: number) => {
          return {
            index: index,
            coin_symbol: coin.coinSymbol,
            coin_name: coin.name,
            order_index: coin.orderIndex,
            is_active: true,
            is_erc20: coin.isErc20 ? 1 : 0,
            is_bep20: coin.isBep20 ? 1 : 0,
            icon: coin.icon,
            balance: 0,
            isMarketDataAvailable: coin.isMarketDataAvailable,
            coin_color: coin.coinColor,
            processingFee: coin.processingFee,
            feeReceivingAccount: coin.feeReceivingAccount,
            blockchain: coin.blockchain,
            contractAddress: coin.contractAddress,
            contractAbi: coin.contractAbi,
          };
        },
      );
      store.dispatch(setWallet(coinListForWalletGeneration));
      return coinListForWalletGeneration;
    } else {
      return wallet;
    }
  } catch (error) {
    store.dispatch(setWalletLoading(false));
    Toast.show({
      text1: 'Error',
      text2:
        'Unable to perform the request at the moment. Please try again later',
      type: 'error',
    });
    console.log('Error render active assets:', error);
    throw error;
  }
};

export const setCoinsPublicInfo = async (payload: PublicInfoPayload[]) =>
  await axios.post(`${defaultConfig.API_URL}/wallet/publicinfo`, payload);

export const createBTCWallet = (mnemonic: string) => {
  console.log('--craete btc wallet called--');

  var root = new BIP84.fromSeed(mnemonic);
  var child0 = root.deriveAccount(0);

  console.log('mnemonic:', mnemonic);
  console.log('rootpriv:', root.getRootPrivateKey());
  console.log('rootpub:', root.getRootPublicKey());
  console.log('\n');

  var account0 = new BIP84.fromZPrv(child0);

  console.log("Account 0, root = m/84'/0'/0'");
  console.log('Account 0 xprv:', account0.getAccountPrivateKey());
  console.log('Account 0 xpub:', account0.getAccountPublicKey());
  console.log('\n');

  console.log("Account 0, first receiving address = m/84'/0'/0'/0/0");
  console.log('Prvkey:', account0.getPrivateKey(0));
  console.log('Pubkey:', account0.getPublicKey(0));
  console.log('Address:', account0.getAddress(0));
  console.log('\n');
};

export const getAllCoinsBalances = async (body: {
  currencyCode: string;
  walletsInfo: {coinSymbol: string; address: string}[];
}) => axios.post(`${defaultConfig.API_URL}/wallet/balance`, body);
