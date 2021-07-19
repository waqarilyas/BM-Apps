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
import {HP, RF} from '../../theme/responsive';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends TextInputProps {
  inputStyle?: StyleProp<TextStyle>;
}

const AppSearchInput = (props: Props) => {
  return (
    <View style={styles.container}>
      <Icon
        style={{alignSelf: 'center'}}
        name="search"
        size={24}
        color={THEME.COLORS.textLight}
      />
      <TextInput
        {...props}
        placeholder="Search..."
        placeholderTextColor={THEME.COLORS.textLight}
        style={[styles.inputContainer, props.inputStyle]}
        selectionColor={THEME.COLORS.white}
      />
      <Icon
        style={{alignSelf: 'center'}}
        name="filter"
        size={24}
        color={THEME.COLORS.textLight}
      />
    </View>
  );
};

export default AppSearchInput;

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
