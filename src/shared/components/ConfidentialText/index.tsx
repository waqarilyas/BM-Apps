import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {SECRET_STRING} from '../../utils/AppConstants';

interface Props extends TextProps {
  children?: string | JSX.Element;
}

const ConfidentialText = (props: Props) => {
  const {showBalances} = useSelector((state: RootState) => state.wallet);
  return (
    <Text {...props}>{showBalances ? props.children : SECRET_STRING}</Text>
  );
};

const styles = StyleSheet.create({});

export default ConfidentialText;
