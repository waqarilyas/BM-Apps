import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {RF} from '../../theme/responsive';
import FastImage from 'react-native-fast-image';
import {THEME} from '../../theme';
import ToggleSwitch from 'toggle-switch-react-native';

interface Props extends TouchableOpacityProps {
  toggle?: boolean;
}

const CoinListItem = (props: Props) => {
  const [toggle, setToggle] = useState(true);
  return (
    <TouchableOpacity activeOpacity={1} {...props}>
      <View style={styles.container}>
        <View style={styles.left}>
          <FastImage
            source={require('../../../assets/coins/BTC.png')}
            resizeMode={FastImage.resizeMode.contain}
            style={{flex: 1}}
          />
        </View>
        <View style={styles.main}>
          <Text style={styles.price}>$8,123.34</Text>
          <Text style={styles.name}>Bitcoin (BTC)</Text>
        </View>
        <View style={styles.right}>
          {props.toggle ? (
            <ToggleSwitch
              isOn={toggle}
              onColor={THEME.COLORS.green}
              offColor={THEME.COLORS.textLight}
              size="medium"
              onToggle={setToggle}
            />
          ) : (
            <Text style={styles.name}>-1.20%</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CoinListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RF(65),
    borderRadius: THEME.RADIUS.BOX,
    flexDirection: 'row',
    paddingHorizontal: THEME.PADDING.LOW,
    paddingVertical: THEME.PADDING.LOW,
    backgroundColor: THEME.COLORS.secondaryBackground,
    marginBottom: THEME.MARGIN.LOW,
  },
  left: {width: '20%', height: '100%'},
  main: {
    marginLeft: THEME.MARGIN.LOW,
    flex: 1,
    justifyContent: 'space-around',
  },
  price: {
    fontSize: THEME.FONTS.SIZE.MEDIUM,
    color: THEME.COLORS.white,
  },
  name: {fontSize: THEME.FONTS.SIZE.XSMALL, color: THEME.COLORS.textLight},
  right: {height: '100%', justifyContent: 'center'},
});
