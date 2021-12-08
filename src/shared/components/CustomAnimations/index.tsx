import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {ImageSource} from 'react-native-vector-icons/Icon';

import {HP, RF} from '../../theme/responsive';

import {ANIMATIONS} from '../../../assets';

const CustomAnimations = ({
  visible,
  animation,
  uploadProgress,
}: {
  visible: boolean;
  animation?: ImageSource;
  uploadProgress?: number;
}) => {
  return (
    <>
      {visible ? (
        <View style={styles.mainContainer}>
          <View style={styles.animationView}>
            <LottieView
              source={animation}
              autoPlay
              loop
              style={styles.animation}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  animationView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    height: RF(200),
    width: '100%',
  },
  mainContainer: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomAnimations;
