import React from 'react';
import {StyleSheet, View} from 'react-native';
import {THEME} from '../../theme';

const DashedLine = () => {
  return <View style={styles.container} />;
};

export default DashedLine;

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: THEME.COLORS.accentBlue,
    borderStyle: 'dashed',
  },
});
