import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {ChartItem, GenericNavigation} from '../../../shared/models/types';
import styles from './styles';
import AppHeader from '../../../shared/components/AppHeader';
import AppSearchInput from '../../../shared/components/AppSearchInput';
import CoinListItem from '../../../shared/components/CoinListItem';

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
    amount: 50,
    svg: {fill: '#6C8DE8'},
    onPress: key => console.log('CHART PRESSD'),
  },
  {
    key: 3,
    amount: 40,
    svg: {fill: '#D7843B'},
    onPress: key => console.log('CHART PRESSD'),
  },
  {
    key: 4,
    amount: 40,
    svg: {fill: '#AE3D8C'},
    onPress: key => console.log('CHART PRESSD'),
  },
  {
    key: 5,
    amount: 35,
    svg: {fill: '#ecb3ff'},
    onPress: key => console.log('CHART PRESSD'),
  },
];

const WalletMain = (props: Props) => {
  const [searchText, setSearchText] = useState('');

  const navigateToCoinDetail = (name: string) =>
    props.navigation?.navigate('CoinDetails', {coin: name});

  return (
    <>
      <AppHeader title="Wallet" />
      <View style={styles.container}>
        <PieChart
          style={styles.pieChart}
          valueAccessor={({item}: {item: ChartItem}) => item.amount}
          data={CHART_DATA}
          outerRadius={'100%'}
          innerRadius={'75%'}
          padAngle={0}
        />
        <View style={styles.innerCircle}>
          <Text style={styles.innerLargeText}>
            $0<Text style={styles.innerSmallText}>.00 CAD</Text>
          </Text>
        </View>
        <AppSearchInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search..."
        />

        <ScrollView style={styles.listContainer}>
          <CoinListItem onPress={() => navigateToCoinDetail('BTC')} />
          <CoinListItem />
          <CoinListItem />
          <CoinListItem />
        </ScrollView>
      </View>
    </>
  );
};

export default WalletMain;
