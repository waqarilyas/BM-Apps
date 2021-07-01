import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {DeviceEventEmitter, Linking, Text, View} from 'react-native';
import Logo from '../../../shared/components/Logo';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import SecondaryButton from '../../../shared/components/SecondaryButton';
import {THEME} from '../../../shared/theme';
import styles from './styles';

interface Props {
  navigation: NavigationProp<any>;
}

const StartScreen = (props: Props) => {
  const navToImportWallet = () => {
    props.navigation.navigate('ImportWallet');
  };

  const handleCreateNewWallet = () => {
    DeviceEventEmitter.emit('authenticate', {authenticate: true});
  };
  const openTermsAndCondition = async () => {
    try {
      const supported = await Linking.canOpenURL('https://www.google.com');
      if (supported) {
        await Linking.openURL('https://www.google.com');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Logo style={{marginTop: THEME.MARGIN.SUPERHIGH}} />
      <Text style={styles.heading}>Wallet Setup</Text>
      <Text style={styles.subHeading}>
        Import an existing wallet or create a new one
      </Text>
      <View style={styles.actionsContainer}>
        <PrimaryButton
          title="Import using secret recovery phrase"
          onPress={navToImportWallet}
        />
        <SecondaryButton
          title="Create a new wallet"
          onPress={handleCreateNewWallet}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>
          By proceeding, you are agree with our{' '}
          <Text onPress={openTermsAndCondition} style={styles.linkText}>
            Terms {'&'} Condition
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default StartScreen;
