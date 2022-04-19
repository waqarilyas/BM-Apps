import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {THEME} from '../../theme';
import {RF, WP} from '../../theme/responsive';
import L from '../../utils/LanguageHandler';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';

interface Props {
  isVisible: boolean;
  onPressBackdrop: () => void;
  onPressPhone?: () => void;
  onPressEmail?: () => void;
  data?: any | object;
}

const ShareModal = (props: Props) => {
  const products = props?.data?.products || [];
  const merchant = props?.data?.merchantId || null;
  const assetUsed = props?.data?.assetUsed || null;
  const assetPrice = props?.data?.assetPrice || null;

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.onPressBackdrop}
      onBackButtonPress={props.onPressBackdrop}
      style={{left: WP(-5)}}
      animationInTiming={400}
      animationOutTiming={400}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={{height: RF(25)}} />

        <Text style={[styles.heading]}>{L('Invoice Details')}</Text>

        {props.data?.licenseImage && (
          <View style={styles.imageView}>
            <FastImage
              source={{uri: props.data?.licenseImage}}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: RF(120), height: RF(120), alignSelf: 'center'}}
            />
          </View>
        )}
        <View style={{marginVertical: RF(20)}}>
          <Text style={[styles.heading]}>{L('Customer')}</Text>
        </View>

        <View style={styles.itemView}>
          <Text style={[styles.itemText, {fontFamily: THEME.FONTS.TYPE.BOLD}]}>
            Name:
          </Text>
          <Text style={styles.itemText}>
            {props.data?.firstName + props.data?.lastName}
          </Text>
        </View>
        <View style={styles.itemView}>
          <Text style={[styles.itemText, {fontFamily: THEME.FONTS.TYPE.BOLD}]}>
            Phone:
          </Text>

          <Text style={styles.itemText}>{props.data?.phone}</Text>
        </View>
        <View style={styles.itemView}>
          <Text style={[styles.itemText, {fontFamily: THEME.FONTS.TYPE.BOLD}]}>
            Email:
          </Text>

          <Text style={styles.itemText}>{props.data?.email}</Text>
        </View>
        <View style={styles.itemView}>
          <Text style={[styles.itemText, {fontFamily: THEME.FONTS.TYPE.BOLD}]}>
            Created at:
          </Text>

          <Text style={styles.itemText}>{props.data?.createdAt}</Text>
        </View>
        <View style={styles.itemView}>
          <Text style={[styles.itemText, {fontFamily: THEME.FONTS.TYPE.BOLD}]}>
            Sale Type:
          </Text>

          <Text style={styles.itemText}>Cart Checkout</Text>
        </View>

        {products && products.length > 0 && (
          <>
            <View style={{marginVertical: RF(20)}}>
              <Text style={[styles.heading]}>{L('Products')}</Text>
            </View>

            {products.map((product: any) => {
              return (
                <View style={styles.itemView}>
                  <Text
                    style={[
                      styles.itemText,
                      {fontFamily: THEME.FONTS.TYPE.BOLD},
                    ]}>
                    {product?.title}
                  </Text>

                  <Text style={styles.itemText}>{product?.price}$</Text>
                </View>
              );
            })}
          </>
        )}

        <View style={styles.itemView}>
          <Text style={[styles.itemText, {fontFamily: THEME.FONTS.TYPE.BOLD}]}>
            Amount (Incl Tax):
          </Text>

          <Text style={styles.itemText}>{props.data?.usdAmount}$</Text>
        </View>

        {merchant && (
          <>
            <View style={{marginVertical: RF(20)}}>
              <Text style={[styles.heading]}>{L('Merchant')}</Text>
            </View>

            <View style={styles.itemView}>
              <Text
                style={[styles.itemText, {fontFamily: THEME.FONTS.TYPE.BOLD}]}>
                Name:
              </Text>

              <Text style={styles.itemText}>
                {merchant?.firstName + ' ' + merchant?.lastName}
              </Text>
            </View>

            <View style={styles.itemView}>
              <Text
                style={[styles.itemText, {fontFamily: THEME.FONTS.TYPE.BOLD}]}>
                Phone:
              </Text>

              <Text style={styles.itemText}>{merchant?.phoneNumber}</Text>
            </View>

            <View style={styles.itemView}>
              <Text
                style={[styles.itemText, {fontFamily: THEME.FONTS.TYPE.BOLD}]}>
                Email:
              </Text>

              <Text style={styles.itemText}>{merchant?.email}</Text>
            </View>
          </>
        )}

        {assetPrice && assetUsed && (
          <>
            <View style={{marginVertical: RF(20)}}>
              <Text style={[styles.heading]}>{L('Coin')}</Text>
            </View>

            <View style={styles.itemView}>
              <Text
                style={[styles.itemText, {fontFamily: THEME.FONTS.TYPE.BOLD}]}>
                Asset Used:
              </Text>

              <Text style={styles.itemText}>{assetUsed}</Text>
            </View>

            <View style={styles.itemView}>
              <Text
                style={[styles.itemText, {fontFamily: THEME.FONTS.TYPE.BOLD}]}>
                Asset Price:
              </Text>

              <Text style={styles.itemText}>{assetPrice}</Text>
            </View>
          </>
        )}

        <View style={styles.row}>
          <PrimaryButton
            title={'Share Via SMS'}
            buttonStyle={styles.buttonStyle}
            icon={'share-alternative'}
            onPress={props.onPressPhone}
          />
          <PrimaryButton
            title={'Share Via Email'}
            buttonStyle={styles.buttonStyle}
            icon={'mail'}
            onPress={props.onPressEmail}
          />
        </View>

        <SecondaryButton
          title={'Close'}
          buttonStyle={styles.buttonStyle}
          onPress={props.onPressBackdrop}
        />
        <View style={{height: RF(50)}} />
      </ScrollView>
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
  buttonStyle: {
    width: RF(150),
    height: RF(40),
    marginVertical: THEME.MARGIN.NORMAL,
  },
  icon: {
    marginRight: RF(10),
  },
  heading: {
    color: THEME.COLORS.white,
    fontSize: RF(15),
    fontFamily: THEME.FONTS.TYPE.BOLD,
    alignSelf: 'center',
  },
  shareTitle: {
    color: THEME.COLORS.white,
    fontSize: RF(14),
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
  itemText: {
    color: THEME.COLORS.white,
    fontSize: RF(14),
    fontFamily: THEME.FONTS.TYPE.MEDIUM,
  },
  imageView: {
    marginVertical: THEME.MARGIN.NORMAL,

    borderRadius: THEME.RADIUS.SMALLBOX,

    height: RF(122),
    width: RF(123),
    alignItems: 'center',
    alignSelf: 'center',
  },
  itemView: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginBottom: THEME.MARGIN.LOW,
    paddingBottom: THEME.MARGIN.VERYLOW,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    borderWidth: 0.2,
    borderColor: THEME.COLORS.white,
    width: '90%',
    marginVertical: THEME.MARGIN.LOW,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
