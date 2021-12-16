import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import TouchID from 'react-native-touch-id';
import {THEME} from '../../theme';
import {RF} from '../../theme/responsive';
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
      title: 'Authentication Required',
      imageColor: '#e00606',
      imageErrorColor: '#ff0000',
      sensorDescription: 'Touch sensor',
      sensorErrorDescription: 'Failed',
      cancelText: '',
      fallbackLabel: '',
      unifiedErrors: false,
      passcodeFallback: true,
    })
      .then((success: any) => {
        Toast.show({
          text1: L('Successfull'),
          text2: L('Authentication successfull'),
          type: 'success',
        });
        onClose();
      })
      .catch((error: any) => {
        setError(true);

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
