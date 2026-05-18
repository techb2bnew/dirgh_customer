import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../CustomButton';
import { OK } from '../../constants/Constants';
import {
  backgroundBeigeColor,
  blackColor,
  primaryColor,
  textSecondaryColor,
  whiteColor,
} from '../../constants/Color';
import { BaseStyle } from '../../constants/Style';
import { style, spacings } from '../../constants/Fonts';

const { alignItemsCenter, width100Percent } = BaseStyle;

const SuccessModal = ({ visible, title, message, onOk }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onOk}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <Icon name="check-circle" size={48} color={primaryColor} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <CustomButton title={OK} onPress={onOk} style={styles.okButton} />
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacings.xxxxLarge,
  },
  card: {
    ...width100Percent,
    backgroundColor: whiteColor,
    borderRadius: 16,
    padding: spacings.xxLarge,
    alignItems: 'center',
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: backgroundBeigeColor,
    ...alignItemsCenter,
    justifyContent: 'center',
    marginBottom: spacings.large,
  },
  title: {
    ...style.fontSizeLargeX,
    ...style.fontWeightMedium1x,
    color: blackColor,
    textAlign: 'center',
    marginBottom: spacings.normal,
  },
  message: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacings.xxLarge,
  },
  okButton: {
    ...width100Percent,
  },
});
