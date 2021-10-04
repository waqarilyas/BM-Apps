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
import {useSelector} from 'react-redux';
import {COINS} from '../../../assets/coins';
import {RootState} from '../../store';
import {THEME} from '../../theme';
import GLOBAL_STYLE from '../../theme/global';
import {HP, WP, RF} from '../../theme/responsive';
import L from '../../utils/LanguageHandler';

interface Props {
  isVisible: boolean;
  onPressBackdrop: () => void;
  onPressCoin: (coin: string) => void;
  data: any;
  onSelectContact?: (val: any) => void;
  renderContacts?: boolean;
}

const ChooseCoinModal = (props: Props) => {
  const {data, onPressCoin, onSelectContact, renderContacts} = props;
  const {contacts} = useSelector((state: RootState) => state.pos);

  const RenderCoin = ({data}: {data: any}) => {
    let image = COINS.BTC;

    if (data.coin_symbol == 'eth') {
      image = COINS.ETH;
    } else if (data.coin_symbol == 'weenus') {
      image = COINS.WEENUS;
    } else if (data.coin_symbol == 'btc') {
      image = COINS.BTC;
    } else if (data.coin_symbol == 'bnb') {
      image = COINS.BNB;
    } else if (data.coin_symbol == 'usdt') {
      image = COINS.USDT;
    } else if (data.coin_symbol == 'doge') {
      image = COINS.DOGE;
    } else if (data.coin_symbol == 'busd') {
      image = COINS.BUSD;
    }

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          onPressCoin(data);
          renderContacts && onSelectContact(null);
        }}
        style={styles.coinContainer}>
        <FastImage
          source={image}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.coinImage}
        />
        <Text style={styles.coinText}>
          {data.coin_name}({data.coin_symbol?.toUpperCase()})
        </Text>
      </TouchableOpacity>
    );
  };

  const RenderContacts = ({data}: {data: any}) => {
    const {name, address, coin} = data;
    let image = COINS.BTC;

    console.log('coin', coin);
    if (coin.coin_symbol == 'eth') {
      image = COINS.ETH;
    } else if (coin.coin_symbol == 'weenus') {
      image = COINS.WEENUS;
    } else if (coin.coin_symbol == 'btc') {
      image = COINS.BTC;
    } else if (coin.coin_symbol == 'bnb') {
      image = COINS.BNB;
    } else if (data.coin_symbol == 'usdt') {
      image = COINS.USDT;
    } else if (data.coin_symbol == 'doge') {
      image = COINS.DOGE;
    } else if (data.coin_symbol == 'busd') {
      image = COINS.BUSD;
    }

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          renderContacts && onSelectContact(data);
          onPressCoin(coin);
        }}
        style={styles.coinContainer}>
        <FastImage
          source={image}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.coinImage}
        />

        <View style={{width: '90%'}}>
          <Text style={styles.coinText}>{name}</Text>
          <Text style={[styles.coinText, {fontSize: THEME.FONTS.SIZE.XXSMALL}]}>
            {address}
          </Text>
        </View>
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
          ListHeaderComponent={() => (
            <Text style={styles.contactsHeader}>{L('Wallet')}</Text>
          )}
          renderItem={({item, index}) => {
            return <RenderCoin data={item} />;
          }}
          ListFooterComponent={() => {
            if (renderContacts) {
              return (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={() => (
                    <Text style={styles.contactsHeader}>Contacts</Text>
                  )}
                  data={contacts}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    return <RenderContacts data={item} />;
                  }}
                />
              );
            } else {
              return null;
            }
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
    marginRight: THEME.MARGIN.SUPERHIGH,
  },
  contactsHeader: {
    fontSize: RF(14),
    color: THEME.COLORS.white,
    marginBottom: RF(10),
  },
});
