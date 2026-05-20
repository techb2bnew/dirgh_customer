import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatQuantity, SKU_LABEL } from '../constants/Constants';
import { blackColor, inputBorderColor, textSecondaryColor } from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, justifyContentSpaceBetween } = BaseStyle;

const formatLineTotal = value => `$${value.toFixed(2)}`;

const OrderDetailItemRow = ({ name, sku, quantity, unitPrice, lineTotal, isLast = false }) => {
  return (
    <View style={[styles.row, !isLast && styles.borderBottom]}>
      <View style={[flexDirectionRow, justifyContentSpaceBetween]}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.unitPrice}>{formatLineTotal(unitPrice)}</Text>
      </View>
      <Text style={styles.sku}>
        {SKU_LABEL} {sku}
      </Text>
      <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.bottomRow]}>
        <Text style={styles.qty}>{formatQuantity(quantity)}</Text>
        <Text style={styles.lineTotal}>{formatLineTotal(lineTotal)}</Text>
      </View>
    </View>
  );
};

export default OrderDetailItemRow;

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacings.large,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: inputBorderColor,
  },
  name: {
    flex: 1,
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginRight: spacings.normal,
  },
  unitPrice: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  sku: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginTop: spacings.xsmall,
    marginBottom: spacings.small,
  },
  bottomRow: {
    marginTop: spacings.xsmall,
  },
  qty: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  lineTotal: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
});
