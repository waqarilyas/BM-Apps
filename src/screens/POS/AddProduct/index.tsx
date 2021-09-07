import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {THEME} from '../../../shared/theme';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {RF} from '../../../shared/theme/responsive';
import GLOBAL_STYLE from '../../../shared/theme/global';
import ImageSelectionModal from '../../../shared/components/ImageSelectionModal';
import FastImage from 'react-native-fast-image';
import {Formik} from 'formik';
import {addProductVS} from '../../../shared/utils/validations';
import AppLoader from '../../../shared/components/AppLoader';
import {RootState} from '../../../shared/store';
import {useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {createNewProduct} from '../../../shared/services/merchant.service';
import Toast from 'react-native-toast-message';

interface Props {}

const initialValues: any = {
  title: '',
  price: '',
  category: '',
  tax: '',
};

const AddProduct = (props: Props) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genericError, setGenericError]: any = useState(null);
  const {merchantData} = useSelector((state: RootState) => state.user);
  const {merchantShop} = useSelector((state: RootState) => state.user);

  const openPicker = () => setImageModalOpen(true);

  const handleData = (values: any, action: any) => {
    if (!image) {
      setGenericError('Please select your product image to continue');
      return;
    }
    setLoading(true);
    const params = [
      image && {
        name: 'photo',
        filename: 'vid.mp4',
        data: RNFetchBlob.wrap(
          decodeURIComponent(image?.path?.replace('file://', '')),
        ),
      },
      {
        name: 'title',
        data: values.title,
      },
      {
        name: 'price',
        data: values.price,
      },
      {
        name: 'merchantId',
        data: merchantData._id,
      },
      {
        name: 'shopId',
        data: merchantShop?._id,
      },
      {
        name: 'category',
        data: values.category,
      },
      {
        name: 'tax',
        data: values.tax,
      },
    ];
    createNewProduct(params)
      .uploadProgress((written, total) => {
        console.log('uploaded', written / total);
      })
      .then(response => response.json())
      .then(RetrivedData => {
        console.log('---retrieved data------', RetrivedData);
        Toast.show({
          text1: 'Success',
          text2: 'Your product has been saved successfully',
          type: 'success',
        });
        setLoading(false);
        props.navigation.goBack();
      })
      .catch(err => {
        console.log('---error----', err);
        setLoading(false);
        Toast.show({
          text1: 'Request Failed',
          text2: err?.response?.data?.message,
          type: 'error',
        });
      });
  };

  return (
    <>
      <AppHeader showBack title="Add Product" showCart />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          {image?.path && (
            <FastImage source={{uri: image?.path}} style={styles.image} />
          )}
          <LinearGradient
            colors={[
              THEME.COLORS.gradientTopColor,
              THEME.COLORS.gradientBottomColor,
            ]}
            style={styles.cameraContainer}>
            <Icon
              onPress={openPicker}
              name="camera-outline"
              size={RF(25)}
              style={styles.cameraIcon}
            />
          </LinearGradient>
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, action) => handleData(values, action)}
          validationSchema={addProductVS}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }: any) => (
            <>
              {touched.title && errors.title ? (
                <Text style={styles.errors}>{errors.title}</Text>
              ) : null}
              <AppInput
                placeholder="Title"
                onChangeText={handleChange('title')}
              />
              {touched.price && errors.price ? (
                <Text style={styles.errors}>{errors.price}</Text>
              ) : null}
              <AppInput
                placeholder="Price"
                keyboardType="number-pad"
                onChangeText={handleChange('price')}
              />
              {touched.tax && errors.tax ? (
                <Text style={styles.errors}>{errors.tax}</Text>
              ) : null}

              <AppInput
                keyboardType="number-pad"
                placeholder="Tax"
                onChangeText={handleChange('tax')}
              />
              {touched.category && errors.category ? (
                <Text style={styles.errors}>{errors.category}</Text>
              ) : null}
              <AppInput
                placeholder="Category"
                onChangeText={handleChange('category')}
              />
              {genericError ? (
                <Text style={[styles.errors, styles.gError]}>
                  {genericError}
                </Text>
              ) : null}
              <PrimaryButton
                title="Save"
                buttonStyle={styles.saveButton}
                textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
        <ImageSelectionModal
          visible={imageModalOpen}
          toggleSelection={() => setImageModalOpen(false)}
          handleImage={img => setImage(img)}
        />
        <AppLoader isVisible={loading} />
      </KeyboardAwareScrollView>
    </>
  );
};

export default AddProduct;
