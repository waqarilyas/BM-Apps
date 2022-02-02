import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {COINS} from '../../../assets/coins';
import {RootState} from '../../store';
import {THEME} from '../../theme';
import {HP, RF, WP} from '../../theme/responsive';
import L from '../../utils/LanguageHandler';

interface Props {
  isVisible: boolean;
  onPressBackdrop: () => void;
  onPressPhone?: () => void;
}

const ShareModal = (props: Props) => {
  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.onPressBackdrop}
      onBackButtonPress={props.onPressBackdrop}
      style={{position: 'absolute', bottom: WP(-5), left: WP(-5)}}
      animationInTiming={400}
      animationOutTiming={400}>
      <View style={styles.container}>
        <Text style={styles.heading}>Share</Text>
        <ShareItem
          title={L('Share Via SMS')}
          iconName="md-share-outline"
          onPress={props.onPressPhone}
        />
      </View>
    </Modal>
  );
};

const ShareItem = ({onPress, title, iconName}: any) => {
  return (
    <TouchableOpacity style={styles.shareItemContainer} onPress={onPress}>
      <Icon
        name={iconName}
        color={THEME.COLORS.white}
        size={RF(20)}
        style={styles.icon}
      />
      <Text style={styles.shareTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ShareModal;

const styles = StyleSheet.create({
  container: {
    width: WP(100),
    height: HP(30),
    borderTopRightRadius: WP(5),
    borderTopLeftRadius: WP(5),
    backgroundColor: THEME.COLORS.secondaryBackground,
    padding: THEME.PADDING.NORMAL,
  },
  shareItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RF(10),
    borderBottomColor: 'rgba(255,255,255,0.4)',
    borderBottomWidth: 1,
    paddingVertical: RF(10),
  },
  icon: {
    marginRight: RF(10),
  },
  heading: {
    color: THEME.COLORS.white,
    fontSize: RF(15),
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
  shareTitle: {
    color: THEME.COLORS.white,
    fontSize: RF(14),
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
});
