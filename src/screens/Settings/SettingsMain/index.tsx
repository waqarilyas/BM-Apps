import React, {useMemo} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import SettingItem from '../../../shared/components/SettingItem';
import {Coin, GenericNavigation} from '../../../shared/models/types';
import {RootState} from '../../../shared/store';
import {resetPos} from '../../../shared/store/reducers/posReducer';
import {resetUser} from '../../../shared/store/reducers/userReducer';
import {resetWallet} from '../../../shared/store/reducers/walletReducer';
import {THEME} from '../../../shared/theme';
import {socket} from '../../../shared/utils/sockets';

interface Props extends GenericNavigation {}

const SettingsMain = (props: Props) => {
  const {settings} = useSelector((state: RootState) => state);

  const {wallet} = useSelector((state: RootState) => state.wallet);
  const {merchantEnabled} = useSelector((state: RootState) => state.user);

  let [erc20Address, nonErc20Address, bitcoinAddress] = useMemo(() => {
    let btcAddress = wallet.find((c: Coin) => c.coin_symbol === 'btc');
    let nonErc20 = wallet.find(
      (c: Coin) => !c.is_erc20 && c.coin_symbol !== 'btc',
    );
    let erc20 = wallet.find((c: Coin) => c.is_erc20);

    return [erc20?.address, nonErc20?.address, btcAddress?.address];
  }, [wallet]);

  const dispatch = useDispatch();

  const navToCoinAcceptance = () =>
    props.navigation?.navigate('CoinAcceptance');

  const navToPurchaseHistory = () =>
    props.navigation?.navigate('PurchaseHistory');

  const navToAddPlace = () => props.navigation?.navigate('AddPlace');
  const navToChangePIN = () => props.navigation?.navigate('ChangePIN');

  const onLogout = () => {
    Alert.alert(
      'Confirmation!',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            logOutUser();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const logOutUser = () => {
    socket.removeListener(erc20Address!);
    socket.removeListener(nonErc20Address!);
    socket.removeListener(bitcoinAddress!);
    dispatch(resetPos());
    dispatch(resetUser());
    dispatch(resetWallet());
  };

  const navToCurrencySelection = () => {
    props.navigation?.navigate('SelectionScreen', {selectionType: 'currency'});
  };

  const navToLanguageSelection = () => {
    props.navigation?.navigate('SelectionScreen', {selectionType: 'language'});
  };

  const toggleDarkMode = (toggleState: boolean) => {
    console.log(toggleState);
  };

  const navToBackupPhrase = () => {
    props.navigation?.navigate('BackupPhrase');
  };

  const handleNavigate = (screen: string) => {
    props.navigation?.navigate(screen);
  };

  return (
    <>
      <AppHeader title="Settings" />
      <View style={styles.container}>
        {/* <SettingItem title="Address Book" chevron /> */}
        {merchantEnabled && (
          <SettingItem
            title="Add Store Location"
            chevron
            onPress={navToAddPlace}
          />
        )}
        {!merchantEnabled && (
          <SettingItem
            title="Enable Merchant Account"
            chevron
            onPress={() => handleNavigate('EnableMerchant')}
          />
        )}
        <SettingItem title="Change PIN" chevron onPress={navToChangePIN} />
        <SettingItem
          title="Sales History"
          chevron
          onPress={navToPurchaseHistory}
        />
        <SettingItem
          title="Choose Currency"
          value={settings.currency}
          onPress={navToCurrencySelection}
          chevron
        />
        <SettingItem
          title="Choose Language"
          value={settings.language}
          chevron
          onPress={navToLanguageSelection}
        />
        <SettingItem
          title="POS Default Tax Rate"
          value={`${settings.defaultTaxRate}%`}
          chevron
        />
        <SettingItem
          activeOpacity={1}
          title="Use Dark Mood"
          showSwitch
          switchState={settings.darkMode}
          toggleSwitch={toggleDarkMode}
        />
        <SettingItem
          title="Coins Acceptance Settings"
          chevron
          onPress={navToCoinAcceptance}
        />
        <SettingItem
          title="Backup Phrase"
          chevron
          onPress={navToBackupPhrase}
        />
        <SettingItem title="Log out" chevron onPress={onLogout} />
      </View>
    </>
  );
};

export default SettingsMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
});
