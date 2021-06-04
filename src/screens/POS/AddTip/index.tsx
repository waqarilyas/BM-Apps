import React from 'react';
import {View, Text} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import styles from './styles';

interface Props extends GenericNavigation {}

const AddTip = (props: Props) => {
  const navToPayment = () => props.navigation?.navigate('Payment');
  return (
    <>
      <AppHeader title="Add Tip" showBack />
      <View style={styles.container}>
        <AppInput placeholder="Enter Tip amount..." />
        <PrimaryButton
          title="No Tip"
          onPress={navToPayment}
          buttonStyle={styles.button}
        />
      </View>
    </>
  );
};

export default AddTip;
