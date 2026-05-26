import React from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../CustomButton';
import { NO, YES } from '../../constants/Constants';
import {
  backgroundBeigeColor,
  blackColor,
  ExtraExtralightOrangeColor,
  inputBorderColor,
  primaryColor,
  statusUnpaidBgColor,
  textSecondaryColor,
  whiteColor,
} from '../../constants/Color';
import { BaseStyle } from '../../constants/Style';
import { style, spacings } from '../../constants/Fonts';

const { alignItemsCenter, width100Percent } = BaseStyle;

const VARIANT_STYLES = {
  logout: {
    icon: 'logout',
    iconColor: primaryColor,
    iconBg: ExtraExtralightOrangeColor,
    iconRing: statusUnpaidBgColor,
  },
  default: {
    icon: 'help-circle-outline',
    iconColor: primaryColor,
    iconBg: backgroundBeigeColor,
    iconRing: backgroundBeigeColor,
  },
};

const ConfirmModal = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = YES,
  cancelLabel = NO,
  variant = 'default',
  iconName,
}) => {
  const variantStyle = VARIANT_STYLES[variant] ?? VARIANT_STYLES.default;
  const resolvedIcon = iconName ?? variantStyle.icon;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onCancel} accessibilityRole="button" />

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onCancel}
            activeOpacity={0.7}
            hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}>
            <Icon name="close" size={22} color={textSecondaryColor} />
          </TouchableOpacity>

          <View style={[alignItemsCenter, styles.iconSection]}>
            <View style={[styles.iconRing, { backgroundColor: variantStyle.iconRing }]}>
              <View style={[styles.iconWrap, { backgroundColor: variantStyle.iconBg }]}>
                <Icon name={resolvedIcon} size={36} color={variantStyle.iconColor} />
              </View>
            </View>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.divider} />

          <View style={styles.actions}>
            <CustomButton
              title={cancelLabel}
              variant="outline"
              onPress={onCancel}
              style={styles.cancelButton}
            />
            <CustomButton title={confirmLabel} onPress={onConfirm} style={styles.confirmButton} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacings.xxxxLarge,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    ...width100Percent,
    backgroundColor: whiteColor,
    borderRadius: 20,
    paddingTop: spacings.xxLarge,
    paddingHorizontal: spacings.xxLarge,
    paddingBottom: spacings.xxLarge,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: inputBorderColor,
    ...Platform.select({
      ios: {
        shadowColor: blackColor,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  closeButton: {
    position: 'absolute',
    top: spacings.large,
    right: spacings.large,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: backgroundBeigeColor,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  iconSection: {
    marginBottom: spacings.large,
    marginTop: spacings.small,
  },
  iconRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(192, 130, 97, 0.15)',
  },
  title: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: blackColor,
    textAlign: 'center',
    marginBottom: spacings.normal,
  },
  message: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacings.small,
    marginBottom: spacings.xxLarge,
  },
  divider: {
    ...width100Percent,
    height: 1,
    backgroundColor: inputBorderColor,
    marginBottom: spacings.xxLarge,
  },
  actions: {
    ...width100Percent,
    gap: spacings.normal,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    ...width100Percent,
    flex: 1,
  },
  cancelButton: {
    ...width100Percent,
    flex: 1,
  },
});
