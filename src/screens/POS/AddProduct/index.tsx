import React from 'react';
import {View, Text} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {THEME} from '../../../shared/theme';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {RF} from '../../../shared/theme/responsive';
import GLOBAL_STYLE from '../../../shared/theme/global';

interface Props {}

const AddProduct = (props: Props) => {
  const openPicker = () => console.log('Open Picker');
  return (
    <>
      <AppHeader showBack title="Add Product" showCart />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <LinearGradient
            colors={[
              THEME.COLORS.gradientTopColor,
              THEME.COLORS.gradientBottomColor,
            ]}
            style={styles.cameraContainer}>
            <Icon
              onPress={openPicker}
              name="camera-outline"
              size={RF(25)}
              style={styles.cameraIcon}
            />
          </LinearGradient>
        </View>
        <AppInput placeholder="Title" />
        <AppInput placeholder="Price" />
        <AppInput placeholder="Category" />
        <PrimaryButton
          title="Save"
          buttonStyle={styles.saveButton}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
        />
      </KeyboardAwareScrollView>
    </>
  );
};

export default AddProduct;
