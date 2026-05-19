import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ADD_TO_CART,
  BULLET_SEPARATOR,
  formatInCart,
  formatOnlyAvailableToAdd,
  LAST_ORDER_LABEL,
  LISTING_OUT_OF_STOCK,
  LISTING_PRICE_LABEL,
  LISTING_STOCK_LABEL,
  REPEAT_BADGE,
  SKU_LABEL,
} from '../constants/Constants';
import {
  actionLavenderBgColor,
  actionLavenderColor,
  actionTealColor,
  blackColor,
  inputBorderColor,
  redColor,
  statusProcessingBgColor,
  statusProcessingTextColor,
  statusUnpaidBgColor,
  statusUnpaidTextColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, alignItemsCenter, justifyContentSpaceBetween } = BaseStyle;

const formatPrice = value => `$${value.toFixed(2)}`;

const CatalogProductCard = ({
  name,
  sku,
  packaging,
  price,
  stock,
  lastOrderDate,
  isRepeat,
  cartQuantity,
  selectedQty,
  remainingStock,
  isOutOfStock,
  canIncrementSelected,
  canDecrementSelected,
  canAddToCart,
  onAddToCart,
  onIncrementSelected,
  onDecrementSelected,
}) => {
  const isLowStock = stock < 400;
  const stockBg = isLowStock ? statusUnpaidBgColor : statusProcessingBgColor;
  const stockTextColor = isLowStock ? statusUnpaidTextColor : statusProcessingTextColor;

  return (
    <View style={styles.card}>
      <View style={[flexDirectionRow, alignItemsCenter, styles.titleRow]}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        {isRepeat ? (
          <View style={styles.repeatBadge}>
            <Text style={styles.repeatText}>{REPEAT_BADGE}</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.meta}>
        {SKU_LABEL} {sku}
        {BULLET_SEPARATOR}
        {packaging}
      </Text>

      {/* {cartQuantity > 0 ? (
        <Text style={styles.inCartText}>{formatInCart(cartQuantity)}</Text>
      ) : null} */}

      <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.infoRow]}>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>{LISTING_PRICE_LABEL}</Text>
          <Text style={styles.priceValue}>{formatPrice(price)}</Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>{LISTING_STOCK_LABEL}</Text>
          <View style={[styles.stockPill, { backgroundColor: stockBg }]}>
            <Text style={[styles.stockValue, { color: stockTextColor }]}>{stock}</Text>
          </View>
        </View>
        <View style={[styles.infoCol, styles.infoColRight]}>
          <Text style={styles.infoLabel}>{LAST_ORDER_LABEL}</Text>
          <Text style={styles.lastOrderValue}>{lastOrderDate}</Text>
        </View>
      </View>

      {isOutOfStock ? (
        <Text style={styles.stockError}>{LISTING_OUT_OF_STOCK}</Text>
      ) : null}

      <View style={[flexDirectionRow, alignItemsCenter, styles.actionRow]}>
        <View style={[flexDirectionRow, alignItemsCenter, styles.qtyWrap]}>
          <TouchableOpacity
            style={[styles.qtyButton, !canDecrementSelected && styles.qtyButtonDisabled]}
            onPress={onDecrementSelected}
            disabled={!canDecrementSelected}
            activeOpacity={0.7}>
            <Icon
              name="minus"
              size={20}
              color={canDecrementSelected ? blackColor : textSecondaryColor}
            />
          </TouchableOpacity>
          <View style={styles.qtyValueBox}>
            <Text style={styles.qtyValue}>{selectedQty}</Text>
          </View>
          <TouchableOpacity
            style={[styles.qtyButton, !canIncrementSelected && styles.qtyButtonDisabled]}
            onPress={onIncrementSelected}
            disabled={!canIncrementSelected}
            activeOpacity={0.7}>
            <Icon
              name="plus"
              size={20}
              color={canIncrementSelected ? blackColor : textSecondaryColor}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            flexDirectionRow,
            alignItemsCenter,
            styles.addButton,
            !canAddToCart && styles.addButtonDisabled,
          ]}
          onPress={onAddToCart}
          disabled={!canAddToCart}
          activeOpacity={0.85}>
          <Icon name="cart-outline" size={20} color={whiteColor} />
          <Text style={styles.addButtonText}>{ADD_TO_CART}</Text>
        </TouchableOpacity>
      </View>

      {!isOutOfStock && remainingStock > 0 && remainingStock < selectedQty ? (
        <Text style={styles.stockHint}>{formatOnlyAvailableToAdd(remainingStock)}</Text>
      ) : null}
    </View>
  );
};

export default CatalogProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  titleRow: {
    marginBottom: spacings.small,
  },
  name: {
    flex: 1,
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginRight: spacings.small,
  },
  repeatBadge: {
    backgroundColor: actionLavenderBgColor,
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
  },
  repeatText: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightMedium,
    color: actionLavenderColor,
  },
  meta: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginBottom: spacings.small,
  },
  inCartText: {
    ...style.fontSizeNormal,
    color: actionTealColor,
    marginBottom: spacings.large,
    ...style.fontWeightMedium,
  },
  infoRow: {
    marginBottom: spacings.large,
  },
  infoCol: {
    flex: 1,
  },
  infoColRight: {
    alignItems: 'flex-end',
  },
  infoLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.small,
  },
  priceValue: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  stockPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 8,
  },
  stockValue: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
  },
  lastOrderValue: {
    ...style.fontSizeNormal,
    color: blackColor,
  },
  stockError: {
    ...style.fontSizeSmall1x,
    color: redColor,
    marginBottom: spacings.normal,
  },
  stockHint: {
    ...style.fontSizeSmall1x,
    color: textSecondaryColor,
    marginTop: spacings.small,
  },
  actionRow: {
    gap: spacings.normal,
  },
  qtyWrap: {
    borderWidth: 1,
    borderColor: inputBorderColor,
    borderRadius: 5,
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
    minWidth: 36,
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
  addButton: {
    flex: 1,
    backgroundColor: actionTealColor,
    borderRadius: 5,
    paddingVertical: spacings.normal,
    justifyContent: 'center',
    paddingHorizontal: spacings.large,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: whiteColor,
    marginLeft: spacings.normal,
  },
});
