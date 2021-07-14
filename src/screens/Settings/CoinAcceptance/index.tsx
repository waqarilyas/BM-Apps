import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import AppSearchInput from '../../../shared/components/AppSearchInput';
import CoinListItem from '../../../shared/components/CoinListItem';
import {RootState} from '../../../shared/store';
import styles from './styles';

interface Props {}

const CoinAcceptance = (props: Props) => {
  const {wallet} = useSelector((state: RootState) => state.wallet);
  return (
    <>
      <AppHeader showBack title="Coins Acceptance Settings" />
      <View style={styles.container}>
        <AppSearchInput />
        <Text style={styles.label}>Accepted Coins</Text>
        <ScrollView bounces={false} style={styles.coinsList}>
          {wallet.map((item, index) => (
            <CoinListItem
              key={index}
              item={item}
              onPress={() => console.log('Navigate call')}
              toggle
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default CoinAcceptance;
