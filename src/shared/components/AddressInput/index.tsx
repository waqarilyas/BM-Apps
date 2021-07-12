import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextInputProps,
  View,
  TouchableOpacity,
} from 'react-native';
import {THEME} from '../../theme';
import {HP, RF, WP} from '../../theme/responsive';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import Clipboard from '@react-native-clipboard/clipboard';
import {AppShowToast} from '../../services/helper.service';
import AppQRCodeScanner from '../AppQRCodeScanner';

interface Props extends TextInputProps {
  inputStyle?: StyleProp<TextStyle>;
  onChangeAddress: (text: string) => void;
}

const AddressInput = (props: Props) => {
  const onPressPaste = async () => {
    AppShowToast('Pasted');
    let text = await Clipboard.getString();
    props.onChangeAddress(text);
  };

  const [showScanner, setShowScanner] = useState(false);

  const scannerCallBack = (address: string) => {
    setShowScanner(false);
    props.onChangeAddress(address);
  };
  return (
    <View style={[styles.container, props.inputStyle]}>
      <AppQRCodeScanner isVisible={showScanner} callBack={scannerCallBack} />
      <TextInput
        {...props}
        placeholderTextColor={THEME.COLORS.textLight}
        style={styles.inputContainer}
        selectionColor={THEME.COLORS.white}
      />
      <TouchableOpacity onPress={onPressPaste}>
        <FastImage
          source={ICONS.PASTE_BUTTON}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.paste}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowScanner(true)}>
        <FastImage
          source={ICONS.QR_BUTTON}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.scan}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddressInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: HP(6),
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: RF(30),
    paddingHorizontal: RF(16),
  },
  inputContainer: {
    flex: 1,
    alignSelf: 'center',
    height: HP(6),
    color: THEME.COLORS.white,
    paddingHorizontal: THEME.PADDING.LOW,
  },
  paste: {
    width: RF(60),
    height: '100%',
    marginRight: THEME.MARGIN.NORMAL,
  },
  scan: {width: RF(20), height: '100%'},
});
