import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {ICONS} from '../../../assets';
import {GetImageForCoin} from '../../../assets/coins';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import ChooseCoinModal from '../../../shared/components/ChooseCoinModal';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {saveCustomer} from '../../../shared/services/customer.service';
import {
  AppShareContent,
  AppShowToast,
  calculateTotal,
} from '../../../shared/services/helper.service';
import {RootState} from '../../../shared/store';
import {
  resetCart,
  resetCustomerInfo,
} from '../../../shared/store/reducers/posReducer';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF, WP} from '../../../shared/theme/responsive';
import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';

interface Props extends GenericNavigation {}

const Payment = (props: Props) => {
  const {type}: any = props?.route?.params;

  const [loading, setLoading] = useState(false);

  const [copied, setCopied] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState();

  const [customTax, setCustomTax] = useState(0);
  const [invoiceTax, setInvoiceTax] = useState(0);
  const [totalInvoiceAmount, setTotalInvoiceAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState<any>(0);
  const [contact, setContact] = useState(null);

  const [currencyPrice, setcurrencyPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  const {
    settings: {taxEnabled},
    user: {merchantData},
    wallet: {wallet},
    pos: {
      customerInfo,
      totalCartAmount,
      customPrice,
      APFee,
      totalTaxAmount,
      cart,
    },
  } = useSelector((state: RootState) => state);

  const toggleModal = () => setShowCurrencyModal(!showCurrencyModal);

  const onSelectCoin = (coin: any) => {
    let price = totalPrice / coin?.chart_data?.rate;
    setcurrencyPrice(price);
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
    if (currencyPrice === 0) {
      Toast.show({
        text1: L('Failed'),
        text2: L('Amount cannot be zero'),
        type: 'error',
      });
    } else {
      props.navigation?.navigate('CustomerInfo', {
        totalInvoiceAmount,
      });
    }
  };

  useEffect(() => {
    setSelectedCoin(wallet[0]);
    setTotalPrice(
      type == 'invoice'
        ? 0
        : customPrice
        ? calculateTotal(customPrice, APFee ? APFee : 0)
        : totalCartAmount + totalTaxAmount,
    );
  }, []);

  useEffect(() => {
    let total;

    if (type == 'invoice') {
      total = customAmount;
    } else {
      total = totalPrice;
    }

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
  }, [customAmount, totalPrice, invoiceTax, customTax, selectedCoin]);

  const addCustomerInfo = () => {
    try {
      console.log('==================');
      setLoading(true);
      const params = [
        customerInfo?.photo && {
          name: 'photo',
          filename: 'vid.mp4',
          data: RNFetchBlob.wrap(
            decodeURIComponent(customerInfo?.photo?.replace('file://', '')),
          ),
        },
        {
          name: 'merchantId',
          data: merchantData?._id,
        },
        {
          name: 'usdAmount',
          data: String(
            type == 'invoice' || customPrice
              ? totalInvoiceAmount
              : totalCartAmount + totalTaxAmount,
          ),
        },

        {
          name: 'firstName',
          data: customerInfo?.firstName,
        },
        {
          name: 'lastName',
          data: customerInfo?.lastName,
        },
        {
          name: 'email',
          data: customerInfo?.email,
        },
        {
          name: 'phone',
          data: customerInfo?.phone,
        },
        {
          name: 'productIds',
          data: cart.map((p: any) => p._id).join(),
        },
        {
          name: 'assetUsed',
          data: selectedCoin?.coin_symbol?.toUpperCase(),
        },
        {
          name: 'assetPrice',
          data: String(currencyPrice),
        },
        {
          name: 'fiatPrice',
          data: String(selectedCoin?.chart_data?.rate),
        },
      ];

      saveCustomer(params)
        .uploadProgress((written, total) => {
          console.log('uploaded', written / total);
        })
        .then(response => {
          console.log('---response---', response);

          if (response.info().status === 413) {
            Toast.show({
              text1: L('Request Failed'),
              text2: L('Image is too large. Please select another one'),
              type: L('error'),
            });
          } else {
            Toast.show({
              text1: L('Success'),
              text2: L('Payment Confirmed Successfully'),
              type: 'success',
            });
          }

          response.json();
        })
        .then((res: any) => {
          // dispatch(setMerchantData(res?.data));
          // dispatch(setMerchantEnabledState(true));

          Toast.show({
            text1: L('Successful'),
            text2: L('Payment Confirmed successfully'),
            type: L('success'),
          });
          // console.log('----action----', action);

          setLoading(false);
          dispatch(resetCart());
          dispatch(resetCustomerInfo());
          props?.navigation?.navigate('POSMain');
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
    } catch (e) {
      console.log('Add Customer Info Error', e);
    }
  };

  const onConfirmPayment = () => {
    if (!customerInfo) {
      Alert.alert(
        L('Confirmation!'),
        L('Do You Want to Add Customer Information for this Sale?'),
        [
          {
            text: L('PROCEED WITHOUT CUSTOMER INFO'),
            onPress: () => {
              dispatch(resetCart());
              Toast.show({
                text1: L('Successful'),
                text2: L('Payment Confirmed successfully'),
                type: L('success'),
              });
              props?.navigation?.navigate('POSMain');
            },
            style: 'destructive',
          },
          {
            text: L('ADD INFORMATION'),
            onPress: () => {
              props.navigation?.navigate('CustomerInfo', {
                totalInvoiceAmount,
              });
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      addCustomerInfo();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <AppHeader title={L('Payment')} showBack />
      <ScrollView style={styles.container}>
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
          {/* <Icon name="chevron-down" size={24} color={THEME.COLORS.white} /> */}
        </TouchableOpacity>

        {type == 'invoice' && (
          <>
            <AppInput
              placeholder={L('Enter Amount USD')}
              keyboardType="decimal-pad"
              returnKeyType="done"
              onChangeText={text => {
                if (text.length == 0) {
                  setCustomAmount(0);
                  return;
                }
                setCustomAmount(parseFloat(text));
                // calculateTotal(parseFloat(text));
              }}
            />

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
              }}
            />

            {taxEnabled && (
              <AppInput
                placeholder="Algorithmic Protection Fee"
                keyboardType="decimal-pad"
                returnKeyType="done"
                onChangeText={p => {
                  if (p.length == 0) {
                    setCustomTax(0);
                    return;
                  }
                  setCustomTax(parseFloat(p));
                  // setTotalPrice(calculateTax(totalPrice, p) + totalPrice);
                }}
              />
            )}
          </>
        )}

        <View style={styles.amountContainer}>
          <Text style={styles.amountBTC}>
            {currencyPrice} {selectedCoin?.coin_symbol?.toUpperCase()}
          </Text>
          <Text style={styles.amountUSD}>
            $
            {type == 'invoice' || customPrice
              ? totalInvoiceAmount
              : totalCartAmount + totalTaxAmount}{' '}
            USD
          </Text>
        </View>

        {/* <FastImage
          source={ICONS.QRCODE}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.qr}
        /> */}
        <View style={styles.qrContainer}>
          <QRCode
            size={WP(40)}
            value={`${selectedCoin?.address}?value=${totalInvoiceAmount}`}
          />
        </View>
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
        {/* sdsdsd */}
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
        <PrimaryButton
          title={L('Add Customer Info')}
          onPress={onPressAddCustomer}
          buttonStyle={[styles.confirmButton]}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
        />

        <PrimaryButton
          // icon="share"
          title={L('Confirm Payment')}
          onPress={onConfirmPayment}
          buttonStyle={styles.confirmButton}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
          loading={loading}
        />
      </ScrollView>
      <ChooseCoinModal
        isVisible={showCurrencyModal}
        onPressBackdrop={toggleModal}
        onPressCoin={onSelectCoin}
        data={wallet}
        onSelectContact={(con: any) => setContact(con)}
        renderContacts
      />
    </View>
  );
};

export default Payment;
