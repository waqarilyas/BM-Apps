import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {navigate} from '../../services/nav.service';
import {THEME} from '../../theme';
import {RF} from '../../theme/responsive';
import L from '../../utils/LanguageHandler';
import PrimaryButton from '../PrimaryButton';

const ShopDetailsModal = ({
  visible,
  data,
  closeModal,
}: {
  visible: boolean;
  data: any;
  closeModal: any;
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={styles.centeredView}>
        <View style={styles.innerView}>
          {/* <TouchableOpacity style={styles.iconsContainer} onPress={() => {}}>
          <Icon name="camera" size={RF(25)} color={THEME.COLORS.white} />
            <Text style={styles.iconName}>Camera</Text>
          </TouchableOpacity> */}
          <Text style={styles.storeTitle}>{L('SHOP INFO')}</Text>
          <CardItem title={data.name} icon="person" />
          <CardItem title={data.phone} icon="phone-portrait-outline" />
          {Boolean(data?.website) && (
            <CardItem title={data.website} icon="md-logo-web-component" />
          )}
          <CardItem title={data.address} icon="md-mail" />

          {/* <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.title}>{data.phone}</Text>
          <Text style={styles.website}>{data.website}</Text>
          <Text style={styles.address}>{data.address}</Text> */}
          <TouchableOpacity style={styles.closeContainer} onPress={closeModal}>
            <Icon name="close" size={RF(25)} color={THEME.COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.showButton}
            onPress={() => {
              closeModal();
              navigate('ShopDetails', {shop: data._id});
            }}>
            <Text style={styles.showText}>{L('Show Products')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const CardItem = ({title, icon}: any) => {
  return (
    <View style={styles.cardContainer}>
      <Icon
        name={icon}
        size={RF(18)}
        color={THEME.COLORS.white}
        style={{
          marginHorizontal: RF(20),
        }}
      />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerView: {
    backgroundColor: THEME.COLORS.primaryBackground,
    width: '80%',
    alignSelf: 'center',
    // height: '35%',
    borderRadius: RF(10),
    alignItems: 'center',
    padding: RF(20),
    // justifyContent: 'center',
  },
  title: {
    fontSize: RF(15),
    color: THEME.COLORS.white,
    fontWeight: 'bold',
  },
  iconsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconName: {
    fontWeight: '600',
    color: THEME.COLORS.white,
    fontSize: RF(11),
    textAlign: 'center',
    marginTop: RF(3),
  },
  closeContainer: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
  },
  cardTitle: {
    color: THEME.COLORS.white,
    fontSize: RF(16),
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: RF(10),
  },
  storeTitle: {
    color: THEME.COLORS.white,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: RF(16),
    marginVertical: THEME.MARGIN.HIGH,
  },
  showButton: {
    backgroundColor: THEME.COLORS.accentBlue,
    paddingVertical: RF(10),
    paddingHorizontal: RF(20),
    borderRadius: RF(100),
    marginTop: RF(20),
  },
  showText: {
    color: THEME.COLORS.white,
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
    textAlign: 'center',
  },
});

export default ShopDetailsModal;
