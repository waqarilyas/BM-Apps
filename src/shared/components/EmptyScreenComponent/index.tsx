//import liraries
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {noProduct} from '../../../assets/images';
import {THEME} from '../../theme';
import {RF} from '../../theme/responsive';

const EmptyScreenComponent = ({title}: {title: string}) => {
  return (
    <View style={styles.container}>
      <FastImage source={noProduct} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.primaryBackground,
  },
  image: {
    height: RF(90),
    width: RF(90),
    resizeMode: 'contain',
    marginBottom: RF(10),
  },
  title: {
    fontSize: RF(12),
    color: THEME.COLORS.white,
  },
});

export default EmptyScreenComponent;
