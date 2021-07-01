import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AddressInput from '../../../shared/components/AddressInput';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {THEME} from '../../../shared/theme';
import {HP} from '../../../shared/theme/responsive';
import styles from './styles';
import PaymentStatusModal from '../../../shared/components/PaymentStatusModal';
import GLOBAL_STYLE from '../../../shared/theme/global';

interface Props {}

const SendCoin = (props: Props) => {
  const [address, setAddress] = useState('');
  const [usdtAmount, setUsdtAmount] = useState('');
  const [coinAmount, setCoinAmount] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onChangeAddress = (text: string) => setAddress(text);
  const toggleModal = () => setShowModal(!showModal);
  return (
    <>
      <PaymentStatusModal
        toggleModal={toggleModal}
        error={!false}
        isVisible={showModal}
      />
      <AppHeader title="Wallet" showBack />
      <View style={styles.container}>
        <Text style={styles.label}>Send to</Text>
        <AddressInput
          inputStyle={{marginVertical: THEME.MARGIN.NORMAL}}
          value={address}
          placeholder="Address"
          onChangeText={setAddress}
          onChangeAddress={onChangeAddress}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Amount</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.max}
            onPress={() => console.log('Set Max')}>
            <Text style={styles.maxText}>Max</Text>
          </TouchableOpacity>
        </View>
        <AppInput
          inputStyle={{marginTop: THEME.MARGIN.NORMAL}}
          value={coinAmount}
          onChangeText={setCoinAmount}
          placeholder={'0.00 BTC'}
        />
        <AppInput
          inputStyle={{marginTop: THEME.MARGIN.NORMAL}}
          value={usdtAmount}
          onChangeText={setUsdtAmount}
          placeholder={'0.00 USD'}
        />

        <View style={styles.details}>
          <Text style={styles.detailsText}>
            Transaction Fee : 0 BTC
            <Text style={styles.usdText}>{'     '}$0.00 USD</Text>
          </Text>
          <Text style={styles.availableText}>
            {'            '}
            Available : 0 BTC
            <Text style={styles.usdText}>{'     '}$0.00 USD</Text>
          </Text>
        </View>

        <PrimaryButton
          icon="arrow-long-up"
          title="Send"
          buttonStyle={{width: '55%', height: HP(6)}}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
          onPress={() => setShowModal(true)}
        />
      </View>
    </>
  );
};

export default SendCoin;
