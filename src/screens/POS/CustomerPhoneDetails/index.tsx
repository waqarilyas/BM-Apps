import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import AppLoader from '../../../shared/components/AppLoader';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {sendReceipt} from '../../../shared/services/customer.service';
import {RootState} from '../../../shared/store';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF} from '../../../shared/theme/responsive';
import L from '../../../shared/utils/LanguageHandler';

const CustomerPhoneDetails = (props: GenericNavigation) => {
  const {data} = props.route.params;

  const [phone, setPhone] = useState(__DEV__ ? '+923223333272' : '');
  const [error, setError]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const {merchantData} = useSelector((state: RootState) => state.user);

  const {firstName, lastName, usdAmount} = data;
  const validate = () => {
    if (phone.length == 0) {
      setError(L('Phone number cannot be empty'));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validate()) {
        return;
      }
      setLoading(true);
      const message = `Hi, ${firstName?.toUpperCase()} ${lastName?.toUpperCase()}, you did shopping for total sum of ${usdAmount}$ from  ${merchantData.firstName?.toUpperCase()} ${merchantData.lastName?.toUpperCase()} via BLOCKMERCHANTS.`;

      const recRes = await sendReceipt({
        message,
        to: phone,
      });
      Toast.show({
        text1: L('Successfull'),
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
      <AppHeader title={L('Phone details')} showBack />
      <View style={styles.container}>
        <Text style={styles.title}>
          {L("Enter the customer's phone details")}
        </Text>

        <AppInput
          placeholder={L('Phone Number')}
          value={phone}
          keyboardType="phone-pad"
          returnKeyType="done"
          onChangeText={(val: string) => setPhone(val)}
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
    // marginTop: RF(20),
  },
});

export default CustomerPhoneDetails;
