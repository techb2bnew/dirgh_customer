import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ADD_TO_ORDER,
  BULLET_SEPARATOR,
  formatAllStockAddedMessage,
  formatRemainingBelowMinOrderMessage,
  INSUFFICIENT_STOCK,
  MIN_LABEL,
  PER_UNIT,
  SKU_LABEL,
  STOCK_LABEL,
} from '../constants/Constants';
import {
  addOrderBorderColor,
  blackColor,
  inputBorderColor,
  productCategoryBgColor,
  productCategoryTextColor,
  redColor,
  stockDotColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, alignItemsCenter, justifyContentSpaceBetween, width100Percent } = BaseStyle;

const formatPrice = value => `$${value.toFixed(2)}`;

const ProductCard = ({
  name,
  sku,
  category,
  price,
  stock,
  minOrder,
  quantity,
  canAddToOrder = true,
  canIncrement = true,
  onAddToOrder,
  onIncrement,
  onDecrement,
}) => {
  const isInCart = quantity > 0;
  const remainingStock = stock - quantity;
  const isAtMaxStock = isInCart && quantity >= stock;
  const isRemainingBelowMinOrder =
    isInCart &&
    !canIncrement &&
    !isAtMaxStock &&
    remainingStock > 0 &&
    remainingStock < minOrder;

  const stockLimitMessage = isAtMaxStock
    ? formatAllStockAddedMessage(stock)
    : isRemainingBelowMinOrder
      ? formatRemainingBelowMinOrderMessage(remainingStock, minOrder)
      : null;

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <View style={[flexDirectionRow, alignItemsCenter, styles.metaRow]}>
        <Text style={styles.metaText}>
          {SKU_LABEL} {sku}
          {BULLET_SEPARATOR}
        </Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>
      <View style={[flexDirectionRow, alignItemsCenter, styles.priceRow]}>
        <Text style={styles.price}>{formatPrice(price)}</Text>
        <Text style={styles.perUnit}>{PER_UNIT}</Text>
      </View>
      <View style={[flexDirectionRow, alignItemsCenter, styles.stockRow]}>
        <View style={styles.stockDot} />
        <Text style={styles.stockText}>
          {STOCK_LABEL} {stock}
          {'  '}
          {MIN_LABEL} {minOrder}
        </Text>
      </View>
      <View style={styles.divider} />
      {isInCart ? (
        <>
          <View style={[flexDirectionRow, alignItemsCenter, justifyContentSpaceBetween, styles.qtyRow]}>
            <TouchableOpacity style={styles.qtyButton} onPress={onDecrement} activeOpacity={0.7}>
              <Icon name="minus" size={20} color={blackColor} />
            </TouchableOpacity>
            <View style={styles.qtyValueWrap}>
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
          {stockLimitMessage ? (
            <Text style={styles.stockInfo}>{stockLimitMessage}</Text>
          ) : null}
        </>
      ) : (
        <>
          <TouchableOpacity
            style={[
              flexDirectionRow,
              alignItemsCenter,
              styles.addButton,
              !canAddToOrder && styles.addButtonDisabled,
            ]}
            onPress={onAddToOrder}
            disabled={!canAddToOrder}
            activeOpacity={0.7}>
            <Icon
              name="plus"
              size={20}
              color={canAddToOrder ? addOrderBorderColor : textSecondaryColor}
            />
            <Text
              style={[
                styles.addButtonText,
                !canAddToOrder && styles.addButtonTextDisabled,
              ]}>
              {ADD_TO_ORDER}
            </Text>
          </TouchableOpacity>
          {!canAddToOrder ? (
            <Text style={styles.stockError}>{INSUFFICIENT_STOCK}</Text>
          ) : null}
        </>
      )}
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.xxLarge,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,

  },
  name: {
    ...style.fontSizeMedium1x,
    ...style.fontWeightThin1x,
    color: blackColor,
    marginBottom: spacings.small,
  },
  metaRow: {
    flexWrap: 'wrap',
    marginBottom: spacings.normal,
  },
  metaText: {
    ...style.fontSizeSmall2x,
    color: textSecondaryColor,
  },
  categoryBadge: {
    backgroundColor: productCategoryBgColor,
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
  },
  categoryText: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightThin,
    color: productCategoryTextColor,
  },
  priceRow: {
    marginVertical: spacings.small,
  },
  price: {
    ...style.fontSizeLarge1x,
    ...style.fontWeightThin1x,
    color: blackColor,
    // fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  perUnit: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginLeft: spacings.small,
  },
  stockRow: {
    marginVertical: spacings.large,
  },
  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: stockDotColor,
    marginRight: spacings.small,
  },
  stockText: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  divider: {
    ...width100Percent,
    height: 1,
    backgroundColor: inputBorderColor,
    marginBottom: spacings.large,
  },
  addButton: {
    borderWidth: 1.5,
    borderColor: addOrderBorderColor,
    borderRadius: 10,
    paddingVertical: spacings.large,
    justifyContent: 'center',
  },
  addButtonText: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: addOrderBorderColor,
    marginLeft: spacings.normal,
  },
  qtyRow: {
    gap: spacings.normal,
  },
  qtyButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: inputBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteColor,
  },
  qtyButtonDisabled: {
    opacity: 0.45,
  },
  addButtonDisabled: {
    borderColor: inputBorderColor,
    opacity: 0.55,
  },
  addButtonTextDisabled: {
    color: textSecondaryColor,
  },
  stockError: {
    ...style.fontSizeSmall1x,
    color: redColor,
    marginTop: spacings.small,
    textAlign: 'center',
  },
  stockInfo: {
    ...style.fontSizeSmall1x,
    color: textSecondaryColor,
    marginTop: spacings.normal,
    textAlign: 'center',
  },
  qtyValueWrap: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyValue: {
    ...style.fontSizeMedium1x,
    ...style.fontWeightMedium1x,
    color: blackColor,
  },
});
