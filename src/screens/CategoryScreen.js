import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_HOME, ROUTE_PRODUCT_LISTING } from '../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryCard from '../components/CategoryCard';
import {
  BACK_TO_DASHBOARD,
  PRODUCT_CATEGORIES_SUBTITLE,
  PRODUCT_CATEGORIES_TITLE,
  SEARCH_CATEGORIES_PLACEHOLDER,
  NO_CATEGORIES_SEARCH_TITLE,
  NO_CATEGORIES_SEARCH_SUBTITLE,
  NO_CATEGORIES_EMPTY_TITLE,
  NO_CATEGORIES_EMPTY_SUBTITLE,
  CLEAR_SEARCH,
  TOTAL_CATEGORIES_LABEL,
  TOTAL_PRODUCTS_LABEL,
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

const { flex, flexDirectionRow, alignItemsCenter, alignJustifyCenter } = BaseStyle;

const CategoryScreen = () => {
  const navigation = useNavigation();
  const [categoryList, setCategoryList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // TODO: replace with API response
    setCategoryList([
      { id: '1', name: 'Beverages', itemCount: 1247, icon: 'cup-outline' },
      { id: '2', name: 'Frozen Foods', itemCount: 892, icon: 'snowflake' },
      { id: '3', name: 'Snacks', itemCount: 2156, icon: 'popcorn' },
      { id: '4', name: 'Groceries', itemCount: 3421, icon: 'cart-outline' },
      { id: '5', name: 'Cleaning Supplies', itemCount: 567, icon: 'broom' },
      { id: '6', name: 'Dairy Products', itemCount: 734, icon: 'cheese' },
      { id: '7', name: 'Fresh Produce', itemCount: 456, icon: 'leaf' },
      { id: '8', name: 'Bakery', itemCount: 623, icon: 'bread-slice' },
      { id: '9', name: 'Meat & Seafood', itemCount: 389, icon: 'food-steak' },
      { id: '10', name: 'Personal Care', itemCount: 812, icon: 'bottle-tonic-outline' },
      { id: '11', name: 'Household Items', itemCount: 945, icon: 'home-outline' },
      { id: '12', name: 'Office Supplies', itemCount: 1123, icon: 'paperclip' },
    ]);
  }, []);

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return categoryList;
    }
    return categoryList.filter(category => category.name.toLowerCase().includes(query));
  }, [categoryList, searchQuery]);

  const totalProducts = useMemo(
    () => categoryList.reduce((sum, category) => sum + category.itemCount, 0),
    [categoryList],
  );

  const handleCategoryPress = useCallback(
    category => {
      navigation.navigate(ROUTE_PRODUCT_LISTING, { category });
    },
    [navigation],
  );

  const isSearchActive = searchQuery.trim().length > 0;
  const emptyTitle = isSearchActive
    ? NO_CATEGORIES_SEARCH_TITLE
    : NO_CATEGORIES_EMPTY_TITLE;
  const emptySubtitle = isSearchActive
    ? NO_CATEGORIES_SEARCH_SUBTITLE
    : NO_CATEGORIES_EMPTY_SUBTITLE;

  const listEmptyComponent = useMemo(
    () => (
      <View style={[alignJustifyCenter, styles.emptyPlaceholder]}>
        <View style={styles.emptyIconWrap}>
          <Icon name="view-grid-outline" size={48} color={textSecondaryColor} />
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
    ),
    [emptyTitle, emptySubtitle, isSearchActive],
  );

  const keyExtractor = useCallback(item => item.id, []);

  const renderCategoryItem = useCallback(
    ({ item }) => (
      <View style={styles.cardWrap}>
        <CategoryCard
          name={item.name}
          itemCount={item.itemCount}
          icon={item.icon}
          onPress={() => handleCategoryPress(item)}
        />
      </View>
    ),
    [handleCategoryPress],
  );

  const listContentStyle = useMemo(
    () => [
      styles.listContent,
      filteredCategories.length === 0 && styles.listContentEmpty,
    ],
    [filteredCategories.length],
  );

  return (
    <SafeAreaView style={[flex, styles.safeArea]}>
      <View style={flex}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[flexDirectionRow, alignItemsCenter, styles.backButton]}
            onPress={() => navigation.navigate(ROUTE_HOME)}
            activeOpacity={0.7}>
            <Icon name="chevron-left" size={24} color={textSecondaryColor} />
            <Text style={styles.backText}>{BACK_TO_DASHBOARD}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{PRODUCT_CATEGORIES_TITLE}</Text>
          <Text style={styles.subtitle}>{PRODUCT_CATEGORIES_SUBTITLE}</Text>

          <View style={[flexDirectionRow, alignItemsCenter, styles.searchWrap]}>
            <Icon name="magnify" size={22} color={textSecondaryColor} />
            <TextInput
              style={styles.searchInput}
              placeholder={SEARCH_CATEGORIES_PLACEHOLDER}
              placeholderTextColor={placeholderColor}
              value={searchQuery}
              onChangeText={setSearchQuery}
              blurOnSubmit={false}
            />
          </View>
        </View>

        <FlatList
          style={flex}
          data={filteredCategories}
          keyExtractor={keyExtractor}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={listContentStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
          ListEmptyComponent={listEmptyComponent}
          renderItem={renderCategoryItem}
        />

        <View style={[flexDirectionRow, styles.fixedFooter]}>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>{TOTAL_CATEGORIES_LABEL}</Text>
            <Text style={styles.statValue}>{categoryList.length}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={[styles.statLabel, styles.statLabelRight]}>{TOTAL_PRODUCTS_LABEL}</Text>
            <Text style={[styles.statValue, styles.statValueRight]}>
              {totalProducts.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: backgroundBeigeColor,
    flex: 1,
  },
  header: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.large,
  },
  listContent: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingBottom: spacings.normal,
  },
  listContentEmpty: {
    flexGrow: 1,
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
  fixedFooter: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.xLarge,
    paddingBottom: spacings.xxLarge,
    borderTopWidth: 1,
    borderTopColor: inputBorderColor,
    backgroundColor: backgroundBeigeColor,
    justifyContent: 'space-between',
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
    marginBottom: spacings.xxLarge,
  },
  searchInput: {
    flex: 1,
    ...style.fontSizeNormal2x,
    color: blackColor,
    paddingVertical: spacings.large,
    marginLeft: spacings.normal,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: spacings.normal,
  },
  cardWrap: {
    width: '48%',
  },
  statBlock: {
    flex: 1,
  },
  statLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.small,
  },
  statLabelRight: {
    textAlign: 'right',
  },
  statValue: {
    ...style.fontSizeLarge,
    ...style.fontWeightMedium1x,
    color: blackColor,
    // fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  statValueRight: {
    textAlign: 'right',
  },
});
