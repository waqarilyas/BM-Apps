import {Formik} from 'formik';
import React, {useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import ImageSelectionModal from '../../../shared/components/ImageSelectionModal';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {RootState} from '../../../shared/store';
import {setCustomerInfo} from '../../../shared/store/reducers/posReducer';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF} from '../../../shared/theme/responsive';
import L from '../../../shared/utils/LanguageHandler';
import {CustomerInfoVS} from '../../../shared/utils/validations';
import styles from './styles';

const CustomerInfo = (props: GenericNavigation) => {
  const [loading, setLoading] = useState(false);
  const {totalInvoiceAmount}: any = props.route?.params;
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageError, setImageError] = useState(null);

  const {merchantData} = useSelector((state: RootState) => state.user);
  const {
    pos: {customerInfo},
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [image, setImage] = useState(
    customerInfo ? customerInfo?.photoData : null,
  );

  let initialValues: any = {
    firstName: __DEV__ ? 'John' : customerInfo ? customerInfo.firstName : '',
    lastName: customerInfo ? customerInfo.lastName : '',
    email: customerInfo ? customerInfo.email : '',
    phone: customerInfo ? customerInfo.phone : '',
  };

  const handleCustomerDataTemporarily = (values: any, {resetForm}: any) => {
    Keyboard.dismiss();
    if (!image) {
      setImageError(L('Please upload your liscence image to continue'));
      return;
    } else {
      setImageError(null);
    }

    setLoading(true);

    dispatch(
      setCustomerInfo({
        ...values,

        photo: image?.path,
        photoData: image,
        merchantId: merchantData?._id,
        usdAmount: String(totalInvoiceAmount),
      }),
    );

    setLoading(false);
    props.navigation?.goBack();
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
          // onSubmit={(values, action) => handleCustomerData(values, action)}
          onSubmit={(values, action) =>
            handleCustomerDataTemporarily(values, action)
          }
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
              <Text style={styles.liscenceText}>
                {L('Select licence photo')}
              </Text>
              <View style={styles.imageContainer}>
                {image && (
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
                  onChangeText={handleChange('firstName')}
                />

                {touched.lastName && errors.lastName ? (
                  <Text style={styles.errors}>{L(errors.lastName)}</Text>
                ) : null}

                <AppInput
                  placeholder={L('Last Name')}
                  value={values.lastName}
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
                title={L('Confirm Customer')}
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
