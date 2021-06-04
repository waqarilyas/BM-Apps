import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import AppSearchInput from '../../../shared/components/AppSearchInput';
import CoinListItem from '../../../shared/components/CoinListItem';
import styles from './styles';

interface Props {}

const CoinAcceptance = (props: Props) => {
  return (
    <>
      <AppHeader showBack title="Coins Acceptance Settings" />
      <View style={styles.container}>
        <AppSearchInput />
        <Text style={styles.label}>Accepted Coins</Text>
        <ScrollView bounces={false} style={styles.coinsList}>
          <CoinListItem toggle />
          <CoinListItem toggle />
          <CoinListItem toggle />
          <CoinListItem toggle />
        </ScrollView>
      </View>
    </>
  );
};

export default CoinAcceptance;
