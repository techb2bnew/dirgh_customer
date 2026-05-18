import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  blackColor,
  inputBorderColor,
  statusPaidBgColor,
  statusPaidTextColor,
  statusUnpaidBgColor,
  statusUnpaidTextColor,
  textSecondaryColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter } = BaseStyle;

const InvoiceListItem = ({ invoiceId, dueDate, status, amount, isLast = false }) => {
  const isUnpaid = status === 'Unpaid';

  return (
    <View style={[styles.container, !isLast && styles.borderBottom]}>
      <View style={styles.leftContent}>
        <Text style={styles.invoiceId}>{invoiceId}</Text>
        <Text style={styles.dueDate}>
          Due {dueDate}
        </Text>
      </View>
      <View style={[flexDirectionRow, alignItemsCenter]}>
        <View
          style={[
            styles.statusBadge,
            isUnpaid ? styles.unpaidBadge : styles.paidBadge,
          ]}>
          <Text
            style={[
              styles.statusText,
              isUnpaid ? styles.unpaidText : styles.paidText,
            ]}>
            {status}
          </Text>
        </View>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </View>
  );
};

export default InvoiceListItem;

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
  invoiceId: {
    ...style.fontSizeNormal2x,
    // ...style.fontWeightThin1x,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  dueDate: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  statusBadge: {
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
    marginRight: spacings.large,
  },
  unpaidBadge: {
    backgroundColor: statusUnpaidBgColor,
  },
  paidBadge: {
    backgroundColor: statusPaidBgColor,
  },
  statusText: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightMedium,
  },
  unpaidText: {
    color: statusUnpaidTextColor,
  },
  paidText: {
    color: statusPaidTextColor,
  },
  amount: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightThin1x,
    color: blackColor,
  },
});
