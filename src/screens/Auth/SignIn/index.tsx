import React from 'react';
import {View, Text, DeviceEventEmitter} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import Logo from '../../../shared/components/Logo';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {THEME} from '../../../shared/theme';
import styles from './styles';

interface Props {}

const SignIn = (props: Props) => {
  const onSignIn = () => {
    DeviceEventEmitter.emit('authenticate', {authenticate: true});
  };
  return (
    <>
      <AppHeader showBack />
      <View style={styles.container}>
        <Logo />
        <View style={styles.inputContainer}>
          <AppInput placeholder="Email" />
          <AppInput placeholder="Password" />
        </View>
        <PrimaryButton title="Sign In" onPress={onSignIn} />
      </View>
    </>
  );
};

export default SignIn;
