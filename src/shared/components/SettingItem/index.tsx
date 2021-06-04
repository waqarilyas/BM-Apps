import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {THEME} from '../../theme';
import {RF} from '../../theme/responsive';
import ToggleSwitch from 'toggle-switch-react-native';

interface Props extends TouchableOpacityProps {
  title?: string;
  switch?: boolean;
  showSwitch?: boolean;
  value?: string;
  chevron?: boolean;
}

const SettingItem = (props: Props) => {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.right}>
          {props.value && <Text style={styles.value}>({props.value})</Text>}
          {props.chevron && (
            <Icon
              name="chevron-right"
              size={THEME.FONTS.SIZE.SMALL}
              color={THEME.COLORS.white}
            />
          )}
          {props.showSwitch && (
            <ToggleSwitch
              isOn={props.switch}
              onColor={THEME.COLORS.green}
              offColor={THEME.COLORS.textLight}
              size="medium"
            />
          )}
        </View>
      </>
    </TouchableOpacity>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RF(50),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: THEME.COLORS.textLight,
    paddingHorizontal: THEME.PADDING.NORMAL,
  },
  title: {color: THEME.COLORS.white, fontSize: THEME.FONTS.SIZE.SMALL},
  right: {flexDirection: 'row', alignItems: 'center'},
  value: {
    color: THEME.COLORS.textLight,
    marginRight: THEME.MARGIN.LOW,
    fontSize: THEME.FONTS.SIZE.SMALL,
  },
});
