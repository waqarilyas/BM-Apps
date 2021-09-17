//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {COINS, GetImageForCoin} from '../../../assets/coins';
import {useSelector} from 'react-redux';
import {RootState} from '../../../shared/store';
import {Coin, GenericNavigation} from '../../../shared/models/types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppShowToast} from '../../../shared/services/helper.service';
import Clipboard from '@react-native-clipboard/clipboard';

interface PROPS extends GenericNavigation {}

const AddressBook = (props: PROPS) => {
  const {wallet} = useSelector((state: RootState) => state.wallet);
  const {contacts} = useSelector((state: RootState) => state.pos);
  const [addresses, setAddresses] = useState([]);
  const [selectedFilter, setSelectedFilter]: any = useState(null);
  const [copied, setCopied] = useState(false);

  const onPressAddress = (address: any) => {
    setCopied(true);
    AppShowToast('Copied');
    Clipboard.setString(address);
  };

  const handleFilterSelect = (coin: Coin) => {
    setSelectedFilter(coin);
  };

  useEffect(() => {
    handleFilterSelect(wallet[0]);
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader title="Address Book" showBack />

      <View style={styles.middleContainer}>
        <View style={styles.filtersRow}>
          <FlatList
            data={wallet}
            horizontal
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              const selected =
                item?.coin_symbol === selectedFilter?.coin_symbol;

              return (
                <FilterCard
                  image={GetImageForCoin(item?.coin_symbol)}
                  name={item?.coin_symbol.toUpperCase()}
                  selected={selected}
                  onPress={() => handleFilterSelect(item)}
                />
              );
            }}
          />
        </View>

        <FlatList
          data={contacts}
          ListHeaderComponent={() => {
            return <Text style={styles.listHeader}>Your Addresses</Text>;
          }}
          ListEmptyComponent={() => (
            <Text style={[styles.address, {textAlign: 'center'}]}>
              No address found!
            </Text>
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            const shown =
              item?.coin?.coin_symbol === selectedFilter?.coin_symbol;
            if (shown)
              return (
                <AddressCard
                  name={item.name}
                  address={item.address}
                  onPress={() => onPressAddress(item?.address)}
                />
              );
          }}
        />
      </View>
      <PrimaryButton
        title="Add Contact"
        buttonStyle={styles.addButton}
        onPress={() => props?.navigation?.navigate('AddContact')}
      />
    </View>
  );
};

const FilterCard = ({
  image,
  name,
  selected,
  onPress,
}: {
  image: any;
  name: string;
  selected: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={[styles.filterContainer, selected && styles.selectedFilter]}
      onPress={onPress}>
      <FastImage
        source={image}
        style={styles.selectionImage}
        resizeMode="contain"
      />
      <Text style={styles.selectionName}>{name}</Text>
    </TouchableOpacity>
  );
};

const AddressCard = ({
  name,
  address,
  onPress,
}: {
  name: string;
  address: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={[styles.addressContainer]} onPress={onPress}>
      <Text style={styles.addressName}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
    </TouchableOpacity>
  );
};

export default AddressBook;
