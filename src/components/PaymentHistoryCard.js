import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AMOUNT_LABEL, INVOICE_PREFIX, METHOD_LABEL } from '../constants/Constants';
import {
  blackColor,
  inputBorderColor,
  statusPaidBgColor,
  statusPaidTextColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter } = BaseStyle;

const PaymentHistoryCard = ({ paymentId, date, status, amount, method, invoiceId }) => {
  return (
    <View style={styles.card}>
      <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}>
        <Text style={styles.paymentId}>{paymentId}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.divider} />
      <View style={[flexDirectionRow, justifyContentSpaceBetween,{paddingVertical:spacings.large}]}>
        <View style={styles.column}>
          <Text style={styles.fieldLabel}>{AMOUNT_LABEL}</Text>
          <Text style={styles.fieldValue}>{amount}</Text>
        </View>
        <View style={[styles.column, styles.columnRight]}>
          <Text style={styles.fieldLabel}>{METHOD_LABEL}</Text>
          <Text style={styles.methodValue}>{method}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <Text style={styles.invoiceRef}>
        {INVOICE_PREFIX} {invoiceId}
      </Text>
    </View>
  );
};

export default PaymentHistoryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.xLarge,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  paymentId: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  statusBadge: {
    backgroundColor: statusPaidBgColor,
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
  },
  statusText: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightMedium,
    color: statusPaidTextColor,
  },
  date: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginTop: spacings.xsmall,
    marginBottom: spacings.large,
  },
  divider: {
    height: 1,
    backgroundColor: inputBorderColor,
  },
  column: {
    flex: 1,
  },
  columnRight: {
    alignItems: 'flex-end',
  },
  fieldLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.small,
  },
  fieldValue: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  methodValue: {
    ...style.fontSizeNormal2x,
    color: blackColor,
  },
  invoiceRef: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginTop:spacings.large
  },
});
