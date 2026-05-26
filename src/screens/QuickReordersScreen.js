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
import QuickReorderProductCard from '../components/QuickReorderProductCard';
import { ROUTE_CART } from '../navigation/AppNavigator';
import {
  BACK_TO_DASHBOARD,
  CLEAR_ALL,
  formatAddItemsToCart,
  ORDER_TOTAL_LABEL,
  QUICK_REORDER,
  QUICK_REORDER_SUBTITLE,
  SEARCH_QUICK_REORDER_PLACEHOLDER,
  TOTAL_ITEMS_LABEL,
  NO_QUICK_REORDER_SEARCH_TITLE,
  NO_QUICK_REORDER_SEARCH_SUBTITLE,
  NO_QUICK_REORDER_EMPTY_TITLE,
  NO_QUICK_REORDER_EMPTY_SUBTITLE,
  CLEAR_SEARCH,
} from '../constants/Constants';
import {
  actionIconBgColor,
  backgroundBeigeColor,
  blackColor,
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
  alignJustifyCenter,
  justifyContentSpaceBetween,
} = BaseStyle;

const formatPrice = value => `$${value.toFixed(2)}`;

const QuickReordersScreen = () => {
  const navigation = useNavigation();
  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // TODO: replace with API response
    setProductList([
      {
        id: '1',
        name: 'Coca-Cola Original 330ml',
        sku: 'BEV-001',
        packaging: '24 Cans',
        lastOrdered: '7d ago',
        orderCount: 12,
        price: 18.5,
        usualQty: 15,
        stock: 500,
        currentQty: 0,
      },
      {
        id: '2',
        name: 'Pepsi Max 330ml',
        sku: 'BEV-002',
        packaging: '24 Cans',
        lastOrdered: '14d ago',
        orderCount: 8,
        price: 17.25,
        usualQty: 10,
        stock: 420,
        currentQty: 0,
      },
      {
        id: '3',
        name: "Lay's Classic Potato Chips",
        sku: 'SNK-001',
        packaging: '24 Bags',
        lastOrdered: '5d ago',
        orderCount: 15,
        price: 18.5,
        usualQty: 12,
        stock: 450,
        currentQty: 0,
      },
      {
        id: '4',
        name: 'Red Bull Energy 250ml',
        sku: 'BEV-010',
        packaging: '24 Cans',
        lastOrdered: '21d ago',
        orderCount: 6,
        price: 32.0,
        usualQty: 8,
        stock: 300,
        currentQty: 0,
      },
      {
        id: '5',
        name: 'Evian Natural Spring Water 500ml',
        sku: 'BEV-015',
        packaging: '12 Bottles',
        lastOrdered: '3d ago',
        orderCount: 20,
        price: 14.75,
        usualQty: 18,
        stock: 600,
        currentQty: 0,
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
        product.sku.toLowerCase().includes(query),
    );
  }, [productList, searchQuery]);

  const totalItems = useMemo(
    () => productList.reduce((sum, item) => sum + item.currentQty, 0),
    [productList],
  );

  const orderTotal = useMemo(
    () => productList.reduce((sum, item) => sum + item.currentQty * item.price, 0),
    [productList],
  );

  const hasSelectedItems = totalItems > 0;
  const isSearchActive = searchQuery.trim().length > 0;
  const emptyTitle = isSearchActive
    ? NO_QUICK_REORDER_SEARCH_TITLE
    : NO_QUICK_REORDER_EMPTY_TITLE;
  const emptySubtitle = isSearchActive
    ? NO_QUICK_REORDER_SEARCH_SUBTITLE
    : NO_QUICK_REORDER_EMPTY_SUBTITLE;

  const updateProduct = (productId, updater) => {
    setProductList(prev =>
      prev.map(item => (item.id === productId ? updater(item) : item)),
    );
  };

  const handleIncrement = productId => {
    updateProduct(productId, item => ({
      ...item,
      currentQty: item.currentQty + 1,
    }));
  };

  const handleDecrement = productId => {
    updateProduct(productId, item => {
      if (item.currentQty <= 0) {
        return item;
      }
      return { ...item, currentQty: item.currentQty - 1 };
    });
  };

  const handleUsual = productId => {
    updateProduct(productId, item => ({
      ...item,
      currentQty: item.currentQty + item.usualQty,
    }));
  };

  const handleClearAll = () => {
    setProductList(prev => prev.map(item => ({ ...item, currentQty: 0 })));
  };

  const handleAddToCart = () => {
    const cartItems = productList
      .filter(item => item.currentQty > 0)
      .map(item => ({
        id: item.id,
        name: item.name,
        sku: item.sku,
        packaging: item.packaging,
        price: item.price,
        stock: item.stock,
        quantity: item.currentQty,
      }));

    navigation.navigate(ROUTE_CART, { cartItems });
  };

  return (
    <SafeAreaView style={[flex, styles.safeArea]}>
      <View style={flex}>
        <ScrollView
          style={flex}
          contentContainerStyle={[
            styles.scrollContent,
            hasSelectedItems && styles.scrollContentWithFooter,
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

          <Text style={styles.title}>{QUICK_REORDER}</Text>
          <Text style={styles.subtitle}>{QUICK_REORDER_SUBTITLE}</Text>

          <View style={[flexDirectionRow, alignItemsCenter, styles.searchWrap]}>
            <Icon name="magnify" size={22} color={textSecondaryColor} />
            <TextInput
              style={styles.searchInput}
              placeholder={SEARCH_QUICK_REORDER_PLACEHOLDER}
              placeholderTextColor={placeholderColor}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* {hasSelectedItems ? (
            <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7} style={styles.clearAllWrap}>
              <Text style={styles.clearAllText}>{CLEAR_ALL}</Text>
            </TouchableOpacity>
          ) : null} */}

          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <QuickReorderProductCard
                key={product.id}
                name={product.name}
                sku={product.sku}
                packaging={product.packaging}
                lastOrdered={product.lastOrdered}
                orderCount={product.orderCount}
                price={product.price}
                usualQty={product.usualQty}
                currentQty={product.currentQty}
                onIncrement={() => handleIncrement(product.id)}
                onDecrement={() => handleDecrement(product.id)}
                onUsual={() => handleUsual(product.id)}
              />
            ))
          ) : (
            <View style={[alignJustifyCenter, styles.emptyPlaceholder]}>
              <View style={styles.emptyIconWrap}>
                <Icon name="package-variant-closed" size={48} color={textSecondaryColor} />
              </View>
              <Text style={styles.emptyTitle}>{emptyTitle}</Text>
              <Text style={styles.emptySubtitle}>{emptySubtitle}</Text>
              {isSearchActive ? (
                <TouchableOpacity
                  style={styles.emptyButton}
                  onPress={() => setSearchQuery('')}
                  activeOpacity={0.85}>
                  <Text style={styles.emptyButtonText}>{CLEAR_SEARCH}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        </ScrollView>

        {hasSelectedItems ? (
          <View style={styles.footer}>
            <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.footerStats]}>
              <View>
                <Text style={styles.footerLabel}>{ORDER_TOTAL_LABEL}</Text>
                <Text style={styles.footerTotal}>{formatPrice(orderTotal)}</Text>
              </View>
              <View style={styles.footerItemsCol}>
                <Text style={[styles.footerLabel, styles.footerLabelRight]}>{TOTAL_ITEMS_LABEL}</Text>
                <Text style={[styles.footerItemsValue, styles.footerLabelRight]}>{totalItems}</Text>
              </View>
            </View>
            <CustomButton
              title={formatAddItemsToCart(totalItems)}
              onPress={handleAddToCart}
              style={styles.addButton}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default QuickReordersScreen;

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
    // fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
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
    marginBottom: spacings.large,
  },
  searchInput: {
    flex: 1,
    ...style.fontSizeNormal2x,
    color: blackColor,
    paddingVertical: spacings.large,
    marginLeft: spacings.normal,
  },
  clearAllWrap: {
    alignSelf: 'flex-start',
    marginBottom: spacings.large,
  },
  clearAllText: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: primaryColor,
  },
  emptyPlaceholder: {
    paddingVertical: spacings.ExtraLarge3x,
    paddingHorizontal: spacings.xxLarge,
    minHeight: 280,
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
  emptyButton: {
    backgroundColor: primaryColor,
    paddingHorizontal: spacings.xxLarge,
    paddingVertical: spacings.normal,
    borderRadius: 10,
  },
  emptyButtonText: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: whiteColor,
  },
  footer: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingBottom: spacings.xxLarge,
    paddingTop: spacings.large,
    backgroundColor: whiteColor,
    borderTopWidth: 1,
    borderTopColor: inputBorderColor,
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
  footerItemsCol: {
    alignItems: 'flex-end',
  },
  footerTotal: {
    ...style.fontSizeLarge,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  footerItemsValue: {
    ...style.fontSizeLarge,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  addButton: {
    borderRadius: 12,
  },
});
