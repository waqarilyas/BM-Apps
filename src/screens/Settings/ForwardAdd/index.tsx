import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';

import AppHeader from '../../../shared/components/AppHeader';

import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';
import ForwardAddCard from '../../../shared/components/ForwardAddCard';
import {COINS} from '../../../assets/coins';
import {GenericNavigation} from '../../../shared/models/types';
import {ICONS} from '../../../assets';
import {THEME} from '../../../shared/theme';
const data = [
  {
    index: 1,
    coinName: 'Bitcoin',
    icon: COINS.BTC,
    address: '142362514521457882615185625',
  },
  {
    index: 2,
    coinName: 'Bitcoin',
    icon: COINS.BTC,
    address: '142362514521457882615185625',
  },
  {
    index: 3,
    coinName: 'Bitcoin',
    icon: COINS.BTC,
    address: '142362514521457882615185625',
  },
  {
    index: 4,
    coinName: 'Bitcoin',
    icon: COINS.BTC,
    address: '142362514521457882615185625',
  },
];

const ForwardAdd = (props: GenericNavigation) => {
  const onPressCard = () => {
    props.navigation?.navigate('ForwardAddDetails');
  };
  return (
    <View style={styles.mainContainer}>
      <AppHeader title={L(`Forward Add`)} showBack />
      <ScrollView style={styles.container}>
        <ForwardAddCard
          coinName={'Bitcoin'}
          coinImage={COINS.BTC}
          address={'i.address'}
          onPress={onPressCard}
        />
        <ForwardAddCard
          coinName={'Bitcoin'}
          coinImage={COINS.BTC}
          address={'i.address'}
          onPress={onPressCard}
        />
        <ForwardAddCard
          coinName={'Bitcoin'}
          coinImage={COINS.BTC}
          address={'i.address'}
          onPress={onPressCard}
        />
      </ScrollView>
    </View>
  );
};

export default ForwardAdd;
