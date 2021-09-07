import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {COINS} from '../../../assets/coins';
import {THEME} from '../../theme';
import GLOBAL_STYLE from '../../theme/global';
import {HP, WP, RF} from '../../theme/responsive';

interface Props {
  isVisible: boolean;
  onPressBackdrop: () => void;
  onPressCoin: (coin: string) => void;
  data: any;
}

const ChooseCoinModal = (props: Props) => {
  const {data, onPressCoin} = props;

  const RenderCoin = ({data}: {data: any}) => {
    let image = COINS.BTC;

    if (data.coin_symbol == 'eth') {
      image = COINS.ETH;
    } else if (data.coin_symbol == 'weenus') {
      image = COINS.WEENUS;
    }

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPressCoin(data)}
        style={styles.coinContainer}>
        <FastImage
          source={image}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.coinImage}
        />
        <Text style={styles.coinText}>
          {data.coin_name}({data.coin_symbol})
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.onPressBackdrop}
      onBackButtonPress={props.onPressBackdrop}
      style={{position: 'absolute', bottom: WP(-5), left: WP(-5)}}
      animationInTiming={400}
      animationOutTiming={400}>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return <RenderCoin data={item} />;
          }}
        />

        {/* <ScrollView showsVerticalScrollIndicator={false}>
          
        </ScrollView> */}
      </View>
    </Modal>
  );
};

export default ChooseCoinModal;

const styles = StyleSheet.create({
  container: {
    width: WP(100),
    height: HP(50),
    borderTopRightRadius: WP(5),
    borderTopLeftRadius: WP(5),
    backgroundColor: THEME.COLORS.secondaryBackground,
    padding: THEME.PADDING.NORMAL,
  },
  coinContainer: {
    flexDirection: 'row',
    padding: RF(10),
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: THEME.COLORS.white,
    backgroundColor: THEME.COLORS.primaryBackground,
    borderRadius: THEME.RADIUS.BOX,
    marginBottom: THEME.PADDING.LOW,
    alignItems: 'center',
  },
  coinImage: {width: RF(40), height: RF(40)},
  coinText: {
    color: THEME.COLORS.white,
    fontSize: THEME.FONTS.SIZE.SMALL,
    marginLeft: THEME.MARGIN.LOW,
  },
});
