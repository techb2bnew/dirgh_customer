import React, { useMemo, useState } from 'react';
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
import LedgerTransactionCard from '../components/LedgerTransactionCard';
import SegmentedTabs from '../components/SegmentedTabs';
import {
  BACK_TO_FINANCIAL_SUMMARY,
  BALANCE_LABEL,
  CREDITS_LABEL,
  DEBITS_LABEL,
  DOWNLOAD_STATEMENT,
  FILTER_30_DAYS,
  FILTER_60_DAYS,
  FILTER_90_DAYS,
  FILTER_YEAR,
  LEDGER_SUBTITLE,
  LEDGER_TITLE,
} from '../constants/Constants';
import {
  actionOrangeColor,
  actionPurpleColor,
  actionTealColor,
  backgroundBeigeColor,
  blackColor,
  inputBorderColor,
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

const FILTER_30 = '30';
const FILTER_60 = '60';
const FILTER_90 = '90';
const FILTER_YEAR_ID = 'year';

const parseLedgerDate = value => {
  if (!value) {
    return null;
  }
  const parts = value.split('/');
  if (parts.length !== 3) {
    return null;
  }
  const month = Number(parts[0]);
  const day = Number(parts[1]);
  const year = Number(parts[2]);
  if (!month || !day || !year) {
    return null;
  }
  return new Date(year, month - 1, day, 12, 0, 0);
};

/** Days from createdDate to today (0 = today) */
const getDaysSinceCreated = createdDate => {
  const start = parseLedgerDate(createdDate);
  if (!start) {
    return null;
  }
  const end = new Date();
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

const ViewLedgerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const account = route.params?.account;

  const [activeFilter, setActiveFilter] = useState(FILTER_30);
  // TODO: replace with API response
  const [transactionList] = useState([
    {
      id: '1',
      title: 'Payment Received - Wire Transfer',
      date: '5/14/2026',
      createdDate: '5/14/2026',
      reference: 'PAY-8847',
      type: 'credit',
      amount: '+$28,100',
      runningBalance: '$127,450',
    },
    {
      id: '2',
      title: 'Invoice Issued',
      date: '5/6/2026',
      createdDate: '5/6/2026',
      reference: 'INV-2821',
      type: 'debit',
      amount: '-$24,750',
      runningBalance: '$99,350',
    },
    {
      id: '3',
      title: 'Payment Received - ACH',
      date: '4/28/2026',
      createdDate: '4/28/2026',
      reference: 'PAY-8830',
      type: 'credit',
      amount: '+$32,450',
      runningBalance: '$124,100',
    },
    {
      id: '4',
      title: 'Invoice Issued',
      date: '4/5/2026',
      createdDate: '4/5/2026',
      reference: 'INV-2805',
      type: 'debit',
      amount: '-$18,200',
      runningBalance: '$91,650',
    },
    {
      id: '5',
      title: 'Invoice Issued',
      date: '3/9/2026',
      createdDate: '3/9/2026',
      reference: 'INV-2791',
      type: 'debit',
      amount: '-$31,200',
      runningBalance: '$109,850',
    },
  ]);

  const debitsTotal = account?.ledgerDebits ?? '$122,435';
  const creditsTotal = account?.ledgerCredits ?? '$151,580';
  const balanceTotal = account?.balanceAmount ?? '$127,450';

  const filteredTransactions = useMemo(() => {
    if (activeFilter === FILTER_YEAR_ID) {
      const currentYear = new Date().getFullYear();
      return transactionList.filter(item => {
        const parsed = parseLedgerDate(item.createdDate);
        return parsed?.getFullYear() === currentYear;
      });
    }

    const maxDays =
      activeFilter === FILTER_30 ? 30 : activeFilter === FILTER_60 ? 60 : 90;

    return transactionList.filter(item => {
      const daysAgo = getDaysSinceCreated(item.createdDate);
      if (daysAgo === null) {
        return false;
      }
      return daysAgo >= 0 && daysAgo <= maxDays;
    });
  }, [transactionList, activeFilter]);

  return (
    <SafeAreaView style={[flex, styles.safeArea]}>
      <View style={flex}>
        <ScrollView
          style={flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={[flexDirectionRow, alignItemsCenter, styles.backButton]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Icon name="chevron-left" size={24} color={textSecondaryColor} />
            <Text style={styles.backText}>{BACK_TO_FINANCIAL_SUMMARY}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{LEDGER_TITLE}</Text>
          <Text style={styles.subtitle}>{LEDGER_SUBTITLE}</Text>

          <SegmentedTabs
            tabs={[
              { id: FILTER_30, label: FILTER_30_DAYS },
              { id: FILTER_60, label: FILTER_60_DAYS },
              { id: FILTER_90, label: FILTER_90_DAYS },
              { id: FILTER_YEAR_ID, label: FILTER_YEAR },
            ]}
            activeId={activeFilter}
            onChange={setActiveFilter}
          />

          <View style={[flexDirectionRow, styles.summaryRow]}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>{DEBITS_LABEL}</Text>
              <Text style={[styles.summaryValue, styles.debitsValue]}>{debitsTotal}</Text>
            </View>
            <View style={styles.summaryGap} />
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>{CREDITS_LABEL}</Text>
              <Text style={[styles.summaryValue, styles.creditsValue]}>{creditsTotal}</Text>
            </View>
            <View style={styles.summaryGap} />
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>{BALANCE_LABEL}</Text>
              <Text style={styles.summaryValue}>{balanceTotal}</Text>
            </View>
          </View>

          {filteredTransactions.map(item => (
            <LedgerTransactionCard
              key={item.id}
              title={item.title}
              date={item.date}
              reference={item.reference}
              type={item.type}
              amount={item.amount}
              runningBalance={item.runningBalance}
            />
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[flexDirectionRow, alignItemsCenter, styles.downloadButton]}
            activeOpacity={0.85}>
            <Icon name="file-download-outline" size={22} color={whiteColor} />
            <Text style={styles.downloadText}>{DOWNLOAD_STATEMENT}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewLedgerScreen;

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
  summaryRow: {
    marginBottom: spacings.xxLarge,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: whiteColor,
    borderRadius: 8,
    padding: spacings.normalx,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  summaryGap: {
    width: spacings.small,
  },
  summaryLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.small,
  },
  summaryValue: {
    ...style.fontSizeNormal,
    ...style.fontWeightThin1x,
    color: blackColor,
  },
  debitsValue: {
    color: actionOrangeColor,
  },
  creditsValue: {
    color: actionTealColor,
  },
  footer: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingBottom: spacings.xxLarge,
    paddingTop: spacings.normal,
    backgroundColor: backgroundBeigeColor,
  },
  downloadButton: {
    backgroundColor: actionPurpleColor,
    borderRadius: 12,
    paddingVertical: spacings.large,
    justifyContent: 'center',
  },
  downloadText: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: whiteColor,
    marginLeft: spacings.normal,
  },
});
