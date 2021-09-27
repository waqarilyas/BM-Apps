import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../../assets';
import AppHeader from '../../../shared/components/AppHeader';
import styles from './styles';
import {SECRET_PHRASE} from '../../../shared/utils/AppConstants';
import {useSelector} from 'react-redux';
import {RootState} from '../../../shared/store';
import {THEME} from '../../../shared/theme';
import L from '../../../shared/utils/LanguageHandler';

interface Props {}

const BackupPhrase = (props: Props) => {
  const {
    mnemonic: {mnemonic_phrase},
  } = useSelector((state: RootState) => state.wallet);

  const [phrase, setPhrase] = useState(SECRET_PHRASE);
  const [showPhrase, setShowPhrase] = useState(false);

  useEffect(() => {
    if (showPhrase) {
      setPhrase(mnemonic_phrase.split(' '));
    } else {
      setPhrase(SECRET_PHRASE);
    }
  }, [showPhrase, mnemonic_phrase]);
  return (
    <View style={styles.mainContainer}>
      <AppHeader title={L('Recovery Phrase')} showBack />
      <View style={styles.container}>
        <Text style={styles.title}>
          {L(
            'Write your recovery phrase on paper and store it in a safe place such as a safe deposit box. Anyone with this phrase can access your funds.',
          )}
        </Text>
        <View style={styles.phrasesView}>
          {phrase.map((item, index) => (
            <View key={index} style={styles.phraseView}>
              <Text style={styles.phraseWord}>
                {index + 1}
                {'   '}
                {item}
              </Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={() => setShowPhrase(!showPhrase)}>
          <View style={styles.directions}>
            <FastImage
              source={ICONS.PHRASE_EYE}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.eye}
              tintColor={THEME.COLORS.white}
            />
            <Text style={styles.directionText}>
              {L('Press and Hold to')} {showPhrase ? L('Hide') : L('Reveal')}.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BackupPhrase;
