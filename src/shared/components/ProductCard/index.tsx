import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {THEME} from '../../theme';
import {HP, RF, WP} from '../../theme/responsive';
import FastImage, {FastImageProps, Source} from 'react-native-fast-image';

interface Props extends TouchableOpacityProps {
  imageURI?: string;
  imageSource?: Source | number;
  name: string;
  price: string;
}

const ProductCard = (props: Props) => {
  const PRODUCT_IMAGE = props.imageSource
    ? props.imageSource
    : {uri: props.imageURI};
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <>
        <FastImage
          style={styles.image}
          source={PRODUCT_IMAGE}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text numberOfLines={1} style={styles.name}>
          {props.name}
        </Text>
        <Text style={styles.price}>${props.price}</Text>
      </>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: RF(12),
    padding: THEME.PADDING.LOW,
    flex: 1,
    marginHorizontal: THEME.MARGIN.VERYLOW,
  },
  image: {
    width: RF(75),
    height: RF(75),
    alignSelf: 'center',
    borderRadius: RF(12),
    marginBottom: THEME.MARGIN.LOW,
  },
  name: {
    fontSize: THEME.FONTS.SIZE.XSMALL,
    color: THEME.COLORS.textLight,
  },
  price: {
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    color: THEME.COLORS.white,
  },
});
