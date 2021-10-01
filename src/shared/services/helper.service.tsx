import Toast from 'react-native-simple-toast';
import {Dimensions, Platform, Alert} from 'react-native';
import Share from 'react-native-share';
import ImagePicker from 'react-native-image-crop-picker';
import NetInfo from '@react-native-community/netinfo';
// import Geolocation from 'react-native-geolocation-service';
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
  return amount?.toFixed(amount > 10 ? 2 : 6);
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

export const handleImageSelection = (type: 'camera' | 'gallery') => {
  console.log(type);
  return new Promise((resolve: any, reject: any) => {
    try {
      type == 'camera'
        ? ImagePicker.openCamera({
            width: 500,
            height: 500,
            cropping: true,
            includeBase64: true,
          })
            .then(image => {
              resolve(image);
            })
            .catch(err => {
              reject(err);
            })
        : type == 'gallery'
        ? ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            includeBase64: true,
          })
            .then(image => {
              resolve(image);
            })
            .catch(err => {
              reject(err);
            })
        : null;
    } catch (err) {
      console.log('--camera error--', err);
    }
  });
};

export const CheckConnectivity = () => {
  // For Android devices
  if (Platform.OS === 'android') {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        Alert.alert('You are online!');
      } else {
        Alert.alert('You are offline!');
      }
    });
  } else {
    // For iOS devices
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleFirstConnectivityChange,
    );
  }
};

const handleFirstConnectivityChange = (isConnected: any) => {
  NetInfo.isConnected.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange,
  );

  if (isConnected === false) {
    Alert.alert('You are offline!');
  } else {
    Alert.alert('You are online!');
  }
};

export const calculateTotal = (totalPrice: any | Number, tax: Number | any) => {
  return totalPrice - totalPrice * (tax / 100);
};

export const calculateTax = (price: any, tax: any) => {
  return parseFloat(price) * (parseFloat(tax) / 100);
};
