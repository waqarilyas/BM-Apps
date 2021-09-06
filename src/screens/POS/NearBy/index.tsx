import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import {GenericNavigation} from '../../../shared/models/types';
import styles from './styles';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import {THEME} from '../../../shared/theme';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import {getAllShops} from '../../../shared/services/merchant.service';
import Toast from 'react-native-toast-message';
import AppLoader from '../../../shared/components/AppLoader';
import Geolocation from '@react-native-community/geolocation';
import ShopDetailsModal from '../../../shared/components/ShopDetailsModal';

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
          text1: 'Request Failed',
          text2: 'Unable to get shops data',
          type: 'error',
        });
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const animateToCurrentLocation = () => {
    try {
      Geolocation.getCurrentPosition(info => {
        const {latitude, longitude} = info.coords;

        mapRef?.current.animateToRegion(
          {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          1500,
        );
      });
    } catch (err) {
      console.log('---error---', err);
    }
  };

  console.log(selectedShop);

  return (
    <View style={styles.container}>
      <AppHeader title="Stores" />
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
