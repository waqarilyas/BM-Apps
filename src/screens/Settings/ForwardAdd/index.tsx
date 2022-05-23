import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import AppLoader from '../../../shared/components/AppLoader';
import ForwardAddCard from '../../../shared/components/ForwardAddCard';
import {GenericNavigation} from '../../../shared/models/types';
import {
  deleteAddress,
  getForwardAddresBook,
} from '../../../shared/services/forwardAddresses.service';
import {RootState} from '../../../shared/store';
import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';

const ForwardAdd = (props: GenericNavigation) => {
  const [loading, setLoading] = useState(false);
  const [addressBook, setAddressBook] = useState([]);
  const {merchantData} = useSelector((state: RootState) => state.user);
  const [reload, setReload] = useState(false);

  const onPressAdd = () => {
    props.navigation?.navigate('ForwardAddDetails');
  };

  const handleDelete = async (addressId: string) => {
    Alert.alert(
      L('Delete'),
      L('Are you sure to you want to delete this address?'),
      [
        {
          text: 'OK',
          onPress: async () => {
            try {
              setLoading(true);
              const recRes = await deleteAddress(addressId);

              Toast.show({
                text1: 'Successful',
                text2: 'Address deleted successfully',
                type: 'success',
              });
              setLoading(false);
              setReload(!reload);
            } catch (err) {
              Toast.show({
                text1: L('Request Failed'),
                text2: L(
                  'Unable to delete address at the moment. Please try again later',
                ),
                type: L('error'),
              });
              setLoading(false);
            }
          },
        },
        {
          text: L('Cancel'),
          onPress: () => setLoading(false),
          style: 'cancel',
        },
      ],
    );
  };

  const getInitialData = async () => {
    try {
      const recRes = await getForwardAddresBook(merchantData._id);
      setAddressBook(recRes.data);
    } catch (err) {
      Toast.show({
        text1: L('Request Failed'),
        text2: L('Unable to get address book. Please try again later'),
        type: L('error'),
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getInitialData();
    }, [reload]),
  );

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={L('Forward Add')}
        showBack
        showForwardAdd
        addAction={onPressAdd}
      />

      <FlatList
        data={addressBook}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <ForwardAddCard
              coinName={item?.walletName}
              coinImage={{uri: item?.coin?.icon?.url}}
              address={item.address}
              onDelete={() => handleDelete(item._id)}
            />
          );
        }}
      />
      <AppLoader isVisible={loading} />
      {/* <ScrollView style={styles.container}>

      </ScrollView> */}
    </View>
  );
};

export default ForwardAdd;
