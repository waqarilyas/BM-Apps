import Toast from 'react-native-simple-toast';
import {Dimensions} from 'react-native';
import Share from 'react-native-share';
import {store} from '../store';

export const getWidth = () => {
  return Dimensions.get('window').width;
};

export const AppShowToast = (msg: string) => {
  Toast.show(msg);
};

export const AppShareContent = (data: any, title: string) => {
  Share.open({message: data, title})
    .then(res => {
      // console.log(res)
    })
    .catch(err => {
      console.log(err);
    });
};

export const getFixedAmount = (amount: number) => {
  return amount.toFixed(amount > 10 ? 2 : 6);
};

export const getPairPrice = ({basePrice, counterPrice}: any) => {
  let result = (1 / basePrice) * counterPrice;
  return result.toFixed(8);
};

export const getERC20NetworkFee = (
  coinRate: number,
  ethRate: number,
  fee: number,
) => {
  let result = (1 / coinRate) * ethRate * fee;
  return result.toFixed(8);
};
