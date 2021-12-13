import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {ImageSource} from 'react-native-vector-icons/Icon';

import {HP, RF} from '../../theme/responsive';

import {ANIMATIONS} from '../../../assets';
import {THEME} from '../../theme';

const CustomAnimations = ({
  visible,
  animation,
  uploadProgress,
  title,
}: {
  visible: boolean;
  animation?: ImageSource;
  uploadProgress?: number;
  title: string;
}) => {
  return (
    <>
      {visible ? (
        <View style={styles.mainContainer}>
          <View style={styles.animationView}>
            {/* <LottieView
              source={animation}
              autoPlay
              loop
              style={styles.animation}
            /> */}

            <Text style={styles.title}>{title}!</Text>
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
  title: {
    fontSize: RF(26),
    color: THEME.COLORS.white,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default CustomAnimations;
