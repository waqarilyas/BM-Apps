import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import {THEME} from '../../theme';
import {HP, RF, WP} from '../../theme/responsive';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const Logo = (props: Props) => {
  return (
    <View style={[styles.container, props.style]}>
      <FastImage
        source={ICONS.LOGO}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    width: WP(45),
    height: HP(20),
    alignSelf: 'center',
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
