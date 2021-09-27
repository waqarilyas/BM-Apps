import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import styles from './styles';
import HistoryItem from '../../../shared/components/HistoryItem';
import {GenericNavigation} from '../../../shared/models/types';

interface Props extends GenericNavigation {}

const PurchaseHistory = (props: Props) => {
  const clearHistory = () => {
    console.log('Clear History');
  };
  const navToOrderDetail = () => {
    props.navigation?.navigate('PurchaseDetail');
  };
  return (
    <View style={styles.mainContainer}>
      <AppHeader title="Sale History" showBack />
      <View style={styles.container}>
        <TouchableOpacity onPress={clearHistory} style={styles.clearHistory}>
          <Text style={styles.clearHistoryText}>Clear History</Text>
        </TouchableOpacity>
        <ScrollView style={styles.transactions}>
          <HistoryItem
            status="Completed"
            short="BTC"
            amount="0.024"
            date="Oct 19, 2019, 5:42:44 AM"
            onPress={navToOrderDetail}
          />
          <HistoryItem
            status="Pending"
            short="BTC"
            amount="0.024"
            date="Oct 19, 2019, 5:42:44 AM"
            onPress={navToOrderDetail}
          />
          <HistoryItem
            status="Pending"
            short="BTC"
            amount="0.004"
            date="Oct 19, 2019, 5:42:44 AM"
            onPress={navToOrderDetail}
          />
          <HistoryItem
            status="Payment Error"
            short="BTC"
            amount="0.004"
            date="Oct 19, 2019, 5:42:44 AM"
            onPress={navToOrderDetail}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default PurchaseHistory;
