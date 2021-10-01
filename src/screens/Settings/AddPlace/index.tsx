import {Formik} from 'formik';
import React, {useState, useRef, useEffect} from 'react';
import {Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MapView, {Marker} from 'react-native-maps';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import AppLoader from '../../../shared/components/AppLoader';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {
  createNewShop,
  getMerchantShops,
} from '../../../shared/services/merchant.service';
import {RootState} from '../../../shared/store';
import {createShopVS} from '../../../shared/utils/validations';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import styles from './styles';
import {THEME} from '../../../shared/theme';
import L from '../../../shared/utils/LanguageHandler';

interface Props extends GenericNavigation {}

const initialValues: any = {
  name: '',
  category: '',
  phone: '',
  website: '',
  address: '',
  location: '',
};

const AddPlace = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [location, setLocation]: any = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const mapRef = useRef(null);

  const {merchantData} = useSelector((state: RootState) => state.user);

  const animateToCurrentLocation = (lat: any, lng: any) => {
    mapRef?.current.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      1000,
    );
  };

  const handleData = (values: any, action: any) => {
    setLoading(true);
    values.location = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
    values.merchantId = merchantData._id;

    createNewShop(values)
      .then(res => {
        Toast.show({
          text1: L('Successfull'),
          text2: L('Your shop has been created successfully'),
          type: 'success',
        });
        getMerchantShops();
        props.navigation?.goBack();
      })
      .catch(err => {
        Toast.show({
          text1: L('Request Failed'),
          text2: err?.response?.data?.message,
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <AppHeader showBack title={L('Add Store')} />
      <KeyboardAwareScrollView style={styles.container}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, action) => handleData(values, action)}
          validationSchema={createShopVS}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }: any) => (
            <>
              {touched.name && errors.name ? (
                <Text style={styles.errors}>{errors.name}</Text>
              ) : null}
              <AppInput
                placeholder={L('Name')}
                onChangeText={handleChange('name')}
              />
              {touched.category && errors.category ? (
                <Text style={styles.errors}>{errors.category}</Text>
              ) : null}
              <AppInput
                placeholder={L('Category')}
                // icon="keyboard-arrow-down"
                onChangeText={handleChange('category')}
              />
              {touched.address && errors.address ? (
                <Text style={styles.errors}>{errors.address}</Text>
              ) : null}
              <View style={styles.placesContainer}>
                <GooglePlacesAutocomplete
                  keepResultsAfterBlur
                  placeholder={L('Location')}
                  fetchDetails={true}
                  nearbyPlacesAPI="GoogleReverseGeocoding"
                  currentLocation={true}
                  enablePoweredByContainer={false}
                  textInputProps={{
                    placeholderTextColor: THEME.COLORS.textLight,
                  }}
                  onPress={(data, details = null) => {
                    setFieldValue('address', data.description);
                    setFieldValue('location', details?.geometry.location);
                    setLocation({
                      latitude: details?.geometry.location.lat,
                      longitude: details?.geometry.location.lng,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    });

                    animateToCurrentLocation(
                      details?.geometry.location.lat,
                      details?.geometry.location.lng,
                    );
                  }}
                  query={{
                    key: 'AIzaSyD4WnAd2vKKEzoDT3kzRRLststulXa1CXw',
                    language: 'en',
                  }}
                  styles={{
                    textInputContainer: styles.placesContainer,
                    textInput: styles.placesInput,
                    description: styles.placesText,
                    row: styles.placesRow,
                  }}
                />
              </View>
              {/* <AppInput placeholder="Find Location" icon="my-location" /> */}
              <View style={styles.mapView}>
                <MapView
                  ref={mapRef}
                  style={{flex: 1}}
                  initialRegion={location}
                  showsUserLocation={true}>
                  <Marker coordinate={location} draggable={true} />
                </MapView>
              </View>
              {touched.phone && errors.phone ? (
                <Text style={styles.errors}>{errors.phone}</Text>
              ) : null}
              <AppInput
                placeholder={L('Contact')}
                onChangeText={handleChange('phone')}
              />

              {touched.website && errors.website ? (
                <Text style={styles.errors}>{errors.website}</Text>
              ) : null}
              <AppInput
                placeholder={L('Website (optional)')}
                onChangeText={handleChange('website')}
              />
              {/* <Text style={styles.label}>Add Photos</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imagesContainer}>
          <ImageMiniPreview source={ICONS.DUMMY_MINI} />
          <ImageMiniPreview source={ICONS.IMAGE_PICKER} />
        </ScrollView> */}
              <PrimaryButton
                title={L('Add Shop')}
                buttonStyle={styles.addButton}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
        <AppLoader isVisible={loading} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddPlace;
