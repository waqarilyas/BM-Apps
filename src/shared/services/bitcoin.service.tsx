/* eslint-disable radix */
import axios from 'axios';
import blockConfig from '../../../block.config';
import {Coin} from '../models/types';
import {store} from '../store';
var sb = require('satoshi-bitcoin');
// import bitcoin from "bitcoinjs-lib";
const bitcoin = require('bitcoinjs-lib');
import {Buffer} from 'buffer';

const convertSatoshiToBtc = (satoshis: number): number => {
  return sb.toBitcoin(satoshis);
};

const convertBTCtoSatoshi = (btc: number): number => {
  let value = sb.toSatoshi(btc);
  return Math.floor(value);
};

const convertBTCLikeToSatoshi = (
  btcLikeSymbol: string,
  amountOfBTCLike: number,
): number => {
  let btcCoin: Coin = store
    .getState()
    .wallet.wallet.find((c: Coin) => c.coin_symbol === 'btc');

  let btcLikeCoin: Coin = store
    .getState()
    .wallet.wallet.find((c: Coin) => c.coin_symbol === btcLikeSymbol);

  let btcPerDoge =
    Number(btcLikeCoin.chart_data.rate) / Number(btcCoin.chart_data.rate);
  return convertBTCtoSatoshi(btcPerDoge * amountOfBTCLike);
};

const getBlockCypherBalance = async (body: {
  symbol: string;
  address: string;
}) => {
  try {
    let res = await axios.get(
      `${blockConfig.BLOCKCYPHER_URL}/v1/${body.symbol}/main/addrs/${body.address}/balance`,
    );
    return convertSatoshiToBtc(res.data.balance);
  } catch (error) {
    console.log('Error getting blockcypher balance:', error);
    throw new Error('Error while fetching wallet data');
  }
};

const getUtxos = async (symbol: string, env: string, fromAddress: string) => {
  try {
    console.log('\ngetting utxos...');
    let url = `https://api.blockcypher.com/v1/${symbol}/${env}/addrs/${fromAddress}?unspentOnly=true`;
    const res = await axios.get(url);
    console.log('final balance of address =>', res.data.balance);
    if (res.data.txrefs) {
      let utxos = await res.data.txrefs.map((o: any) => ({
        txId: o.tx_hash,
        vout: parseInt(o.tx_output_n),
        value: parseInt(o.value),
      }));
      let unconfirmedBalance = 0;

      if (res.data.unconfirmed_txrefs) {
        let iterator = 0;
        while (iterator > res.data.unconfirmed_txrefs.length - 1) {
          unconfirmedBalance += res.data.unconfirmed_txrefs[iterator].value;
          iterator++;
        }
      }

      console.log('utxos =>', utxos);
      return {utxos, finalBalance: res.data.balance, unconfirmedBalance};
    } else {
      throw new Error('Transaction failed due to low balance');
    }
  } catch (e) {
    throw e;
  }
};

const broadcastTx = async (rawTx: any) => {
  try {
    console.log('\nbroadcasting raw transaction...');
    const res = await axios.post(
      'https://api.blockcypher.com/v1/btc/main/txs/push',
      {
        tx: rawTx,
      },
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

const BTCSegwitLikeTX = async (txPayload: any) => {
  try {
    const {utxos, finalBalance, unconfirmedBalance} = await getUtxos(
      'btc',
      'main',
      txPayload.from,
    );
    if (utxos) {
      let minerFee = parseInt(
        String(convertBTCtoSatoshi(Number(store.getState().wallet.btc_fee))),
      );
      let amount = convertBTCtoSatoshi(+txPayload.amount);

      if (finalBalance - (amount + Number(minerFee)) >= 0) {
        if (finalBalance + unconfirmedBalance < amount + minerFee) {
          throw new Error(
            'There is already a transaction in queue for confirmed balance, Please wait until previous transaction is confirmed',
          );
        }
        const network = bitcoin.networks.bitcoin;
        const keyPair = bitcoin.ECPair.fromWIF(txPayload.private_key, network);
        const p2wpkhFrom = bitcoin.payments.p2wpkh({
          pubkey: keyPair.publicKey,
          network,
        });
        const publicKeyHash = p2wpkhFrom.output!.toString('hex');
        //TX sum hmari total sending amount
        const psbt = new bitcoin.Psbt({network});

        let utxoBalance = 0;
        let iterator = 0; //Use to Calculate Miner Fee
        let PSBTInputs = [];
        do {
          if (iterator > utxos.length - 1) {
            throw new Error('Insufficient confirmed UTXO Balance');
          }
          utxoBalance += utxos[iterator].value;
          PSBTInputs.push({
            hash: utxos[iterator].txId,
            index: utxos[iterator].vout,
            witnessUtxo: {
              value: utxos[iterator].value,
              script: Buffer.from(publicKeyHash, 'hex'),
            },
          });
          iterator++;
          console.log('PSBT Inputs CHECK:', PSBTInputs);
        } while (utxoBalance < Number(amount) + minerFee);

        psbt.addInputs(PSBTInputs);

        psbt
          .addOutput({
            address: txPayload.to,
            value: amount,
          })
          .addOutput({
            address: txPayload.from,
            value: utxoBalance - (amount + Number(minerFee)),
          });

        psbt.signAllInputs(keyPair);
        psbt.validateSignaturesOfAllInputs();

        psbt.finalizeAllInputs();

        const rawTx = psbt.extractTransaction().toHex();
        console.log('\nrawTx =>', rawTx);
        const broadcastTxRes = await broadcastTx(rawTx);
        console.log('\nbroadcast tx response =>', broadcastTxRes);
        await submitBech32Tx({
          address: txPayload.to,
          decodedTx: broadcastTxRes.tx,
        });
        return broadcastTxRes?.tx?.hash;
      } else {
        throw new Error('Transaction failed due to Dust amount');
      }
    } else {
      throw new Error('Transaction failed due to low balance');
    }
  } catch (e: any) {
    console.log('SEGWIT ERROR:', e);
    if (e?.response?.data?.error) {
      throw e?.response.data.error;
    }
    throw e;
  }
};

const submitBech32Tx = async (body: {address: string; decodedTx: string}) => {
  try {
    await axios({
      method: 'post',
      url: `${blockConfig.API_URL}/transaction/submitTx/btc/${body.address}`,
      data: {
        tx: body.decodedTx,
      },
    });
    console.log('\x1b[32m', 'Tx Hash Submitted Successfully!');
  } catch (e) {
    console.log('Error Submiting the Transaction:', e);
    throw e;
  }
};

export {
  getUtxos,
  convertSatoshiToBtc,
  convertBTCtoSatoshi,
  getBlockCypherBalance,
  BTCSegwitLikeTX,
  convertBTCLikeToSatoshi,
};
