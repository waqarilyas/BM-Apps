import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {GetImageForCoin} from '../../../assets/coins';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import AppQRCodeScanner from '../../../shared/components/AppQRCodeScanner';
import ChooseCoinModal from '../../../shared/components/ChooseCoinModal';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {RootState} from '../../../shared/store';
import {addContact} from '../../../shared/store/reducers/posReducer';
import {THEME} from '../../../shared/theme';
import L from '../../../shared/utils/LanguageHandler';
import {addAddressVS} from '../../../shared/utils/validations';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import {RF} from '../../../shared/theme/responsive';
const initialValues: any = {
  name: '',
  address: '',
};

interface PROPS extends GenericNavigation {}

const AddContact = (props: PROPS) => {
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [selectedCoin, setSelectedCoin]: any = useState();
  const [qrVisible, setQrVisible] = useState(false);
  const {wallet} = useSelector((state: RootState) => state.wallet);

  const dispatch = useDispatch();
  const toggleModal = () => {
    Keyboard.dismiss();
    setShowCurrencyModal(!showCurrencyModal);
  };

  const onSelectCoin = (coin: any) => {
    setShowCurrencyModal(false);
    setSelectedCoin(coin);
  };

  const handleData = (values: any, actions: any) => {
    dispatch(
      addContact({
        name: values.name,
        address: values.address,
        coin: selectedCoin,
      }),
    );

    Toast.show({
      text1: L('Successful'),
      text2: L('Contact added successfully!'),
      type: 'success',
    });
    props.navigation?.goBack();
  };

  useEffect(() => {
    setSelectedCoin(wallet[0]);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <AppHeader showBack title={L('Add Contact')} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values, action) => handleData(values, action)}
        validationSchema={addAddressVS}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }: any) => (
          <>
            <ScrollView style={styles.innerContainer}>
              {touched.name && errors.name ? (
                <Text style={styles.errors}>{L(errors.name)}</Text>
              ) : null}

              <AppInput
                placeholder={L('Name')}
                onChangeText={handleChange('name')}
                value={values.name}
              />

              {touched.address && errors.address ? (
                <Text style={styles.errors}>{L(errors.address)}</Text>
              ) : null}
              <AppInput
                placeholder={L('Address')}
                onChangeText={handleChange('address')}
                icon="qr-code"
                onIconPress={() => setQrVisible(true)}
                value={values.address}
              />

              <TouchableOpacity
                onPress={toggleModal}
                style={styles.optionContainer}>
                <FastImage
                  source={GetImageForCoin(selectedCoin?.coin_symbol)}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.coinIcon}
                />
                <View style={{flex: 1}}>
                  <Text style={{color: THEME.COLORS.white}}>
                    {selectedCoin?.coin_name}(
                    {selectedCoin?.coin_symbol?.toUpperCase()})
                  </Text>
                </View>
                <View>
                  <Entypo
                    name="chevron-small-down"
                    size={RF(25)}
                    color={THEME.COLORS.white}
                  />
                </View>
              </TouchableOpacity>
            </ScrollView>
            <PrimaryButton
              title={L('Add')}
              buttonStyle={styles.button}
              onPress={handleSubmit}
            />
            <AppQRCodeScanner
              isVisible={qrVisible}
              callBack={res => {
                setQrVisible(false);
                setFieldValue('address', res.replace('ethereum:', ''));
              }}
            />
          </>
        )}
      </Formik>
      <ChooseCoinModal
        isVisible={showCurrencyModal}
        onPressBackdrop={toggleModal}
        onPressCoin={onSelectCoin}
        data={wallet}
      />
    </KeyboardAvoidingView>
  );
};

export default AddContact;
