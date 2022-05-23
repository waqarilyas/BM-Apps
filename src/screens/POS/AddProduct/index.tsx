import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Keyboard} from 'react-native';
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
import L from '../../../shared/utils/LanguageHandler';

interface Props {}

const initialValues: any = {
  title: '',
  price: '',
  category: '',
  tax: '0',
};

const AddProduct = (props: Props) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genericError, setGenericError]: any = useState(null);
  const [imageError, setImageError] = useState(null);
  const {merchantData} = useSelector((state: RootState) => state.user);
  const {merchantShop} = useSelector((state: RootState) => state.user);
  const scrollRef = useRef();

  const openPicker = () => setImageModalOpen(true);

  const handleData = (values: any, action: any) => {
    Keyboard.dismiss();
    if (values.price == 0) {
      action.setFieldError('price', L('Price cannot be 0'));
      return;
    }

    if (!image) {
      setImageError(L('Please select your product image to continue'));
      return;
    } else {
      setImageError(null);
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
      .then(response => {
        if (response.info().status === 413) {
          Toast.show({
            text1: L('Request Failed'),
            text2: L('Image is too large. Please select another one'),
            type: 'error',
          });
        }

        response.json();
      })
      .then(RetrivedData => {
        Toast.show({
          text1: L('Successful'),
          text2: L('Your product has been saved successfully'),
          type: 'success',
        });
        setLoading(false);
        props.navigation?.navigate('POSMain');
      })
      .catch(err => {
        console.log('--error ----', err);

        setLoading(false);
        Toast.show({
          text1: L('Request Failed'),
          text2: err?.response?.data?.message,
          type: 'error',
        });
      });
  };

  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      scrollRef?.current?.scrollToEnd({animated: true});
    });

    return () => {
      hideSubscription.remove();
    };
  }, [Keyboard]);

  return (
    <View style={styles.mainContainer}>
      <AppHeader showBack title={L('Add Product')} showCart />
      <KeyboardAwareScrollView
        style={styles.container}
        ref={scrollRef}
        keyboardShouldPersistTaps="always">
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
        {imageError && <Text style={styles.errors}>{imageError}</Text>}

        <Formik
          initialValues={initialValues}
          onSubmit={(values, action) => handleData(values, action)}
          validationSchema={addProductVS}>
          {({errors, touched, handleChange, handleSubmit}: any) => (
            <>
              {touched.title && errors.title ? (
                <Text style={styles.errors}>{L(errors.title)}</Text>
              ) : null}
              <AppInput
                placeholder={L('Title')}
                onChangeText={handleChange('title')}
              />
              {touched.price && errors.price ? (
                <Text style={styles.errors}>{L(errors.price)}</Text>
              ) : null}
              <AppInput
                placeholder={L('Enter Amount USD')}
                keyboardType="decimal-pad"
                onChangeText={handleChange('price')}
                returnKeyType="done"
              />
              {touched.tax && errors.tax ? (
                <Text style={styles.errors}>{L(errors.tax)}</Text>
              ) : null}

              <AppInput
                keyboardType="decimal-pad"
                placeholder={`${L('Tax')} %`}
                onChangeText={handleChange('tax')}
                returnKeyType="done"
              />
              {touched.category && errors.category ? (
                <Text style={styles.errors}>{L(errors.category)}</Text>
              ) : null}
              <AppInput
                placeholder={L('Category')}
                onChangeText={handleChange('category')}
              />
              {genericError ? (
                <Text style={[styles.errors, styles.gError]}>
                  {genericError}
                </Text>
              ) : null}
              <PrimaryButton
                title={L('Save')}
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
    </View>
  );
};

export default AddProduct;
