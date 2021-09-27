//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';

import TouchID from 'react-native-touch-id';
import Toast from 'react-native-toast-message';
import {THEME} from '../../theme';
import {RF} from '../../theme/responsive';
import PrimaryButton from '../PrimaryButton';
import L from '../../utils/LanguageHandler';

const AuthModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [error, setError] = useState(false);

  const authenticate = () => {
    TouchID.authenticate('to unlock your wallet', {
      title: 'Authentication Required', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: '', // Android
      fallbackLabel: '', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    })
      .then(success => {
        // Success code
        console.log('--success--', success);
        Toast.show({
          text1: L('Successfull'),
          text2: 'Authentication successfull',
          type: 'success',
        });
        onClose();
      })
      .catch(error => {
        setError(true);
        console.log('--error--', error.code);
        if (error.code == 'FINGERPRINT_ERROR_LOCKOUT') {
          Toast.show({
            text1: L('Request Failed'),
            text2: L('Too many attempts! Please try again later'),
            type: 'error',
          });
        }
      });
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>Authentication Failed</Text>
          <Text style={styles.subHeader}>
            Authentication is required to unlock your wallet
          </Text>
          <TouchableOpacity style={styles.button} onPress={authenticate}>
            <Text style={styles.buttonText}>Try again?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    color: THEME.COLORS.red,
    textAlign: 'center',
    fontWeight: '800',
  },
  subHeader: {
    color: THEME.COLORS.red,
    textAlign: 'center',
  },
  button: {
    backgroundColor: THEME.COLORS.countRed,
    marginTop: RF(10),
    paddingVertical: RF(10),
    paddingHorizontal: RF(30),
    borderRadius: RF(100),
  },
  buttonText: {
    color: THEME.COLORS.white,
  },
});

export default AuthModal;
