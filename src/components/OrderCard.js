import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  DELIVERED_DATE_LABEL,
  EXPECTED_LABEL,
  ITEMS_LABEL,
} from '../constants/Constants';
import {
  actionLavenderBgColor,
  actionLavenderColor,
  actionTealBgColor,
  actionTealColor,
  blackColor,
  inputBorderColor,
  priorityLowBgColor,
  priorityLowTextColor,
  statusProcessingBgColor,
  statusProcessingTextColor,
  statusUnpaidBgColor,
  statusUnpaidTextColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter } = BaseStyle;

const STATUS_STYLES = {
  Pending: { bg: statusUnpaidBgColor, text: statusUnpaidTextColor },
  Processing: { bg: statusProcessingBgColor, text: statusProcessingTextColor },
  Dispatched: { bg: actionLavenderBgColor, text: actionLavenderColor },
  Delivered: { bg: actionTealBgColor, text: actionTealColor },
  Cancelled: { bg: priorityLowBgColor, text: priorityLowTextColor },
};

const OrderCard = ({
  orderId,
  date,
  status,
  itemCount,
  amount,
  expectedDate,
  deliveredDate,
  onPress,
}) => {
  const statusStyle = STATUS_STYLES[status] ?? STATUS_STYLES.Processing;
  const showExpected = Boolean(expectedDate);
  const showDelivered = Boolean(deliveredDate);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}>
        <View>
          <Text style={styles.orderId}>{orderId}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.statusText, { color: statusStyle.text }]}>{status}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={[flexDirectionRow, alignItemsCenter, styles.footerRow]}>
        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>{ITEMS_LABEL}</Text>
          <Text style={styles.metaValue}>{itemCount}</Text>
        </View>

        {showExpected ? (
          <>
            <View style={styles.verticalDivider} />
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>{EXPECTED_LABEL}</Text>
              <Text style={styles.metaValue}>{expectedDate}</Text>
            </View>
          </>
        ) : null}

        {showDelivered ? (
          <>
            <View style={styles.verticalDivider} />
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>{DELIVERED_DATE_LABEL}</Text>
              <Text style={styles.metaValue}>{deliveredDate}</Text>
            </View>
          </>
        ) : null}

        <Text style={styles.amount}>{amount}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.xLarge,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  orderId: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  date: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  statusBadge: {
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
  },
  statusText: {
    ...style.fontSizeSmall,
    ...style.fontWeightMedium,
  },
  divider: {
    height: 1,
    backgroundColor: inputBorderColor,
    marginVertical: spacings.large,
  },
  footerRow: {
    justifyContent: 'space-between',
  },
  metaCol: {
    minWidth: 56,
  },
  metaLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.small,
  },
  metaValue: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  verticalDivider: {
    width: 1,
    height: 36,
    backgroundColor: inputBorderColor,
    marginHorizontal: spacings.large,
  },
  amount: {
    flex: 1,
    textAlign: 'right',
    ...style.fontSizeLarge,
    ...style.fontWeightMedium,
    color: blackColor,
    // fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
});
