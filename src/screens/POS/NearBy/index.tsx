import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Callout, Marker} from 'react-native-maps';
import Toast from 'react-native-toast-message';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import AppLoader from '../../../shared/components/AppLoader';
import ShopDetailsModal from '../../../shared/components/ShopDetailsModal';
import {GenericNavigation} from '../../../shared/models/types';
import {getAllShops} from '../../../shared/services/merchant.service';
import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';

interface Props extends GenericNavigation {}

const NearBy = (props: Props) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    animateToCurrentLocation();

    getAllShops()
      .then(res => {
        setShops(res.data);
      })
      .catch(err => {
        Toast.show({
          text1: L('Request Failed'),
          text2: L('Unable to get shops data'),
          type: 'error',
        });
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const animateToCurrentLocation = async () => {
    try {
      Geolocation.getCurrentPosition(
        info => {
          const {latitude, longitude} = info.coords;

          mapRef?.current?.animateToRegion(
            {
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            2000,
          );
        },
        error => {
          console.log(error.code, error.message);
          Toast.show({
            text1: L('Request Failed'),
            text2: error.message,
            type: 'error',
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          showLocationDialog: true,
          forceRequestLocation: true,
        },
      );
    } catch (err) {
      console.log('---error---', err);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title={L('Stores')} />
      <View style={{flex: 1}}>
        <MapView
          showsUserLocation={true}
          ref={mapRef}
          style={{flex: 1, position: 'relative'}}>
          {shops.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => console.log('hello')}
                style={{backgroundColor: 'red'}}>
                <Marker key={index} coordinate={item.location}>
                  {/* <CustomMarker price={item.price} showPrice /> */}
                  <Callout
                    tooltip={true}
                    // onPress={() => setSelectedMarkerData(item)}
                    onPress={() => setSelectedShop(item)}>
                    <View style={[styles.calloutContainer]}>
                      {/* {photo && <CustomImage source={photo} style={styles.photo} />} */}
                      <Text>{item?.name}</Text>
                      <Text>{item.address}</Text>

                      {/* {desc && <TextComp color={gray} size={12} title={desc} />} */}
                    </View>
                  </Callout>
                </Marker>
              </TouchableOpacity>
            );
          })}
        </MapView>
        <TouchableOpacity
          style={styles.locationContainer}
          onPress={() => animateToCurrentLocation()}>
          <FastImage
            source={ICONS.MAP_LOCATION}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.locationImage}
          />
        </TouchableOpacity>
      </View>
      {/* <Pressable style={styles.nearByView}>
        <Icon name="chevron-up" size={24} color={THEME.COLORS.textLight} />
        <Text style={styles.text}>Nearby Stores</Text>
      </Pressable> */}
      <AppLoader isVisible={loading} />

      {selectedShop && (
        <ShopDetailsModal
          visible={selectedShop ? true : false}
          data={selectedShop}
          closeModal={() => setSelectedShop(null)}
        />
      )}
    </View>
  );
};

export default NearBy;
