import axios from 'axios';
import {Coin, NetworkFeeEntity} from '../models/types';
import {
  convertBTCtoSatoshi,
  convertSatoshiToBtc,
  getUtxos,
} from './bitcoin.service';

interface TXPayload {
  to: string;
  amount: number;
  from: string;
  data?: string;
  private_key?: string;
}

//------------ START BTC Feees -----------------//

export const getBTCNetworkFees = async (
  coin: Coin,
  txPayload: TXPayload,
): Promise<NetworkFeeEntity | undefined> => {
  const {utxos, finalBalance, unconfirmedBalance} = await getUtxos(
    'btc',
    'main',
    txPayload.from,
  );
  let amount = convertBTCtoSatoshi(+txPayload.amount);
  let noOfUtxoInputs = await getFinalNoOfUTXOInputs(
    txPayload,
    2000,
    amount,
    utxos,
    finalBalance,
    unconfirmedBalance,
  );
  let minerFeeInSatoshi = await calculateMinerFee(noOfUtxoInputs);
  let minerFee = convertSatoshiToBtc(minerFeeInSatoshi);
  console.log('MINER FEE:', minerFee);
  let minerFeeInFiat = Number(minerFee) * Number(coin.chart_data.rate);
  return {networkFee: minerFee, networkFeeFiat: minerFeeInFiat};
};

const calculateMinerFee = async (numberOfInput: number = 1) => {
  try {
    const txInBytes = numberOfInput * 180 + 2 * 34 + 10 + 2;
    const res = await axios.get(`https://api.blockcypher.com/v1/btc/main`);
    const averageFee = res.data.medium_fee_per_kb;
    const averageFeePerByte = averageFee / 1024;
    console.log('averageFee  =>', txInBytes * averageFeePerByte);
    return parseInt(String(txInBytes * averageFeePerByte));
  } catch (e) {
    throw e;
  }
};

const getFinalNoOfUTXOInputs = async (
  txPayload: TXPayload,
  minerFee: number,
  amount: number,
  utxos: any[],
  finalBalance: number,
  unconfirmedBalance: number,
) => {
  if (finalBalance < Number(amount) + minerFee) {
    throw new Error('Insufficient balance for Transaction');
  }
  const {noOfUtxoInputs, utxoBalance} = await calculateNoOfUTXOInputs(
    amount,
    utxos,
    minerFee,
    unconfirmedBalance,
  );
  let minerFeeInSatoshi = await calculateMinerFee(noOfUtxoInputs);
  if (utxoBalance > amount + minerFeeInSatoshi) {
    return noOfUtxoInputs;
  } else {
    await getFinalNoOfUTXOInputs(
      txPayload,
      minerFeeInSatoshi,
      amount,
      utxos,
      finalBalance,
      unconfirmedBalance,
    );
  }
};

const calculateNoOfUTXOInputs = async (
  amount: number,
  utxos: any[],
  minerFee: number,
  unconfirmedBalance: number,
) => {
  let utxoBalance = 0;
  let iterator = 0; //Use to Calculate Miner Fee
  let PSBTInputs = [];

  do {
    if (iterator > utxos.length - 1)
      throw new Error('Insufficient balance in confirmated UTXO');
    utxoBalance += utxos[iterator].value;
    PSBTInputs.push(utxos[iterator].value);
    iterator++;
  } while (utxoBalance < Number(amount) + minerFee);
  if (Number(unconfirmedBalance + utxoBalance) <= Number(amount) + minerFee) {
    throw new Error(
      'There is already a transaction in queue for confirmed balances, Please wait until previous transaction is confirmed',
    );
  }
  return {noOfUtxoInputs: PSBTInputs.length, utxoBalance};
};

//------------ END BTC Feees -----------------//
