import {NavigationProp} from '@react-navigation/core';
import React, {useState} from 'react';
import {Linking, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import AppLoader from '../../../shared/components/AppLoader';
import Logo from '../../../shared/components/Logo';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import SecondaryButton from '../../../shared/components/SecondaryButton';
import {renderWallet} from '../../../shared/store/actions/walletActions';
import {THEME} from '../../../shared/theme';
import styles from './styles';

interface Props {
  navigation: NavigationProp<any>;
}

const StartScreen = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navToImportWallet = () => props.navigation.navigate('ImportWallet');

  const handleCreateNewWallet = () => {
    dispatch(renderWallet());
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
      <AppLoader isVisible={loading} />
    </View>
  );
};

export default StartScreen;
