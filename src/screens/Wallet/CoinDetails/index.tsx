import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {parse} from 'url';
import AppHeader from '../../../shared/components/AppHeader';
import TransactionButton from '../../../shared/components/TransactionButton';
import TransactionItem from '../../../shared/components/TransactionItem';
import {
  Coin,
  GenericNavigation,
  Transaction,
} from '../../../shared/models/types';
import {checkTransactions} from '../../../shared/services/wallet.service';
import {RootState} from '../../../shared/store';
import {THEME} from '../../../shared/theme';
import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';

interface Props extends GenericNavigation {}

const CoinDetails = (props: Props) => {
  const {wallet} = useSelector((state: RootState) => state.wallet);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[] | []>([]);

  const coin = useMemo(() => {
    return wallet.find(
      (c: Coin) => c.coin_symbol === props.route?.params?.coin_symbol,
    );
  }, [wallet, props.route]);

  useFocusEffect(
    useCallback(() => {
      checkTransactions(coin?.coin_symbol, coin?.address)
        .then((data: Transaction[]) => {
          setTransactions(
            data.map(t => {
              t.epoch = new Date(t.timeStamp).getTime();
              return t;
            }),
          );
        })
        .catch(err => console.log('Error getting transaction:', err));
    }, [coin]),
  );

  const showBalance = () => setActiveIndex(0);
  const showTransactions = () => setActiveIndex(1);

  const getTabBackground = (index: number) =>
    activeIndex === index
      ? THEME.COLORS.blue
      : THEME.COLORS.secondaryBackground;

  const navToSend = () => {
    props.navigation?.navigate('SendCoin', {coinSymbol: coin?.coin_symbol});
  };
  const navToReceive = () => {
    props.navigation?.navigate('ReceiveCoin', {coinSymbol: coin?.coin_symbol});
  };

  const sortedTransactions = useMemo(
    () => transactions.sort((a, b) => b.epoch! - a.epoch!),
    [transactions],
  );

  return (
    <View style={styles.mainContainer}>
      <AppHeader showBack title={L('Wallet')} />
      <View style={styles.container}>
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={showBalance}
            style={[styles.tab, {backgroundColor: getTabBackground(0)}]}>
            <Text style={styles.tabTitle}>{L('Balance')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showTransactions}
            style={[styles.tab, {backgroundColor: getTabBackground(1)}]}>
            <Text style={styles.tabTitle}>{L('Transactions')}</Text>
          </TouchableOpacity>
        </View>

        {activeIndex === 0 ? (
          <>
            <View style={styles.details}>
              <Text style={styles.balance}>
                {parseFloat(coin?.balance).toFixed(6)}{' '}
                <Text style={styles.short}>
                  {coin?.coin_symbol.toUpperCase()}
                </Text>
              </Text>
              <Text style={styles.usdBalance}>
                ${parseFloat(coin?.vs_currency_balance).toFixed(6) || '0.00'}
              </Text>
            </View>
            <View style={styles.actions}>
              <TransactionButton
                onPress={navToSend}
                title={L('SEND')}
                kind="send"
              />
              <TransactionButton
                onPress={navToReceive}
                title={L('RECEIVE')}
                kind="receive"
              />
            </View>
          </>
        ) : (
          <FlatList
            data={sortedTransactions}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{marginTop: THEME.MARGIN.LOW}}
            renderItem={({item, index}) => {
              return (
                <TransactionItem
                  key={index}
                  item={item}
                  kind={coin?.address === item.from ? 'sent' : 'received'}
                  coinSymbol={coin?.coin_symbol!}
                />
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default CoinDetails;
