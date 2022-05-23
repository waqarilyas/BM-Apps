import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import {
  downloadExcelFile,
  getCustomersByMerchant,
} from '../../../shared/services/customer.service';
import {RootState} from '../../../shared/store';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import styles from './styles';
import {ICONS} from '../../../assets';
import AppLoader from '../../../shared/components/AppLoader';
import L from '../../../shared/utils/LanguageHandler';
import ShareModal from '../../../shared/components/ShareModal';
import {GenericNavigation} from '../../../shared/models/types';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

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

  const onDownloadExcel = async () => {
    console.log(`https://admin.blockmerchants.app/export/${merchantData?._id}`);
    Linking.openURL(
      `https://admin.blockmerchants.app/export/${merchantData?._id}`,
    );
    // try {
    //   const excel = await downloadExcelFile(merchantData?._id);
    //   const dirs =
    //     Platform.OS === 'ios'
    //       ? RNFS.LibraryDirectoryPath
    //       : RNFS.DownloadDirectoryPath; // android
    //   const downloadDest = `${dirs}/Sale-History.xlsx`;

    //   RNFetchBlob.fs.writeFile(downloadDest, excel.data, 'base64').then(rst => {
    //     Alert.alert(
    //       'Success',
    //       `Excel file downloaded to path \n${downloadDest}`,
    //       [
    //         {
    //           text: 'Open',
    //           onPress: () => {
    //             if (Platform.OS === 'android') {
    //               const android = RNFetchBlob.android;
    //               android.actionViewIntent(
    //                 `${downloadDest}`,
    //                 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //               );
    //             } else {
    //               RNFetchBlob.ios.openDocument(downloadDest);
    //             }
    //           },
    //           style: 'default',
    //         },
    //       ],
    //       {
    //         cancelable: true,
    //         onDismiss: () => {},
    //       },
    //     );
    //   });
    // } catch (error) {
    //   console.log('🚀 ~ file: index.tsx ~ line 59 ~ onDownloadExcel ~ error', {
    //     error,
    //   });
    // }
  };

  return (
    <>
      <AppHeader
        title={L('Sale History')}
        showBack={customers.length > 0}
        showDownload
        addAction={onDownloadExcel}
      />
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
        data={selectedItem}
        isVisible={Boolean(selectedItem)}
        onPressBackdrop={() => setSelectedItem(null)}
        onPressPhone={() => {
          props.navigation?.navigate('CustomerPhoneDetails', {
            data: selectedItem,
          });
          setSelectedItem(null);
        }}
        onPressEmail={() => {
          props.navigation?.navigate('CustomerEmailDetails', {
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
    </TouchableOpacity>
  );
};

export default SaleHistory;
