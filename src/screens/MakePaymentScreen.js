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
import CustomButton from '../components/CustomButton';
import PaymentMethodCard from '../components/PaymentMethodCard';
import PaymentStepIndicator from '../components/PaymentStepIndicator';
import SelectableInvoiceCard from '../components/SelectableInvoiceCard';
import {
  ACH_TRANSFER,
  ACH_TRANSFER_DAYS,
  BACK,
  CARD_FEE_LABEL,
  CARD_INSTANT,
  CHECK_DAYS,
  CHECK_PAYMENT,
  CHOOSE_PAYMENT_HINT,
  CHOOSE_PAYMENT_METHOD_SUBTITLE,
  CONFIRM_PAYMENT,
  CONTINUE,
  CREDIT_DEBIT_CARD,
  formatContinueWithCount,
  INVOICES_TO_PAY,
  MAKE_PAYMENT_TITLE,
  OVERDUE,
  PAYMENT_METHOD,
  PAYMENT_SUMMARY,
  REVIEW_CONFIRM_SUBTITLE,
  SELECT_INVOICES_HINT,
  SELECT_INVOICES_SUBTITLE,
  SUBTOTAL,
  TOTAL_CAPS,
  UNPAID,
  WIRE_TRANSFER,
  WIRE_TRANSFER_DAYS,
} from '../constants/Constants';
import {
  actionTealColor,
  backgroundBeigeColor,
  blackColor,
  darkCardColor,
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
  width100Percent,
} = BaseStyle;

const STEP_INVOICES = 1;
const STEP_METHOD = 2;
const STEP_REVIEW = 3;

const METHOD_WIRE = 'wire';
const METHOD_ACH = 'ach';
const METHOD_CARD = 'card';
const METHOD_CHECK = 'check';

const parseAmount = value => Number(String(value).replace(/[$,]/g, '')) || 0;

const formatCurrency = value =>
  `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

const MakePaymentScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(STEP_INVOICES);
  const [invoiceList, setInvoiceList] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(METHOD_WIRE);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    // TODO: replace with API response
    setInvoiceList([
      {
        id: '1',
        invoiceId: 'INV-2847',
        issuedDate: '2026-04-01',
        dueDate: '2026-04-30',
        amount: '$32,450',
        status: UNPAID,
        selected: false,
      },
      {
        id: '2',
        invoiceId: 'INV-2846',
        issuedDate: '2026-03-20',
        dueDate: '2026-03-31',
        amount: '$8,920',
        status: OVERDUE,
        selected: false,
      },
      {
        id: '3',
        invoiceId: 'INV-2845',
        issuedDate: '2026-03-10',
        dueDate: '2026-04-10',
        amount: '$15,600',
        status: UNPAID,
        selected: false,
      },
      {
        id: '4',
        invoiceId: 'INV-2844',
        issuedDate: '2026-02-28',
        dueDate: '2026-03-30',
        amount: '$12,300',
        status: OVERDUE,
        selected: false,
      },
    ]);
  }, []);

  const selectedInvoices = useMemo(
    () => invoiceList.filter(item => item.selected),
    [invoiceList],
  );

  const selectedCount = selectedInvoices.length;

  const subtotal = useMemo(
    () => selectedInvoices.reduce((sum, item) => sum + parseAmount(item.amount), 0),
    [selectedInvoices],
  );

  const subtotalFormatted = formatCurrency(subtotal);

  const paymentMethods = [
    {
      id: METHOD_WIRE,
      title: WIRE_TRANSFER,
      subtitle: WIRE_TRANSFER_DAYS,
      icon: 'bank-outline',
    },
    {
      id: METHOD_ACH,
      title: ACH_TRANSFER,
      subtitle: ACH_TRANSFER_DAYS,
      icon: 'sync',
    },
    {
      id: METHOD_CARD,
      title: CREDIT_DEBIT_CARD,
      subtitle: CARD_INSTANT,
      icon: 'credit-card-outline',
      feeLabel: CARD_FEE_LABEL,
    },
    {
      id: METHOD_CHECK,
      title: CHECK_PAYMENT,
      subtitle: CHECK_DAYS,
      icon: 'file-document-edit-outline',
    },
  ];

  const selectedMethodTitle =
    paymentMethods.find(item => item.id === selectedMethod)?.title ?? WIRE_TRANSFER;

  const stepSubtitle =
    currentStep === STEP_INVOICES
      ? SELECT_INVOICES_SUBTITLE
      : currentStep === STEP_METHOD
        ? CHOOSE_PAYMENT_METHOD_SUBTITLE
        : REVIEW_CONFIRM_SUBTITLE;

  const toggleInvoice = id => {
    setInvoiceList(prev =>
      prev.map(item => (item.id === id ? { ...item, selected: !item.selected } : item)),
    );
  };

  const handleBack = () => {
    if (currentStep === STEP_INVOICES) {
      navigation.goBack();
      return;
    }
    setCurrentStep(prev => prev - 1);
  };

  const handleContinue = () => {
    if (currentStep === STEP_INVOICES && selectedCount === 0) {
      return;
    }
    if (currentStep < STEP_REVIEW) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleConfirmPayment = async () => {
    setIsConfirming(true);
    try {
      // TODO: API confirm payment
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigation.goBack();
    } finally {
      setIsConfirming(false);
    }
  };

  const renderStepContent = () => {
    if (currentStep === STEP_INVOICES) {
      return (
        <>
          <Text style={styles.sectionHint}>{SELECT_INVOICES_HINT}</Text>
          {invoiceList.map(invoice => (
            <SelectableInvoiceCard
              key={invoice.id}
              invoiceId={invoice.invoiceId}
              issuedDate={invoice.issuedDate}
              dueDate={invoice.dueDate}
              amount={invoice.amount}
              status={invoice.status}
              selected={invoice.selected}
              onToggle={() => toggleInvoice(invoice.id)}
            />
          ))}
        </>
      );
    }

    if (currentStep === STEP_METHOD) {
      return (
        <>
          <Text style={styles.sectionHint}>{CHOOSE_PAYMENT_HINT}</Text>
          {paymentMethods.map(method => (
            <PaymentMethodCard
              key={method.id}
              title={method.title}
              subtitle={method.subtitle}
              icon={method.icon}
              feeLabel={method.feeLabel}
              selected={selectedMethod === method.id}
              onSelect={() => setSelectedMethod(method.id)}
            />
          ))}
        </>
      );
    }

    return (
      <>
        <View style={styles.reviewCard}>
          <Text style={styles.reviewCardTitle}>{INVOICES_TO_PAY}</Text>
          {selectedInvoices.map((invoice, index) => (
            <View key={invoice.id}>
              {index > 0 ? <View style={styles.reviewDivider} /> : null}
              <View
                style={[
                  flexDirectionRow,
                  justifyContentSpaceBetween,
                  index < selectedInvoices.length - 1 && styles.reviewRowSpacing,
                ]}>
                <Text style={styles.reviewRowLabel}>{invoice.invoiceId}</Text>
                <Text style={styles.reviewRowValue}>{invoice.amount}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewCardTitle}>{PAYMENT_METHOD}</Text>
          <View style={[flexDirectionRow, alignItemsCenter, styles.methodRow]}>
            <Icon
              name={paymentMethods.find(item => item.id === selectedMethod)?.icon ?? 'bank-outline'}
              size={22}
              color={actionTealColor}
            />
            <Text style={styles.methodName}>{selectedMethodTitle}</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>{PAYMENT_SUMMARY}</Text>
          <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.summaryRow]}>
            <Text style={styles.summaryLabel}>{SUBTOTAL}</Text>
            <Text style={styles.summarySubtotal}>{subtotalFormatted}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}>
            <Text style={styles.totalLabel}>{TOTAL_CAPS}</Text>
            <Text style={styles.totalValue}>{subtotalFormatted}</Text>
          </View>
        </View>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === STEP_INVOICES) {
      return (
        <CustomButton
          title={formatContinueWithCount(selectedCount)}
          onPress={handleContinue}
          disabled={selectedCount === 0}
          style={styles.continueButton}
        />
      );
    }

    if (currentStep === STEP_REVIEW) {
      return (
        <View style={[flexDirectionRow, styles.footerRow]}>
          <CustomButton
            title={BACK}
            variant="outline"
            onPress={handleBack}
            style={styles.footerButton}
          />
          <CustomButton
            title={CONFIRM_PAYMENT}
            onPress={handleConfirmPayment}
            loading={isConfirming}
            style={[styles.footerButton, styles.footerButtonRight]}
          />
        </View>
      );
    }

    return (
      <View style={[flexDirectionRow, styles.footerRow]}>
        <CustomButton
          title={BACK}
          variant="outline"
          onPress={handleBack}
          style={styles.footerButton}
        />
        <CustomButton
          title={CONTINUE}
          onPress={handleContinue}
          style={[styles.footerButton, styles.footerButtonRight, styles.continueButton]}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[flex, styles.safeArea]}>
      <View style={flex}>
        <ScrollView
          style={flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={[flexDirectionRow, alignItemsCenter, styles.backButton]}
            onPress={handleBack}
            activeOpacity={0.7}>
            <Icon name="chevron-left" size={24} color={textSecondaryColor} />
            <Text style={styles.backText}>{BACK}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{MAKE_PAYMENT_TITLE}</Text>
          <Text style={styles.subtitle}>{stepSubtitle}</Text>

          <PaymentStepIndicator currentStep={currentStep} />

          {renderStepContent()}
        </ScrollView>

        <View style={styles.footer}>{renderFooter()}</View>
      </View>
    </SafeAreaView>
  );
};

export default MakePaymentScreen;

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
    marginBottom: spacings.large,
  },
  sectionHint: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginBottom: spacings.large,
  },
  reviewCard: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.xLarge,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  reviewCardTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.large,
  },
  reviewDivider: {
    height: 1,
    backgroundColor: inputBorderColor,
    marginVertical: spacings.large,
  },
  reviewRowSpacing: {
    marginBottom: spacings.large,
  },
  reviewRowLabel: {
    ...style.fontSizeNormal2x,
    color: blackColor,
  },
  reviewRowValue: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  methodRow: {
    gap: spacings.normal,
  },
  methodName: {
    ...style.fontSizeNormal2x,
    color: blackColor,
  },
  summaryCard: {
    backgroundColor: darkCardColor,
    borderRadius: 16,
    padding: spacings.xLarge,
    marginBottom: spacings.large,
  },
  summaryTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: whiteColor,
    marginBottom: spacings.xLarge,
  },
  summaryRow: {
    marginBottom: spacings.large,
  },
  summaryLabel: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  summarySubtotal: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#3A3A3A',
    marginBottom: spacings.large,
  },
  totalLabel: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: whiteColor,
    letterSpacing: 0.5,
  },
  totalValue: {
    ...style.fontSizeLarge,
    ...style.fontWeightMedium1x,
    color: whiteColor,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  footer: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingBottom: spacings.xxLarge,
    paddingTop: spacings.normal,
    backgroundColor: backgroundBeigeColor,
  },
  footerRow: {
    gap: spacings.normal,
  },
  footerButton: {
    flex: 1,
    shadowOpacity: 0,
    elevation: 0,
  },
  footerButtonRight: {
    marginLeft: 0,
  },
  continueButton: {
    backgroundColor: actionTealColor,
    shadowColor: actionTealColor,
  },
});
