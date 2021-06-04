import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

interface Props {}

const SearchProduct = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>I'm SearchProduct</Text>
    </View>
  );
};

export default SearchProduct;
