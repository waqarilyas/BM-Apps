import React, {useMemo, useState} from 'react';
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
  const [searchText, setSearchText] = useState('');

  const filteredWallet = useMemo(() => {
    if (!searchText) {
      return wallet;
    }
    return wallet.filter(
      item =>
        item.coin_name.toUpperCase().includes(searchText?.toUpperCase()) ||
        item.coin_symbol.toUpperCase().includes(searchText?.toUpperCase()),
    );
  }, [searchText, wallet]);
  return (
    <View style={styles.mainContainer}>
      <AppHeader showBack title="Coins Acceptance Settings" />
      <View style={styles.container}>
        <AppSearchInput value={searchText} onChangeText={setSearchText} />
        <Text style={styles.label}>Accepted Coins</Text>
        <ScrollView bounces={false} style={styles.coinsList}>
          {filteredWallet.map((item, index) => (
            <CoinListItem
              key={index}
              item={item}
              onPress={() => console.log('Navigate call')}
              toggle
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default CoinAcceptance;
