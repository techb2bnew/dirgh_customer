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
import ActionGridItem from '../components/ActionGridItem';
import PaymentHistoryCard from '../components/PaymentHistoryCard';
import SegmentedTabs from '../components/SegmentedTabs';
import {
  AVAILABLE_LABEL,
  BACK_TO_DASHBOARD,
  COMPLETED,
  CREDIT_LIMIT_LABEL,
  FINANCIAL_SUMMARY_SUBTITLE,
  FINANCIAL_SUMMARY_TITLE,
  MAKE_PAYMENT,
  NEXT_PAYMENT_DUE,
  OUTSTANDING_CAPS,
  OVERDUE_CAPS,
  TAB_OVERVIEW,
  TAB_PAYMENT_HISTORY,
  USED_LABEL,
  VIEW_LEDGER,
} from '../constants/Constants';
import { ROUTE_MAKE_PAYMENT, ROUTE_VIEW_LEDGER } from '../navigation/AppNavigator';
import {
  actionBrownBgColor,
  actionBrownColor,
  actionPurpleBgColor,
  actionPurpleColor,
  actionTealColor,
  backgroundBeigeColor,
  balanceBadgeBgColor,
  balanceBadgeTextColor,
  blackColor,
  darkCardColor,
  inputBorderColor,
  lightShadeBlue,
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
  flexWrap,
  alignItemsCenter,
  justifyContentSpaceBetween,
  width100Percent,
} = BaseStyle;

const TAB_OVERVIEW_ID = 'overview';
const TAB_PAYMENT_ID = 'paymentHistory';

const FinancialSummaryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const account = route.params?.account;

  const [activeTab, setActiveTab] = useState(TAB_OVERVIEW_ID);
  const [paymentHistoryList, setPaymentHistoryList] = useState([]);

  const creditLimit = account?.creditLimit ?? '$250,000';
  const creditUsed = account?.creditUsed ?? '$127,450';
  const creditAvailable = account?.creditAvailable ?? '$122,550';
  const creditUsedPercent = account?.creditUsedPercent ?? 51;
  const outstanding = account?.outstandingAmount ?? '$32,450';
  const overdue = account?.overdueAmount ?? '$0';
  const nextPaymentDue = account?.nextPaymentDue ?? '$32,450';
  const nextPaymentDate = account?.nextPaymentDate ?? '2026-04-30';

  useEffect(() => {
    // TODO: replace with API response
    setPaymentHistoryList([
      {
        id: '1',
        paymentId: 'PAY-8847',
        date: '2026-04-10',
        status: COMPLETED,
        amount: '$28,100',
        method: 'Wire Transfer',
        invoiceId: 'INV-2821',
      },
      {
        id: '2',
        paymentId: 'PAY-8830',
        date: '2026-03-28',
        status: COMPLETED,
        amount: '$32,450',
        method: 'ACH',
        invoiceId: 'INV-2805',
      },
      {
        id: '3',
        paymentId: 'PAY-8815',
        date: '2026-03-15',
        status: COMPLETED,
        amount: '$31,200',
        method: 'Wire Transfer',
        invoiceId: 'INV-2791',
      },
      {
        id: '4',
        paymentId: 'PAY-8798',
        date: '2026-02-28',
        status: COMPLETED,
        amount: '$35,800',
        method: 'ACH',
        invoiceId: 'INV-2774',
      },
    ]);
  }, []);

  const handleViewLedger = () => {
    navigation.navigate(ROUTE_VIEW_LEDGER, { account });
  };

  const handleMakePayment = () => {
    navigation.navigate(ROUTE_MAKE_PAYMENT);
  };

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
          <Text style={styles.backText}>{BACK_TO_DASHBOARD}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{FINANCIAL_SUMMARY_TITLE}</Text>
        <Text style={styles.subtitle}>{FINANCIAL_SUMMARY_SUBTITLE}</Text>

        <SegmentedTabs
          tabs={[
            { id: TAB_OVERVIEW_ID, label: TAB_OVERVIEW },
            { id: TAB_PAYMENT_ID, label: TAB_PAYMENT_HISTORY },
          ]}
          activeId={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === TAB_OVERVIEW_ID ? (
          <>
            <View style={styles.creditCard}>
              <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}>
                <Text style={styles.creditLabel}>{CREDIT_LIMIT_LABEL}</Text>
                <View style={styles.usedBadge}>
                  <Text style={styles.usedBadgeText}>{creditUsedPercent}% Used</Text>
                </View>
              </View>
              <Text style={styles.creditLimitValue}>{creditLimit}</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${creditUsedPercent}%` }]} />
              </View>
              <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.creditFooter]}>
                <View>
                  <Text style={styles.creditFooterLabel}>{USED_LABEL}</Text>
                  <Text style={styles.creditUsedValue}>{creditUsed}</Text>
                </View>
                <View style={styles.creditFooterRight}>
                  <Text style={styles.creditFooterLabel}>{AVAILABLE_LABEL}</Text>
                  <Text style={styles.creditAvailableValue}>{creditAvailable}</Text>
                </View>
              </View>
            </View>

            <View style={[flexDirectionRow, styles.statRow]}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>{OUTSTANDING_CAPS}</Text>
                <Text style={styles.statValue}>{outstanding}</Text>
              </View>
              <View style={styles.statGap} />
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>{OVERDUE_CAPS}</Text>
                <Text style={[styles.statValue, styles.overdueValue]}>{overdue}</Text>
              </View>
            </View>

            <View style={styles.dueCard}>
              <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}>
                <Text style={styles.dueTitle}>{NEXT_PAYMENT_DUE}</Text>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateBadgeText}>{nextPaymentDate}</Text>
                </View>
              </View>
              <Text style={styles.dueAmount}>{nextPaymentDue}</Text>
            </View>

            <View style={[flexDirectionRow, flexWrap, justifyContentSpaceBetween, styles.actionGrid]}>
              <ActionGridItem
                label={MAKE_PAYMENT}
                icon="credit-card-outline"
                iconColor={actionBrownColor}
                iconBgColor={actionBrownBgColor}
                onPress={handleMakePayment}
              />
              <ActionGridItem
                label={VIEW_LEDGER}
                icon="file-document-outline"
                iconColor={actionPurpleColor}
                iconBgColor={actionPurpleBgColor}
                onPress={handleViewLedger}
              />
            </View>
          </>
        ) : (
          paymentHistoryList.map(payment => (
            <PaymentHistoryCard
              key={payment.id}
              paymentId={payment.paymentId}
              date={payment.date}
              status={payment.status}
              amount={payment.amount}
              method={payment.method}
              invoiceId={payment.invoiceId}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FinancialSummaryScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: backgroundBeigeColor,
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.large,
    paddingBottom: spacings.ExtraLarge,
  },
  backButton: {
    marginTop: Platform.OS === "android" ? spacings.large : spacings.small,
    marginBottom: spacings.large,
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
  creditCard: {
    backgroundColor: darkCardColor,
    borderRadius: 10,
    padding: spacings.xLarge,
    marginBottom: spacings.large,
  },
  creditLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
  },
  usedBadge: {
    backgroundColor: balanceBadgeBgColor,
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
  },
  usedBadgeText: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightMedium,
    color: balanceBadgeTextColor,
  },
  creditLimitValue: {
    ...style.fontSizeLarge1x,
    ...style.fontWeightMedium1x,
    color: whiteColor,
    marginVertical: spacings.large,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  progressTrack: {
    ...width100Percent,
    height: 6,
    backgroundColor: '#3A3A3A',
    borderRadius: 3,
    marginBottom: spacings.xLarge,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: actionPurpleColor,
    borderRadius: 3,
  },
  creditFooter: {
    marginTop: spacings.small,
  },
  creditFooterLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    marginBottom: spacings.xsmall,
  },
  creditUsedValue: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: whiteColor,
  },
  creditFooterRight: {
    alignItems: 'flex-end',
  },
  creditAvailableValue: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: lightShadeBlue,
  },
  statRow: {
    marginBottom: spacings.large,
  },
  statCard: {
    flex: 1,
    backgroundColor: whiteColor,
    borderRadius: 10,
    padding: spacings.xLarge,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  statGap: {
    width: spacings.normal,
  },
  statLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.small,
  },
  statValue: {
    ...style.fontSizeLarge,
    ...style.fontWeightThin,
    color: blackColor,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  overdueValue: {
    color: actionTealColor,
  },
  dueCard: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.xLarge,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  dueTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  dateBadge: {
    backgroundColor: statusUnpaidBgColor,
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 8,
  },
  dateBadgeText: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightMedium,
    color: statusUnpaidTextColor,
  },
  dueAmount: {
    ...style.fontSizeLarge,
    ...style.fontWeightThin,
    color: blackColor,
    marginTop: spacings.large,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  actionGrid: {
    ...width100Percent,
  },
});
