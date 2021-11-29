import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import {getCustomersByMerchant} from '../../../shared/services/customer.service';
import {RootState} from '../../../shared/store';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import styles from './styles';
import {ICONS} from '../../../assets';
import AppLoader from '../../../shared/components/AppLoader';

const SaleHistory = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {merchantData} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setLoading(true);
    getCustomersByMerchant(merchantData?._id)
      .then(res => {

        setCustomers(res.data);
      })
      .catch(err => {
        Toast.show({
          text1: 'Request Failed',
          text2: 'Unable to get customers data',
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <AppHeader title="Sale History" showBack />
      <View style={styles.container}>
        {customers.length > 0 ? (
          <FlatList
            data={customers}
            inverted
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return <HistoryItem data={item} />;
            }}
          />
        ) : (
          <View style={styles.empty}>
            <Text style={styles.title}>No customers Found!</Text>
          </View>
        )}
      </View>
      <AppLoader isVisible={loading} />
    </>
  );
};

const HistoryItem = ({data}: any) => {
  const {firstName, lastName, email, phone, usdAmount, createdAt} = data;

  return (
    <View style={styles.historyContainer}>
      <View style={styles.historyLeft}>
        <FastImage source={ICONS.sendIcon} style={styles.sendIcon} />
        <View style={styles.leftInner}>
          <Text style={styles.title}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.date}>{email}</Text>

          <Text style={styles.date}>
            {moment(createdAt).format('MMM DD, YYYY, h:mm:ss a')}
          </Text>
        </View>
      </View>

      <View style={styles.historyRight}>
        <Text style={styles.amount}>$ {parseFloat(usdAmount).toFixed(1)}</Text>
      </View>
    </View>
  );
};

export default SaleHistory;
