import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
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
      <AppHeader showBack title="Wallet" />
      <View style={styles.container}>
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={showBalance}
            style={[styles.tab, {backgroundColor: getTabBackground(0)}]}>
            <Text style={styles.tabTitle}>Balance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showTransactions}
            style={[styles.tab, {backgroundColor: getTabBackground(1)}]}>
            <Text style={styles.tabTitle}>Transactions</Text>
          </TouchableOpacity>
        </View>

        {activeIndex === 0 ? (
          <>
            <View style={styles.details}>
              <Text style={styles.balance}>
                {coin?.balance}{' '}
                <Text style={styles.short}>
                  {coin?.coin_symbol.toUpperCase()}
                </Text>
              </Text>
              <Text style={styles.usdBalance}>
                ${coin?.vs_currency_balance || '0.00'}
              </Text>
            </View>
            <View style={styles.actions}>
              <TransactionButton onPress={navToSend} title="SEND" kind="send" />
              <TransactionButton
                onPress={navToReceive}
                title="RECEIVE"
                kind="receive"
              />
            </View>
          </>
        ) : (
          <View>
            <ScrollView style={styles.transactions}>
              {sortedTransactions.map((item, number) => (
                <TransactionItem
                  key={number}
                  item={item}
                  kind={coin?.address === item.from ? 'sent' : 'received'}
                  coinSymbol={coin?.coin_symbol!}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

export default CoinDetails;
