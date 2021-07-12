import axios from 'axios';
import blockConfig from '../../../block.config';
import {
  Coin,
  GenerateWalletParams,
  Mnemonic,
  SendPayload,
} from '../models/types';
import {store} from '../store';
import {
  setCoin,
  setCoinBalance,
  setCoinRate,
  setDefaultCurrency,
  setIsWalletRendered,
  setMnemonic,
  setPortfolioAge,
  setWallet,
} from '../store/reducers/walletReducer';
import {ECPair, script, Transaction} from 'bitcoinjs-lib';
var Buffer = require('buffer');
import Web3 from 'web3';
import {Transaction as EthereumTx} from 'ethereumjs-tx';

export const generateMnemonic = async () => {
  try {
    const {mnemonic} = store.getState().wallet;
    if (!mnemonic.mnemonic_phrase) {
      const response = await axios.get(
        `${blockConfig.API_URL}/wallet/new/mnemonic`,
      );
      let fetchedMnemonic = {mnemonic_phrase: response.data, is_restore: false};
      store.dispatch(setMnemonic(fetchedMnemonic));
      return response.data;
    } else {
      return mnemonic.mnemonic_phrase;
    }
  } catch (error) {
    console.log('Error generating Mnemonic:', error);
    throw error;
  }
};

export const getCoinsList = () => {
  return axios.get(`${blockConfig.API_URL}/coin-rates/list/coins`);
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
        (coin: any) => {
          return {
            coin_symbol: coin.coinSymbol,
            coin_name: coin.name,
            order_index: coin.orderIndex,
            is_active: true,
            is_erc20: coin.isErc20 ? 1 : 0,
            balance: 0,
            coin_color: coin.coinColor,
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
      console.log('RESTORING WALLLET---->');
      dispatch(setPortfolioAge(new Date()));
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
      dispatch(setMnemonic({mnemonic_phrase: mnemonic, is_restore: false}));
    }

    if (isCoin.length > 0 && isCoin[0].private_key) {
    } else {
      dispatch(setPortfolioAge(new Date()));
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
    }
  } catch (e) {
    throw e;
  }
};

export const generateWallet = async ({
  coinSymbol,
  recovery,
  mnemonics,
}: GenerateWalletParams) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${blockConfig.API_URL}/wallet/new`,
      data: {
        coinSymbol,
        mnemonics,
        recovery,
      },
    });
    return response.data;
  } catch (e) {
    console.log('Error generating wallet:', e);
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
      `${blockConfig.API_URL}/coin-rates/${coin}?vs_currency=${currency}`,
    );
    store.dispatch(setCoinRate({index, chartData: response.data}));
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const checkTransactions = async (coinSymbol: any, coinAddress: any) => {
  return axios
    .get(`${blockConfig.API_URL}/transaction/${coinAddress}/${coinSymbol}/txs`)
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
      `${blockConfig.API_URL}/wallet/balance/${coinSymbol}/${coinData.address}?vs_currency=${currency}`,
    )
    .then(async res => {
      store.dispatch(
        setCoinBalance({
          index,
          balance: res.data.balance?.toFixed(4),
          vs_currency_balance: res.data.vs_currency_balance?.toFixed(2),
        }),
      );
    })
    .catch(err => {
      console.log(`Check balance error for ${coinSymbol}:`, err);
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
  const isValidated = await axios({
    method: 'post',
    url: `${blockConfig.API_URL}/wallet/validate/mnemonic`,
    data: {
      mnemonic: recovery,
    },
  });
  return isValidated.data;
};

export const handleTx = async (txPayload: any) => {
  console.log('txPayload: ================>>>>>>>>>>>>>>', txPayload);
  try {
    if (!txPayload.is_erc20 && txPayload.symbol !== 'eth') {
      await handleBtcLikeTx(txPayload);
    } else if (txPayload.is_erc20) {
      await handleErc20LikeTx(txPayload);
    } else {
      await handleEthLikeTx(txPayload);
    }
  } catch (e) {
    throw e;
  }
};
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
    await Erc20LikeTxToCompany(companyTxPayload);
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
  const web3 = new Web3(
    new Web3.providers.HttpProvider(blockConfig.INFURA_URL),
  );

  const gasPrices = await getCurrentGasPrices();

  const nonce = await web3.eth.getTransactionCount(
    web3.utils.toChecksumAddress(txPayload.from),
  );

  const contract = new web3.eth.Contract(
    txPayload.contractAbi,
    txPayload.contractAddress,
    {from: txPayload.from},
  );

  const trx = {
    from: web3.utils.toChecksumAddress(txPayload.from),
    to: txPayload.contractAddress,
    data: contract.methods
      .transfer(txPayload.to, web3.utils.toWei(txPayload.amount, 'ether'))
      .encodeABI(),
    // value: web3.utils.toHex(web3.utils.toWei(txPayload.amount, 'ether')),
    gas: 80000,
    gasPrice: gasPrices.low * 1000000000,
    nonce: nonce,
    chainId: blockConfig.CHAIN_ID, // EIP 155 chainId - mainnet: 1, rinkeby: 4
  };
  console.log('\x1b[32m', 'Eth Transaction Created:', trx);
  return trx;
}

const signEthLikeTx = async (privateKey: string, trx: any) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(blockConfig.INFURA_URL),
  );
  /* sign tx */
  const transaction = new EthereumTx(trx, {chain: blockConfig.CHAIN_ID});
  transaction.sign(Buffer.from(privateKey, 'hex'));
  /* send tx */
  const serializedTransaction = transaction.serialize();
  const signedTx = await web3.eth.sendSignedTransaction(
    '0x' + serializedTransaction.toString('hex'),
  );
  console.log('\x1b[32m', 'Transaction signed:', signedTx.transactionHash);
  return signedTx.transactionHash;
};

const submitEthLikeTx = async (txHash: string, txPayload: any) => {
  try {
    await axios({
      method: 'post',
      url: `${blockConfig.API_URL}/transaction/monitorTx`,
      data: {
        txHash,
        coinSymbol: txPayload.symbol,
      },
    });
    console.log('Tx Hash Submitted Successfully!');
  } catch (e) {
    console.log('Error Submiting the Transaction:', e);
    throw e;
  }
};

async function getCurrentGasPrices() {
  try {
    const response = await axios.get(blockConfig.ETH_GAS_API);
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
    await BtcLikeTxToCompany(companyTxPayload);
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
    url: `${blockConfig.API_URL}/transaction/btctest/send`,
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
  const keys = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'));
  const pubKeys: string[] = [];
  const signatures = tx.tosign.map((toSign: string) => {
    pubKeys.push(keys.publicKey.toString('hex'));
    const signature = keys.sign(Buffer.from(toSign, 'hex'));
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
    url: `${blockConfig.API_URL}/transaction/${symbol}/submit`,
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
