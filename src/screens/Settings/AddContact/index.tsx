import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {COINS} from '../../../assets/coins';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import ChooseCoinModal from '../../../shared/components/ChooseCoinModal';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {RootState} from '../../../shared/store';
import {THEME} from '../../../shared/theme';
import styles from './styles';
import {addAddressVS} from '../../../shared/utils/validations';
import {Formik} from 'formik';

import Toast from 'react-native-toast-message';
import {ProxyTypeSet} from 'immer/dist/internal';
import {GenericNavigation} from '../../../shared/models/types';
import {addContact} from '../../../shared/store/reducers/posReducer';
import QRCode from 'react-native-qrcode-svg';
import AppQRCodeScanner from '../../../shared/components/AppQRCodeScanner';
import L from '../../../shared/utils/LanguageHandler';

const initialValues: any = {
  name: '',
  address: '',
};

interface PROPS extends GenericNavigation {}

const AddContact = (props: PROPS) => {
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState();
  const [qrVisible, setQrVisible] = useState(false);
  const {wallet} = useSelector((state: RootState) => state.wallet);

  const dispatch = useDispatch();
  const toggleModal = () => setShowCurrencyModal(!showCurrencyModal);

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
      text1: L('Successfull'),
      text2: L('Contact added successfully!'),
      type: 'success',
    });
    props.navigation?.goBack();
  };

  useEffect(() => {
    setSelectedCoin(wallet[0]);
  }, []);

  return (
    <View style={styles.container}>
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
            <View style={styles.innerContainer}>
              {touched.name && errors.name ? (
                <Text style={styles.errors}>{errors.name}</Text>
              ) : null}

              <AppInput
                placeholder={L('Name')}
                onChangeText={handleChange('name')}
                value={values.name}
              />

              {touched.address && errors.address ? (
                <Text style={styles.errors}>{errors.address}</Text>
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
                  source={COINS.BTC}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.coinIcon}
                />
                <View style={{flex: 1}}>
                  <Text style={{color: THEME.COLORS.white}}>
                    {selectedCoin?.coin_name}(
                    {selectedCoin?.coin_symbol?.toUpperCase()})
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <PrimaryButton
              title={L('Add')}
              buttonStyle={styles.button}
              onPress={handleSubmit}
            />
            <AppQRCodeScanner
              isVisible={qrVisible}
              callBack={res => {
                console.log(res);
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
        selectedCoin={selectedCoin}
      />
    </View>
  );
};

export default AddContact;
