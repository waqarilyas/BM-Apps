import {RouteProp} from '@react-navigation/core';
import RadioButtonRN from 'radio-buttons-react-native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import RNRestart from 'react-native-restart'; // Import package from node modules

import AppHeader from '../../../shared/components/AppHeader';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import {GenericNavigation} from '../../../shared/models/types';
import SplashScreen from 'react-native-splash-screen';
import {RootState} from '../../../shared/store';
import {setLanguage} from '../../../shared/store/reducers/settingsReducer';
import {THEME} from '../../../shared/theme';
import GLOBAL_STYLE from '../../../shared/theme/global';
import {RF} from '../../../shared/theme/responsive';
import {Languages} from '../../../shared/utils/AppConstants';
import L from '../../../shared/utils/LanguageHandler';
import styles from './styles';

interface Props extends GenericNavigation {
  route: RouteProp<{params: {selectionType: string}}, 'params'>;
}

const LanguageSelection = (props: Props) => {
  const {language} = useSelector((state: RootState) => state.settings);

  const [selectedLanguage, setSelectedLanguage]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const changeLanguage = () => {
    if (selectedLanguage == language) {
      Toast.show({
        text1: L('Failed'),
        text2: L('Language already selected'),
        type: 'error',
      });
      return;
    }

    dispatch(setLanguage(selectedLanguage));

    Toast.show({
      text1: L('Successfull'),
      text2: L('Language updated successfully!'),
      type: 'success',
    });

    setTimeout(() => {
      SplashScreen.show();
      RNRestart.Restart();
    }, 1000);
    // props?.navigation?.goBack();
  };

  useEffect(() => {
    setSelectedLanguage(language);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <AppHeader title={L(`Choose Language`)} showBack />
      <View style={styles.container}>
        <RadioButtonRN
          activeColor={THEME.COLORS.accentBlue}
          duration={200}
          animationTypes={['pulse']}
          boxStyle={{
            marginVertical: THEME.MARGIN.LOW,
            borderWidth: 0,
          }}
          style={{marginVertical: THEME.MARGIN.NORMAL}}
          boxActiveBgColor={THEME.COLORS.secondaryBackground}
          boxDeactiveBgColor={THEME.COLORS.secondaryBackground}
          textStyle={styles.itemText}
          data={Languages}
          initial={Languages.map(e => e.label).indexOf(language) + 1}
          selectedBtn={(e: any) => setSelectedLanguage(e.label)}
        />

        <PrimaryButton
          loading={loading}
          title={L('Save')}
          buttonStyle={{width: '50%', height: RF(38)}}
          textStyle={GLOBAL_STYLE.LARGE_BUTTON_TEXT}
          onPress={changeLanguage}
        />
      </View>
    </View>
  );
};

export default LanguageSelection;
