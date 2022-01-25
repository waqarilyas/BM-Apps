import Clipboard from '@react-native-clipboard/clipboard';
import {useFocusEffect} from '@react-navigation/core';
import EventEmitter from 'events';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import {ANIMATIONS, ICONS} from '../../../assets';
import {GetImageForCoin} from '../../../assets/coins';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import ChooseCoinModal from '../../../shared/components/ChooseCoinModal';
import CustomAnimations from '../../../shared/components/CustomAnimations';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {getForwardAddresBook} from '../../../shared/services/forwardAddresses.service';
import {
  AppShareContent,
  AppShowToast,
} from '../../../shared/services/helper.service';
import {RootState} from '../../../shared/store';
import {setIsCustomerSaved} from '../../../shared/store/reducers/utilReducer';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF, WP} from '../../../shared/theme/responsive';
import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';

interface Props extends GenericNavigation {}

const DirectInvoice = (props: Props) => {
  const [copied, setCopied] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [selectedCoin, setSelectedCoin]: any = useState();
  const [customTax, setCustomTax]: any = useState();
  const [invoiceTax, setInvoiceTax] = useState(0);
  const [totalInvoiceAmount, setTotalInvoiceAmount] = useState<number | string>(
    0,
  );
  const [customAmount, setCustomAmount] = useState<any>(0);
  const [contact, setContact]: any = useState(null);
  const [currencyPrice, setcurrencyPrice] = useState<number | string>(0);
  const [currentVisibleInput, setCurrentVisibleInput]: any = useState(null);
  const [disableConfirmPayment, setDisableConfirmPayment] = useState(false);
  const [taxEnabled, setTaxEnabled] = useState(false);
  const [forwardAddressBook, setForwardAddressBook] = useState([]);

  const isLaunched = true;

  const dispatch = useDispatch();

  const {
    wallet: {wallet},
    user: {merchantData},
  } = useSelector((state: RootState) => state);
  const {isCustomerSaved} = useSelector((state: RootState) => state.util);
  // const {taxEnabled} = useSelector((state: RootState) => state.settings);
  const toggleModal = () => {
    Keyboard.dismiss();
    setShowCurrencyModal(!showCurrencyModal);
    // resetValues();
  };
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const lastNameRef = useRef();

  const resetValues = () => {
    setCustomAmount('');
    setCurrentVisibleInput(null);
    setcurrencyPrice(0);
    setTotalInvoiceAmount(0);
    setCustomTax(0);
    setTaxEnabled(false);
  };

  const onSelectCoin = (coin: any) => {
    console.log('bnshbavjhsVDSHG', coin);
    setShowCurrencyModal(false);
    setSelectedCoin(coin);
    setCopied(false);
  };

  const onPressAddress = () => {
    setCopied(true);
    AppShowToast(L('Copied'));
    Clipboard.setString(contact ? contact.address : selectedCoin?.address);
  };

  const onPressAddCustomer = () => {
    if (customAmount === '0') {
      Toast.show({
        text1: L('Failed'),
        text2: L('Amount cannot be zero'),
        type: 'error',
      });
    } else if (customAmount == '') {
      Toast.show({
        text1: L('Failed'),
        text2: L('Please Enter Amount'),
        type: 'error',
      });
    } else if (taxEnabled && !customTax) {
      Toast.show({
        text1: L('Failed'),
        text2: L('Enter Protection Fee'),
        type: 'error',
      });
    } else {
      props.navigation?.navigate('CustomerInfo', {
        totalInvoiceAmount,
      });
    }
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
            setTaxEnabled(taxEnabled ? false : true);
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

  const onConfirmPayment = () => {
    Keyboard.dismiss();
    if (customAmount === '0') {
      Toast.show({
        text1: L('Failed'),
        text2: L('Amount cannot be zero'),
        type: 'error',
      });
    } else if (customAmount == '') {
      Toast.show({
        text1: L('Failed'),
        text2: L('Please Enter Amount'),
        type: 'error',
      });
    } else if (taxEnabled && !customTax) {
      Toast.show({
        text1: L('Failed'),
        text2: L('Enter Protection Fee'),
        type: 'error',
      });
    } else {
      Toast.show({
        text1: L('Success'),
        text2: L('Payment Confirmed Successfully'),
        type: 'success',
      });
      resetValues();
    }
  };
  const onShare = () => {
    AppShareContent(
      selectedCoin?.address,
      'Sharing wallet address for receiving funds',
    );
  };

  const getAllForwardAddresses = async () => {
    try {
      let res = await getForwardAddresBook(merchantData._id);
      console.log(res.data);
      setForwardAddressBook(res.data);
    } catch (error) {
      console.log('Error getting forward address book.');
    }
  };

  useEffect(() => {
    getAllForwardAddresses();
    setSelectedCoin(wallet[0]);
    setInvoiceTax(6);
  }, []);

  useEffect(() => {
    if (isCustomerSaved) {
      resetValues();
      dispatch(setIsCustomerSaved(false));
    }
  }, [isCustomerSaved]);

  useEffect(() => {
    let total;

    total = Number(customAmount);

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

    console.log('--usd price---', selectedCoin?.chart_data?.rate);

    setcurrencyPrice(priceInUSD);
  }, [customAmount, invoiceTax, customTax, selectedCoin]);

  return isLaunched ? (
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
              <Text style={styles.rightText}>{L('Products')}</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always">
        <Text style={styles.label}>{L('Select Coin')}:</Text>
        <Pressable onPress={toggleModal} style={styles.optionContainer}>
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
        </Pressable>
        <AppInput
          placeholder={L('Enter Amount USD')}
          keyboardType="decimal-pad"
          value={customAmount}
          returnKeyType="done"
          inputStyle={{marginVertical: 0}}
          onChangeText={text => {
            if (text.length == 0) {
              setDisableConfirmPayment(true);
              resetValues();
              return;
            }
            setCustomAmount(text);
            setCurrentVisibleInput(2);
          }}
        />
        {currentVisibleInput >= 2 && (
          <View style={{marginVertical: 5}}>
            <AppInput
              placeholder={`${L('Tax')} %`}
              keyboardType="decimal-pad"
              returnKeyType="done"
              editable={false}
              value={`${String(invoiceTax)}%`}
              onChangeText={text => {
                console.log('--inside on change--', text);

                if (text.length == 0) {
                  setInvoiceTax(0);
                  return;
                }
                setInvoiceTax(parseFloat(text));
                setCurrentVisibleInput(3);
              }}
            />
          </View>
        )}

        {currentVisibleInput >= 2 && (
          <View style={styles.apfeeContainer}>
            <AppInput
              placeholder={L('Algorithmic Protection Fee')}
              keyboardType="decimal-pad"
              // value={customTax ? String(customTax) : ''}
              returnKeyType="done"
              editable={taxEnabled}
              inputStyle={[styles.apInput, !taxEnabled && {opacity: 0.5}]}
              onChangeText={p => {
                if (p.length == 0) {
                  setCustomTax(0);
                  // setCurrentVisibleInput(2);
                  return;
                }
                setCustomTax(parseFloat(p));
              }}
              onSubmitEditing={() => setCustomTax(customTax)}
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
                {parseFloat(String(currencyPrice)).toFixed(6)}{' '}
                {selectedCoin?.coin_symbol?.toUpperCase()}
              </Text>
              <Text style={styles.amountUSD}>
                ${parseFloat(String(totalInvoiceAmount)).toFixed(6)} USD
              </Text>
            </View>

            <View style={styles.qrContainer}>
              <QRCode
                size={WP(35)}
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
              onPress={onShare}
              buttonStyle={styles.shareButton}
              textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
            />
          </View>
        </View>
        <PrimaryButton
          title={L('Add Customer Info')}
          onPress={onPressAddCustomer}
          buttonStyle={[styles.confirmButton]}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
        />
        <PrimaryButton
          title={L('Confirm Payment')}
          onPress={onConfirmPayment}
          buttonStyle={styles.confirmButton}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
        />

        <ChooseCoinModal
          isVisible={showCurrencyModal}
          onPressBackdrop={toggleModal}
          onPressCoin={onSelectCoin}
          data={wallet}
          onSelectContact={(con: any) => setContact(con)}
          renderContacts
          renderForwardAddressBook={true}
          forwardAddressBook={forwardAddressBook}
        />
      </KeyboardAwareScrollView>
    </View>
  ) : (
    <View style={styles.mainContainer}>
      <CustomAnimations visible={true} animation={ANIMATIONS.comingSoon} />
    </View>
  );
};

export default DirectInvoice;
