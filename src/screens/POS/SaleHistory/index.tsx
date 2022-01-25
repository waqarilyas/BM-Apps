import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
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
import L from '../../../shared/utils/LanguageHandler';
import Icon from 'react-native-vector-icons/EvilIcons';
import {THEME} from '../../../shared/theme';
import {RF} from '../../../shared/theme/responsive';
import ShareModal from '../../../shared/components/ShareModal';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import {GenericNavigation} from '../../../shared/models/types';

const SaleHistory = (props: GenericNavigation) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {merchantData} = useSelector((state: RootState) => state.user);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCustomersByMerchant(merchantData?._id)
      .then(res => {
        setCustomers(res.data);
      })
      .catch(err => {
        Toast.show({
          text1: L('Request Failed'),
          text2: 'Unable to get customers data',
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const sortedHistory = customers.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <>
      <AppHeader title={L('Sale History')} showBack />
      <View style={styles.container}>
        {customers.length > 0 ? (
          <FlatList
            data={sortedHistory}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <HistoryItem
                  data={item}
                  onPress={() => setSelectedItem(item)}
                />
              );
            }}
          />
        ) : (
          <View style={styles.empty}>
            <Text style={styles.title}>{L('No Customer Found')}</Text>
          </View>
        )}
      </View>
      <AppLoader isVisible={loading} />
      <ShareModal
        isVisible={Boolean(selectedItem)}
        onPressBackdrop={() => setSelectedItem(null)}
        onPressPhone={() => {
          props.navigation?.navigate('CustomerPhoneDetails', {
            data: selectedItem,
          });
          setSelectedItem(null);
        }}
      />
    </>
  );
};

const HistoryItem = ({data, onPress}: any) => {
  const {firstName, lastName, email, phone, usdAmount, createdAt} = data;

  return (
    <TouchableOpacity style={styles.historyContainer} onPress={onPress}>
      <View style={styles.historyLeft}>
        <FastImage source={ICONS.sendIcon} style={styles.sendIcon} />
        <View style={styles.leftInner}>
          {Boolean(firstName || lastName) && (
            <Text style={styles.title}>
              {firstName} {lastName}
            </Text>
          )}
          {Boolean(email) && <Text style={styles.date}>{email}</Text>}

          <Text style={styles.date}>
            {moment(createdAt).format('MMM DD, YYYY, h:mm:ss a')}
          </Text>
        </View>
      </View>

      <View style={styles.historyRight}>
        <Text style={styles.amount}>$ {parseFloat(usdAmount).toFixed(1)}</Text>
      </View>
      <View style={styles.shareContainer}>
        <Icon name="share-apple" color={THEME.COLORS.white} size={RF(30)} />
      </View>
    </TouchableOpacity>
  );
};

export default SaleHistory;
