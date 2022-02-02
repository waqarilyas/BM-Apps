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
import AppInput from '../../../shared/components/AppInput';

const ForwardAddDetails = (props: GenericNavigation) => {
  const [showModal, setShowModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [address, setAddress] = useState('');
  const [contactName, setContactName] = useState('');

  const {wallet} = useSelector((state: RootState) => state.wallet);
  const {merchantData} = useSelector((state: RootState) => state.user);
  const onPressPicker = () => {
    setShowCurrencyModal(true);
  };

  const validate = () => {
    if (address.length == 0) {
      Toast.show({
        text1: 'Request Failed',
        text2: 'Please enter address to continue',
        type: 'error',
      });
      return false;
    } else if (contactName.length == 0) {
      Toast.show({
        text1: 'Request Failed',
        text2: 'Please enter contact name to continue',
        type: 'error',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validate()) {
        return;
      }
      setLoading(true);

      const recRes = await saveForwardAddress({
        userId: merchantData._id,
        walletName: contactName,
        address,
        blockchain: coin.coin_symbol,
      });
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

  useEffect(() => {
    setCoin(wallet[0]);
  }, []);

  return (
    <>
      <View style={styles.mainContainer}>
        <AppHeader title={L('Forward Add')} showBack />

        <View style={styles.container}>
          <AppInput
            placeholder={L('Forward Address name')}
            onChangeText={setContactName}
            value={contactName}
          />

          <AppInput
            placeholder="Address"
            onChangeText={setAddress}
            value={address}
          />

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
          <View style={{flex: 1}} />
          <PrimaryButton
            loading={loading}
            title={L('Add')}
            onPress={handleSubmit}
          />
        </View>
      </View>
      <ChooseCoinModal
        isVisible={showCurrencyModal}
        onPressBackdrop={toggleModal}
        onPressCoin={onSelectCoin}
        data={wallet}
        noForwardAddress={true}
      />
    </>
  );
};

export default ForwardAddDetails;
