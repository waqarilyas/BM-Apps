import React, {useState, useEffect, useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {ChartItem, GenericNavigation} from '../../../shared/models/types';
import styles from './styles';
import AppHeader from '../../../shared/components/AppHeader';
import AppSearchInput from '../../../shared/components/AppSearchInput';
import CoinListItem from '../../../shared/components/CoinListItem';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../shared/store';
import AppLoader from '../../../shared/components/AppLoader';

interface Props extends GenericNavigation {}

const CHART_DATA: ChartItem[] = [
  {
    key: 1,
    amount: 150,
    svg: {fill: '#27A2E3'},
    onPress: key => console.log('CHART PRESSD'),
  },
  {
    key: 2,
    amount: 30,
    svg: {fill: '#6C8DE8'},
    onPress: key => console.log('CHART PRESSD'),
  },
  {
    key: 3,
    amount: 20,
    svg: {fill: '#D7843B'},
    onPress: key => console.log('CHART PRESSD'),
  },
  {
    key: 4,
    amount: 20,
    svg: {fill: '#AE3D8C'},
    onPress: key => console.log('CHART PRESSD'),
  },
];

const WalletMain = (props: Props) => {
  const [searchText, setSearchText] = useState('');
  const {wallet, walletLoading} = useSelector(
    (state: RootState) => state.wallet,
  );
  const {currency} = useSelector((state: RootState) => state.settings);

  const navigateToCoinDetail = (name: string) =>
    props.navigation?.navigate('CoinDetails', {coin_symbol: name});

  let totalValue = useMemo(() => {
    let newTotal = wallet.length
      ? wallet
          .map(i => i.vs_currency_balance)
          .reduce((total: any, current) => {
            total = Number(current || '0.00') + Number(total);
            return total;
          })
      : 0;
    if (isNaN(Number(newTotal))) {
      return '0.00';
    }
    return Number(newTotal).toFixed(2);
  }, [wallet]);

  return (
    <>
      <AppHeader title="Wallet" />
      <AppLoader isVisible={walletLoading} />
      <View style={styles.container}>
        <PieChart
          style={styles.pieChart}
          valueAccessor={({item}: {item: ChartItem}) => item.amount}
          data={CHART_DATA}
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
          {wallet.map((item, index) => (
            <CoinListItem
              key={index}
              item={item}
              onPress={() => navigateToCoinDetail(item.coin_symbol)}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default WalletMain;
