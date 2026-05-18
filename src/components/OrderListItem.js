import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  blackColor,
  inputBorderColor,
  statusProcessingBgColor,
  statusProcessingTextColor,
  textSecondaryColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter } = BaseStyle;

const OrderListItem = ({ orderId, date, status, amount, isLast = false }) => {
  return (
    <View style={[styles.container, !isLast && styles.borderBottom]}>
      <View style={styles.leftContent}>
        <Text style={styles.orderId}>{orderId}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={[flexDirectionRow, alignItemsCenter]}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </View>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    ...flexDirectionRow,
    ...justifyContentSpaceBetween,
    ...alignItemsCenter,
    paddingVertical: spacings.large,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: inputBorderColor,
  },
  leftContent: {
    flex: 1,
  },
  orderId: {
    ...style.fontSizeNormal2x,
    // ...style.fontWeightThin1x,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  date: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  statusBadge: {
    backgroundColor: statusProcessingBgColor,
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
    marginRight: spacings.large,
  },
  statusText: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightMedium,
    color: statusProcessingTextColor,
  },
  amount: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightThin1x,
    color: blackColor,
  },
});
