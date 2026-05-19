import React, { useEffect, useMemo, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../components/CustomButton';
import ProductCard from '../components/ProductCard';
import {
  BACK_TO_DASHBOARD,
  BROWSE_CATALOG,
  INCL_TAX,
  NEW_ORDER_TITLE,
  ORDER_SUMMARY,
  PLACE_ORDER,
  PREVIOUS_ORDERS,
  PRODUCTS_AVAILABLE,
  SEARCH_PRODUCTS_PLACEHOLDER,
} from '../constants/Constants';
import {
  backgroundBeigeColor,
  blackColor,
  darkCardColor,
  inputBorderColor,
  orderSummaryCardBgColor,
  placeholderColor,
  primaryColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';
import { ROUTE_CATEGORIES, ROUTE_ORDERS } from '../navigation/AppNavigator';

const {
  flex,
  flexDirectionRow,
  alignItemsCenter,
  justifyContentSpaceBetween,
  width100Percent,
} = BaseStyle;

const TAX_MULTIPLIER = 1.08;

const formatPrice = value => `$${value.toFixed(2)}`;

const NewOrderScreen = () => {
  const navigation = useNavigation();
  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(true);

  useEffect(() => {
    // TODO: replace with API response
    setProductList([
      {
        id: '1',
        name: 'Premium Widget Pro',
        sku: 'WDG-PRO-001',
        category: 'Widgets',
        price: 89.5,
        stock: 50,
        minOrder: 10,
        quantity: 0,
      },
      {
        id: '2',
        name: 'Industrial Connector Set',
        sku: 'CON-IND-245',
        category: 'Connectors',
        price: 124.0,
        stock: 680,
        minOrder: 5,
        quantity: 0,
      },
      {
        id: '3',
        name: 'Smart Sensor Module',
        sku: 'SNS-SMT-089',
        category: 'Sensors',
        price: 65.0,
        stock: 42,
        minOrder: 8,
        quantity: 0,
      },
      {
        id: '4',
        name: 'Heavy Duty Bracket',
        sku: 'BRK-HD-112',
        category: 'Hardware',
        price: 42.75,
        stock: 2100,
        minOrder: 20,
        quantity: 0,
      },
      {
        id: '5',
        name: 'Control Panel Unit',
        sku: 'CTL-PNL-330',
        category: 'Electronics',
        price: 310.0,
        stock: 95,
        minOrder: 2,
        quantity: 0,
      },
      {
        id: '6',
        name: 'Precision Gear Assembly',
        sku: 'GER-PRS-078',
        category: 'Mechanical',
        price: 156.25,
        stock: 340,
        minOrder: 6,
        quantity: 0,
      },
      {
        id: '7',
        name: 'Thermal Insulation Roll',
        sku: 'INS-THM-501',
        category: 'Materials',
        price: 28.9,
        stock: 890,
        minOrder: 15,
        quantity: 0,
      },
      {
        id: '8',
        name: 'Hydraulic Pump Valve',
        sku: 'HYD-VLV-902',
        category: 'Hydraulics',
        price: 198.0,
        stock: 175,
        minOrder: 4,
        quantity: 0,
      },
    ]);
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return productList;
    }
    return productList.filter(
      product =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
    );
  }, [productList, searchQuery]);

  const cartItems = useMemo(
    () => productList.filter(product => product.quantity > 0),
    [productList],
  );

  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [cartItems],
  );

  const totalWithTax = subtotal * TAX_MULTIPLIER;

  const updateProductQuantity = (productId, updater) => {
    setProductList(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, quantity: updater(product.quantity) }
          : product,
      ),
    );
  };

  const handleAddToOrder = productId => {
    const product = productList.find(item => item.id === productId);
    if (!product || product.stock < product.minOrder) {
      return;
    }
    updateProductQuantity(productId, () => product.minOrder);
  };

  const handleIncrement = productId => {
    const product = productList.find(item => item.id === productId);
    if (!product) {
      return;
    }

    updateProductQuantity(productId, qty => {
      const nextQty = qty + product.minOrder;
      if (nextQty > product.stock) {
        return qty;
      }
      return nextQty;
    });
  };

  const handleDecrement = productId => {
    const product = productList.find(item => item.id === productId);
    if (!product) {
      return;
    }

    updateProductQuantity(productId, qty => {
      const nextQty = qty - product.minOrder;
      if (nextQty < product.minOrder) {
        return 0;
      }
      return nextQty;
    });
  };

  const handlePlaceOrder = async () => {
    if (totalQuantity === 0) {
      return;
    }
    setIsPlacingOrder(true);
    try {
      // TODO: API place order
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigation.goBack();
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const hasCartItems = totalQuantity > 0;

  return (
    <SafeAreaView style={[flex, styles.safeArea]}>
      <View style={flex}>
        <ScrollView
          style={flex}
          contentContainerStyle={[
            styles.scrollContent,
            hasCartItems && styles.scrollContentWithFooter,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            style={[flexDirectionRow, alignItemsCenter, styles.backButton]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Icon name="chevron-left" size={24} color={textSecondaryColor} />
            <Text style={styles.backText}>{BACK_TO_DASHBOARD}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{NEW_ORDER_TITLE}</Text>
          <Text style={styles.subtitle}>
            {productList.length} {PRODUCTS_AVAILABLE}
          </Text>

          <View style={[flexDirectionRow, styles.linkRow]}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
              navigation.navigate(ROUTE_ORDERS)
            }}>
              <Text style={styles.linkText}>{PREVIOUS_ORDERS}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
              // navigation.navigate(ROUTE_CATEGORIES)
            }}>
              <Text style={styles.linkText}>{BROWSE_CATALOG}</Text>
            </TouchableOpacity>
          </View>

          <View style={[flexDirectionRow, alignItemsCenter, styles.searchWrap]}>
            <Icon name="magnify" size={22} color={textSecondaryColor} />
            <TextInput
              style={styles.searchInput}
              placeholder={SEARCH_PRODUCTS_PLACEHOLDER}
              placeholderTextColor={placeholderColor}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {filteredProducts.map(product => {
            const canAddToOrder = product.stock >= product.minOrder;
            const canIncrement = product.quantity + product.minOrder <= product.stock;

            return (
              <ProductCard
                key={product.id}
                name={product.name}
                sku={product.sku}
                category={product.category}
                price={product.price}
                stock={product.stock}
                minOrder={product.minOrder}
                quantity={product.quantity}
                canAddToOrder={canAddToOrder}
                canIncrement={canIncrement}
                onAddToOrder={() => handleAddToOrder(product.id)}
                onIncrement={() => handleIncrement(product.id)}
                onDecrement={() => handleDecrement(product.id)}
              />
            );
          })}
        </ScrollView>

        {hasCartItems ? (
          <View style={styles.footer}>
            <TouchableOpacity
              style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter, styles.summaryHeader]}
              onPress={() => setIsSummaryExpanded(prev => !prev)}
              activeOpacity={0.7}>
              <View style={[flexDirectionRow, alignItemsCenter]}>
                <Text style={styles.summaryTitle}>{ORDER_SUMMARY}</Text>
                <View style={styles.summaryBadge}>
                  <Text style={styles.summaryBadgeText}>{totalQuantity}</Text>
                </View>
              </View>
              <Icon
                name={isSummaryExpanded ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={whiteColor}
              />
            </TouchableOpacity>

            <View style={[flexDirectionRow, alignItemsCenter, styles.totalRow]}>
              <Text style={styles.totalAmount}>{formatPrice(totalWithTax)}</Text>
              <Text style={styles.inclTax}>{INCL_TAX}</Text>
            </View>

            {isSummaryExpanded ? (
              <View style={styles.summaryItems}>
                {cartItems.map(item => (
                  <View
                    key={item.id}
                    style={[flexDirectionRow, justifyContentSpaceBetween, styles.summaryItem]}>
                    <View style={styles.summaryItemLeft}>
                      <Text style={styles.summaryItemName}>{item.name}</Text>
                      <Text style={styles.summaryItemCalc}>
                        {item.quantity} x {formatPrice(item.price)}
                      </Text>
                    </View>
                    <Text style={styles.summaryItemTotal}>
                      {formatPrice(item.quantity * item.price)}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}

            <CustomButton
              title={PLACE_ORDER}
              onPress={handlePlaceOrder}
              loading={isPlacingOrder}
              style={styles.placeOrderButton}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default NewOrderScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: backgroundBeigeColor,
    height: hp(100),
    width: wp(100),
  },
  scrollContent: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.large,
    paddingBottom: spacings.xxLarge,
  },
  scrollContentWithFooter: {
    paddingBottom: hp(42),
  },
  backButton: {
    marginTop: Platform.OS === "android" ? spacings.large : spacings.small,
    marginBottom: spacings.large,
  },
  backText: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginLeft: spacings.xsmall,
  },
  title: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: blackColor,
    marginBottom: spacings.xsmall,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  subtitle: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginBottom: spacings.large,
  },
  linkRow: {
    gap: spacings.xxLarge,
    marginBottom: spacings.large,
  },
  linkText: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: primaryColor,
  },
  searchWrap: {
    ...width100Percent,
    backgroundColor: whiteColor,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: inputBorderColor,
    paddingHorizontal: spacings.large,
    paddingVertical: spacings.normal,
    marginBottom: spacings.xxLarge,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacings.normal,
    ...style.fontSizeNormal2x,
    color: blackColor,
    padding: spacings.normal,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: darkCardColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.large,
    paddingBottom: spacings.xxLarge,
  },
  summaryHeader: {
    marginBottom: spacings.normal,
  },
  summaryTitle: {
    ...style.fontSizeExtraSmall,
    color: whiteColor,
    letterSpacing: 1,
    marginRight: spacings.normal,
  },
  summaryBadge: {
    backgroundColor: primaryColor,
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacings.small,
  },
  summaryBadgeText: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightMedium1x,
    color: whiteColor,
  },
  totalRow: {
    marginBottom: spacings.large,
  },
  totalAmount: {
    ...style.fontSizeLarge3x,
    ...style.fontWeightMedium1x,
    color: whiteColor,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
    marginRight: spacings.normal,
  },
  inclTax: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  summaryItems: {
    backgroundColor: orderSummaryCardBgColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.large,
  },
  summaryItem: {
    marginBottom: spacings.normal,
  },
  summaryItemLeft: {
    flex: 1,
    marginRight: spacings.normal,
  },
  summaryItemName: {
    ...style.fontSizeNormal2x,
    color: whiteColor,
    marginBottom: spacings.xsmall,
  },
  summaryItemCalc: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  summaryItemTotal: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium1x,
    color: whiteColor,
  },
  placeOrderButton: {
    marginTop: spacings.small,
  },
});
