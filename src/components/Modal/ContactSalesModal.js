import React from 'react';
import { Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../CustomButton';
import {
  CLOSE,
  CONTACT_SALES,
  CONTACT_SALES_SUBTITLE,
  SALES_EMAIL,
  SALES_EMAIL_LABEL,
  SALES_PHONE,
  SALES_PHONE_LABEL,
} from '../../constants/Constants';
import {
  backgroundBeigeColor,
  blackColor,
  inputBorderColor,
  primaryColor,
  textSecondaryColor,
  whiteColor,
} from '../../constants/Color';
import { BaseStyle } from '../../constants/Style';
import { style, spacings } from '../../constants/Fonts';

const { alignItemsCenter, flexDirectionRow, width100Percent } = BaseStyle;

const ContactSalesModal = ({ visible, onClose }) => {
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${SALES_EMAIL}`);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${SALES_PHONE.replace(/[^\d+]/g, '')}`);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <Icon name="headset" size={40} color={primaryColor} />
          </View>
          <Text style={styles.title}>{CONTACT_SALES}</Text>
          <Text style={styles.subtitle}>{CONTACT_SALES_SUBTITLE}</Text>

          <TouchableOpacity
            style={[flexDirectionRow, alignItemsCenter, styles.contactRow]}
            onPress={handleEmailPress}
            activeOpacity={0.7}>
            <View style={styles.contactIconWrap}>
              <Icon name="email-outline" size={22} color={primaryColor} />
            </View>
            <View style={styles.contactTextCol}>
              <Text style={styles.contactLabel}>{SALES_EMAIL_LABEL}</Text>
              <Text style={styles.contactValue}>{SALES_EMAIL}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[flexDirectionRow, alignItemsCenter, styles.contactRow]}
            onPress={handlePhonePress}
            activeOpacity={0.7}>
            <View style={styles.contactIconWrap}>
              <Icon name="phone-outline" size={22} color={primaryColor} />
            </View>
            <View style={styles.contactTextCol}>
              <Text style={styles.contactLabel}>{SALES_PHONE_LABEL}</Text>
              <Text style={styles.contactValue}>{SALES_PHONE}</Text>
            </View>
          </TouchableOpacity>

          <CustomButton title={CLOSE} onPress={onClose} style={styles.closeButton} />
        </View>
      </View>
    </Modal>
  );
};

export default ContactSalesModal;

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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacings.large,
  },
  title: {
    ...style.fontSizeLargeX,
    ...style.fontWeightMedium1x,
    color: blackColor,
    textAlign: 'center',
    marginBottom: spacings.small,
  },
  subtitle: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
    textAlign: 'center',
    marginBottom: spacings.xxLarge,
  },
  contactRow: {
    ...width100Percent,
    backgroundColor: backgroundBeigeColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: inputBorderColor,
    padding: spacings.large,
    marginBottom: spacings.normal,
  },
  contactIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacings.large,
  },
  contactTextCol: {
    flex: 1,
  },
  contactLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.xsmall,
  },
  contactValue: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  closeButton: {
    ...width100Percent,
    marginTop: spacings.large,
  },
});
