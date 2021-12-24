import {Formik} from 'formik';
import React, {useState} from 'react';
import {Keyboard, Text, View, EventEmitter} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import EventEmitter from 'EventEmitter'
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {saveCustomer} from '../../../shared/services/customer.service';
import {RootState} from '../../../shared/store';
import {resetCart} from '../../../shared/store/reducers/posReducer';
import {setIsCustomerSaved} from '../../../shared/store/reducers/utilReducer';
import GLOBAL_STYLE from '../../../shared/theme/global';
import L from '../../../shared/utils/LanguageHandler';
import {CustomerInfoVS} from '../../../shared/utils/validations';
import styles from './styles';

const CustomerInfo = (props: GenericNavigation) => {
  const [loading, setLoading] = useState(false);

  const {totalInvoiceAmount}: any = props.route?.params;

  const {merchantData} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  let initialValues: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  const handleCustomerData = (values: any, {resetForm}: any) => {
    Keyboard.dismiss();
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

    values.merchantId = merchantData?._id;
    values.usdAmount = String(totalInvoiceAmount);

    saveCustomer(values)
      .then(res => {
        // dispatch(setMerchantData(res?.data));
        // dispatch(setMerchantEnabledState(true));

        Toast.show({
          text1: L('Successfull'),
          text2: L('Customer Details saved successfully'),
          type: 'success',
        });
        // console.log('----action----', action);

        resetForm();
        setLoading(false);
        dispatch(resetCart());
        dispatch(setIsCustomerSaved(true));

        props.navigation?.goBack();
      })
      .catch(err => {
        Toast.show({
          text1: L('Request Failed'),
          text2: err?.response?.data?.message || err.message,
          type: 'error',
        });
      });
  };

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
              <View style={styles.personalContainer}>
                {touched.firstName && errors.firstName ? (
                  <Text style={styles.errors}>{L(errors.firstName)}</Text>
                ) : null}

                <AppInput
                  placeholder={L('First Name (Optional)')}
                  value={values.firstName}
                  // inputStyle={{width: '48%'}}
                  onChangeText={handleChange('firstName')}
                />

                {touched.lastName && errors.lastName ? (
                  <Text style={styles.errors}>{L(errors.lastName)}</Text>
                ) : null}

                <AppInput
                  placeholder={L('Last Name (Optional)')}
                  value={values.lastName}
                  // inputStyle={{width: '48%'}}
                  onChangeText={handleChange('lastName')}
                />

                {touched.phone && errors.phone ? (
                  <Text style={styles.errors}>{L(errors.phone)}</Text>
                ) : null}
                <AppInput
                  placeholder={L('Phone (Optional)')}
                  keyboardType={'number-pad'}
                  returnKeyType={'done'}
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                />
                {touched.email && errors.email ? (
                  <Text style={styles.errors}>{L(errors.email)}</Text>
                ) : null}

                <AppInput
                  placeholder={L('Email (Optional)')}
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
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </>
  );
};

export default CustomerInfo;
