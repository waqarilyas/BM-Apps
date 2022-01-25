import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  Keyboard,
} from 'react-native';

import AppHeader from '../../../shared/components/AppHeader';

import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';
import {COINS} from '../../../assets/coins';
import {GenericNavigation} from '../../../shared/models/types';
import {ICONS} from '../../../assets';
import {THEME} from '../../../shared/theme';
import FastImage from 'react-native-fast-image';
import {RF} from '../../../shared/theme/responsive';
import SelectCoinModal from '../../../shared/components/SelectCoinModal';
import Icon from 'react-native-vector-icons/Feather';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import Toast from 'react-native-toast-message';
import {saveForwardAddress} from '../../../shared/services/forwardAddresses.service';
import ChooseCoinModal from '../../../shared/components/ChooseCoinModal';
import {useSelector} from 'react-redux';
import {RootState} from '../../../shared/store';

const ForwardAddDetails = (props: GenericNavigation) => {
  const [showModal, setShowModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  const [coins, setCoins] = useState([
    {label: 'Bitcoin', value: 'Bitcoin', image: COINS.BTC},
    {label: 'Ethereum', value: 'Ethereum', image: COINS.ETH},
    {label: 'DOGE', value: 'DOGE', image: COINS.DOGE},
  ]);
  const {wallet} = useSelector((state: RootState) => state.wallet);

  const RenderCoins = () => {
    return (
      <>
        <Text style={styles.modalHeading}>Select Coin</Text>
        <FlatList
          data={coins}
          renderItem={({item}) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setCoin(item.label);
                    setShowModal(false);
                  }}
                  style={styles.buttonView}>
                  <View style={{flexDirection: 'row'}}>
                    <FastImage source={item.image} style={styles.cross} />
                    <Text style={styles.labelItem}>{item.label}</Text>
                  </View>
                  {item.label == coin ? (
                    <Icon name="check" size={20} color={THEME.COLORS.green} />
                  ) : null}
                </TouchableOpacity>
              </>
            );
          }}
        />
      </>
    );
  };
  const onPressPicker = () => {
    setShowCurrencyModal(true);
  };

  const validate = () => {
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validate()) {
        return;
      }
      setLoading(true);

      const recRes = await saveForwardAddress();
      Toast.show({
        text1: 'Successfull',
        text2: 'Receipt sent successfully',
        type: 'success',
      });
      setLoading(false);
      props.navigation?.goBack();
    } catch (err) {
      Toast.show({
        text1: 'Request Failed',
        text2:
          'Unable to send receipt to user at the moment. Please try again later',
        type: 'error',
      });
      setLoading(false);
    }
  };

  const toggleModal = () => {
    Keyboard.dismiss();
    setShowCurrencyModal(!showCurrencyModal);
  };

  const onSelectCoin = (coin: any) => {
    setShowCurrencyModal(false);
    setCoin(coin);
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <AppHeader title={L(`Forward Add`)} showBack />

        <View style={styles.container}>
          <Text style={styles.label}>Select Coin</Text>
          <TouchableOpacity onPress={onPressPicker} style={styles.pickerButton}>
            <View style={{flexDirection: 'row'}}>
              <FastImage
                source={{uri: coin?.icon?.url}}
                style={styles.coinImage}
              />
              <Text style={styles.coinName}>{coin?.coin_name}</Text>
            </View>
            <FastImage source={ICONS.CHEVRON_DOWN} style={styles.chevronDown} />
          </TouchableOpacity>

          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>
              1423625145214578826151856251423625145214578
            </Text>
          </View>
          <View style={{flex: 1}} />
          <PrimaryButton title={L('Add')} onPress={handleSubmit} />
        </View>
      </View>
      <ChooseCoinModal
        isVisible={showCurrencyModal}
        onPressBackdrop={toggleModal}
        onPressCoin={onSelectCoin}
        data={wallet}
      />
    </>
  );
};

export default ForwardAddDetails;
