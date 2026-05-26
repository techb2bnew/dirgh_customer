import React, { useEffect, useMemo, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CartItemCard from '../components/CartItemCard';
import CustomButton from '../components/CustomButton';
import {
  CART_EMPTY_SUBTITLE,
  CART_EMPTY_TITLE,
  CLEAR_CART,
  CONTINUE_SHOPPING,
  DELIVERY_LABEL,
  DELIVERY_METHOD,
  EXPRESS_DELIVERY,
  EXPRESS_DELIVERY_DAYS,
  formatCartSubtitle,
  formatSubtotalItems,
  formatTaxPercent,
  FREE_LABEL,
  ORDER_CART_TITLE,
  PROCEED_TO_CHECKOUT,
  STANDARD_DELIVERY,
  STANDARD_DELIVERY_DAYS,
  TOTAL_LABEL,
} from '../constants/Constants';
import {
  ROUTE_DELIVERY_DETAILS,
  ROUTE_HOME,
  ROUTE_PRODUCT_LISTING,
} from '../navigation/AppNavigator';
import {
  actionIconBgColor,
  backgroundBeigeColor,
  blackColor,
  inputBorderColor,
  primaryColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const {
  flex,
  flexDirectionRow,
  alignItemsCenter,
  justifyContentSpaceBetween,
  alignJustifyCenter,
} = BaseStyle;

const TAX_PERCENT = 10;
const DELIVERY_STANDARD_ID = 'standard';
const DELIVERY_EXPRESS_ID = 'express';

const formatPrice = value => `$${value.toFixed(2)}`;

const CartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const category = route.params?.category;

  const [cartList, setCartList] = useState([]);
  const [deliveryMethodList, setDeliveryMethodList] = useState([]);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState(DELIVERY_STANDARD_ID);

  useEffect(() => {
    // TODO: replace with API cart
    setCartList(route.params?.cartItems ?? []);
  }, [route.params?.cartItems]);

  useEffect(() => {
    setDeliveryMethodList([
      {
        id: DELIVERY_STANDARD_ID,
        title: STANDARD_DELIVERY,
        subtitle: STANDARD_DELIVERY_DAYS,
        price: FREE_LABEL,
      },
      {
        id: DELIVERY_EXPRESS_ID,
        title: EXPRESS_DELIVERY,
        subtitle: EXPRESS_DELIVERY_DAYS,
        price: FREE_LABEL,
      },
    ]);
  }, []);

  const hasItems = cartList.length > 0;

  const totalItems = useMemo(
    () => cartList.reduce((sum, item) => sum + item.quantity, 0),
    [cartList],
  );

  const subtotal = useMemo(
    () => cartList.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartList],
  );

  const taxAmount = useMemo(() => subtotal * (TAX_PERCENT / 100), [subtotal]);
  const total = useMemo(() => subtotal + taxAmount, [subtotal, taxAmount]);

  const syncBackToListing = updatedList => {
    navigation.navigate({
      name: ROUTE_PRODUCT_LISTING,
      params: {
        category,
        updatedCart: updatedList.map(item => ({
          id: item.id,
          quantity: item.quantity,
        })),
      },
      merge: true,
    });
  };

  const updateCartItem = (itemId, updater) => {
    setCartList(prev =>
      prev
        .map(item => {
          if (item.id !== itemId) {
            return item;
          }
          return updater(item);
        })
        .filter(item => item.quantity > 0),
    );
  };

  const handleContinueShopping = () => {
    if (route.params?.fromHome) {
      const account = route.params?.account;
      navigation.navigate(ROUTE_HOME, account ? { account } : undefined);
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate(ROUTE_HOME);
  };

  const handleClearCart = () => {
    setCartList([]);
    // syncBackToListing([]);
  };

  const handleRemove = itemId => {
    updateCartItem(itemId, item => ({ ...item, quantity: 0 }));
  };

  const handleIncrement = itemId => {
    updateCartItem(itemId, item => {
      if (item.quantity >= item.stock) {
        return item;
      }
      return { ...item, quantity: item.quantity + 1 };
    });
  };

  const handleDecrement = itemId => {
    updateCartItem(itemId, item => {
      if (item.quantity <= 1) {
        return { ...item, quantity: 0 };
      }
      return { ...item, quantity: item.quantity - 1 };
    });
  };

  const handleProceedToCheckout = () => {
    navigation.navigate(ROUTE_DELIVERY_DETAILS, {
      cartItems: cartList.map(item => ({
        id: item.id,
        name: item.name,
        sku: item.sku,
        packaging: item.packaging,
        price: item.price,
        stock: item.stock,
        quantity: item.quantity,
      })),
      fromHome: route.params?.fromHome,
      account: route.params?.account,
      category,
    });
  };

  return (
    <SafeAreaView style={[flex, styles.safeArea]}>
      <View style={flex}>
        <ScrollView
          style={flex}
          contentContainerStyle={[
            styles.scrollContent,
            !hasItems && styles.scrollContentEmpty,
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter, styles.headerRow]}>
            <TouchableOpacity
              style={[flexDirectionRow, alignItemsCenter, styles.backButtonInline]}
              onPress={handleContinueShopping}
              activeOpacity={0.7}>
              <Icon name="chevron-left" size={24} color={textSecondaryColor} />
              <Text style={styles.backText}>{CONTINUE_SHOPPING}</Text>
            </TouchableOpacity>
            {hasItems ? (
              <TouchableOpacity onPress={handleClearCart} activeOpacity={0.7}>
                <Text style={styles.clearText}>{CLEAR_CART}</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <Text style={styles.title}>{ORDER_CART_TITLE}</Text>
          {hasItems ? (
            <Text style={styles.subtitle}>{formatCartSubtitle(cartList.length, totalItems)}</Text>
          ) : null}

          {hasItems ? (
            <>
              {cartList.map(item => (
                <CartItemCard
                  key={item.id}
                  name={item.name}
                  sku={item.sku}
                  packaging={item.packaging}
                  price={item.price}
                  quantity={item.quantity}
                  lineTotal={item.price * item.quantity}
                  canIncrement={item.quantity < item.stock}
                  canDecrement={item.quantity > 1}
                  onRemove={() => handleRemove(item.id)}
                  onIncrement={() => handleIncrement(item.id)}
                  onDecrement={() => handleDecrement(item.id)}
                />
              ))}

              <Text style={styles.sectionTitle}>{DELIVERY_METHOD}</Text>
              {deliveryMethodList.map(option => {
                const isSelected = selectedDeliveryId === option.id;
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[styles.deliveryCard, isSelected && styles.deliveryCardSelected]}
                    onPress={() => setSelectedDeliveryId(option.id)}
                    activeOpacity={0.7}>
                    <View style={styles.deliveryTextCol}>
                      <Text style={styles.deliveryTitle}>{option.title}</Text>
                      <Text style={styles.deliverySubtitle}>{option.subtitle}</Text>
                    </View>
                    <Text style={styles.deliveryPrice}>{option.price}</Text>
                  </TouchableOpacity>
                );
              })}
            </>
          ) : (
            <View style={[alignJustifyCenter, styles.emptyPlaceholder]}>
              <View style={styles.emptyIconWrap}>
                <Icon name="cart-outline" size={48} color={textSecondaryColor} />
              </View>
              <Text style={styles.emptyTitle}>{CART_EMPTY_TITLE}</Text>
              <Text style={styles.emptySubtitle}>{CART_EMPTY_SUBTITLE}</Text>
              <TouchableOpacity
                style={styles.shopButton}
                onPress={handleContinueShopping}
                activeOpacity={0.85}>
                <Text style={styles.shopButtonText}>{CONTINUE_SHOPPING}</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {hasItems ? (
          <View style={styles.footer}>
            <View style={styles.summaryBox}>
              <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.summaryRow]}>
                <Text style={styles.summaryLabel}>{formatSubtotalItems(totalItems)}</Text>
                <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
              </View>
              <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.summaryRow]}>
                <Text style={styles.summaryLabel}>{DELIVERY_LABEL}</Text>
                <Text style={[styles.summaryValue, styles.freeText]}>{FREE_LABEL}</Text>
              </View>
              <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.summaryRow]}>
                <Text style={styles.summaryLabel}>{formatTaxPercent(TAX_PERCENT)}</Text>
                <Text style={styles.summaryValue}>{formatPrice(taxAmount)}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}>
                <Text style={styles.totalLabel}>{TOTAL_LABEL}</Text>
                <Text style={styles.totalValue}>{formatPrice(total)}</Text>
              </View>
            </View>
            <CustomButton
              title={PROCEED_TO_CHECKOUT}
              onPress={handleProceedToCheckout}
              style={styles.checkoutButton}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: backgroundBeigeColor,
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.large,
    paddingBottom: spacings.large,
  },
  scrollContentEmpty: {
    flexGrow: 1,
  },
  headerRow: {
    marginBottom: spacings.large,
  },
  backButtonInline: {
    flex: 1,
  },
  backText: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
    marginLeft: spacings.xsmall,
  },
  clearText: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: primaryColor,
  },
  title: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: blackColor,
    marginBottom: spacings.small,
    // fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  subtitle: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginBottom: spacings.xxLarge,
  },
  sectionTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.large,
    marginTop: spacings.small,
  },
  deliveryCard: {
    ...flexDirectionRow,
    alignItemsCenter,
    justifyContentSpaceBetween,
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.normal,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  deliveryCardSelected: {
    borderColor: primaryColor,
    borderWidth: 1.5,
  },
  deliveryTextCol: {
    flex: 1,
    marginRight: spacings.normal,
  },
  deliveryTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  deliverySubtitle: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  deliveryPrice: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  emptyPlaceholder: {
    flex: 1,
    paddingVertical: spacings.ExtraLarge3x,
    paddingHorizontal: spacings.xxLarge,
    minHeight: 320,
  },
  emptyIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: actionIconBgColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacings.xLarge,
  },
  emptyTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.small,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    textAlign: 'center',
    marginBottom: spacings.xxLarge,
  },
  shopButton: {
    backgroundColor: primaryColor,
    paddingHorizontal: spacings.xxLarge,
    paddingVertical: spacings.normal,
    borderRadius: 10,
  },
  shopButtonText: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: whiteColor,
  },
  footer: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.normal,
    paddingBottom: spacings.xxLarge,
    backgroundColor: actionIconBgColor,
    borderTopWidth: 1,
    borderTopColor: inputBorderColor,
  },
  summaryBox: {
    marginBottom: spacings.large,
  },
  summaryRow: {
    marginBottom: spacings.normal,
  },
  summaryLabel: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  summaryValue: {
    ...style.fontSizeNormal,
    color: blackColor,
  },
  freeText: {
    ...style.fontWeightMedium,
    color: blackColor,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: inputBorderColor,
    marginVertical: spacings.normal,
  },
  totalLabel: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  totalValue: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: blackColor,
    // fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  checkoutButton: {
    backgroundColor: primaryColor,
    shadowColor: primaryColor,
  },
});
