import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import TransactionButton from '../../../shared/components/TransactionButton';
import TransactionItem from '../../../shared/components/TransactionItem';
import {GenericNavigation} from '../../../shared/models/types';
import {THEME} from '../../../shared/theme';
import styles from './styles';

interface Props extends GenericNavigation {}

const CoinDetails = (props: Props) => {
  const coin = props.route?.params?.coin;

  const [activeIndex, setActiveIndex] = useState(0);

  const showBalance = () => setActiveIndex(0);
  const showTransactions = () => setActiveIndex(1);

  const getTabBackground = (index: number) =>
    activeIndex === index
      ? THEME.COLORS.blue
      : THEME.COLORS.secondaryBackground;

  const navToSend = () => {
    props.navigation?.navigate('SendCoin');
  };
  const navToReceive = () => {
    props.navigation?.navigate('ReceiveCoin');
  };

  return (
    <>
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
                2.216484 <Text style={styles.short}>{coin}</Text>
              </Text>
              <Text style={styles.usdBalance}>$16471.20</Text>
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
          <ScrollView style={styles.transactions}>
            <TransactionItem kind="sent" short="btc" />
            <TransactionItem kind="received" short="doge" />
            <TransactionItem kind="received" short="usdt" />
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default CoinDetails;
