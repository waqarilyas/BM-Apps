import React, {useState} from 'react';
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
import FastImage, {Source} from 'react-native-fast-image';

interface Props extends TouchableOpacityProps {
  title?: string;
  showSwitch?: boolean;
  switchState?: boolean;
  toggleSwitch?: (value: boolean) => void;
  value?: string;
  chevron?: boolean;
  source: number | Source;
}

const SettingItem = (props: Props) => {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <>
        <View style={styles.left}>
          <FastImage source={props.source} style={styles.icon} />
          <Text style={styles.title}>{props.title}</Text>
        </View>
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
              isOn={props.switchState}
              onColor={THEME.COLORS.green}
              offColor={THEME.COLORS.textLight}
              size="medium"
              onToggle={props.toggleSwitch}
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
    paddingHorizontal: THEME.PADDING.LOW,
  },
  title: {
    color: THEME.COLORS.white,
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    borderRadius: THEME.RADIUS.SMALLBOX,
    height: RF(25),
    width: RF(25),
    marginRight: THEME.MARGIN.NORMAL,
  },

  right: {flexDirection: 'row', alignItems: 'center'},
  value: {
    color: THEME.COLORS.textLight,
    marginRight: THEME.MARGIN.LOW,
    fontSize: THEME.FONTS.SIZE.XXSMALL,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
});
