import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  AMOUNT_LABEL,
  BULLET_SEPARATOR,
  CREDIT_BADGE,
  DEBIT_BADGE,
  RUNNING_BALANCE_LABEL,
} from '../constants/Constants';
import {
  actionOrangeColor,
  actionTealColor,
  blackColor,
  inputBorderColor,
  statusPaidBgColor,
  statusPaidTextColor,
  statusUnpaidBgColor,
  statusUnpaidTextColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter } = BaseStyle;

const LedgerTransactionCard = ({
  title,
  date,
  reference,
  type,
  amount,
  runningBalance,
}) => {
  const isCredit = type === 'credit';

  return (
    <View style={styles.card}>
      <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={[styles.badge, isCredit ? styles.creditBadge : styles.debitBadge]}>
          <Text style={[styles.badgeText, isCredit ? styles.creditText : styles.debitText]}>
            {isCredit ? CREDIT_BADGE : DEBIT_BADGE}
          </Text>
        </View>
      </View>
      <Text style={styles.meta}>
        {date}
        {BULLET_SEPARATOR}
        {reference}
      </Text>
      <View style={styles.divider} />
      <View style={[flexDirectionRow, justifyContentSpaceBetween]}>
        <View>
          <Text style={styles.fieldLabel}>{AMOUNT_LABEL}</Text>
          <Text style={[styles.amount, isCredit ? styles.creditAmount : styles.debitAmount]}>
            {amount}
          </Text>
        </View>
        <View style={styles.balanceCol}>
          <Text style={styles.fieldLabel}>{RUNNING_BALANCE_LABEL}</Text>
          <Text style={styles.balanceValue}>{runningBalance}</Text>
        </View>
      </View>
    </View>
  );
};

export default LedgerTransactionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.xxLarge,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  title: {
    flex: 1,
    ...style.fontSizeNormal,
    ...style.fontWeightThin1x,
    color: blackColor,
    marginRight: spacings.normal,
  },
  badge: {
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
  },
  creditBadge: {
    backgroundColor: statusPaidBgColor,
  },
  debitBadge: {
    backgroundColor: statusUnpaidBgColor,
  },
  badgeText: {
    ...style.fontSizeExtraSmall,
    ...style.fontWeightThin1x,
  },
  creditText: {
    color: statusPaidTextColor,
  },
  debitText: {
    color: statusUnpaidTextColor,
  },
  meta: {
    ...style.fontSizeSmall2x,
    color: textSecondaryColor,
    marginVertical: spacings.large,
  },
  divider: {
    height: 1,
    backgroundColor: inputBorderColor,
    marginBottom: spacings.large,
  },
  fieldLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.small,
  },
  amount: {
    ...style.fontSizeNormal,
    ...style.fontWeightThin1x,
  },
  creditAmount: {
    color: actionTealColor,
  },
  debitAmount: {
    color: actionOrangeColor,
  },
  balanceCol: {
    alignItems: 'flex-end',
  },
  balanceValue: {
    ...style.fontSizeNormal,
    ...style.fontWeightThin1x,
    color: blackColor,
  },
});
