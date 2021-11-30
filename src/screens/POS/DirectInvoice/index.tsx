import Clipboard from '@react-native-clipboard/clipboard';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import {ICONS} from '../../../assets';
import {GetImageForCoin} from '../../../assets/coins';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import AppLoader from '../../../shared/components/AppLoader';
import ChooseCoinModal from '../../../shared/components/ChooseCoinModal';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {saveCustomer} from '../../../shared/services/customer.service';
import {
  AppShareContent,
  AppShowToast,
} from '../../../shared/services/helper.service';
import {RootState} from '../../../shared/store';
import {resetCart} from '../../../shared/store/reducers/posReducer';
import {setTaxEnabled} from '../../../shared/store/reducers/settingsReducer';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF, WP} from '../../../shared/theme/responsive';
import L from '../../../shared/utils/LanguageHandler';
import {CustomerInfoVS} from '../../../shared/utils/validations';
import styles from './styles';

interface Props extends GenericNavigation {}

const DirectInvoice = (props: Props) => {
  const [copied, setCopied] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [selectedCoin, setSelectedCoin]: any = useState();
  const [customTax, setCustomTax] = useState('');
  const [invoiceTax, setInvoiceTax] = useState(0);
  const [totalInvoiceAmount, setTotalInvoiceAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState(0);
  const [contact, setContact]: any = useState(null);
  const [currencyPrice, setcurrencyPrice] = useState(0);
  const [currentVisibleInput, setCurrentVisibleInput]: any = useState(null);
  const [loading, setLoading] = useState(false);

  let initialValues: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  const dispatch = useDispatch();

  const {wallet} = useSelector((state: RootState) => state.wallet);
  const {merchantData} = useSelector((state: RootState) => state.user);
  const {taxEnabled} = useSelector((state: RootState) => state.settings);
  const toggleModal = () => setShowCurrencyModal(!showCurrencyModal);

  const onSelectCoin = (coin: any) => {
    setShowCurrencyModal(false);
    setSelectedCoin(coin);
    setCopied(false);
  };

  const onPressAddress = () => {
    setCopied(true);
    AppShowToast(L('Copied'));
    Clipboard.setString(contact ? contact.address : selectedCoin?.address);
  };

  const handleCustomerData = (values: any, {resetForm}: any) => {
    Keyboard.dismiss();
    setLoading(true);

    values.merchantId = merchantData?._id;
    values.usdAmount = String(totalInvoiceAmount);

    saveCustomer(values)
      .then(res => {
        // dispatch(setMerchantData(res?.data));
        // dispatch(setMerchantEnabledState(true));
        console.log('---values---', res);
        Toast.show({
          text1: L('Successfull'),
          text2: L('Customer Details saved successfully'),
          type: 'success',
        });
        // console.log('----action----', action);

        resetForm();
        // resetCustomerValues();
        // handleSubmit();
        dispatch(resetCart());
        // props.navigation?.goBack();
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

  const handleTaxEnabled = () => {
    Alert.alert(
      L('Confirm'),
      `${L('Are you sure you want to ')} ${
        taxEnabled
          ? 'disable Algorithmic Protection Fee '
          : 'enable Algorithmic Protection Fee'
      }?`,
      [
        {
          text: L('Cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: L('OK'),
          onPress: () => {
            dispatch(setTaxEnabled(taxEnabled ? false : true));
            setCustomTax('');
            Toast.show({
              text1: L('Successfull'),
              text2: `${L('Successfully')}  ${
                taxEnabled ? L('Disabled') : L('Enabled')
              } Algorithmic Protection Fee`,
              type: 'success',
            });
          },
        },
      ],
    );
  };

  useEffect(() => {
    setSelectedCoin(wallet[0]);
  }, []);

  useEffect(() => {
    let total;

    total = customAmount;

    if (invoiceTax > 0) {
      const tax = (total * invoiceTax) / 100;
      setTotalInvoiceAmount(total + tax);
      total = total + tax;
    } else {
      setTotalInvoiceAmount(customAmount);
    }

    if (customTax > 0) {
      total = total + customTax;
      setTotalInvoiceAmount(total);
    }

    let priceInUSD = total / selectedCoin?.chart_data?.rate;

    setcurrencyPrice(priceInUSD);
  }, [customAmount, invoiceTax, customTax, selectedCoin]);

  return (
    <View style={styles.mainContainer}>
      <AppHeader
        title={L('Direct Invoice')}
        customRightView={
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.rightIconContainer}
              onPress={() => props?.navigation?.navigate('SaleHistory')}>
              <FastImage
                source={ICONS.historyIcon}
                style={styles.historyIcon}
                resizeMode="contain"
                tintColor={THEME.COLORS.white}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rightButton}
              onPress={() => props?.navigation?.navigate('POSMain')}>
              <Text style={styles.rightText}>Products</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always">
        <Text style={styles.label}>{L('Select Coin')}:</Text>
        <TouchableOpacity onPress={toggleModal} style={styles.optionContainer}>
          <FastImage
            source={GetImageForCoin(selectedCoin?.coin_symbol)}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.coinIcon}
          />
          <View style={{flex: 1}}>
            <Text style={{color: THEME.COLORS.white}}>
              {contact ? contact.name : selectedCoin?.coin_name}
            </Text>
          </View>
        </TouchableOpacity>

        <AppInput
          placeholder={L('Enter Amount USD')}
          keyboardType="decimal-pad"
          returnKeyType="done"
          onChangeText={text => {
            if (text.length == 0) {
              setCustomAmount(0);
              setCurrentVisibleInput(null);
              return;
            }
            setCustomAmount(parseFloat(text));
            setCurrentVisibleInput(2);
          }}
        />

        {currentVisibleInput >= 2 && (
          <AppInput
            placeholder={`${L('Tax')} %`}
            keyboardType="decimal-pad"
            returnKeyType="done"
            onChangeText={text => {
              if (text.length == 0) {
                setInvoiceTax(0);
                return;
              }
              setInvoiceTax(parseFloat(text));
              setCurrentVisibleInput(3);
            }}
          />
        )}

        {currentVisibleInput == '3' && (
          <View style={styles.apfeeContainer}>
            <AppInput
              placeholder="Algorithmic Protection Fee"
              keyboardType="decimal-pad"
              value={String(customTax)}
              returnKeyType="done"
              editable={taxEnabled}
              inputStyle={[styles.apInput, !taxEnabled && {opacity: 0.5}]}
              onChangeText={p => {
                if (p.length == 0) {
                  // setCustomTax(0);
                  // setCurrentVisibleInput(2);
                  return;
                }
                setCustomTax(parseFloat(p));
              }}
            />
            <ToggleSwitch
              isOn={taxEnabled}
              onColor={THEME.COLORS.accentBlue}
              offColor={THEME.COLORS.textLight}
              size="medium"
              onToggle={handleTaxEnabled}
            />
          </View>
        )}

        <View style={styles.middleContainer}>
          <View style={styles.middleLeft}>
            <View style={styles.amountContainer}>
              <Text style={styles.amountBTC}>
                {currencyPrice} {selectedCoin?.coin_symbol?.toUpperCase()}
              </Text>
              <Text style={styles.amountUSD}>${totalInvoiceAmount} USD</Text>
            </View>

            <View style={styles.qrContainer}>
              <QRCode
                size={WP(25)}
                value={`${selectedCoin?.address}?value=${totalInvoiceAmount}`}
              />
            </View>
          </View>

          <View style={styles.middleRight}>
            <Text style={styles.instruction}>
              {L('Use the address below to receive funds.')}
            </Text>
            <Pressable style={styles.keyContainer} onPress={onPressAddress}>
              <Text numberOfLines={1} style={styles.keyText}>
                {contact ? contact.address : selectedCoin?.address}
              </Text>
            </Pressable>
            {copied && (
              <View style={styles.copiedContainer}>
                <FastImage
                  source={ICONS.TICK}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: RF(20), height: RF(20)}}
                />
                <Text style={styles.copied}>{L('Copied')}</Text>
              </View>
            )}
            <PrimaryButton
              icon="share"
              title={L('Share')}
              onPress={() =>
                AppShareContent(
                  selectedCoin?.address,
                  'Sharing wallet address for receiving funds',
                )
              }
              buttonStyle={styles.shareButton}
              textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
            />
          </View>
        </View>
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
            <View style={styles.personalContainer}>
              <Text style={styles.personalTitle}>
                Customer Information{' '}
                <Text style={styles.optionalText}>(Optional)</Text>
              </Text>
              <View style={styles.nameContainer}>
                <View
                  style={{
                    // backgroundColor: 'red',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: 10,
                  }}>
                  {touched.firstName && errors.firstName ? (
                    <Text style={styles.errors}>{errors.firstName}</Text>
                  ) : null}

                  <AppInput
                    placeholder="First Name"
                    value={values.firstName}
                    // inputStyle={{width: '48%'}}
                    onChangeText={handleChange('firstName')}
                  />
                </View>
                <View
                  style={{
                    // backgroundColor: 'yellow',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  {touched.lastName && errors.lastName ? (
                    <Text style={styles.errors}>{errors.lastName}</Text>
                  ) : null}

                  <AppInput
                    placeholder="Last Name"
                    value={values.lastName}
                    // inputStyle={{width: '48%'}}
                    onChangeText={handleChange('lastName')}
                  />
                </View>
              </View>

              {touched.phone && errors.phone ? (
                <Text style={styles.errors}>{errors.phone}</Text>
              ) : null}
              <AppInput
                placeholder="Phone"
                keyboardType="number-pad"
                value={values.phone}
                onChangeText={handleChange('phone')}
              />
              {touched.email && errors.email ? (
                <Text style={styles.errors}>{errors.email}</Text>
              ) : null}

              <AppInput
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange('email')}
              />

              <PrimaryButton
                title={L('Confirm Payment')}
                onPress={handleSubmit}
                buttonStyle={styles.confirmButton}
                textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <ChooseCoinModal
        isVisible={showCurrencyModal}
        onPressBackdrop={toggleModal}
        onPressCoin={onSelectCoin}
        data={wallet}
        onSelectContact={(con: any) => setContact(con)}
        renderContacts
      />
      <AppLoader isVisible={loading} />
    </View>
  );
};

export default DirectInvoice;
