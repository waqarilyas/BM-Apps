import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';
import Modal from 'react-native-modal';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ICONS} from '../../../assets';
import {RF} from '../../theme/responsive';
import FastImage from 'react-native-fast-image';

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
    <Modal backdropOpacity={0.85} isVisible={props.isVisible}>
      <ImageBackground source={ICONS.QR_OVERLAY} style={styles.container}>
        <QRCodeScanner
          onRead={onSuccess}
          reactivate={true}
          cameraStyle={{
            height: window.height,
            width: window.width,
            alignSelf: 'center',
          }}
          reactivateTimeout={2}
        />
        <FastImage
          source={ICONS.QR_OVERLAY}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: window.width,
            height: window.height,
            alignSelf: 'center',
          }}
        />
      </ImageBackground>
    </Modal>
  );
};

export default AppQRCodeScanner;

const styles = StyleSheet.create({
  container: {flex: 1},
});
