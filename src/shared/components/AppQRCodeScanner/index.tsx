import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';
import Modal from 'react-native-modal';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ICONS} from '../../../assets';
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
      <View style={styles.container}>
        <QRCodeScanner
          onRead={onSuccess}
          cameraStyle={{
            height: window.height,
            width: window.width,
            alignSelf: 'center',
          }}
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
      </View>
    </Modal>
  );
};

export default AppQRCodeScanner;

const styles = StyleSheet.create({
  container: {flex: 1},
});
