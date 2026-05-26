import React, { useEffect, useMemo, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderCard from '../components/OrderCard';
import {
  BACK_TO_DASHBOARD,
  FILTER_ALL,
  FILTER_CANCELLED,
  FILTER_DELIVERED,
  FILTER_DISPATCHED,
  FILTER_PENDING,
  FILTER_PROCESSING,
  formatOrdersCount,
  formatNoOrdersFilterTitle,
  NO_ORDERS_FILTER_SUBTITLE,
  NO_ORDERS_EMPTY_TITLE,
  NO_ORDERS_EMPTY_SUBTITLE,
  SHOW_ALL_ORDERS,
  ORDERS_TITLE,
} from '../constants/Constants';
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
import { ROUTE_HOME, ROUTE_ORDER_DETAIL } from '../navigation/AppNavigator';

const { flex, flexDirectionRow, alignItemsCenter, alignJustifyCenter } = BaseStyle;

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [orderList, setOrderList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setFilterList([
      { id: 'all', label: FILTER_ALL },
      { id: 'pending', label: FILTER_PENDING },
      { id: 'processing', label: FILTER_PROCESSING },
      { id: 'dispatched', label: FILTER_DISPATCHED },
      { id: 'delivered', label: FILTER_DELIVERED },
      { id: 'cancelled', label: FILTER_CANCELLED },
    ]);

    // TODO: replace with API response
    setOrderList([
      {
        id: '1',
        orderId: 'ORD-4721',
        date: '2026-04-14',
        status: FILTER_DISPATCHED,
        filterStatus: 'dispatched',
        itemCount: 12,
        expectedDate: '2026-04-18',
        amount: '$24,750',
      },
      {
        id: '2',
        orderId: 'ORD-4683',
        date: '2026-04-12',
        status: FILTER_DISPATCHED,
        filterStatus: 'dispatched',
        itemCount: 8,
        expectedDate: '2026-04-18',
        amount: '$8,920',
      },
      {
        id: '3',
        orderId: 'ORD-4659',
        date: '2026-04-10',
        status: FILTER_PROCESSING,
        filterStatus: 'processing',
        itemCount: 15,
        amount: '$15,340',
      },
      {
        id: '4',
        orderId: 'ORD-4612',
        date: '2026-04-05',
        status: FILTER_DELIVERED,
        filterStatus: 'delivered',
        itemCount: 22,
        deliveredDate: '2026-04-08',
        amount: '$42,100',
      },
      {
        id: '5',
        orderId: 'ORD-4598',
        date: '2026-04-02',
        status: FILTER_PENDING,
        filterStatus: 'pending',
        itemCount: 6,
        amount: '$5,200',
      },
      {
        id: '6',
        orderId: 'ORD-4571',
        date: '2026-03-28',
        status: FILTER_DELIVERED,
        filterStatus: 'delivered',
        itemCount: 10,
        deliveredDate: '2026-04-01',
        amount: '$12,800',
      },
      {
        id: '7',
        orderId: 'ORD-4544',
        date: '2026-03-22',
        status: FILTER_CANCELLED,
        filterStatus: 'cancelled',
        itemCount: 4,
        amount: '$3,100',
      },
      {
        id: '8',
        orderId: 'ORD-4520',
        date: '2026-03-18',
        status: FILTER_DISPATCHED,
        filterStatus: 'dispatched',
        itemCount: 9,
        expectedDate: '2026-03-25',
        amount: '$9,450',
      },
      {
        id: '9',
        orderId: 'ORD-4498',
        date: '2026-03-12',
        status: FILTER_PENDING,
        filterStatus: 'pending',
        itemCount: 7,
        amount: '$6,780',
      },
    ]);
  }, []);

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') {
      return orderList;
    }
    return orderList.filter(order => order.filterStatus === activeFilter);
  }, [orderList, activeFilter]);

  const isFilterActive = activeFilter !== 'all';
  const activeFilterLabel =
    filterList.find(filter => filter.id === activeFilter)?.label ?? '';
  const emptyTitle = isFilterActive
    ? formatNoOrdersFilterTitle(activeFilterLabel)
    : NO_ORDERS_EMPTY_TITLE;
  const emptySubtitle = isFilterActive
    ? NO_ORDERS_FILTER_SUBTITLE
    : NO_ORDERS_EMPTY_SUBTITLE;

  return (
    <SafeAreaView style={[flex, styles.safeArea]}>
      <ScrollView
        style={flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={[flexDirectionRow, alignItemsCenter, styles.backButton]}
          onPress={() => navigation.navigate(ROUTE_HOME)}
          activeOpacity={0.7}>
          <Icon name="chevron-left" size={24} color={textSecondaryColor} />
          <Text style={styles.backText}>{BACK_TO_DASHBOARD}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{ORDERS_TITLE}</Text>
        <Text style={styles.subtitle}>{formatOrdersCount(orderList.length)}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}>
          {filterList.map(filter => {
            const isActive = activeFilter === filter.id;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[styles.filterPill, isActive && styles.filterPillActive]}
                onPress={() => setActiveFilter(filter.id)}
                activeOpacity={0.7}>
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              orderId={order.orderId}
              date={order.date}
              status={order.status}
              itemCount={order.itemCount}
              amount={order.amount}
              expectedDate={order.expectedDate}
              deliveredDate={order.deliveredDate}
              onPress={() =>
                navigation.navigate(ROUTE_ORDER_DETAIL, {
                  orderId: order.orderId,
                  filterStatus: order.filterStatus,
                })
              }
            />
          ))
        ) : (
          <View style={[alignJustifyCenter, styles.emptyPlaceholder]}>
            <View style={styles.emptyIconWrap}>
              <Icon name="clipboard-list-outline" size={48} color={textSecondaryColor} />
            </View>
            <Text style={styles.emptyTitle}>{emptyTitle}</Text>
            <Text style={styles.emptySubtitle}>{emptySubtitle}</Text>
            {isFilterActive ? (
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => setActiveFilter('all')}
                activeOpacity={0.85}>
                <Text style={styles.emptyButtonText}>{SHOW_ALL_ORDERS}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: backgroundBeigeColor,
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.large,
    paddingBottom: spacings.xxLarge,
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
  filterRow: {
    paddingBottom: spacings.xxLarge,
    gap: spacings.small,
  },
  filterPill: {
    paddingHorizontal: spacings.large,
    paddingVertical: spacings.normal,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: inputBorderColor,
    marginRight: spacings.small,
    backgroundColor: 'transparent',
  },
  filterPillActive: {
    backgroundColor: whiteColor,
    borderColor: whiteColor,
    shadowColor: blackColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  filterText: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  filterTextActive: {
    ...style.fontWeightMedium,
    color: blackColor,
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
});
