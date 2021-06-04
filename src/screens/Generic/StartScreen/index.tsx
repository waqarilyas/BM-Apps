import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import Logo from '../../../shared/components/Logo';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import SecondaryButton from '../../../shared/components/SecondaryButton';
import {THEME} from '../../../shared/theme';
import styles from './styles';

interface Props {
  navigation: NavigationProp<any>;
}

const StartScreen = (props: Props) => {
  const handleSignIn = () => {
    props.navigation.navigate('SignIn');
  };
  const handleSignup = () => {
    props.navigation.navigate('SignUp');
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
      <Text style={styles.heading}>Welcome</Text>
      <PrimaryButton title="sign in" onPress={handleSignIn} />
      <SecondaryButton title="sign up" onPress={handleSignup} />
      <View style={styles.footer}>
        <Text style={styles.text}>
          Don't have an account?{' '}
          <Text onPress={handleSignIn} style={{color: THEME.COLORS.accentBlue}}>
            Create new now!
          </Text>
        </Text>
        <Text style={styles.text}>
          By signing up, you are agree with our{' '}
          <Text onPress={openTermsAndCondition} style={styles.linkText}>
            Terms {'&'} Condition
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default StartScreen;
