import React, { useEffect, useState } from 'react';
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
import OrderDetailItemRow from '../components/OrderDetailItemRow';
import SegmentedTabs from '../components/SegmentedTabs';
import TrackingTimelineItem from '../components/TrackingTimelineItem';
import {
  BACK_TO_ORDERS,
  DELIVERY_ADDRESS,
  DELIVERY_DATE_LABEL,
  EXPECTED_SUFFIX,
  FILTER_DELIVERED,
  FILTER_DISPATCHED,
  FILTER_PROCESSING,
  formatItemsTab,
  IN_TRANSIT,
  ORDER_ITEMS_TITLE,
  ORDER_PLACED,
  OUT_FOR_DELIVERY,
  PROCESSING_STATUS,
  TAB_ITEMS,
  TAB_TRACKING,
  TOTAL_AMOUNT_LABEL,
  TRACKING_HISTORY,
  VIEW_INVOICE,
} from '../constants/Constants';
import {
  actionLavenderBgColor,
  actionLavenderColor,
  actionOrangeBgColor,
  actionOrangeColor,
  actionTealBgColor,
  actionTealColor,
  backgroundBeigeColor,
  blackColor,
  inputBorderColor,
  priorityLowBgColor,
  priorityLowTextColor,
  statusProcessingBgColor,
  statusProcessingTextColor,
  statusUnpaidBgColor,
  statusUnpaidTextColor,
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
} = BaseStyle;

const TAB_ITEMS_ID = 'items';
const TAB_TRACKING_ID = 'tracking';

const STATUS_STYLES = {
  Pending: { bg: statusUnpaidBgColor, text: statusUnpaidTextColor },
  Processing: { bg: statusProcessingBgColor, text: statusProcessingTextColor },
  Dispatched: { bg: actionLavenderBgColor, text: actionLavenderColor },
  Delivered: { bg: actionTealBgColor, text: actionTealColor },
  Cancelled: { bg: priorityLowBgColor, text: priorityLowTextColor },
};

/** Full pipeline for any order not in API yet — all steps visible; completedCount = how many from top have checkmarks */
const buildFullTrackingList = (variant, completedCount) => {
  const steps =
    variant === 'india'
      ? [
        {
          id: '1',
          title: ORDER_PLACED,
          location: 'Bangalore, IN',
          date: '2026-04-10',
          time: '10:00 AM',
        },
        {
          id: '2',
          title: PROCESSING_STATUS,
          location: 'Main Warehouse — Bommasandra',
          date: '2026-04-10',
          time: '04:30 PM',
        },
        {
          id: '3',
          title: FILTER_DISPATCHED,
          location: 'Bommasandra Distribution Center',
          date: '2026-04-11',
          time: '08:45 AM',
        },
        {
          id: '4',
          title: IN_TRANSIT,
          location: 'En route to destination',
          date: '2026-04-12',
          time: '11:30 AM',
        },
        {
          id: '5',
          title: OUT_FOR_DELIVERY,
          location: 'Bangalore, IN',
          date: '2026-04-15',
          time: EXPECTED_SUFFIX,
        },
        {
          id: '6',
          title: FILTER_DELIVERED,
          location: 'Plot 23, KIADB Industrial Area, Bommasandra',
          date: '2026-04-15',
          time: EXPECTED_SUFFIX,
        },
      ]
      : [
        {
          id: '1',
          title: ORDER_PLACED,
          location: 'San Francisco, CA',
          date: '2026-04-14',
          time: '09:23 AM',
        },
        {
          id: '2',
          title: PROCESSING_STATUS,
          location: 'Warehouse - Oakland, CA',
          date: '2026-04-14',
          time: '02:15 PM',
        },
        {
          id: '3',
          title: FILTER_DISPATCHED,
          location: 'Oakland Distribution Center',
          date: '2026-04-15',
          time: '08:45 AM',
        },
        {
          id: '4',
          title: IN_TRANSIT,
          location: 'En route to destination',
          date: '2026-04-16',
          time: '11:30 AM',
        },
        {
          id: '5',
          title: OUT_FOR_DELIVERY,
          location: 'San Francisco, CA',
          date: '2026-04-18',
          time: EXPECTED_SUFFIX,
        },
        {
          id: '6',
          title: FILTER_DELIVERED,
          location: '1234 Commerce Ave',
          date: '2026-04-18',
          time: EXPECTED_SUFFIX,
        },
      ];

  return steps.map((step, index) => ({
    ...step,
    isCompleted: index < completedCount,
  }));
};

const getCompletedStepsFromFilter = filterStatus => {
  const map = {
    pending: 1,
    processing: 2,
    dispatched: 3,
    delivered: 6,
    cancelled: 1,
  };
  return map[filterStatus] ?? 2;
};

const OrderDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const orderIdParam = route.params?.orderId ?? 'ORD-4721';
  const filterStatusParam = route.params?.filterStatus;

  const [activeTab, setActiveTab] = useState(TAB_ITEMS_ID);
  const [orderDetail, setOrderDetail] = useState(null);
  const [tabList, setTabList] = useState([]);

  useEffect(() => {
    // TODO: replace with API — keyed by orderId
    const detailsMap = {
      'ORD-4721': {
        orderId: 'ORD-4721',
        date: '2026-04-14',
        status: FILTER_DISPATCHED,
        totalAmount: '$24,750',
        deliveryDate: '2026-04-18',
        invoiceId: 'INV-2847',
        deliveryAddress: '1234 Commerce Ave, Suite 500, San Francisco, CA 94102',
        itemList: [
          {
            id: '1',
            name: 'Premium Widget Pro',
            sku: 'WDG-PRO-001',
            quantity: 150,
            unitPrice: 89.5,
            lineTotal: 13425,
          },
          {
            id: '2',
            name: 'Industrial Connector Set',
            sku: 'CON-IND-042',
            quantity: 50,
            unitPrice: 124.0,
            lineTotal: 6200,
          },
          {
            id: '3',
            name: 'Smart Sensor Module',
            sku: 'SNS-SM-108',
            quantity: 75,
            unitPrice: 68.33,
            lineTotal: 5125,
          },
        ],
        trackingList: buildFullTrackingList('us', 3),
      },
      'ORD-4852': {
        orderId: 'ORD-4852',
        date: '2026-04-17',
        status: FILTER_PROCESSING,
        totalAmount: '$1,279.19',
        deliveryDate: '2026-04-22',
        invoiceId: 'INV-2910',
        deliveryAddress:
          'Plot 23, KIADB Industrial Area, Bommasandra, Bangalore, Karnataka - 560099',
        itemList: [
          {
            id: '1',
            name: 'Coca-Cola Original 330ml',
            sku: 'BEV-001',
            quantity: 15,
            unitPrice: 18.5,
            lineTotal: 277.5,
          },
        ],
        trackingList: buildFullTrackingList('india', 2),
      },
    };

    const fallback = {
      orderId: orderIdParam,
      date: '2026-04-10',
      status: FILTER_PROCESSING,
      totalAmount: '$15,340',
      deliveryDate: '2026-04-15',
      invoiceId: 'INV-2800',
      deliveryAddress: 'Plot 23, KIADB Industrial Area, Bommasandra, Bangalore, Karnataka - 560099',
      itemList: [
        {
          id: '1',
          name: 'Standard Supply Pack',
          sku: 'STD-001',
          quantity: 10,
          unitPrice: 120.0,
          lineTotal: 1200,
        },
      ],
    };

    const detail = detailsMap[orderIdParam] ?? {
      ...fallback,
      orderId: orderIdParam,
      trackingList: buildFullTrackingList(
        'india',
        getCompletedStepsFromFilter(filterStatusParam),
      ),
    };

    setOrderDetail(detail);
    setTabList([
      { id: TAB_ITEMS_ID, label: formatItemsTab(detail.itemList.length) },
      { id: TAB_TRACKING_ID, label: TAB_TRACKING },
    ]);
  }, [filterStatusParam, orderIdParam]);

  if (!orderDetail) {
    return null;
  }

  const statusStyle = STATUS_STYLES[orderDetail.status] ?? STATUS_STYLES.Processing;

  return (
    <SafeAreaView style={[flex, styles.safeArea]}>
      <ScrollView
        style={flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={[flexDirectionRow, alignItemsCenter, styles.backButton]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <Icon name="chevron-left" size={24} color={textSecondaryColor} />
          <Text style={styles.backText}>{BACK_TO_ORDERS}</Text>
        </TouchableOpacity>

        <Text style={styles.orderId}>{orderDetail.orderId}</Text>
        <View style={[flexDirectionRow, alignItemsCenter, styles.metaRow]}>
          <Text style={styles.date}>{orderDetail.date}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.text }]}>
              {orderDetail.status}
            </Text>
          </View>
        </View>

        <View style={[flexDirectionRow, styles.summaryRow]}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>{TOTAL_AMOUNT_LABEL}</Text>
            <Text style={styles.summaryAmount}>{orderDetail.totalAmount}</Text>
          </View>
          <View style={styles.summaryGap} />
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>{DELIVERY_DATE_LABEL}</Text>
            <Text style={styles.summaryDate}>{orderDetail.deliveryDate}</Text>
          </View>
        </View>

        <SegmentedTabs tabs={tabList} activeId={activeTab} onChange={setActiveTab} />

        {activeTab === TAB_ITEMS_ID ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{ORDER_ITEMS_TITLE}</Text>
            {orderDetail.itemList.map((item, index) => (
              <OrderDetailItemRow
                key={item.id}
                name={item.name}
                sku={item.sku}
                quantity={item.quantity}
                unitPrice={item.unitPrice}
                lineTotal={item.lineTotal}
                isLast={index === orderDetail.itemList.length - 1}
              />
            ))}
          </View>
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{DELIVERY_ADDRESS}</Text>
              <Text style={styles.addressText}>{orderDetail.deliveryAddress}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>{TRACKING_HISTORY}</Text>
              {orderDetail.trackingList.map((step, index) => (
                <TrackingTimelineItem
                  key={step.id}
                  title={step.title}
                  location={step.location}
                  date={step.date}
                  time={step.time}
                  isCompleted={step.isCompleted}
                  isLast={index === orderDetail.trackingList.length - 1}
                />
              ))}
            </View>
          </>
        )}

        {activeTab === TAB_ITEMS_ID && <TouchableOpacity style={[flexDirectionRow, alignItemsCenter, styles.invoiceCard]} activeOpacity={0.7}>
          <View style={styles.invoiceIconWrap}>
            <Icon name="file-document-outline" size={24} color={actionOrangeColor} />
          </View>
          <View style={styles.invoiceTextCol}>
            <Text style={styles.invoiceTitle}>{VIEW_INVOICE}</Text>
            <Text style={styles.invoiceId}>{orderDetail.invoiceId}</Text>
          </View>
          <Icon name="chevron-right" size={24} color={textSecondaryColor} />
        </TouchableOpacity>}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailScreen;

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
  orderId: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: blackColor,
    marginBottom: spacings.normal,
    // fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  metaRow: {
    marginBottom: spacings.xxLarge,
    gap: spacings.normal,
  },
  date: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  statusBadge: {
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
  },
  statusText: {
    ...style.fontSizeSmall,
    ...style.fontWeightMedium,
  },
  summaryRow: {
    marginBottom: spacings.xxLarge,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  summaryGap: {
    width: spacings.normal,
  },
  summaryLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.small,
  },
  summaryAmount: {
    ...style.fontSizeLarge,
    ...style.fontWeightMedium1x,
    color: blackColor,
    // fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  summaryDate: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  card: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  cardTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.large,
  },
  addressText: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    lineHeight: 22,
  },
  invoiceCard: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
    marginTop: spacings.small,
  },
  invoiceIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: actionOrangeBgColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacings.large,
  },
  invoiceTextCol: {
    flex: 1,
  },
  invoiceTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  invoiceId: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
});
