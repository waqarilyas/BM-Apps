import React from 'react';
import {
  TextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {THEME} from '../../theme';
import {HP, RF, WP} from '../../theme/responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props extends TextInputProps {
  inputStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  icon?: string;
  onIconPress?: () => void;
}

const AppInput = (props: Props) => {
  return (
    <View style={[styles.container, props.inputStyle]}>
      <TextInput
        placeholderTextColor={THEME.COLORS.textLight}
        style={[styles.inputContainer, props.textInputStyle]}
        selectionColor={THEME.COLORS.white}
        {...props}
      />
      {props.icon ? (
        <Icon
          style={{alignSelf: 'center'}}
          name={props.icon}
          size={24}
          color={THEME.COLORS.textLight}
          onPress={props.onIconPress}
        />
      ) : null}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: HP(6),
    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.SMALLBOX,
    paddingHorizontal: RF(16),
    marginVertical: THEME.MARGIN.LOW,
  },
  inputContainer: {
    flex: 1,
    alignSelf: 'center',
    height: '100%',
    color: THEME.COLORS.white,
    paddingHorizontal: THEME.PADDING.LOW,
  },
});
