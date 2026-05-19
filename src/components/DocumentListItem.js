import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BULLET_SEPARATOR } from '../constants/Constants';
import {
  actionBrownBgColor,
  addOrderBorderColor,
  blackColor,
  actionBrownColor,
  actionOrangeBgColor,
  actionOrangeColor,
  actionPurpleBgColor,
  actionPurpleColor,
  actionTealBgColor,
  actionTealColor,
  inputBorderColor,
  statusProcessingBgColor,
  statusProcessingTextColor,
  statusUnpaidBgColor,
  statusUnpaidTextColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, alignItemsCenter } = BaseStyle;

const TYPE_STYLES = {
  Invoice: {
    icon: 'file-document-outline',
    iconColor: actionOrangeColor,
    iconBg: actionOrangeBgColor,
    badgeBg: statusUnpaidBgColor,
    badgeText: statusUnpaidTextColor,
  },
  Statement: {
    icon: 'chart-bar',
    iconColor: actionPurpleColor,
    iconBg: actionPurpleBgColor,
    badgeBg: actionPurpleBgColor,
    badgeText: actionPurpleColor,
  },
  'Delivery Challan': {
    icon: 'truck-delivery-outline',
    iconColor: actionTealColor,
    iconBg: actionTealBgColor,
    badgeBg: statusProcessingBgColor,
    badgeText: statusProcessingTextColor,
  },
  Report: {
    icon: 'file-chart-outline',
    iconColor: actionBrownColor,
    iconBg: actionBrownBgColor,
    badgeBg: actionBrownBgColor,
    badgeText: actionBrownColor,
  },
};

const DocumentListItem = ({ title, type, referenceId, date, size, onDownload }) => {
  const typeStyle = TYPE_STYLES[type] ?? TYPE_STYLES.Invoice;

  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap]}>
        <Icon name={typeStyle.icon} size={22} color={typeStyle.iconColor} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={[flexDirectionRow, alignItemsCenter, styles.metaRow]}>
          <View style={[styles.badge, { backgroundColor: typeStyle.badgeBg }]}>
            <Text style={[styles.badgeText, { color: typeStyle.badgeText }]}>{type}</Text>
          </View>
          {referenceId ? (
            <>
              <Text style={styles.dot}>{BULLET_SEPARATOR}</Text>
              <Text style={styles.referenceId}>{referenceId}</Text>
            </>
          ) : null}
        </View>
        <Text style={styles.footerMeta}>
          {date}
          {BULLET_SEPARATOR}
          {size}
        </Text>
      </View>

      <TouchableOpacity style={styles.downloadButton} onPress={onDownload} activeOpacity={0.7}>
        <Icon name="file-download-outline" size={20} color={addOrderBorderColor} />
      </TouchableOpacity>
    </View>
  );
};

export default DocumentListItem;

const styles = StyleSheet.create({
  card: {
    ...flexDirectionRow,
    ...alignItemsCenter,
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacings.large,
    backgroundColor: whiteColor,
    borderWidth: 1,
    borderColor: inputBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginRight: spacings.normal,
  },
  title: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.small,
  },
  metaRow: {
    flexWrap: 'wrap',
    marginVertical: spacings.normalx,
  },
  badge: {
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
  },
  badgeText: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightMedium,
  },
  dot: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginHorizontal: spacings.xsmall,
  },
  referenceId: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  footerMeta: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  downloadButton: {
    width: 44,
    height: 44,
    borderRadius: 5,
    backgroundColor: whiteColor,
    borderWidth: 1,
    borderColor: inputBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
