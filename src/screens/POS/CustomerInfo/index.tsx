import {Formik} from 'formik';
import React, {useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
// import EventEmitter from 'EventEmitter'
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import ImageSelectionModal from '../../../shared/components/ImageSelectionModal';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {saveCustomer} from '../../../shared/services/customer.service';
import {RootState} from '../../../shared/store';
import {resetCart} from '../../../shared/store/reducers/posReducer';
import {setIsCustomerSaved} from '../../../shared/store/reducers/utilReducer';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF} from '../../../shared/theme/responsive';
import L from '../../../shared/utils/LanguageHandler';
import {CustomerInfoVS} from '../../../shared/utils/validations';
import RNFetchBlob from 'rn-fetch-blob';

import styles from './styles';

const CustomerInfo = (props: GenericNavigation) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const {totalInvoiceAmount}: any = props.route?.params;
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageError, setImageError] = useState(null);

  const {merchantData} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  let initialValues: any = {
    firstName: __DEV__ ? 'John' : '',
    lastName: '',
    email: '',
    phone: '',
  };

  const handleCustomerData = (values: any, {resetForm}: any) => {
    Keyboard.dismiss();
    if (!image) {
      setImageError(L('Please upload your liscence image to continue'));
      return;
    } else {
      setImageError(null);
    }
    // if (totalInvoiceAmount == 0) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Failed',
    //     text2: 'Amount cannot be 0',
    //   });
    //   return;
    // }
    // if (taxEnabled && customTax == 0) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Failed',
    //     text2: 'Protection Fee cannot be 0',
    //   });
    //   return;
    // }

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
        name: 'merchantId',
        data: merchantData?._id,
      },
      {
        name: 'usdAmount',
        data: String(totalInvoiceAmount),
      },

      {
        name: 'firstName',
        data: values?.firstName,
      },
      {
        name: 'lastName',
        data: values.lastName,
      },
      {
        name: 'email',
        data: values.email,
      },
      {
        name: 'phone',
        data: values.phone,
      },
    ];

    try {
      saveCustomer(params)
        .uploadProgress((written, total) => {
          console.log('uploaded', written / total);
        })
        .then(response => {
          if (response.info().status === 413) {
            Toast.show({
              text1: L('Request Failed'),
              text2: L('Image is too large. Please select another one'),
              type: L('error'),
            });
          }

          response.json();
        })
        .then(res => {
          // dispatch(setMerchantData(res?.data));
          // dispatch(setMerchantEnabledState(true));

          Toast.show({
            text1: L('Successfull'),
            text2: L('Customer Details saved successfully'),
            type: L('Success'),
          });
          // console.log('----action----', action);

          resetForm();
          setLoading(false);
          dispatch(resetCart());
          dispatch(setIsCustomerSaved(true));

          props.navigation?.goBack();
        })
        .catch(err => {
          setLoading(false);
          console.log('Saving Customer Error', err);
          Toast.show({
            text1: L('Request Failed'),
            text2: err?.response?.data?.message || err.message,
            type: 'error',
          });
        });
    } catch (error) {
      setLoading(false);
      console.log('Saving Customer Error', error);
    }
  };

  const openPicker = () => setImageModalOpen(true);

  return (
    <>
      <AppHeader title={L('Customer Info')} showBack />
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, action) => handleCustomerData(values, action)}
          validationSchema={CustomerInfoVS}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }: any) => (
            <>
              <Text style={styles.liscenceText}>Select liscence photo</Text>
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

              <View style={styles.personalContainer}>
                {touched.firstName && errors.firstName ? (
                  <Text style={styles.errors}>{L(errors.firstName)}</Text>
                ) : null}

                <AppInput
                  placeholder={L('First Name')}
                  value={values.firstName}
                  // inputStyle={{width: '48%'}}
                  onChangeText={handleChange('firstName')}
                />

                {touched.lastName && errors.lastName ? (
                  <Text style={styles.errors}>{L(errors.lastName)}</Text>
                ) : null}

                <AppInput
                  placeholder={L('Last Name')}
                  value={values.lastName}
                  // inputStyle={{width: '48%'}}
                  onChangeText={handleChange('lastName')}
                />

                {touched.phone && errors.phone ? (
                  <Text style={styles.errors}>{L(errors.phone)}</Text>
                ) : null}
                <AppInput
                  placeholder={L('Phone')}
                  keyboardType={'number-pad'}
                  returnKeyType={'done'}
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                />
                {touched.email && errors.email ? (
                  <Text style={styles.errors}>{L(errors.email)}</Text>
                ) : null}

                <AppInput
                  placeholder={L('Email')}
                  value={values.email}
                  keyboardType={'email-address'}
                  onChangeText={handleChange('email')}
                />
              </View>
              <PrimaryButton
                title={L('Confirm Payment')}
                onPress={handleSubmit}
                buttonStyle={styles.confirmButton}
                textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
                loading={loading}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <ImageSelectionModal
        visible={imageModalOpen}
        toggleSelection={() => setImageModalOpen(false)}
        handleImage={img => setImage(img)}
      />
    </>
  );
};

export default CustomerInfo;
