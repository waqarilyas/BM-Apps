import Toast from 'react-native-simple-toast';
import {Dimensions} from 'react-native';

export const getWidth = () => {
  return Dimensions.get('window').width;
};

export const AppShowToast = (msg: string) => {
  Toast.show(msg);
};
