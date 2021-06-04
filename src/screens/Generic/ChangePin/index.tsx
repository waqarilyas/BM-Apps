import React, {useEffect, useState} from 'react';
import {Animated, View, Text} from 'react-native';
import AppHeader from '../../../shared/components/AppHeader';
import Logo from '../../../shared/components/Logo';
import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {RF} from '../../../shared/theme/responsive';

interface Props {}

const CELL_COUNT = 4;

const {Value, Text: AnimatedText} = Animated;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));

const animateCell = ({
  hasValue,
  index,
  isFocused,
}: {
  hasValue: boolean;
  index: number;
  isFocused: boolean;
}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
    }),
  ]).start();
};

const ChangePin = (props: Props) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [fieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    ref.current?.focus();
  }, [ref]);

  const renderCell = ({
    index,
    symbol,
    isFocused,
  }: {
    index: number;
    symbol: string;
    isFocused: boolean;
  }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.25, 1],
          }),
        },
      ],
    };

    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <>
      <AppHeader showBack />
      <View style={styles.container}>
        <Logo />
        <Text style={styles.screenTitle}>Please Setup a PIN Code</Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          keyboardAppearance="dark"
          renderCell={renderCell}
        />
        <Text style={styles.screenSubTitle}>
          You will be asked for the PIN code when you open the app
        </Text>
      </View>
    </>
  );
};

export default ChangePin;
