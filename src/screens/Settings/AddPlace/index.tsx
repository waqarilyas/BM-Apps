import {Formik} from 'formik';
import React, {useState, useRef, useEffect} from 'react';
import {
  Appearance,
  FlatList,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {getStoreCategories} from '../../../shared/services/customer.service';
import {Provider, Portal, Modal} from 'react-native-paper';
import {HP, RF} from '../../../shared/theme/responsive';
import {AppShowToast} from '../../../shared/services/helper.service';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Props extends GenericNavigation {}

const initialValues: any = {
  name: '',
  phone: '',
  website: '',
  address: '',
  location: '',
};

const AddPlace = (props: Props) => {
  const colorScheme = Appearance.getColorScheme();

  const [loading, setLoading] = useState(false);
  const [location, setLocation]: any = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [visible, setVisible] = useState(false);
  const [fromVisible, setFromVisible] = useState(false);
  const [toVisible, setToVisible] = useState(false);
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

  const openDropdown = () => {
    Keyboard.dismiss();
    setVisible(true);
  };

  const closeDropdown = () => setVisible(false);

  useEffect(() => {
    getStoreCategories().then(response => {
      if (response && response.data && response.data.length > 0) {
        setCategories(response.data);
      }
    });
  }, []);

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
    if (category.length < 1) {
      AppShowToast(L('Category is required.'));
      return;
    }

    if (fromTime.length < 1) {
      AppShowToast(L('Store Open Time required.'));
      return;
    }

    if (toTime.length < 1) {
      AppShowToast(L('Store Close Time required.'));
      return;
    }

    if (fromTime === toTime) {
      AppShowToast(L('Store Open Time and Close time can not be the same.'));
      return;
    }

    setLoading(true);
    values.location = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
    values.merchantId = merchantData._id;
    values.category = category;
    values.hours = fromTime + ' to ' + toTime;

    createNewShop(values)
      .then(res => {
        Toast.show({
          text1: L('Successful'),
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
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        style={styles.container}>
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
                <Text style={styles.errors}>{L(errors.name)}</Text>
              ) : null}
              <AppInput
                placeholder={L('Name')}
                onChangeText={handleChange('name')}
              />
              {touched.category && errors.category ? (
                <Text style={styles.errors}>{L(errors.category)}</Text>
              ) : null}
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  width: '100%',
                  borderRadius: 5,
                  height: HP(7),
                  paddingHorizontal: THEME.PADDING.LOW,
                  marginVertical: 10,
                  backgroundColor: THEME.COLORS.secondaryBackground,
                  justifyContent: 'center',
                }}
                onPress={openDropdown}>
                <Text
                  style={{
                    color: category
                      ? THEME.COLORS.white
                      : THEME.COLORS.textLight,
                    fontSize: RF(14),
                    paddingLeft: RF(14),
                  }}>
                  {category || L('Select Category')}
                </Text>
              </TouchableOpacity>

              {touched.address && errors.address ? (
                <Text style={styles.errors}>{L(errors.address)}</Text>
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
                    key: 'AIzaSyAeMZC49ZdsYYAi9zw_Rb-txHTpMsajLSM',
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

              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  width: '100%',
                  borderRadius: 5,
                  height: HP(7),
                  paddingHorizontal: THEME.PADDING.LOW,
                  marginVertical: 10,
                  backgroundColor: THEME.COLORS.secondaryBackground,
                  justifyContent: 'center',
                }}
                onPress={() => setFromVisible(true)}>
                <Text
                  style={{
                    color: fromTime
                      ? THEME.COLORS.white
                      : THEME.COLORS.textLight,
                    fontSize: RF(14),
                    paddingLeft: RF(14),
                  }}>
                  {fromTime || L('Select Store Open Time')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  width: '100%',
                  borderRadius: 5,
                  height: HP(7),
                  paddingHorizontal: THEME.PADDING.LOW,
                  marginVertical: 10,
                  backgroundColor: THEME.COLORS.secondaryBackground,
                  justifyContent: 'center',
                }}
                onPress={() => setToVisible(true)}>
                <Text
                  style={{
                    color: toTime ? THEME.COLORS.white : THEME.COLORS.textLight,
                    fontSize: RF(14),
                    paddingLeft: RF(14),
                  }}>
                  {toTime || L('Select Store Close Time')}
                </Text>
              </TouchableOpacity>

              {touched.phone && errors.phone ? (
                <Text style={styles.errors}>{L(errors.phone)}</Text>
              ) : null}
              <AppInput
                placeholder={L('Contact')}
                onChangeText={handleChange('phone')}
                keyboardType="number-pad"
                returnKeyType="done"
              />

              {touched.website && errors.website ? (
                <Text style={styles.errors}>{L(errors.website)}</Text>
              ) : null}
              <AppInput
                placeholder={L('Website (optional)')}
                onChangeText={handleChange('website')}
              />

              <DateTimePickerModal
                is24Hour
                isVisible={fromVisible}
                mode="time"
                locale="en_GB"
                isDarkModeEnabled={colorScheme === 'dark'}
                onConfirm={(time: Date) => {
                  setFromTime(time.toLocaleTimeString().substring(0, 5));
                  setFromVisible(false);
                }}
                onCancel={() => setFromVisible(false)}
              />

              <DateTimePickerModal
                is24Hour
                isVisible={toVisible}
                mode="time"
                locale="en_GB"
                isDarkModeEnabled={colorScheme === 'dark'}
                onConfirm={(time: Date) => {
                  setToTime(time.toLocaleTimeString().substring(0, 5));
                  setToVisible(false);
                }}
                onCancel={() => setToVisible(false)}
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

        <Provider>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={closeDropdown}
              contentContainerStyle={{
                flex: 1,
                backgroundColor: THEME.COLORS.secondaryBackground,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  paddingVertical: RF(20),
                  fontFamily: THEME.FONTS.TYPE.SEMIBOLD,
                  fontSize: THEME.FONTS.SIZE.SMALL,
                  color: THEME.COLORS.white,
                }}>
                {L('Select Category')}:
              </Text>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={categories}
                renderItem={({item}: any) => {
                  let selected = item.name === category;

                  return (
                    <TouchableOpacity
                      style={{paddingTop: RF(20)}}
                      onPress={() => {
                        setCategory(item.name);
                        closeDropdown();
                      }}>
                      <Text
                        style={{
                          paddingHorizontal: RF(20),
                          paddingBottom: RF(20),
                          color: THEME.COLORS.white,
                        }}>
                        {selected && '◉'} {item.name}
                      </Text>
                      <View
                        style={{
                          height: 1,
                          opacity: 0.2,
                          backgroundColor: THEME.COLORS.white,
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </Modal>
          </Portal>
        </Provider>
        <AppLoader isVisible={loading} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddPlace;
