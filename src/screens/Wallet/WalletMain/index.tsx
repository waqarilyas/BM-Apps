import React, {useCallback, useState, useEffect, useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {PieChart, PieChartData} from 'react-native-svg-charts';
import {ChartItem, Coin, GenericNavigation} from '../../../shared/models/types';
import styles from './styles';
import AppHeader from '../../../shared/components/AppHeader';
import AppSearchInput from '../../../shared/components/AppSearchInput';
import CoinListItem from '../../../shared/components/CoinListItem';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../shared/store';
import AppLoader from '../../../shared/components/AppLoader';
import {initSocket, socket} from '../../../shared/utils/sockets';
import {renderWallet} from '../../../shared/store/actions/walletActions';
import {EMPTY_CHART_DATA} from '../../../shared/utils/AppConstants';

interface Props extends GenericNavigation {}

const WalletMain = (props: Props) => {
  const [searchText, setSearchText] = useState('');
  const {wallet, walletLoading} = useSelector(
    (state: RootState) => state.wallet,
  );
  const dispatch = useDispatch();
  const {currency} = useSelector((state: RootState) => state.settings);

  const navigateToCoinDetail = (name: string) =>
    props.navigation?.navigate('CoinDetails', {coin_symbol: name});

  let [totalValue, erc20Address, nonErc20Address, bitcoinAddress, chartData] =
    useMemo(() => {
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
      let nonErc20 = wallet.find(
        (c: Coin) => !c.is_erc20 && c.coin_symbol !== 'btc',
      );
      let erc20 = wallet.find((c: Coin) => c.is_erc20);

      let newChartData = wallet.map(c => {
        let chartObject = {
          key: c.order_index,
          vs_currency_balance: c.vs_currency_balance,
          svg: {fill: c.coin_color},
          onPress: () => console.log('Presed'),
        };
        return chartObject;
      });
      return [
        Number(newTotal).toFixed(2),
        erc20?.address,
        nonErc20?.address,
        btcAddress?.address,
        newChartData,
      ];
    }, [wallet]);

  const filteredWallet = useMemo(() => {
    if (!searchText) {
      return wallet;
    }
    return wallet.filter(item =>
      item.coin_name.toUpperCase().includes(searchText?.toUpperCase()),
    );
  }, [searchText, wallet]);

  const realtimeListener = useCallback(async () => {
    await initSocket(`${erc20Address}`);
    socket.on('connect', () => {
      socket.on(`${erc20Address}`, async (data: any) => {
        if (data?.balance === '0') {
          console.log('Dont do any thing');
        } else {
          console.log('\x1b[31m', 'Incoming update');
          dispatch(renderWallet());
        }
      });
    });
  }, [erc20Address, dispatch]);

  useEffect(() => {
    if (wallet.length) {
      realtimeListener();
    }
  }, [wallet.length, realtimeListener]);

  return (
    <>
      <AppHeader title="Wallet" />
      <AppLoader isVisible={walletLoading} />
      <View style={styles.container}>
        <PieChart
          animate={true}
          style={styles.pieChart}
          valueAccessor={({item}: any) => item.vs_currency_balance}
          data={Number(totalValue) > 0 ? chartData : EMPTY_CHART_DATA}
          outerRadius={'100%'}
          innerRadius={'82%'}
          padAngle={0}
        />
        <View style={styles.innerCircle}>
          <Text style={styles.innerLargeText}>
            {totalValue.split('.')[0]}
            <Text style={styles.innerSmallText}>
              .{totalValue.split('.')[1]} {currency}
            </Text>
          </Text>
        </View>
        <AppSearchInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search..."
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
        </ScrollView>
      </View>
    </>
  );
};

export default WalletMain;
