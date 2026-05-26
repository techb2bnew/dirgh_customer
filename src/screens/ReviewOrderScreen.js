import React, { useEffect, useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckoutProgressBar from '../components/CheckoutProgressBar';
import CustomButton from '../components/CustomButton';
import {
  ACCEPT_TERMS_TO_CONTINUE,
  AFTER_THIS_ORDER,
  AVAILABLE_CREDIT,
  BACK_TO_DELIVERY,
  BULLET_SEPARATOR,
  CHECKOUT_CREDIT_LIMIT,
  CREDIT_STATUS,
  DELIVERY_DETAILS_SECTION,
  DELIVERY_LABEL,
  formatOrderItemsCount,
  formatQtyLine,
  formatScheduleLine,
  formatTaxPercent,
  OPTIONAL_SUFFIX,
  FREE_LABEL,
  NET_30_DAYS,
  ORDER_TOTAL_CAPS,
  PLACE_ORDER,
  PO_NUMBER_LABEL,
  PO_NUMBER_PLACEHOLDER,
  REVIEW_ORDER_SUBTITLE,
  REVIEW_ORDER_TITLE,
  STANDARD_DELIVERY,
  SUBTOTAL_LABEL,
  TERMS_AND_CONDITIONS,
  TERMS_PREFIX,
  TERMS_SUFFIX,
} from '../constants/Constants';
import { ROUTE_ORDER_CONFIRMATION } from '../navigation/AppNavigator';
import {
  backgroundBeigeColor,
  blackColor,
  greenColor,
  inputBorderColor,
  lightGrayColor,
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
} = BaseStyle;

const TAX_PERCENT = 10;
const CHECKOUT_STEP = 2;
const formatPrice = value => `$${value.toFixed(2)}`;

const ReviewOrderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const cartItems = route.params?.cartItems ?? [];
  const delivery = route.params?.delivery;
  const fromHome = route.params?.fromHome;
  const account = route.params?.account;

  const [creditInfo, setCreditInfo] = useState(null);
  const [poNumber, setPoNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    setCreditInfo({
      availableCredit: 87250,
      creditLimit: 150000,
      paymentTerms: NET_30_DAYS,
      usedPercent: 42,
    });
  }, []);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const taxAmount = useMemo(() => subtotal * (TAX_PERCENT / 100), [subtotal]);
  const total = useMemo(() => subtotal + taxAmount, [subtotal, taxAmount]);

  const afterOrderCredit = useMemo(() => {
    if (!creditInfo) {
      return 0;
    }
    return creditInfo.availableCredit - total;
  }, [creditInfo, total]);

  const scheduleLine = useMemo(() => {
    if (!delivery?.date || !delivery?.timeSlot) {
      return '';
    }
    return formatScheduleLine(
      delivery.date.fullLabel,
      delivery.timeSlot.label,
      delivery.timeSlot.timeRange,
    );
  }, [delivery]);

  const handlePlaceOrder = () => {
    if (!termsAccepted) {
      return;
    }
    // TODO: place order API
    navigation.replace(ROUTE_ORDER_CONFIRMATION, {
      cartItems,
      delivery,
      total,
      totalItems,
      fromHome,
      account,
      orderNumber: 'ORD-4852',
      placedDate: 'April 17, 2026',
      expectedDeliveryDate: delivery?.date
        ? `Tuesday, ${delivery.date.dateLabel}, 2026`
        : 'Tuesday, April 22, 2026',
      locationShort: 'Bommasandra',
    });
  };

  return (
    <SafeAreaView style={[flex, styles.safeArea]}>
      <View style={flex}>
        <ScrollView
          style={flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            style={[flexDirectionRow, alignItemsCenter, styles.backButton]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Icon name="chevron-left" size={24} color={textSecondaryColor} />
            <Text style={styles.backText}>{BACK_TO_DELIVERY}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{REVIEW_ORDER_TITLE}</Text>
          <Text style={styles.subtitle}>{REVIEW_ORDER_SUBTITLE}</Text>
          <CheckoutProgressBar currentStep={CHECKOUT_STEP} />

          {creditInfo ? (
            <View style={styles.card}>
              <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter, styles.creditHeader]}>
                <Text style={styles.cardTitleInline}>{CREDIT_STATUS}</Text>
                <Text style={styles.cardMeta}>{creditInfo.paymentTerms}</Text>
              </View>
              <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.creditRow]}>
                <Text style={styles.creditLabel}>{AVAILABLE_CREDIT}</Text>
                <Text style={styles.creditValue}>{formatPrice(creditInfo.availableCredit)}</Text>
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[styles.progressFill, { width: `${creditInfo.usedPercent}%` }]}
                />
              </View>
              <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.creditFooter]}>
                <View>
                  <Text style={styles.creditSmallLabel}>{AFTER_THIS_ORDER}</Text>
                  <Text style={styles.creditAfterValue}>{formatPrice(afterOrderCredit)}</Text>
                </View>
                <View style={styles.creditLimitCol}>
                  <Text style={[styles.creditSmallLabel, styles.textRight]}>{CHECKOUT_CREDIT_LIMIT}</Text>
                  <Text style={[styles.creditValue, styles.textRight]}>
                    {formatPrice(creditInfo.creditLimit)}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          {delivery?.address ? (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{DELIVERY_DETAILS_SECTION}</Text>
              <View style={[flexDirectionRow, styles.detailRow]}>
                <Icon name="map-marker" size={20} color={primaryColor} />
                <View style={styles.detailTextCol}>
                  <Text style={styles.detailTitle}>{delivery.address.title}</Text>
                  <Text style={styles.detailMeta}>{delivery.address.address}</Text>
                </View>
              </View>
              <View style={[flexDirectionRow, styles.detailRow]}>
                <Icon name="calendar" size={20} color={primaryColor} />
                <View style={styles.detailTextCol}>
                  <Text style={styles.detailTitle}>{scheduleLine}</Text>
                  <Text style={styles.detailMeta}>{STANDARD_DELIVERY}</Text>
                </View>
              </View>
            </View>
          ) : null}

          <Text style={styles.sectionTitle}>{formatOrderItemsCount(totalItems)}</Text>
          {cartItems.map(item => (
            <View key={item.id} style={styles.itemCard}>
              <View style={[flexDirectionRow, justifyContentSpaceBetween]}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemTotal}>{formatPrice(item.price * item.quantity)}</Text>
              </View>
              <Text style={styles.itemMeta}>
                {item.sku}
                {BULLET_SEPARATOR}
                {item.packaging}
              </Text>
              <Text style={styles.itemQty}>{formatQtyLine(item.quantity, item.price)}</Text>
            </View>
          ))}

          <Text style={styles.poLabel}>
            {PO_NUMBER_LABEL} <Text style={styles.optionalText}>{OPTIONAL_SUFFIX}</Text>
          </Text>
          <TextInput
            style={styles.poInput}
            placeholder={PO_NUMBER_PLACEHOLDER}
            placeholderTextColor={placeholderColor}
            value={poNumber}
            onChangeText={setPoNumber}
          />

          <Pressable
            style={[flexDirectionRow, styles.termsRow]}
            onPress={() => setTermsAccepted(prev => !prev)}>
            <Icon
              name={termsAccepted ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={22}
              color={termsAccepted ? primaryColor : textSecondaryColor}
            />
            <Text style={styles.termsText}>
              {TERMS_PREFIX}
              <Text style={styles.termsLink}>{TERMS_AND_CONDITIONS}</Text>
              {TERMS_SUFFIX}
            </Text>
          </Pressable>
        </ScrollView>

        <View style={styles.footer}>
          <View style={[styles.summaryRow,justifyContentSpaceBetween]}>
            <Text style={styles.summaryLabel}>{SUBTOTAL_LABEL}</Text>
            <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
          </View>
         <View style={[styles.summaryRow,justifyContentSpaceBetween]}>
            <Text style={styles.summaryLabel}>{DELIVERY_LABEL}</Text>
            <Text style={[styles.summaryValue, styles.freeText]}>{FREE_LABEL}</Text>
          </View>
          <View style={[styles.summaryRow,justifyContentSpaceBetween]}>
            <Text style={styles.summaryLabel}>{formatTaxPercent(TAX_PERCENT)}</Text>
            <Text style={styles.summaryValue}>{formatPrice(taxAmount)}</Text>
          </View>
          <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.totalRow]}>
            <Text style={styles.orderTotalLabel}>{ORDER_TOTAL_CAPS}</Text>
            <Text style={styles.orderTotalValue}>{formatPrice(total)}</Text>
          </View>
          <CustomButton
            title={termsAccepted ? PLACE_ORDER : ACCEPT_TERMS_TO_CONTINUE}
            onPress={handlePlaceOrder}
            disabled={!termsAccepted}
            style={[styles.placeButton, !termsAccepted && styles.placeButtonDisabled]}
            textStyle={!termsAccepted && styles.placeButtonTextDisabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReviewOrderScreen;

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
    marginBottom: spacings.large,
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
  cardTitleInline: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  creditHeader: {
    marginBottom: spacings.large,
  },
  cardMeta: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  creditRow: {
    marginBottom: spacings.normal,
  },
  creditLabel: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  creditValue: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  progressTrack: {
    height: 8,
    backgroundColor: inputBorderColor,
    borderRadius: 4,
    marginBottom: spacings.large,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: greenColor,
    borderRadius: 4,
  },
  creditFooter: {
    alignItems: 'flex-end',
  },
  creditSmallLabel: {
    ...style.fontSizeSmall1x,
    color: textSecondaryColor,
    marginBottom: spacings.xsmall,
  },
  creditAfterValue: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: greenColor,
  },
  creditLimitCol: {
    alignItems: 'flex-end',
  },
  textRight: {
    textAlign: 'right',
  },
  detailRow: {
    alignItems: 'flex-start',
    marginBottom: spacings.large,
    gap: spacings.normal,
  },
  detailTextCol: {
    flex: 1,
  },
  detailTitle: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  detailMeta: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    lineHeight: 20,
  },
  sectionTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.large,
  },
  itemCard: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.normal,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  itemName: {
    flex: 1,
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginRight: spacings.normal,
  },
  itemTotal: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  itemMeta: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginTop: spacings.xsmall,
    marginBottom: spacings.xsmall,
  },
  itemQty: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  poLabel: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: textSecondaryColor,
    marginTop: spacings.large,
    marginBottom: spacings.large,
  },
  optionalText: {
    ...style.fontWeightThin,
    color: textSecondaryColor,
  },
  poInput: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: inputBorderColor,
    padding: spacings.large,
    ...style.fontSizeNormal2x,
    color: blackColor,
    marginBottom: spacings.xxLarge,
  },
  termsRow: {
    alignItems: 'flex-start',
    marginBottom: spacings.large,
    gap: spacings.normal,
  },
  termsText: {
    flex: 1,
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    lineHeight: 20,
  },
  termsLink: {
    color: primaryColor,
    ...style.fontWeightMedium,
  },
  footer: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.large,
    paddingBottom: spacings.xxLarge,
    backgroundColor: whiteColor,
    borderTopWidth: 1,
    borderTopColor: inputBorderColor,
  },
  summaryRow: {
    ...flexDirectionRow,
    justifyContentSpaceBetween,
    marginBottom: spacings.normal,
  },
  summaryLabel: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  summaryValue: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  freeText: {
    color: blackColor,
  },
  totalRow: {
    marginTop: spacings.small,
    marginBottom: spacings.large,
    paddingTop: spacings.normal,
    borderTopWidth: 1,
    borderTopColor: inputBorderColor,
  },
  orderTotalLabel: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  orderTotalValue: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: blackColor,
    // fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  placeButton: {
    borderRadius: 12,
  },
  placeButtonDisabled: {
    backgroundColor: lightGrayColor,
  },
  placeButtonTextDisabled: {
    color: textSecondaryColor,
  },
});
