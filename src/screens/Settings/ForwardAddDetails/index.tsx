import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text, FlatList} from 'react-native';

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

const ForwardAddDetails = (props: GenericNavigation) => {
  const [showModal, setShowModal] = useState(false);
  const [coin, setCoin] = useState('Bitcoin');
  const [coins, setCoins] = useState([
    {label: 'Bitcoin', value: 'Bitcoin', image: COINS.BTC},
    {label: 'Ethereum', value: 'Ethereum', image: COINS.ETH},
    {label: 'DOGE', value: 'DOGE', image: COINS.DOGE},
  ]);
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
    setShowModal(true);
  };
  const onPressAddAddress = () => {
    props.navigation?.navigate('ForwardAdd');
  };
  return (
    <View style={styles.mainContainer}>
      <AppHeader title={L(`Forward Add`)} showBack />
      <SelectCoinModal
        isVisible={showModal}
        toggleModal={() => {
          setShowModal(false);
        }}
        RenderOptions={<RenderCoins />}
      />

      <View style={styles.container}>
        <Text style={styles.label}>Select Coin</Text>
        <TouchableOpacity onPress={onPressPicker} style={styles.pickerButton}>
          <View style={{flexDirection: 'row'}}>
            <FastImage source={COINS.BTC} style={styles.coinImage} />
            <Text style={styles.coinName}>{coin}</Text>
          </View>
          <FastImage
            source={ICONS.CHEVRON_DOWN}
            style={{height: RF(10), width: RF(10), alignSelf: 'center'}}
          />
        </TouchableOpacity>

        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>
            1423625145214578826151856251423625145214578
          </Text>
        </View>
        <PrimaryButton title={L('Add')} onPress={onPressAddAddress} />
      </View>
    </View>
  );
};

export default ForwardAddDetails;
