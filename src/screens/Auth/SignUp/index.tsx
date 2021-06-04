import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  DeviceEventEmitter,
} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import Logo from '../../../shared/components/Logo';
import styles from './styles';
import {GenericNavigation} from '../../../shared/models/types';
import {CheckBox} from 'react-native-elements';
import AppInput from '../../../shared/components/AppInput';
import {THEME} from '../../../shared/theme';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface Props extends GenericNavigation {}

const SignUp = (props: Props) => {
  const [ageCheck, setAgeCheck] = useState(false);
  const [newsCheck, setNewsCheck] = useState(false);

  const onPressSignUp = () => {
    DeviceEventEmitter.emit('authenticate', {authenticate: true});
  };
  return (
    <>
      <AppHeader showBack />
      <KeyboardAwareScrollView style={styles.container}>
        <Logo />
        <View style={{marginVertical: THEME.MARGIN.NORMAL}}>
          <AppInput placeholder="User Name" />
          <AppInput placeholder="Email" />
          <AppInput placeholder="Password" />
          <AppInput placeholder="Confirm Password" />
        </View>
        <View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={ageCheck}
              onPress={() => setAgeCheck(!ageCheck)}
            />
            <Text style={styles.text}>
              I am the age of majority in my country of residence and I have
              read, understand and agree to the term of user agreement and
              policy.
            </Text>
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={newsCheck}
              onPress={() => setNewsCheck(!newsCheck)}
            />
            <Text style={styles.text}>
              I agree to receive electronic communications from Block Merchants,
              Hoditech and their indirect subsidiaries and affiliates,
              respectively.
            </Text>
          </View>
        </View>
        <PrimaryButton title="Create Account" onPress={onPressSignUp} />
      </KeyboardAwareScrollView>
    </>
  );
};

export default SignUp;
