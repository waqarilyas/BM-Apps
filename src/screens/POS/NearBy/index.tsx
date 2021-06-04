import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import {GenericNavigation} from '../../../shared/models/types';
import styles from './styles';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import {THEME} from '../../../shared/theme';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';

interface Props extends GenericNavigation {}

const NearBy = (props: Props) => {
  return (
    <View style={styles.container}>
      <AppHeader title="Stores" showBack />
      <View style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1, position: 'relative'}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <TouchableOpacity style={styles.locationContainer}>
          <FastImage
            source={ICONS.MAP_LOCATION}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.locationImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.nearByView}>
        <Icon name="chevron-up" size={24} color={THEME.COLORS.textLight} />
        <Text style={styles.text}>Nearby Stores</Text>
      </View>
    </View>
  );
};

export default NearBy;
