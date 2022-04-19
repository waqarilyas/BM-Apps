import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import AppLoader from '../../../shared/components/AppLoader';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {sendReceiptViaEmail} from '../../../shared/services/customer.service';
import {AppShowToast} from '../../../shared/services/helper.service';
import {RootState} from '../../../shared/store';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF} from '../../../shared/theme/responsive';
import L from '../../../shared/utils/LanguageHandler';

const CustomerEmailDetails = (props: GenericNavigation) => {
  const {data} = props.route.params;

  const [email, setEmail] = useState(data?.email || '');
  const [error, setError]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const {merchantData} = useSelector((state: RootState) => state.user);

  const {firstName, lastName, usdAmount} = data;
  const validate = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    try {
      if (!validate()) {
        AppShowToast(L('Invalid email'));
        return;
      }
      setLoading(true);
      const message = `Hi, ${firstName?.toUpperCase()} ${lastName?.toUpperCase()}, you did shopping for total sum of ${usdAmount}$ from  ${merchantData.firstName?.toUpperCase()} ${merchantData.lastName?.toUpperCase()} via BLOCKMERCHANTS.`;
      const recRes = await sendReceiptViaEmail({
        message,
        to: email,
      });
      Toast.show({
        text1: L('Successful'),
        text2: L('Receipt sent successfully'),
        type: L('success'),
      });
      setLoading(false);
      props.navigation?.goBack();
    } catch (err) {
      Toast.show({
        text1: L('Request Failed'),
        text2: L(
          'Unable to send receipt to user at the moment. Please try again later',
        ),
        type: L('error'),
      });
      setLoading(false);
    }
  };

  return (
    <>
      <AppHeader title={L('Email Details')} showBack />
      <View style={styles.container}>
        <Text style={styles.title}>
          {L("Enter the customer's email details")}
        </Text>

        <AppInput
          placeholder={L('Email')}
          value={email}
          keyboardType="email-address"
          returnKeyType="done"
          onChangeText={(val: string) => setEmail(val)}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <View style={{flex: 1}} />
        <PrimaryButton
          title={L('Submit')}
          buttonStyle={styles.saveButton}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
          onPress={handleSubmit}
        />
      </View>
      <AppLoader isVisible={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
    paddingHorizontal: RF(10),
    paddingVertical: RF(5),
  },
  saveButton: {},
  title: {
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
    marginTop: RF(20),
  },
  error: {
    color: THEME.COLORS.red,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
});

export default CustomerEmailDetails;
