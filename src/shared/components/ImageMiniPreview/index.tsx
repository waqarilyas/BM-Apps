import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {THEME} from '../../theme';
import {RF} from '../../theme/responsive';

interface Props extends FastImageProps {
  onPress?: () => void;
}

const ImageMiniPreview = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <FastImage
        {...props}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default ImageMiniPreview;

const styles = StyleSheet.create({
  container: {
    borderRadius: THEME.RADIUS.BOX,
    width: RF(93),
    height: RF(93),
    overflow: 'hidden',
    marginRight: THEME.MARGIN.NORMAL,
  },
  image: {width: '100%', height: '100%'},
});
