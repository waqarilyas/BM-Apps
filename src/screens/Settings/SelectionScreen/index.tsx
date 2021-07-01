import {RouteProp} from '@react-navigation/core';
import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../../shared/components/AppHeader';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {
  GenericNavigation,
  ScreenSelectionType,
} from '../../../shared/models/types';
import {
  setCurrency,
  setLanguage,
} from '../../../shared/store/reducers/settingsReducer';
import styles from './styles';
import RadioButtonRN from 'radio-buttons-react-native';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';

const data = [
  {
    label: 'data 1',
  },
  {
    label: 'data 2',
  },
];

interface Props extends GenericNavigation {
  route: RouteProp<{params: {selectionType: string}}, 'params'>;
}

const SelectionScreen = (props: Props) => {
  const {selectionType} = props.route.params;
  const [selections, setSelections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getCurrencies = () => {
    setSelections([{label: 'USD'}, {label: 'EUR'}]);
  };
  const getLanguages = () => {
    setSelections([{label: 'EN'}, {label: 'FR'}]);
  };

  const changeLanguage = (language: string) => {
    dispatch(setLanguage(language));
  };

  const changeCurrency = (currency: string) => {
    dispatch(setCurrency(currency));
  };

  useEffect(() => {
    if (selectionType === ScreenSelectionType.Currency) {
      getCurrencies();
    } else {
      getLanguages();
    }
  }, [selectionType]);

  const onItemPress =
    selectionType === ScreenSelectionType.Currency
      ? changeLanguage
      : changeCurrency;

  const renderItem = ({item, index}: {item: string; index: number}) => (
    <TouchableOpacity
      onPress={() => onItemPress(item)}
      key={index}
      style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
      <View />
    </TouchableOpacity>
  );
  const HEADER_TITLE =
    selectionType === ScreenSelectionType.Currency ? 'Currency' : 'Language';
  return (
    <>
      <AppHeader title={`Choose ${HEADER_TITLE}`} showBack />
      <View style={styles.container}>
        <RadioButtonRN
          activeColor={THEME.COLORS.accentBlue}
          //   deactiveColor={THEME.COLORS.secondaryBackground}
          duration={200}
          animationTypes={['pulse']}
          boxStyle={{marginVertical: THEME.MARGIN.LOW, borderWidth: 0}}
          style={{marginVertical: THEME.MARGIN.NORMAL}}
          boxActiveBgColor={THEME.COLORS.secondaryBackground}
          boxDeactiveBgColor={THEME.COLORS.secondaryBackground}
          textStyle={styles.itemText}
          data={selections}
          selectedBtn={(e: any) => onItemPress(e.label)}
        />
        {/* <FlatList
          data={selections}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        /> */}
        <PrimaryButton
          loading={loading}
          title="Save"
          buttonStyle={{width: '50%'}}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
        />
      </View>
    </>
  );
};

export default SelectionScreen;
