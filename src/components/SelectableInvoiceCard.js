import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DUE_PREFIX, ISSUED_PREFIX, OVERDUE, UNPAID } from '../constants/Constants';
import {
  actionTealColor,
  blackColor,
  inputBorderColor,
  priorityHighBgColor,
  priorityHighTextColor,
  statusUnpaidBgColor,
  statusUnpaidTextColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, alignItemsCenter, justifyContentSpaceBetween } = BaseStyle;

const SelectableInvoiceCard = ({
  invoiceId,
  issuedDate,
  dueDate,
  amount,
  status,
  selected,
  onToggle,
}) => {
  const isOverdue = status === OVERDUE;

  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onToggle}
      activeOpacity={0.7}>
      <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}>
        <View style={[flexDirectionRow, alignItemsCenter, styles.topLeft]}>
          <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
            {selected ? <Icon name="check" size={15} color={whiteColor} /> : null}
          </View>
          <View>
            <Text style={styles.invoiceId}>{invoiceId}</Text>
            <Text style={styles.meta}>
              {ISSUED_PREFIX} {issuedDate}
            </Text>
          </View>
        </View>
        <View style={[styles.statusBadge, isOverdue ? styles.overdueBadge : styles.unpaidBadge]}>
          <Text style={[styles.statusText, isOverdue ? styles.overdueText : styles.unpaidText]}>
            {status}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}>
        <Text style={styles.meta}>
          {DUE_PREFIX} {dueDate}
        </Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectableInvoiceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.xLarge,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  cardSelected: {
    borderColor: actionTealColor,
    borderWidth: 1.5,
  },
  topLeft: {
    flex: 1,
    marginRight: spacings.normal,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: inputBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacings.normal,
  },
  checkboxSelected: {
    backgroundColor: actionTealColor,
    borderColor: actionTealColor,
  },
  invoiceId: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium1x,
    color: blackColor,
    marginBottom: spacings.xsmall,
    marginLeft:spacings.large
  },
  meta: {
    ...style.fontSizeSmall1x,
    color: textSecondaryColor,
    marginLeft:spacings.large
  },
  statusBadge: {
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
  },
  unpaidBadge: {
    backgroundColor: statusUnpaidBgColor,
  },
  overdueBadge: {
    backgroundColor: priorityHighBgColor,
  },
  statusText: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightMedium,
  },
  unpaidText: {
    color: statusUnpaidTextColor,
  },
  overdueText: {
    color: priorityHighTextColor,
  },
  divider: {
    height: 1,
    backgroundColor: inputBorderColor,
    marginVertical: spacings.large,
  },
  amount: {
    ...style.fontSizeLarge,
    ...style.fontWeightThin,
    color: blackColor,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
});
