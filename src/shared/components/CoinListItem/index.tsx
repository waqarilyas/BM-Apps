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
import {Coin} from '../../models/types';
import blockConfig from '../../../../block.config';

interface Props extends TouchableOpacityProps {
  toggle?: boolean;
  item: Coin;
}
const CoinListItem = (props: Props) => {
  const [toggle, setToggle] = useState(true);
  const COIN_URL = `${blockConfig.API_URL}/admin/coin`;
  return (
    <TouchableOpacity activeOpacity={1} {...props}>
      <View style={styles.container}>
        <View style={styles.left}>
          <FastImage
            source={{uri: `${COIN_URL}/${props.item.coin_symbol}`}}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: '100%', height: '100%', alignSelf: 'center'}}
          />
        </View>
        <View style={styles.main}>
          <Text style={styles.price}>
            ${props.item.vs_currency_balance || '0.00'}
          </Text>
          <Text style={styles.name}>
            {props.item.coin_name} ({props.item.coin_symbol.toUpperCase()})
          </Text>
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
            <Text style={styles.name}>
              {props.item.chart_data?.changePercentage24h?.toFixed(2) || '0.00'}
              %
            </Text>
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
    marginBottom: THEME.MARGIN.VERYLOW,
    alignItems: 'center',
  },
  left: {
    width: '20%',
    height: '90%',
  },
  main: {
    marginLeft: THEME.MARGIN.LOW,
    flex: 1,
    justifyContent: 'space-around',
  },
  price: {
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    fontSize: THEME.FONTS.SIZE.MEDIUM,
    color: THEME.COLORS.white,
  },
  name: {
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    color: THEME.COLORS.textLight,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
  },
  right: {height: '100%', justifyContent: 'center'},
});
