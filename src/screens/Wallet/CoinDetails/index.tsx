import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {COINS} from '../../../assets/coins';
import AppHeader from '../../../shared/components/AppHeader';
import ConfidentialText from '../../../shared/components/ConfidentialText';
import TransactionButton from '../../../shared/components/TransactionButton';
import TransactionItem from '../../../shared/components/TransactionItem';
import {
  Coin,
  GenericNavigation,
  Transaction,
} from '../../../shared/models/types';
import {AppShowToast} from '../../../shared/services/helper.service';
import {checkTransactions} from '../../../shared/services/wallet.service';
import {RootState} from '../../../shared/store';
import {THEME} from '../../../shared/theme';
import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';

interface Props extends GenericNavigation {}

const CoinDetails = (props: Props) => {
  const {wallet, showBalances} = useSelector(
    (state: RootState) => state.wallet,
  );
  // const [activeIndex, setActiveIndex] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[] | []>([]);
  const [loading, setLoading] = useState(false);

  const coin = useMemo(() => {
    return wallet.find(
      (c: Coin) => c?.coin_symbol === props.route?.params?.coin_symbol,
    );
  }, [wallet, props.route]);

  const getTransactions = () => {
    checkTransactions(coin?.coin_symbol, coin?.address)
      .then((data: Transaction[]) => {

        setTransactions(
          data.map(t => {
            t.epoch = new Date(t.timeStamp).getTime();
            return t;
          }),
        );
      })
      .catch(err => console.log('Error getting transaction:', err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getTransactions();
  }, []);

  useEffect(() => {
    const unsubscribe = props?.navigation.addListener('focus', () => {
      getTransactions();
    });

    return unsubscribe;
  }, [props.navigation]);

  const navToSend = () => {
    props.navigation?.navigate('SendCoin', {coinSymbol: coin?.coin_symbol});
  };
  const navToReceive = () => {
    props.navigation?.navigate('ReceiveCoin', {coinSymbol: coin?.coin_symbol});
  };
  const coinImage = () => {
    if (coin?.coin_symbol === 'btc') {
      return COINS.BTC;
    } else if (coin?.coin_symbol === 'eth') {
      return COINS.ETH;
    } else if (coin?.coin_symbol === 'bnb') {
      return COINS.BNB;
    } else if (coin?.coin_symbol === 'busd') {
      return COINS.BUSD;
    } else if (coin?.coin_symbol === 'weenus') {
      return COINS.WEENUS;
    } else if (coin?.coin_symbol === 'usdt') {
      return COINS.USDT;
    } else if (coin?.coin_symbol === 'doge') {
      return COINS.DOGE;
    }
  };

  const onCopy = () => {
    // setCopied(true);
    AppShowToast(L('Copied'));
    Clipboard.setString(coin?.address);
  };

  const sortedTransactions = useMemo(
    () => transactions.sort((a, b) => b.epoch! - a.epoch!),
    [transactions],
  );



  return (
    <View style={styles.mainContainer}>
      <AppHeader showBack title={L('Wallet')} />

      <View style={styles.container}>
        {/* //-----Balance---// */}

        <View style={{flex: 0.5}}>
          <View style={styles.details}>
            <FastImage
              source={coinImage()}
              style={styles.coinImage}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.balance}>
              {showBalances ? (
                coin?.balance ? (
                  parseFloat(coin?.balance).toFixed(6)
                ) : (
                  '0.00'
                )
              ) : (
                <ConfidentialText />
              )}{' '}
              <Text style={styles.short}>
                {coin?.coin_symbol.toUpperCase()}
              </Text>
            </Text>
            <Text style={styles.usdBalance}>
              {showBalances ? (
                coin?.vs_currency_balance ? (
                  parseFloat(coin?.vs_currency_balance).toFixed(6)
                ) : (
                  '0.00'
                )
              ) : (
                <ConfidentialText />
              )}{' '}
              USD
            </Text>
            <View style={styles.buttonGroup}>
              <TransactionButton
                onPress={navToSend}
                title={L('Send')}
                kind="send"
              />
              <TransactionButton
                onPress={navToReceive}
                title={L('Receive')}
                kind="receive"
              />
              <TransactionButton
                onPress={onCopy}
                title={L('Copy')}
                kind="copy"
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 0.5,
            borderTopWidth: 0.2,
            borderTopColor: 'white',
          }}>
          <Text style={styles.secondaryHeader}>Transactions</Text>
          <FlatList
            data={sortedTransactions}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{marginTop: THEME.MARGIN.LOW}}
            ListEmptyComponent={() =>
              loading ? (
                <ActivityIndicator
                  color={THEME.COLORS.accentBlue}
                  size="large"
                />
              ) : (
                <Text style={styles.noTransactionText}>
                  No Transactions Found!
                </Text>
              )
            }
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
        </View>

        {/* //-----Transactions---// */}

        {/* {activeIndex === 0 ? (
          <>
            <View style={styles.details}>
              <Text style={styles.balance}>
                {showBalances ? (
                  coin?.balance ? (
                    parseFloat(coin?.balance).toFixed(6)
                  ) : (
                    '0.00'
                  )
                ) : (
                  <ConfidentialText />
                )}{' '}
                <Text style={styles.short}>
                  {coin?.coin_symbol.toUpperCase()}
                </Text>
              </Text>
              <Text style={styles.usdBalance}>
                $
                {showBalances ? (
                  coin?.vs_currency_balance ? (
                    parseFloat(coin?.vs_currency_balance).toFixed(6)
                  ) : (
                    '0.00'
                  )
                ) : (
                  <ConfidentialText />
                )}{' '}
              </Text>
            </View>



          </>
        ) : (
          <FlatList
            data={sortedTransactions}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={
              sortedTransactions.length == 0
                ? {
                    flex: 1,
                  }
                : {
                    marginTop: THEME.MARGIN.LOW,
                  }
            }
            ListEmptyComponent={() => (
              <EmptyScreenComponent title={L('No transactions found!')} />
            )}
            // contentContainerStyle={{marginTop: THEME.MARGIN.LOW}}
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
        )} */}
      </View>
    </View>
  );
};

export default CoinDetails;
