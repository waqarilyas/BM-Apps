import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {handleImageSelection} from '../services/helper.service';
import {THEME} from '../theme';
import {RF} from '../theme/responsive';

interface PROPS {
  visible: boolean;
  toggleSelection: () => void;
  handleImage: (val: any) => void;
}

const ImageSelectionModal = ({
  visible,
  toggleSelection,
  handleImage,
}: PROPS) => {
  return (
    <Modal animationType={'slide'} transparent visible={visible}>
      <Pressable style={styles.mainContainer} onPress={toggleSelection}>
        <View style={styles.selectionModal}>
          <View style={styles.selectionSubModal}>
            <TouchableOpacity
              style={styles.iconsContainer}
              onPress={() => {
                handleImageSelection('camera').then((res: any) => {
                  toggleSelection();

                  console.log('---response----', res);

                  handleImage(res);
                });
              }}>
              <Icon name="camera" size={RF(25)} color={THEME.COLORS.white} />
              <Text style={styles.iconName}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconsContainer}
              onPress={() => {
                handleImageSelection('gallery').then((res: any) => {
                  toggleSelection();
                  handleImage(res);
                });
              }}>
              <Icon name="images" size={RF(25)} color={THEME.COLORS.white} />
              <Text style={styles.iconName}>Gallery</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.closeContainer}
            onPress={toggleSelection}>
            <Icon name="cross" size={RF(25)} color={THEME.COLORS.white} />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  selectionModal: {
    width: '90%',
    height: '12%',
    backgroundColor: THEME.COLORS.black,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    bottom: '10%',
    position: 'absolute',
    borderRadius: RF(2),
  },
  itemViewHeading: {
    fontSize: RF(3.5),
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: THEME.COLORS.white,
  },
  selectionSubModal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
    top: -RF(12),
    borderRadius: RF(20),
  },
  mainContainer: {
    flex: 1,
  },
});

//make this component available to the app
export default ImageSelectionModal;
