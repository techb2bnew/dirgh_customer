import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CatalogProductCard from '../components/CatalogProductCard';
import CustomButton from '../components/CustomButton';
import { ROUTE_CART } from '../navigation/AppNavigator';
import {
  BACK_TO_CATEGORIES,
  CART_TOTAL_LABEL,
  formatPacksCount,
  formatProductsCount,
  formatReviewOrder,
  ITEMS_LABEL,
  NO_PRODUCTS_FOUND,
  NO_PRODUCTS_SUBTITLE,
  SEARCH_BY_NAME_OR_SKU,
} from '../constants/Constants';
import {
  backgroundBeigeColor,
  blackColor,
  darkCardColor,
  inputBorderColor,
  placeholderColor,
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

const formatPrice = value => `$${value.toFixed(2)}`;

const ProductListingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const category = route.params?.category;
  const categoryName = category?.name ?? 'Snacks';

  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // TODO: replace with API — same catalog shown for every category for now
    setProductList([
      {
        id: '1',
        name: "Lay's Classic Potato Chips",
        sku: 'SNK-001',
        packaging: '24 Bags',
        price: 18.5,
        stock: 450,
        lastOrderDate: '2026-04-10',
        isRepeat: true,
        quantity: 0,
        selectedQty: 1,
      },
      {
        id: '2',
        name: 'Doritos Nacho Cheese',
        sku: 'SNK-002',
        packaging: '12 Bags',
        price: 22.0,
        stock: 380,
        lastOrderDate: '2026-03-28',
        isRepeat: true,
        quantity: 0,
        selectedQty: 1,
      },
      {
        id: '3',
        name: 'Pringles Original',
        sku: 'SNK-003',
        packaging: '18 Tubs',
        price: 24.75,
        stock: 520,
        lastOrderDate: '2026-04-02',
        isRepeat: false,
        quantity: 0,
        selectedQty: 1,
      },
      {
        id: '4',
        name: 'Cheetos Crunchy',
        sku: 'SNK-004',
        packaging: '20 Bags',
        price: 19.25,
        stock: 290,
        lastOrderDate: '2026-03-15',
        isRepeat: false,
        quantity: 0,
        selectedQty: 1,
      },
      {
        id: '5',
        name: 'KitKat 4-Finger Bars',
        sku: 'SNK-005',
        packaging: '36 Packs',
        price: 32.0,
        stock: 410,
        lastOrderDate: '2026-04-08',
        isRepeat: true,
        quantity: 0,
        selectedQty: 1,
      },
      {
        id: '6',
        name: 'Oreo Original Cookies',
        sku: 'SNK-006',
        packaging: '30 Packs',
        price: 28.5,
        stock: 365,
        lastOrderDate: '2026-02-20',
        isRepeat: false,
        quantity: 0,
        selectedQty: 1,
      },
      {
        id: '7',
        name: 'Popcorn Microwave Butter',
        sku: 'SNK-007',
        packaging: '48 Boxes',
        price: 15.75,
        stock: 600,
        lastOrderDate: '2026-04-12',
        isRepeat: false,
        quantity: 0,
        selectedQty: 1,
      },
      {
        id: '8',
        name: 'Trail Mix Premium',
        sku: 'SNK-008',
        packaging: '16 Bags',
        price: 26.0,
        stock: 220,
        lastOrderDate: '2026-01-30',
        isRepeat: false,
        quantity: 0,
        selectedQty: 1,
      },
      {
        id: '9',
        name: 'Granola Bars Variety',
        sku: 'SNK-009',
        packaging: '40 Boxes',
        price: 21.5,
        stock: 475,
        lastOrderDate: '2026-03-22',
        isRepeat: true,
        quantity: 0,
        selectedQty: 1,
      },
      {
        id: '10',
        name: 'Mixed Nuts Roasted',
        sku: 'SNK-010',
        packaging: '10 Jars',
        price: 34.0,
        stock: 190,
        lastOrderDate: '2026-04-05',
        isRepeat: false,
        quantity: 0,
        selectedQty: 1,
      },
      {
        id: '11',
        name: 'Coca-Cola Original 330ml',
        sku: 'BEV-001',
        packaging: '24 Cans',
        price: 18.5,
        stock: 450,
        lastOrderDate: '2026-04-10',
        isRepeat: true,
        quantity: 0,
        selectedQty: 1,
      },
    ]);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const updatedCart = route.params?.updatedCart;
      if (!updatedCart) {
        return;
      }
      setProductList(prev =>
        prev.map(product => {
          const match = updatedCart.find(item => item.id === product.id);
          return {
            ...product,
            quantity: match ? match.quantity : 0,
          };
        }),
      );
    }, [route.params?.updatedCart]),
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return productList;
    }
    return productList.filter(
      product =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query),
    );
  }, [productList, searchQuery]);

  const cartItems = useMemo(
    () => productList.filter(product => product.quantity > 0),
    [productList],
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const totalPacks = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const cartProductCount = cartItems.length;
  const hasCartItems = cartProductCount > 0;
  const hasProducts = filteredProducts.length > 0;

  const getRemainingStock = product => Math.max(0, product.stock - product.quantity);

  const updateProduct = (productId, updater) => {
    setProductList(prev =>
      prev.map(product => {
        if (product.id !== productId) {
          return product;
        }
        return updater(product);
      }),
    );
  };

  const handleIncrementSelected = productId => {
    updateProduct(productId, product => {
      const remaining = getRemainingStock(product);
      if (product.selectedQty >= remaining) {
        return product;
      }
      return { ...product, selectedQty: product.selectedQty + 1 };
    });
  };

  const handleDecrementSelected = productId => {
    updateProduct(productId, product => {
      if (product.selectedQty <= 1) {
        return product;
      }
      return { ...product, selectedQty: product.selectedQty - 1 };
    });
  };

  const handleAddToCart = productId => {
    updateProduct(productId, product => {
      const remaining = getRemainingStock(product);
      if (remaining <= 0) {
        return product;
      }
      const toAdd = Math.min(product.selectedQty, remaining);
      return {
        ...product,
        quantity: product.quantity + toAdd,
        selectedQty: 1,
      };
    });
  };

  const handleReviewOrder = () => {
    navigation.navigate(ROUTE_CART, {
      category,
      cartItems: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        sku: item.sku,
        packaging: item.packaging,
        price: item.price,
        stock: item.stock,
        quantity: item.quantity,
      })),
    });
  };

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
            <Text style={styles.backText}>{BACK_TO_CATEGORIES}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{categoryName}</Text>
          <Text style={styles.subtitle}>{formatProductsCount(productList.length)}</Text>

          <View style={[flexDirectionRow, alignItemsCenter, styles.searchWrap]}>
            <Icon name="magnify" size={22} color={textSecondaryColor} />
            <TextInput
              style={styles.searchInput}
              placeholder={SEARCH_BY_NAME_OR_SKU}
              placeholderTextColor={placeholderColor}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {hasProducts ? (
            filteredProducts.map(product => {
              const remainingStock = getRemainingStock(product);
              const isOutOfStock = remainingStock <= 0;

              return (
                <CatalogProductCard
                  key={product.id}
                  name={product.name}
                  sku={product.sku}
                  packaging={product.packaging}
                  price={product.price}
                  stock={product.stock}
                  lastOrderDate={product.lastOrderDate}
                  isRepeat={product.isRepeat}
                  cartQuantity={product.quantity}
                  selectedQty={product.selectedQty}
                  remainingStock={remainingStock}
                  isOutOfStock={isOutOfStock}
                  canIncrementSelected={!isOutOfStock && product.selectedQty < remainingStock}
                  canDecrementSelected={product.selectedQty > 1}
                  canAddToCart={!isOutOfStock && product.selectedQty > 0}
                  onAddToCart={() => handleAddToCart(product.id)}
                  onIncrementSelected={() => handleIncrementSelected(product.id)}
                  onDecrementSelected={() => handleDecrementSelected(product.id)}
                />
              );
            })
          ) : (
            <View style={[alignJustifyCenter, styles.emptyState]}>
              <Icon name="package-variant" size={48} color={textSecondaryColor} />
              <Text style={styles.emptyTitle}>{NO_PRODUCTS_FOUND}</Text>
              <Text style={styles.emptySubtitle}>{NO_PRODUCTS_SUBTITLE}</Text>
            </View>
          )}
        </ScrollView>

        {hasCartItems ? (
          <View style={styles.footer}>
            <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.footerStats]}>
              <View>
                <Text style={styles.footerLabel}>{CART_TOTAL_LABEL}</Text>
                <Text style={styles.footerTotal}>{formatPrice(cartTotal)}</Text>
              </View>
              <View style={styles.footerItemsCol}>
                <Text style={[styles.footerLabel, styles.footerLabelRight]}>{ITEMS_LABEL}</Text>
                <Text style={[styles.footerItemsValue, styles.footerLabelRight]}>
                  {formatPacksCount(totalPacks)}
                </Text>
              </View>
            </View>
            <CustomButton
              title={formatReviewOrder(cartProductCount)}
              onPress={handleReviewOrder}
              style={styles.reviewButton}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default ProductListingScreen;

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
  scrollContentWithFooter: {
    paddingBottom: spacings.normal,
  },
  backButton: {
    marginBottom: spacings.xxLarge,
  },
  backText: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
    marginLeft: spacings.xsmall,
  },
  title: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: blackColor,
    marginBottom: spacings.small,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  subtitle: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginBottom: spacings.xxLarge,
  },
  searchWrap: {
    backgroundColor: whiteColor,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: inputBorderColor,
    paddingHorizontal: spacings.large,
    marginBottom: spacings.xxLarge,
  },
  searchInput: {
    flex: 1,
    ...style.fontSizeNormal2x,
    color: blackColor,
    paddingVertical: spacings.large,
    marginLeft: spacings.normal,
  },
  emptyState: {
    paddingVertical: spacings.ExtraLarge3x,
    paddingHorizontal: spacings.xxLarge,
  },
  emptyTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginTop: spacings.xLarge,
    marginBottom: spacings.small,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.xLarge,
    paddingBottom: spacings.xxLarge,
    backgroundColor: darkCardColor,
  },
  footerStats: {
    marginBottom: spacings.large,
  },
  footerLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.small,
  },
  footerLabelRight: {
    textAlign: 'right',
  },
  footerTotal: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: whiteColor,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  footerItemsCol: {
    alignItems: 'flex-end',
  },
  footerItemsValue: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: whiteColor,
  },
  reviewButton: {
    backgroundColor: primaryColor,
    shadowColor: primaryColor,
  },
});
