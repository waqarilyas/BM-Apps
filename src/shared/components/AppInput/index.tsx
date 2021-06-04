import React from 'react';
import {
  TextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextInputProps,
  View,
} from 'react-native';
import {THEME} from '../../theme';
import {HP, RF, WP} from '../../theme/responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props extends TextInputProps {
  inputStyle?: StyleProp<TextStyle>;
  icon?: string;
}

const AppInput = (props: Props) => {
  return (
    <View style={[styles.container, props.inputStyle]}>
      <TextInput
        {...props}
        placeholderTextColor={THEME.COLORS.textLight}
        style={styles.inputContainer}
        selectionColor={THEME.COLORS.white}
      />
      {props.icon ? (
        <Icon
          style={{alignSelf: 'center'}}
          name={props.icon}
          size={24}
          color={THEME.COLORS.textLight}
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
    borderRadius: RF(30),
    paddingHorizontal: RF(16),
    marginVertical: THEME.MARGIN.LOW,
  },
  inputContainer: {
    flex: 1,
    alignSelf: 'center',
    height: HP(6),
    color: THEME.COLORS.white,
    paddingHorizontal: THEME.PADDING.LOW,
  },
});
