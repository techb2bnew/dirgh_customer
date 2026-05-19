import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BULLET_SEPARATOR,
  formatQuickReorderMeta,
  formatUsualQty,
  PER_PACK,
  USUAL_LABEL,
} from '../constants/Constants';
import {
  actionOrangeBgColor,
  balanceBadgeTextColor,
  blackColor,
  inputBorderColor,
  primaryColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, alignItemsCenter, justifyContentSpaceBetween } = BaseStyle;

const formatPrice = value => `$${value.toFixed(2)}`;

const QuickReorderProductCard = ({
  name,
  sku,
  packaging,
  lastOrdered,
  orderCount,
  price,
  usualQty,
  currentQty,
  onIncrement,
  onDecrement,
  onUsual,
}) => {
  const canDecrement = currentQty > 0;

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
          <Text style={styles.history}>{formatQuickReorderMeta(lastOrdered, orderCount)}</Text>
        </View>
        <View style={styles.priceCol}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          <Text style={styles.perPack}>{PER_PACK}</Text>
        </View>
      </View>

      <View style={[flexDirectionRow, alignItemsCenter, styles.controlsRow]}>
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
            <Text style={styles.qtyValue}>{currentQty}</Text>
          </View>
          <TouchableOpacity style={styles.qtyButton} onPress={onIncrement} activeOpacity={0.7}>
            <Icon name="plus" size={20} color={blackColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.usualCol}>
          <TouchableOpacity style={styles.usualButton} onPress={onUsual} activeOpacity={0.7}>
            <Text style={styles.usualButtonText}>{USUAL_LABEL}</Text>
          </TouchableOpacity>
          <Text style={styles.usualQty}>{formatUsualQty(usualQty)}</Text>
        </View>
      </View>
    </View>
  );
};

export default QuickReorderProductCard;

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
  history: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  priceCol: {
    alignItems: 'flex-end',
  },
  price: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  perPack: {
    ...style.fontSizeSmall1x,
    color: textSecondaryColor,
    marginTop: spacings.xsmall,
  },
  controlsRow: {
    justifyContent: 'space-between',
  },
  qtyWrap: {
    borderWidth: 1,
    borderColor: inputBorderColor,
    borderRadius: 10,
    backgroundColor: whiteColor,
  },
  qtyButton: {
    width: 40,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  qtyButtonDisabled: {
    opacity: 0.45,
  },
  qtyValueBox: {
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: inputBorderColor,
    height: 36,
    paddingHorizontal: spacings.normal,
  },
  qtyValue: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  usualCol: {
    alignItems: 'center',
  },
  usualButton: {
    backgroundColor: actionOrangeBgColor,
    paddingHorizontal: spacings.large,
    paddingVertical: spacings.normal,
    borderRadius: 20,
    marginBottom: spacings.xsmall,
  },
  usualButtonText: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: primaryColor,
  },
  usualQty: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: balanceBadgeTextColor,
  },
});
