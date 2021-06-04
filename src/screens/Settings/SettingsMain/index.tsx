import React from 'react';
import {DeviceEventEmitter, StyleSheet, Text, View} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import SettingItem from '../../../shared/components/SettingItem';
import {GenericNavigation} from '../../../shared/models/types';
import {THEME} from '../../../shared/theme';

interface Props extends GenericNavigation {}

const SettingsMain = (props: Props) => {
  const navToCoinAcceptance = () =>
    props.navigation?.navigate('CoinAcceptance');

  const navToPurchaseHistory = () =>
    props.navigation?.navigate('PurchaseHistory');

  const navToAddPlace = () => props.navigation?.navigate('AddPlace');
  const navToChangePIN = () => props.navigation?.navigate('ChangePIN');

  const onLogout = () =>
    DeviceEventEmitter.emit('authenticate', {authenticate: false});
  return (
    <>
      <AppHeader title="Settings" />
      <View style={styles.container}>
        <SettingItem title="Address Book" chevron />
        <SettingItem
          title="Purchase History"
          chevron
          onPress={navToPurchaseHistory}
        />
        <SettingItem title="Add Places" chevron onPress={navToAddPlace} />
        <SettingItem title="Change PIN" chevron onPress={navToChangePIN} />
        <SettingItem title="Choose Currency" value="USD" chevron />
        <SettingItem title="POS Default Tax Rate" value="0%" chevron />
        <SettingItem title="POS Default Tips" value="15%, 18%, 20%" chevron />
        <SettingItem
          title="Coins Acceptance Settings"
          chevron
          onPress={navToCoinAcceptance}
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
