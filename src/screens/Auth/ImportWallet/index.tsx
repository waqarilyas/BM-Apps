import React from 'react';
import {View, Text, DeviceEventEmitter} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import Logo from '../../../shared/components/Logo';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {THEME} from '../../../shared/theme';
import styles from './styles';

interface Props {}

const ImportWallet = (props: Props) => {
  const onImportWallet = () => {
    DeviceEventEmitter.emit('authenticate', {authenticate: true});
  };
  return (
    <>
      <AppHeader showBack />
      <View style={styles.container}>
        <Logo />
        <Text style={styles.heading}>Import from Seed</Text>
        <View style={styles.inputContainer}>
          <AppInput placeholder="Enter your secret recovery phrase" />
        </View>
        <View style={styles.actionsContainer}>
          <PrimaryButton title="Import" onPress={onImportWallet} />
        </View>
      </View>
    </>
  );
};

export default ImportWallet;
