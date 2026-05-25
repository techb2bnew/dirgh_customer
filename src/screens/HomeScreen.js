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
import {
  ROUTE_CART,
  ROUTE_CATEGORIES,
  ROUTE_DOCUMENTS,
  ROUTE_FINANCIAL_SUMMARY,
  ROUTE_MAKE_PAYMENT,
  ROUTE_NEW_ORDER,
  ROUTE_ORDERS,
  ROUTE_QUICK_REORDER,
  ROUTE_PROFILE,
  ROUTE_RAISE_ENQUIRY,
} from '../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionGridItem from '../components/ActionGridItem';
import InvoiceListItem from '../components/InvoiceListItem';
import ListSectionCard from '../components/ListSectionCard';
import OrderListItem from '../components/OrderListItem';
import SummaryStatCard from '../components/SummaryStatCard';
import TicketListItem from '../components/TicketListItem';
import {
  ACCOUNT_BALANCE,
  ACCOUNT_ID_LABEL,
  CREDIT_LABEL,
  INVOICES,
  ORDERS,
  OUTSTANDING_LABEL,
  QUICK_REORDER,
  RECENT_INVOICES,
  RECENT_ORDERS,
  SUPPORT_TICKETS,
  TICKETS,
} from '../constants/Constants';
import {
  actionBlueBgColor,
  actionBlueColor,
  actionBrownBgColor,
  actionBrownColor,
  actionLavenderBgColor,
  actionLavenderColor,
  actionOrangeBgColor,
  actionOrangeColor,
  actionPurpleBgColor,
  actionPurpleColor,
  actionTealBgColor,
  actionTealColor,
  backgroundBeigeColor,
  balanceBadgeBgColor,
  balanceBadgeTextColor,
  blackColor,
  creditDotColor,
  darkCardColor,
  lightGrayColor,
  outstandingDotColor,
  primaryColor,
  quickReorderBgColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';

const {
  flex,
  flexDirectionRow,
  alignItemsCenter,
  justifyContentSpaceBetween,
  width100Percent,
  flexWrap,
  alignJustifyCenter
} = BaseStyle;

const CART_BADGE_COUNT = '5';

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const account = route.params?.account;
  const companyName = account?.name ?? 'Quantum Industries';
  const accountId = account?.accountId ?? '847392';
  const balanceAmount = account?.balanceAmount ?? '$127,450.00';
  const balancePercent = account?.balancePercent ?? '+12.5%';
  const credit = account?.credit ?? '$50K';
  const outstanding = account?.outstanding ?? '$32K';

  const [recentOrdersList, setRecentOrdersList] = useState([]);
  const [recentInvoicesList, setRecentInvoicesList] = useState([]);
  const [supportTicketsList, setSupportTicketsList] = useState([]);

  const ActionGridList = [
    {
      id: '1',
      label: 'New Order',
      icon: 'plus',
      iconColor: actionTealColor,
      iconBgColor: actionTealBgColor,
    },
    {
      id: '2',
      label: 'View Ledger',
      icon: 'file-document-outline',
      iconColor: actionPurpleColor,
      iconBgColor: actionPurpleBgColor,
    },
    {
      id: '3',
      label: 'Raise Enquiry',
      icon: 'help-circle-outline',
      iconColor: actionOrangeColor,
      iconBgColor: actionOrangeBgColor,
    },
    {
      id: '4',
      label: 'Make Payment',
      icon: 'credit-card-outline',
      iconColor: actionBrownColor,
      iconBgColor: actionBrownBgColor,
    },
    {
      id: '5',
      label: 'Documents',
      icon: 'file-download-outline',
      iconColor: actionBlueColor,
      iconBgColor: actionBlueBgColor,
    },
    {
      id: '6',
      label: 'Browse Catalog',
      icon: 'package-variant-closed',
      iconColor: actionLavenderColor,
      iconBgColor: actionLavenderBgColor,
    },
  ]

  const handleNewOrder = () => {
    navigation.navigate(ROUTE_NEW_ORDER);
  };

  const handleViewLedger = () => {
    navigation.navigate(ROUTE_FINANCIAL_SUMMARY, { account });
  };

  const handleRaiseEnquiry = () => {
    navigation.navigate(ROUTE_RAISE_ENQUIRY);
  };

  const handleMakePayment = () => {
    navigation.navigate(ROUTE_MAKE_PAYMENT);
  };

  const handleDocuments = () => {
    navigation.navigate(ROUTE_DOCUMENTS);
  };

  const handleBrowseCatalog = () => {
    navigation.navigate(ROUTE_CATEGORIES);
  };

  const handleOrders = () => {
    // navigation.navigate(ROUTE_ORDERS);
  };

  const handleQuickReorder = () => {
    navigation.navigate(ROUTE_QUICK_REORDER);
  };

  const handleActionPress = actionId => {
    switch (actionId) {
      case '1':
        handleNewOrder();
        break;
      case '2':
        handleViewLedger();
        break;
      case '3':
        handleRaiseEnquiry();
        break;
      case '4':
        handleMakePayment();
        break;
      case '5':
        handleDocuments();
        break;
      case '6':
        handleBrowseCatalog();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // TODO: replace with API response
    setRecentOrdersList([
      {
        id: '1',
        orderId: 'ORD-4721',
        date: '2026-04-14',
        status: 'Processing',
        amount: '$24,750',
      },
      {
        id: '2',
        orderId: 'ORD-4698',
        date: '2026-04-10',
        status: 'Shipped',
        amount: '$18,200',
      },
      {
        id: '3',
        orderId: 'ORD-4655',
        date: '2026-04-05',
        status: 'Delivered',
        amount: '$41,300',
      },
    ]);

    setRecentInvoicesList([
      {
        id: '1',
        invoiceId: 'INV-2847',
        dueDate: '2026-04-30',
        status: 'Unpaid',
        amount: '$32,450',
      },
      {
        id: '2',
        invoiceId: 'INV-2821',
        dueDate: '2026-03-30',
        status: 'Paid',
        amount: '$28,100',
      },
      {
        id: '3',
        invoiceId: 'INV-2805',
        dueDate: '2026-02-28',
        status: 'Paid',
        amount: '$31,200',
      },
    ]);

    setSupportTicketsList([
      {
        id: '1',
        title: 'Shipping delay inquiry',
        ticketId: 'TKT-892',
        status: 'Open',
        priority: 'High',
      },
      {
        id: '2',
        title: 'Product specifications',
        ticketId: 'TKT-877',
        status: 'Resolved',
        priority: 'Low',
      },
    ]);
  }, []);

  return (
    <SafeAreaView style={[flex, styles.safeArea]}>
      <ScrollView
        style={flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.fixedSection}>
          <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter, styles.header]}>
            <View style={styles.headerTextWrap}>
              <Text style={styles.companyName}>{companyName}</Text>
              <Text style={styles.accountId}>
                {ACCOUNT_ID_LABEL}
                {accountId}
              </Text>
            </View>
            <View style={[flexDirectionRow, alignItemsCenter]}>
              <TouchableOpacity
                style={[styles.iconButton, alignJustifyCenter]}
                activeOpacity={0.7}
              // onPress={() =>
              //   navigation.navigate(ROUTE_CART, {
              //     fromHome: true,
              //     account,
              //   })
              // }
              >
                <Icon name="shopping-outline" size={22} color={blackColor} />
                <View style={[styles.badge, alignJustifyCenter]}>
                  <Text style={styles.badgeText}>{CART_BADGE_COUNT}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconButton, styles.profileButton, alignJustifyCenter]}
                // onPress={() => navigation.navigate(ROUTE_PROFILE, { account })}
                activeOpacity={0.7}>
                <Icon name="account-circle-outline" size={26} color={blackColor} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.balanceCard}>
            <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}>
              <Text style={styles.balanceLabel}>{ACCOUNT_BALANCE}</Text>
              <View style={styles.balanceBadge}>
                <Text style={styles.balanceBadgeText}>{balancePercent}</Text>
              </View>
            </View>
            <Text style={styles.balanceAmount}>{balanceAmount}</Text>
            <View style={[flexDirectionRow, styles.balanceFooter]}>
              <View style={[flexDirectionRow, alignItemsCenter]}>
                <View style={[styles.dot, { backgroundColor: creditDotColor }]} />
                <Text style={styles.balanceMeta}>
                  {CREDIT_LABEL} {credit}
                </Text>
              </View>
              <View style={[flexDirectionRow, alignItemsCenter]}>
                <View style={[styles.dot, { backgroundColor: outstandingDotColor }]} />
                <Text style={styles.balanceMeta}>
                  {OUTSTANDING_LABEL} {outstanding}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[flexDirectionRow, alignItemsCenter, styles.quickReorder]}
            onPress={handleQuickReorder}
            activeOpacity={0.85}>
            <Icon name="sync" size={22} color={whiteColor} />
            <Text style={styles.quickReorderText}>{QUICK_REORDER}</Text>
          </TouchableOpacity>

          <View style={[flexDirectionRow, flexWrap, justifyContentSpaceBetween, styles.actionGrid]}>
            {ActionGridList.map(item => (
              <ActionGridItem
                key={item.id}
                label={item.label}
                icon={item.icon}
                iconColor={item.iconColor}
                iconBgColor={item.iconBgColor}
                onPress={() => handleActionPress(item.id)}
              />
            ))}
          </View>
        </View>


        <View style={[flexDirectionRow, styles.statsRow]}>
          <SummaryStatCard label={ORDERS} value={String(recentOrdersList.length)} />
          <View style={styles.statGap} />
          <SummaryStatCard label={INVOICES} value={String(recentInvoicesList.length)} />
          <View style={styles.statGap} />
          <SummaryStatCard label={TICKETS} value={String(supportTicketsList.length)} />
        </View>

        <ListSectionCard title={RECENT_ORDERS} onViewAll={handleOrders}>
          {recentOrdersList.map((order, index) => (
            <OrderListItem
              key={order.id}
              orderId={order.orderId}
              date={order.date}
              status={order.status}
              amount={order.amount}
              isLast={index === recentOrdersList.length - 1}
            />
          ))}
        </ListSectionCard>

        <ListSectionCard title={RECENT_INVOICES}>
          {recentInvoicesList.map((invoice, index) => (
            <InvoiceListItem
              key={invoice.id}
              invoiceId={invoice.invoiceId}
              dueDate={invoice.dueDate}
              status={invoice.status}
              amount={invoice.amount}
              isLast={index === recentInvoicesList.length - 1}
            />
          ))}
        </ListSectionCard>

        <ListSectionCard title={SUPPORT_TICKETS} onViewAll={() => {
          // navigation.navigate(ROUTE_RAISE_ENQUIRY)
        }}>
          {supportTicketsList.map((ticket, index) => (
            <TicketListItem
              key={ticket.id}
              title={ticket.title}
              ticketId={ticket.ticketId}
              status={ticket.status}
              priority={ticket.priority}
              isLast={index === supportTicketsList.length - 1}
            />
          ))}
        </ListSectionCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: backgroundBeigeColor,
    height: hp(100),
    width: wp(100),
  },
  fixedSection: {
    // paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.large,
  },
  actionGrid: {
    ...width100Percent,
    // marginBottom: spacings.large,
  },
  statsRow: {
    ...width100Percent,
    marginBottom: spacings.large,
  },
  statGap: {
    width: spacings.normal,
  },
  header: {
    marginBottom: spacings.xxLarge,
  },
  headerTextWrap: {
    flex: 1,
    marginRight: spacings.normal,
  },
  companyName: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: blackColor,
    marginBottom: spacings.xsmall,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  accountId: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: whiteColor,
    borderWidth: 1,
    borderColor: lightGrayColor,
  },
  profileButton: {
    marginLeft: spacings.normal,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: primaryColor,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
  },
  badgeText: {
    ...style.fontSizeExtraSmall,
    color: whiteColor,
    ...style.fontWeightMedium1x,
  },
  balanceCard: {
    backgroundColor: darkCardColor,
    borderRadius: 16,
    padding: spacings.xLarge,
    marginBottom: spacings.large,
  },
  balanceLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 1,
  },
  balanceBadge: {
    backgroundColor: balanceBadgeBgColor,
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
  },
  balanceBadgeText: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightMedium,
    color: balanceBadgeTextColor,
  },
  balanceAmount: {
    ...style.fontSizeLarge3x,
    ...style.fontWeightMedium1x,
    color: whiteColor,
    marginVertical: spacings.large,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  balanceFooter: {
    gap: spacings.xxLarge,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacings.small,
  },
  balanceMeta: {
    ...style.fontSizeNormal,
    color: lightGrayColor,
  },
  quickReorder: {
    ...width100Percent,
    backgroundColor: quickReorderBgColor,
    borderRadius: 12,
    paddingVertical: spacings.large,
    justifyContent: 'center',
    marginBottom: spacings.large,
  },
  quickReorderText: {
    ...style.fontSizeMedium1x,
    ...style.fontWeightMedium1x,
    color: whiteColor,
    marginLeft: spacings.normal,
  },
  scrollContent: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingBottom: spacings.xxLarge,
  },
});
