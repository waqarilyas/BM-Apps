import React, {useMemo} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import SettingItem from '../../../shared/components/SettingItem';
import {Coin, GenericNavigation} from '../../../shared/models/types';
import {RootState} from '../../../shared/store';
import {resetPos} from '../../../shared/store/reducers/posReducer';
import {
  setTaxEnabled,
  setThumbEnabled,
} from '../../../shared/store/reducers/settingsReducer';
import {
  resetUser,
  setMerchantEnabledState,
} from '../../../shared/store/reducers/userReducer';
import {resetWallet} from '../../../shared/store/reducers/walletReducer';
import {THEME} from '../../../shared/theme';
import L from '../../../shared/utils/LanguageHandler';
import {socket} from '../../../shared/utils/sockets';

interface Props extends GenericNavigation {}

const SettingsMain = (props: Props) => {
  const {settings} = useSelector((state: RootState) => state);

  const {wallet} = useSelector((state: RootState) => state.wallet);
  const {thumbEnabled, taxEnabled} = useSelector(
    (state: RootState) => state.settings,
  );
  const {merchantEnabled, merchantShop, merchantData} = useSelector(
    (state: RootState) => state.user,
  );

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
      L('Confirmation!'),
      L('Are you sure you want to logout?'),
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
    props.navigation?.navigate('LanguageSelection');
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

  const handleModeSwitch = () => {
    Alert.alert(
      L(`Confirm`),
      `${L('Are you sure you want to switch to')} ${
        merchantEnabled ? 'Buyer' : 'Merchant'
      }?`,
      [
        {
          text: L('Cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(setMerchantEnabledState(merchantEnabled ? false : true));
            Toast.show({
              text1: L('Successfull'),
              text2: `${L('Successfully switched to')} ${
                merchantEnabled ? 'Buyer' : 'Merchant'
              } ${L('mode')}`,
              type: 'success',
            });
          },
        },
      ],
    );
  };

  const handleTaxEnabled = () => {
    Alert.alert(
      L(`Confirm`),
      `${L('Are you sure you want to ')} ${
        taxEnabled
          ? 'disable Algorithmic Protection Fee '
          : 'enable Algorithmic Protection Fee'
      }?`,
      [
        {
          text: L('Cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: L('OK'),
          onPress: () => {
            dispatch(setTaxEnabled(taxEnabled ? false : true));
            Toast.show({
              text1: L('Successfull'),
              text2: `${L('Successfully')}  ${
                taxEnabled ? L('Disabled') : L('Enabled')
              } Algorithmic Protection Fee`,
              type: 'success',
            });
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title={L('Settings')} />
      <View style={styles.container}>
        {/* <SettingItem title="Address Book" chevron /> */}
        {/* {!merchantShop && ( */}

        {merchantData && !merchantShop && merchantEnabled && (
          <SettingItem
            title={L('Add Store Location')}
            chevron
            onPress={navToAddPlace}
          />
        )}

        {/* )} */}
        {!merchantData && (
          <SettingItem
            title={L('Enable Merchant Account')}
            chevron
            onPress={() => handleNavigate('EnableMerchant')}
          />
        )}
        {/* <SettingItem title="Change PIN" chevron onPress={navToChangePIN} /> */}
        {/* <SettingItem
          title="Sales History"
          chevron
          onPress={navToPurchaseHistory}
        /> */}
        <SettingItem
          title={L('Choose Currency')}
          value={settings.currency}
          onPress={navToCurrencySelection}
          chevron
        />
        <SettingItem
          title={L('Choose Language')}
          value={settings.language}
          chevron
          onPress={navToLanguageSelection}
        />
        {/* <SettingItem
          title="POS Default Tax Rate"
          value={`${settings.defaultTaxRate}%`}
          chevron
        /> */}
        {/* <SettingItem
          activeOpacity={1}
          title="Use Dark Mood"
          showSwitch
          switchState={settings.darkMode}
          toggleSwitch={toggleDarkMode}
        /> */}
        <SettingItem
          title={L('Coin Acceptance Settings')}
          chevron
          onPress={navToCoinAcceptance}
        />
        <SettingItem
          title={L('Backup Phrase')}
          chevron
          onPress={navToBackupPhrase}
        />

        <SettingItem
          title={L('Add Contacts')}
          chevron
          onPress={() => props?.navigation?.navigate('AddressBook')}
        />

        {merchantEnabled && (
          <SettingItem
            title={
              taxEnabled
                ? L('Disable Algorithmic Protection Fee')
                : L('Enable Algorithmic Protection Fee')
            }
            // chevron
            onPress={handleTaxEnabled}
          />
        )}

        <SettingItem
          title={
            thumbEnabled
              ? L('Disable Thumb Impression')
              : L('Enable Thumb Impression')
          }
          onPress={() => {
            thumbEnabled
              ? dispatch(setThumbEnabled(false))
              : dispatch(setThumbEnabled(true));
            Toast.show({
              text1: L('Success'),
              text2: `${L('Thumb Impression')} ${
                thumbEnabled ? 'disabled' : 'enabled'
              } ${L('successfully')}`,
              type: 'success',
            });
          }}
        />

        {merchantData && (
          <SettingItem
            title={
              merchantEnabled ? L('Switch to Buyer') : L('Switch to Merchant')
            }
            // chevron
            onPress={handleModeSwitch}
          />
        )}

        <SettingItem title={L('Log Out')} chevron onPress={onLogout} />
      </View>
    </View>
  );
};

export default SettingsMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.primaryBackground,
  },
});
