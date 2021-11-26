import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import AppLoader from '../../../shared/components/AppLoader';
import AppSearchInput from '../../../shared/components/AppSearchInput';
import AuthModal from '../../../shared/components/AuthModal';
import CoinListItem from '../../../shared/components/CoinListItem';
import ConfidentialText from '../../../shared/components/ConfidentialText';
import {Coin, GenericNavigation} from '../../../shared/models/types';
import {getInitialMerchantData} from '../../../shared/services/merchant.service';
import {
  updateCoinBalance,
  updateCoinRates,
} from '../../../shared/services/wallet.service';
import {RootState} from '../../../shared/store';
import {refreshCoinsBalances} from '../../../shared/store/actions/walletActions';
import {THEME} from '../../../shared/theme';
import {EMPTY_CHART_DATA} from '../../../shared/utils/AppConstants';
import L from '../../../shared/utils/LanguageHandler';
import {initSocket, socket} from '../../../shared/utils/sockets';
import styles from './styles';

interface Props extends GenericNavigation {}

const WalletMain = (props: Props) => {
  const {
    wallet: {
      wallet,
      defaultCurrency,
      walletRefreshing,
      showBalances,
      walletLoading,
    },
    util: {balancesUpdateNeeded},
    settings: {thumbEnabled, currency},
    user: {merchantData},
  } = useSelector((state: RootState) => state);

  const [searchText, setSearchText] = useState('');
  const [authOpen, setAuthOpen] = useState(thumbEnabled);
  const dispatch = useDispatch();

  const navigateToCoinDetail = (name: string) =>
    props.navigation?.navigate('CoinDetails', {coin_symbol: name});

  let [
    totalValue,
    erc20Andbep20Address,
    bitcoinAddress,
    dogeAddress,
    chartData,
  ] = useMemo(() => {
    let newTotal = wallet.length
      ? wallet
          .map(i => i.vs_currency_balance)
          .reduce((total: any, current) => {
            total = Number(current || '0.00') + Number(total);
            return total;
          })
      : 0;
    if (isNaN(Number(newTotal))) {
      newTotal = '0.00';
    }
    let btcAddress = wallet.find((c: Coin) => c.coin_symbol === 'btc');
    let dogeAddress = wallet.find((c: Coin) => c.coin_symbol === 'doge');
    let erc20 = wallet.find((c: Coin) => c.is_erc20);
    let newChartData = wallet.map((c, index) => {
      let chartObject = {
        key: index,
        vs_currency_balance: c.vs_currency_balance,
        svg: {fill: c.coin_color},
        onPress: () => console.log('Presed'),
      };
      return chartObject;
    });
    return [
      Number(newTotal).toFixed(2),
      erc20?.address,
      btcAddress?.address,
      dogeAddress?.address,
      newChartData,
    ];
  }, [wallet]);

  const filteredWallet = useMemo(() => {
    if (!searchText) {
      return wallet;
    }
    return wallet.filter(item =>
      item.coin_symbol.toUpperCase().includes(searchText?.toUpperCase()),
    );
  }, [searchText, wallet]);

  const realtimeListener = useCallback(async () => {
    await initSocket(`${erc20Andbep20Address}`);
    await initSocket(`${bitcoinAddress}`);
    await initSocket(`${dogeAddress}`);

    socket.on('connect', () => {
      socket.on('coin-data', async (data: any) => {
        updateCoinRates(wallet, defaultCurrency);
      });
      socket.on(`${erc20Andbep20Address}`, async (data: any) => {
        updateCoinBalance({
          coinSymbol: data.coinSymbol,
          address: erc20Andbep20Address!,
          wallet,
        });
      });
      socket.on(`${bitcoinAddress}`, async (data: any) => {
        updateCoinBalance({
          coinSymbol: data.coinSymbol,
          address: bitcoinAddress!,
          wallet,
        });
      });
      socket.on(`${dogeAddress}`, async (data: any) => {
        updateCoinBalance({
          coinSymbol: data.coinSymbol,
          address: dogeAddress!,
          wallet,
        });
      });
    });
  }, []);

  useEffect(() => {
    if (balancesUpdateNeeded) {
      dispatch(refreshCoinsBalances(false));
    }
    if (wallet.length) {
      realtimeListener();
    }
    return () => {
      socket.removeListener(dogeAddress);
      socket.removeListener(erc20Andbep20Address);
      socket.removeListener(bitcoinAddress);
      socket.removeListener('coin-data');
      socket.removeAllListeners();
    };
  }, []);

  const onRefreshBalances = () => dispatch(refreshCoinsBalances(true));

  useEffect(() => {
    // if (wallet.length > 0) {
    getInitialMerchantData();
    // }
  }, [wallet]);

  useEffect(() => {
    const unsubscribe = props.navigation?.addListener('focus', () => {
      dispatch(refreshCoinsBalances(true));
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <>
      <View style={styles.mainContainer}>
        <AppHeader title={L('Wallet')} showEye />

        <View style={styles.container}>
          <PieChart
            style={styles.pieChart}
            valueAccessor={({item}: any) => item.vs_currency_balance}
            data={Number(totalValue) > 0 ? chartData : EMPTY_CHART_DATA}
            outerRadius={'100%'}
            innerRadius={'90%'}
            padAngle={0}
          />
          {/* <View style={styles.innerCircle}>
            <Text style={styles.innerLargeText}>
              {showBalances ? (
                <>
                  {totalValue.split('.')[0]}
                  <Text style={styles.innerSmallText}>
                    .{totalValue.split('.')[1]} {currency}
                  </Text>
                </>
              ) : (
                <ConfidentialText />
              )}
            </Text>
          </View>
          <AppSearchInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder={`${L('Search')}...`}
          />
          <ScrollView style={styles.listContainer}>
            {filteredWallet.map((item, index) => {
              if (item.is_active) {
                return (
                  <CoinListItem
                    key={index}
                    item={item}
                    onPress={() => navigateToCoinDetail(item.coin_symbol)}
                  />
                );
              }
            })}
          </ScrollView> */}

          <View style={styles.innerCircle}>
            <Text style={styles.innerLargeText}>
              {showBalances ? (
                <>
                  {totalValue.split('.')[0]}
                  <Text style={styles.innerSmallText}>
                    .{totalValue.split('.')[1]} {currency}
                  </Text>
                </>
              ) : (
                <ConfidentialText />
              )}
            </Text>
          </View>
          <AppSearchInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder={`${L('Search')}...`}
          />

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={walletRefreshing}
                onRefresh={onRefreshBalances}
                tintColor={THEME.COLORS.accentBlue}
              />
            }
            style={styles.listContainer}
            showsVerticalScrollIndicator={false}>
            {filteredWallet.map((item, index) => {
              if (item.is_active) {
                return (
                  <CoinListItem
                    key={index}
                    item={item}
                    onPress={() => navigateToCoinDetail(item.coin_symbol)}
                  />
                );
              }
            })}
          </ScrollView>
        </View>
        {thumbEnabled && authOpen && (
          <AuthModal visible={true} onClose={() => setAuthOpen(false)} />
        )}
      </View>
      <AppLoader isVisible={walletLoading} />
    </>
  );
};

export default WalletMain;
