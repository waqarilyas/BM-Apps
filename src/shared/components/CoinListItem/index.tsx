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
import {THEME} from '../../theme';
import ToggleSwitch from 'toggle-switch-react-native';
import {Coin} from '../../models/types';
// import blockConfig from '../../../../block.config';
import {useDispatch, useSelector} from 'react-redux';
import {setCoinIsActive} from '../../store/reducers/walletReducer';
import {SvgUri} from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import {GetImageForCoin} from '../../../assets/coins';
import {parse} from 'url';
import {RootState} from '../../store';
import ConfidentialText from '../ConfidentialText';
import {ICONS} from '../../../assets';
import defaultConfig from '../../../../block.config';
// import {blockConfig} from '../../../../block.config';

interface Props extends TouchableOpacityProps {
  toggle?: boolean;
  item: Coin;
  onPress?: () => void;
}
const CoinListItem = (props: Props) => {
  const dispatch = useDispatch();
  const {item} = props;
  const {balance, coin_symbol} = props.item;

  const rate = props?.item?.chart_data?.rate;

  const COIN_URL = `${defaultConfig.API_URL}/admin/coin/${props.item.coin_symbol}`;
  const onPressToggle = () => dispatch(setCoinIsActive(props.item.coin_symbol));

  const percentage = props.item.chart_data?.changePercentage24h?.toFixed(2);
  const {showBalances} = useSelector((state: RootState) => state.wallet);

  return (
    <TouchableOpacity
      activeOpacity={1}
      {...props}
      onPress={props.toggle ? onPressToggle : props.onPress}>
      <View style={styles.container}>
        <View style={styles.left}>
          <FastImage
            source={
              item?.icon?.url ? {uri: item?.icon?.url} : ICONS.placeholderCoin
            }
            style={{
              borderRadius: THEME.RADIUS.BOX,
              width: '100%',
              height: '100%',
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.name}>
            {props.item.coin_symbol.toUpperCase()}
          </Text>

          {/* <SvgUri width="100%" height="100%" uri={COIN_URL} /> */}
        </View>

        <View style={styles.main}>
          <Text style={styles.price}>
            {/* ${parseFloat(props.item.vs_currency_balance).toFixed(2) || '0.00'} */}
            ${props.item.vs_currency_balance || '0.00'}
          </Text>
          <Text
            style={[
              styles.price,
              percentage < 0 && {color: THEME.COLORS.red},
              percentage > 0 && {color: THEME.COLORS.green},
            ]}>
            {percentage || '0.00'}%
          </Text>
        </View>

        <View style={styles.right}>
          {props.toggle ? (
            <ToggleSwitch
              isOn={props.item.is_active}
              onColor={THEME.COLORS.green}
              offColor={THEME.COLORS.textLight}
              size="medium"
              onToggle={onPressToggle}
            />
          ) : (
            <View>
              {showBalances ? (
                <>
                  <Text style={styles.rightName}>
                    {balance ? parseFloat(balance).toFixed(2) : 0.0}{' '}
                    {coin_symbol?.toUpperCase()}
                  </Text>
                  <Text style={styles.rightName}>{rate ? rate : 0} USD</Text>
                </>
              ) : (
                <>
                  <ConfidentialText
                    style={{
                      alignSelf: 'flex-end',
                      color: 'white',
                    }}
                  />
                  <ConfidentialText
                    style={{
                      alignSelf: 'flex-end',
                      color: 'white',
                    }}
                  />
                </>
              )}
            </View>
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
    height: RF(55),
    justifyContent: 'space-between',
    borderRadius: THEME.RADIUS.SMALLBOX,
    flexDirection: 'row',
    paddingHorizontal: THEME.PADDING.SUPERLOW,
    paddingVertical: THEME.PADDING.LOW,
    backgroundColor: THEME.COLORS.secondaryBackground,
    marginBottom: THEME.MARGIN.NORMAL,
    alignItems: 'center',
  },
  left: {
    flex: 0.2,
    flexDirection: 'row',
    height: '100%',
  },
  main: {
    height: '100%',
    flex: 0.2,
    marginLeft: THEME.MARGIN.HIGH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    fontSize: THEME.FONTS.SIZE.XXXSMALL,
    color: THEME.COLORS.white,
  },
  name: {
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
    alignSelf: 'center',
  },
  right: {
    alignItems: 'flex-end',
    flex: 0.3,
    height: '100%',
    justifyContent: 'center',
    paddingRight: THEME.PADDING.LOW,
  },
  rightName: {
    fontSize: THEME.FONTS.SIZE.XXXSMALL,
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
    textAlign: 'right',
  },
});
