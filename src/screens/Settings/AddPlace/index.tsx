import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import {GenericNavigation} from '../../../shared/models/types';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import ImageMiniPreview from '../../../shared/components/ImageMiniPreview';
import {ICONS} from '../../../assets';
import PrimaryButton from '../../../shared/components/PrimaryButton';

interface Props extends GenericNavigation {}

const AddPlace = (props: Props) => {
  const location = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <>
      <AppHeader showBack title="Add Place" />
      <KeyboardAwareScrollView style={styles.container}>
        <AppInput placeholder="Name" />
        <AppInput placeholder="Category" icon="keyboard-arrow-down" />
        <AppInput placeholder="Find Location" icon="my-location" />
        <View style={styles.mapView}>
          <MapView
            style={{flex: 1}}
            initialRegion={location}
            showsUserLocation={true}>
            <Marker coordinate={location} draggable={true} />
          </MapView>
        </View>
        <AppInput placeholder="Contact" />
        <AppInput placeholder="Website" />
        <Text style={styles.label}>Add Photos</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imagesContainer}>
          <ImageMiniPreview source={ICONS.DUMMY_MINI} />
          <ImageMiniPreview source={ICONS.IMAGE_PICKER} />
        </ScrollView>
        <PrimaryButton title="Add Place" buttonStyle={styles.addButton} />
      </KeyboardAwareScrollView>
    </>
  );
};

export default AddPlace;
