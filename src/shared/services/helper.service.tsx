import Toast from 'react-native-simple-toast';
import {Dimensions} from 'react-native';
import Share from 'react-native-share';
import ImagePicker from 'react-native-image-crop-picker';
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

export const handleImageSelection = (type: 'camera' | 'gallery') => {
  console.log(type);
  return new Promise((resolve: any, reject: any) => {
    try {
      type == 'camera'
        ? ImagePicker.openCamera({
            cropping: false,
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
            cropping: false,
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

// export const animateToCurrentLocation = mapRef => {
//   Geolocation.getCurrentPosition(
//     info => {
//       const {latitude, longitude} = info.coords;
//       mapRef?.current.animateToRegion(
//         {
//           latitude,
//           longitude,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA,
//         },
//         1000,
//       );
//     },
//     err => console.error(err),
//     GEO_LOC_OPTIONS,
//   );
// };
