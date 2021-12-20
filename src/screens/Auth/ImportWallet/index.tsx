import React, {useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import AppInput from '../../../shared/components/AppInput';
import Logo from '../../../shared/components/Logo';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import {AppShowToast} from '../../../shared/services/helper.service';
import {restoreWalletWithPhrase} from '../../../shared/services/wallet.service';
import {
  setIsWalletRendered,
  setWalletRestore,
} from '../../../shared/store/reducers/walletReducer';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import L from '../../../shared/utils/LanguageHandler';

interface Props extends GenericNavigation {}

const ImportWallet = (props: Props) => {
  const dispatch = useDispatch();
  const [phrase, setPhrase] = useState(
    __DEV__
      ? 'garage night wisdom ribbon broccoli almost future pumpkin fantasy silk fatigue inform'
      : '',
  );

  const [loading, setLoading] = useState(false);
  const onImportWallet = async () => {
    try {
      if (!phrase) {
        return AppShowToast('Please enter your 12 words secret phrase');
      }
      if (phrase.split(' ').length < 12) {
        return AppShowToast('Phrase has less than 12 words');
      }
      setLoading(true);
      const isMnemonicSet = await restoreWalletWithPhrase(phrase);
      if (isMnemonicSet) {
        //Dispatch action is_restore in mnemonic
        dispatch(setWalletRestore(true));
        dispatch(setIsWalletRendered(true));
        AppShowToast('Wallet Import Started');
      } else {
        AppShowToast('Invalid Phrase, Please enter correct phrase.');
        setLoading(false);
      }
    } catch (error) {
      AppShowToast('Error importing phrase. Please try again!');
      setLoading(false);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <AppHeader showBack />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={styles.container}>
        <Logo />
        <Text style={styles.heading}>{L('Import from Seed')}</Text>
        <View style={styles.inputContainer}>
          <AppInput
            textAlignVertical="top"
            value={phrase}
            onChangeText={setPhrase}
            placeholder={L('Enter your secret recovery phrase')}
            inputStyle={styles.input}
            textInputStyle={styles.textInput}
            multiline
            numberOfLines={3}
            autoCapitalize="none"
            enablesReturnKeyAutomatically
            blurOnSubmit
            // returnKeyType="done"
            // returnKeyLabel="done"
          />
        </View>
        <PrimaryButton
          loading={loading}
          title={L('Import')}
          onPress={onImportWallet}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ImportWallet;
