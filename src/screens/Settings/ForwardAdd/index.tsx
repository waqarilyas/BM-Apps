import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';

import AppHeader from '../../../shared/components/AppHeader';

import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';
import ForwardAddCard from '../../../shared/components/ForwardAddCard';
import {COINS} from '../../../assets/coins';
import {GenericNavigation} from '../../../shared/models/types';

const ForwardAdd = (props: GenericNavigation) => {
  const onPressAdd = () => {
    props.navigation?.navigate('ForwardAddDetails');
  };
  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={L(`Forward Add`)}
        showBack
        showForwardAdd
        addAction={onPressAdd}
      />
      <ScrollView style={styles.container}>
        <ForwardAddCard
          coinName={'Bitcoin'}
          coinImage={COINS.BTC}
          address={'i.address'}
        />

      </ScrollView>
    </View>
  );
};

export default ForwardAdd;
