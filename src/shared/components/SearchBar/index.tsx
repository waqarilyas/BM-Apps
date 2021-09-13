import React, {useState} from 'react';
import {Keyboard, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {THEME} from '../../theme';
import {RF, WP} from '../../theme/responsive';

const SearchBar = ({
  placeholder,
  onChangeText,
  value,
  onSubmit,
  onBackPress,
}: any) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          name={focused ? 'arrowleft' : 'search1'}
          color={THEME.COLORS.countRed}
          size={WP(4.5)}
          onPress={() => {
            onBackPress && onBackPress();
            Keyboard.dismiss();
          }}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        placeholderTextColor={THEME.COLORS.white}
        onFocus={() => setFocused(true)}
        onEndEditing={() => setFocused(false)}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        clearButtonMode="while-editing"
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.secondaryBackground,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    borderRadius: WP(10),
    paddingLeft: WP(3),
    marginBottom: WP(2),
    // paddingVertical: WP(1),
  },
  input: {
    flex: 1,
    paddingVertical: WP(3),
    fontSize: RF(14),
    marginLeft: WP(2),
    fontWeight: '600',
    color: THEME.COLORS.white,
  },
  iconContainer: {
    padding: WP(2),
  },
});

export default SearchBar;
