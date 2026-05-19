import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BULLET_SEPARATOR, formatPerPack } from '../constants/Constants';
import {
  blackColor,
  inputBorderColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, alignItemsCenter, justifyContentSpaceBetween } = BaseStyle;

const formatPrice = value => `$${value.toFixed(2)}`;

const CartItemCard = ({
  name,
  sku,
  packaging,
  price,
  quantity,
  lineTotal,
  canIncrement,
  canDecrement,
  onRemove,
  onIncrement,
  onDecrement,
}) => {
  return (
    <View style={styles.card}>
      <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.topRow]}>
        <View style={styles.titleCol}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.meta}>
            {sku}
            {BULLET_SEPARATOR}
            {packaging}
          </Text>
          <Text style={styles.unitPrice}>{formatPerPack(formatPrice(price))}</Text>
        </View>
        <TouchableOpacity onPress={onRemove} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Icon name="trash-can-outline" size={22} color={textSecondaryColor} />
        </TouchableOpacity>
      </View>

      <View style={[flexDirectionRow, alignItemsCenter, justifyContentSpaceBetween, styles.bottomRow]}>
        <View style={[flexDirectionRow, alignItemsCenter, styles.qtyWrap]}>
          <TouchableOpacity
            style={[styles.qtyButton, !canDecrement && styles.qtyButtonDisabled]}
            onPress={onDecrement}
            disabled={!canDecrement}
            activeOpacity={0.7}>
            <Icon
              name="minus"
              size={20}
              color={canDecrement ? blackColor : textSecondaryColor}
            />
          </TouchableOpacity>
          <View style={styles.qtyValueBox}>
            <Text style={styles.qtyValue}>{quantity}</Text>
          </View>
          <TouchableOpacity
            style={[styles.qtyButton, !canIncrement && styles.qtyButtonDisabled]}
            onPress={onIncrement}
            disabled={!canIncrement}
            activeOpacity={0.7}>
            <Icon
              name="plus"
              size={20}
              color={canIncrement ? blackColor : textSecondaryColor}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.lineTotal}>{formatPrice(lineTotal)}</Text>
      </View>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  topRow: {
    marginBottom: spacings.large,
  },
  titleCol: {
    flex: 1,
    marginRight: spacings.normal,
  },
  name: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  meta: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginBottom: spacings.xsmall,
  },
  unitPrice: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  bottomRow: {
    marginTop: spacings.small,
  },
  qtyWrap: {
    borderWidth: 1,
    borderColor: inputBorderColor,
    borderRadius: 10,
    backgroundColor: whiteColor,
  },
  qtyButton: {
    width: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonDisabled: {
    opacity: 0.45,
  },
  qtyValueBox: {
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: inputBorderColor,
    height: 30,
  },
  qtyValue: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  lineTotal: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
});
