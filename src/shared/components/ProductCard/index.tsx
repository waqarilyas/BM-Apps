import React, {useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
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
  const [loading, setLoading] = useState(false);

  return (
    <>
      <TouchableOpacity {...props} style={styles.container}>
        <>
          <FastImage
            style={styles.image}
            source={{uri: props.imageURI}}
            resizeMode={FastImage.resizeMode.cover}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
          <Text numberOfLines={1} style={styles.name}>
            {props.name}
          </Text>
          <Text style={styles.price}>${props.price}</Text>
        </>
        {loading && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="small" color={THEME.COLORS.accentBlue} />
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: RF(12),
    padding: THEME.PADDING.LOW,
    // flex: 1,
    marginHorizontal: THEME.MARGIN.VERYLOW,
    height: RF(90),
    width: RF(100),
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
    textAlign: 'center',
  },
  price: {
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    color: THEME.COLORS.white,
    textAlign: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
