import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {Linking, SafeAreaView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Logo from '../../../shared/components/Logo';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import SecondaryButton from '../../../shared/components/SecondaryButton';
import {RootState} from '../../../shared/store';
import {renderWallet} from '../../../shared/store/actions/walletActions';
import {setIsNewWallet} from '../../../shared/store/reducers/utilReducer';
import {setMnemonic} from '../../../shared/store/reducers/walletReducer';
import {THEME} from '../../../shared/theme';
import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';
let bip39 = require('bip39');

interface Props {
  navigation: NavigationProp<any>;
}

const StartScreen = (props: Props) => {
  const dispatch = useDispatch();
  const navToImportWallet = () => props.navigation.navigate('ImportWallet');
  const {walletLoading} = useSelector((state: RootState) => state.wallet);

  const handleCreateNewWallet = async () => {
    // setLoading(true);
    let mnemonic = bip39.generateMnemonic();
    // createBTCWallet(mnemonic);
    dispatch(setIsNewWallet(true));

    dispatch(
      setMnemonic({
        mnemonic_phrase: mnemonic,
        is_restore: false,
      }),
    );

    setTimeout(() => {
      dispatch(renderWallet());
    }, 1000);
  };
  const openTermsAndCondition = async () => {
    try {
      const supported = await Linking.canOpenURL(
        'https://www.blockmerchants.com/policy',
      );
      if (supported) {
        await Linking.openURL('https://www.blockmerchants.com/policy');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Logo style={{marginTop: THEME.MARGIN.SUPERHIGH}} />
        <Text style={styles.heading}>{L('Wallet Setup')}</Text>
        <Text style={styles.subHeading}>
          {L('Import an existing wallet or create a new one')}
        </Text>
        <View style={styles.actionsContainer}>
          <PrimaryButton
            title={L('Import using secret recovery phrase')}
            onPress={navToImportWallet}
          />
          <SecondaryButton
            disabled={walletLoading}
            loading={walletLoading}
            title={L('Create a new wallet')}
            onPress={handleCreateNewWallet}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>
            {L('By proceeding, you are agree with our')}{' '}
            <Text onPress={openTermsAndCondition} style={styles.linkText}>
              {L('Terms and Conditions')}
            </Text>
          </Text>
        </View>
        {/* <AppLoader isVisible={loading} /> */}
      </SafeAreaView>
      {/* <SafeAreaView style={{backgroundColor: THEME.COLORS.primaryBackground}} /> */}
    </>
  );
};

export default StartScreen;
