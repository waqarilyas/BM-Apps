import {Formik} from 'formik';
import React, {useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import AppLoader from '../../../shared/components/AppLoader';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {createNewMerchant} from '../../../shared/services/merchant.service';
import {
  setMerchantData,
  setMerchantEnabledState,
} from '../../../shared/store/reducers/userReducer';
import L from '../../../shared/utils/LanguageHandler';
import {createMerchantVS} from '../../../shared/utils/validations';
import styles from './styles';

interface Props extends GenericNavigation {}

const initialValues: any = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
};

const EnableMerchant = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {walletAddress} = useSelector((state: RootStateOrAny) => state.wallet);

  const handleData = (values: any, action: any) => {
    setLoading(true);
    values.walletAddress = walletAddress;

    createNewMerchant(values)
      .then(res => {
        Keyboard.dismiss();

        dispatch(setMerchantData(res?.data));
        dispatch(setMerchantEnabledState(true));
        Toast.show({
          text1: L('Successfull'),
          text2: L('Your merchant account enabled successfully'),
          type: 'success',
        });
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
      <AppHeader showBack title={L('Enable Merchant')} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        style={styles.container}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, action) => {
            handleData(values, action);
          }}
          validationSchema={createMerchantVS}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }: any) => (
            <>
              {touched.firstName && errors.firstName ? (
                <Text style={styles.errors}>{L(errors.firstName)}</Text>
              ) : null}

              <AppInput
                placeholder={L('First Name')}
                onChangeText={handleChange('firstName')}
              />

              {touched.lastName && errors.lastName ? (
                <Text style={styles.errors}>{L(errors.lastName)}</Text>
              ) : null}
              <AppInput
                placeholder={L('Last Name')}
                onChangeText={handleChange('lastName')}
              />

              {touched.email && errors.email ? (
                <Text style={styles.errors}>{L(errors.email)}</Text>
              ) : null}
              <AppInput
                placeholder={L('Email')}
                onChangeText={handleChange('email')}
                keyboardType="email-address"
              />

              {touched.phoneNumber && errors.phoneNumber ? (
                <Text style={styles.errors}>{L(errors.phoneNumber)}</Text>
              ) : null}
              <AppInput
                placeholder={L('Phone Number')}
                onChangeText={handleChange('phoneNumber')}
                returnKeyType={'done'}
                keyboardType="number-pad"
              />

              {touched.address && errors.address ? (
                <Text style={styles.errors}>{L(errors.address)}</Text>
              ) : null}

              <AppInput
                placeholder={L('POS Address')}
                onChangeText={handleChange('address')}
              />

              <PrimaryButton
                title={L('Create Merchant')}
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

export default EnableMerchant;
