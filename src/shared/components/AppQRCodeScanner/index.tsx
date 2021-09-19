import React from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';
import Modal from 'react-native-modal';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ICONS} from '../../../assets';
import FastImage from 'react-native-fast-image';
import AppHeader from '../AppHeader';
import {RF} from '../../theme/responsive';
import L from '../../utils/LanguageHandler';

interface Props {
  isVisible: boolean;
  callBack: (text: string) => void;
}

const AppQRCodeScanner = (props: Props) => {
  const window = useWindowDimensions();

  function onSuccess(e: BarCodeReadEvent) {
    if (e) {
      props.callBack(e?.data || '');
    }
  }
  return (
    <Modal
      style={{margin: 0}}
      backdropOpacity={0.85}
      isVisible={props.isVisible}>
      <SafeAreaView style={styles.container}>
        <AppHeader
          showBack
          title={L('QR Scanner')}
          backAction={() => props.callBack('')}
          headerStyle={{
            height: RF(Platform.OS === 'ios' ? 60 : 80),
            zIndex: 20,
          }}
        />
        <QRCodeScanner
          onRead={onSuccess}
          cameraStyle={{
            width: window.width,
            height: window.height,
            alignSelf: 'center',
          }}
        />
        <FastImage
          source={ICONS.QR_OVERLAY}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            width: window.width,
            height: window.height,
            position: 'absolute',
            top: RF(Platform.OS == 'ios' ? 40 : 80),
            zIndex: 10,
            // zIndex: -100,
            // alignSelf: 'center',
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default AppQRCodeScanner;

const styles = StyleSheet.create({
  container: {flex: 1},
});
