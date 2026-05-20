import React, { useMemo } from 'react';
import {
  Alert,
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
import CustomButton from '../components/CustomButton';
import {
  AnimatedSuccessCheck,
  FallingStoneConfetti,
} from '../components/OrderSuccessCelebration';
import {
  CONTINUE_SHOPPING,
  COPIED,
  COPY,
  EXPECTED_DELIVERY,
  formatDeliveryLocation,
  formatPacksCount,
  formatPlacedOn,
  formatTimeSlotDisplay,
  GO_TO_DASHBOARD,
  ORDER_NUMBER_LABEL,
  ORDER_PLACED_SUCCESS_MESSAGE,
  ORDER_PLACED_SUCCESS_TITLE,
  ORDER_SUMMARY_TITLE,
  ORDER_TOTAL_CAPS,
  PAYMENT_DUE_INFO,
  ORDER_SUMMARY_TOTAL_ITEMS,
  TRACK_ORDER,
  VIEW_ORDERS,
} from '../constants/Constants';
import {
  ROUTE_CATEGORIES,
  ROUTE_HOME,
  ROUTE_ORDER_DETAIL,
  ROUTE_ORDERS,
} from '../navigation/AppNavigator';
import {
  actionBlueBgColor,
  actionBlueColor,
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
  blackColor,
  darkCardColor,
  greenColor,
  inputBorderColor,
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
  flexWrap,
} = BaseStyle;

const TAX_PERCENT = 10;
const formatPrice = value => `$${value.toFixed(2)}`;

const OrderConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const cartItems = route.params?.cartItems ?? [];
  const delivery = route.params?.delivery;
  const account = route.params?.account;

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const total = useMemo(() => subtotal + subtotal * (TAX_PERCENT / 100), [subtotal]);

  const orderInfo = useMemo(() => {
    const orderNumber = route.params?.orderNumber ?? 'ORD-4852';
    const placedDate = route.params?.placedDate ?? 'April 17, 2026';
    const expectedDate =
      route.params?.expectedDeliveryDate ?? 'Tuesday, April 22, 2026';
    const locationShort = route.params?.locationShort ?? 'Bommasandra';

    return {
      orderNumber,
      placedDate,
      expectedDate,
      locationLine: delivery?.address
        ? formatDeliveryLocation(delivery.address.title, locationShort)
        : 'Main Warehouse, Bommasandra',
      timeSlotLine: delivery?.timeSlot
        ? formatTimeSlotDisplay(delivery.timeSlot.label, delivery.timeSlot.timeRange)
        : '',
    };
  }, [delivery, route.params]);

  const actionList = useMemo(
    () => [
      {
        id: 'track',
        label: TRACK_ORDER,
        icon: 'map-outline',
        iconColor: actionOrangeColor,
        iconBgColor: actionOrangeBgColor,
        route: ROUTE_ORDER_DETAIL,
        routeParams: { orderId: route.params?.orderNumber ?? 'ORD-4721' },
      },
      {
        id: 'orders',
        label: VIEW_ORDERS,
        icon: 'file-document-outline',
        iconColor: actionBlueColor,
        iconBgColor: actionBlueBgColor,
        route: ROUTE_ORDERS,
      },
      {
        id: 'shop',
        label: CONTINUE_SHOPPING,
        icon: 'shopping-outline',
        iconColor: actionLavenderColor,
        iconBgColor: actionLavenderBgColor,
        route: ROUTE_CATEGORIES,
        fullWidth: true,
      },
    ],
    [route.params?.orderNumber],
  );

  const handleCopyOrderNumber = () => {
    // TODO: Clipboard.setString(orderInfo.orderNumber)
    Alert.alert(COPIED, orderInfo.orderNumber);
  };

  const handleGoToDashboard = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTE_HOME, params: account ? { account } : undefined }],
    });
  };

  const handleActionPress = action => {
    if (action.routeParams) {
      navigation.navigate(action.route, action.routeParams);
      return;
    }
    navigation.navigate(action.route);
  };

  const gridActions = actionList.filter(item => !item.fullWidth);
  const fullWidthActions = actionList.filter(item => item.fullWidth);

  return (
    <SafeAreaView style={[flex, styles.safeArea]}>
      <FallingStoneConfetti active />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={[alignJustifyCenter, styles.successHeader]}>
          <AnimatedSuccessCheck active />
          <Text style={styles.successTitle}>{ORDER_PLACED_SUCCESS_TITLE}</Text>
          <Text style={styles.successMessage}>{ORDER_PLACED_SUCCESS_MESSAGE}</Text>
        </View>

        <View style={styles.orderNumberCard}>
          <Text style={styles.orderNumberLabel}>{ORDER_NUMBER_LABEL}</Text>
          <View style={[flexDirectionRow, alignItemsCenter, justifyContentSpaceBetween]}>
            <Text style={styles.orderNumberValue}>{orderInfo.orderNumber}</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopyOrderNumber}
              activeOpacity={0.7}>
              <Text style={styles.copyButtonText}>{COPY}</Text>
            </TouchableOpacity>
          </View>
          <View style={[flexDirectionRow, alignItemsCenter, styles.placedRow]}>
            <Icon name="calendar" size={16} color={textSecondaryColor} />
            <Text style={styles.placedText}>{formatPlacedOn(orderInfo.placedDate)}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={[flexDirectionRow, alignItemsCenter, styles.deliveryTop]}>
            <View style={[styles.deliveryIconWrap, { backgroundColor: actionTealBgColor }]}>
              <Icon name="check" size={18} color={actionTealColor} />
            </View>
            <View style={styles.deliveryTextCol}>
              <Text style={styles.deliveryLabel}>{EXPECTED_DELIVERY}</Text>
              <Text style={styles.expectedDate}>{orderInfo.expectedDate}</Text>
              <Text style={styles.timeSlot}>{orderInfo.timeSlotLine}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={[flexDirectionRow, alignItemsCenter]}>
            <Icon name="map-marker" size={20} color={primaryColor} />
            <Text style={styles.locationText}>{orderInfo.locationLine}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{ORDER_SUMMARY_TITLE}</Text>
          <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.summaryRow]}>
            <Text style={styles.summaryLabel}>{ORDER_SUMMARY_TOTAL_ITEMS}</Text>
            <Text style={styles.summaryValue}>{formatPacksCount(totalItems)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}>
            <Text style={styles.orderTotalLabel}>{ORDER_TOTAL_CAPS}</Text>
            <Text style={styles.orderTotalValue}>{formatPrice(total)}</Text>
          </View>
        </View>

        <View style={[flexDirectionRow, alignItemsCenter, styles.infoBanner]}>
          <Icon name="information-outline" size={20} color={actionPurpleColor} />
          <Text style={styles.infoText}>{PAYMENT_DUE_INFO}</Text>
        </View>

        <View style={[flexDirectionRow, flexWrap, styles.actionGrid]}>
          {gridActions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionCard}
              onPress={() => handleActionPress(action)}
              activeOpacity={0.7}>
              <View style={[styles.actionIconWrap, { backgroundColor: action.iconBgColor }]}>
                <Icon name={action.icon} size={22} color={action.iconColor} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {fullWidthActions.map(action => (
          <TouchableOpacity
            key={action.id}
            style={[flexDirectionRow, alignItemsCenter, styles.actionCardFull]}
            onPress={() => handleActionPress(action)}
            activeOpacity={0.7}>
            <View style={[styles.actionIconWrap, { backgroundColor: action.iconBgColor }]}>
              <Icon name={action.icon} size={22} color={action.iconColor} />
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}

        <CustomButton
          title={GO_TO_DASHBOARD}
          onPress={handleGoToDashboard}
          style={styles.dashboardButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderConfirmationScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: backgroundBeigeColor,
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.xxLarge,
    paddingBottom: spacings.xxLarge,
  },
  successHeader: {
    marginBottom: spacings.xxLarge,
    zIndex: 40,
  },
  successTitle: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: blackColor,
    textAlign: 'center',
    marginBottom: spacings.normal,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  successMessage: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: spacings.large,
  },
  orderNumberCard: {
    backgroundColor: darkCardColor,
    borderRadius: 12,
    padding: spacings.xLarge,
    marginBottom: spacings.large,
  },
  orderNumberLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.normal,
  },
  orderNumberValue: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: whiteColor,
    flex: 1,
  },
  copyButton: {
    backgroundColor: balanceBadgeBgColor,
    paddingHorizontal: spacings.large,
    paddingVertical: spacings.small,
    borderRadius: 8,
    marginLeft: spacings.normal,
  },
  copyButtonText: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: whiteColor,
  },
  placedRow: {
    marginTop: spacings.large,
    gap: spacings.small,
  },
  placedText: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginLeft: spacings.small,
  },
  card: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  deliveryTop: {
    marginBottom: spacings.large,
    gap: spacings.normal,
  },
  deliveryIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryTextCol: {
    flex: 1,
  },
  deliveryLabel: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  expectedDate: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: greenColor,
    marginBottom: spacings.xsmall,
  },
  timeSlot: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  divider: {
    height: 1,
    backgroundColor: inputBorderColor,
    marginVertical: spacings.large,
  },
  locationText: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    flex: 1,
    marginLeft: spacings.normal,
  },
  cardTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.large,
  },
  summaryRow: {
    marginBottom: spacings.large,
  },
  summaryLabel: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  summaryValue: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  orderTotalLabel: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  orderTotalValue: {
    ...style.fontSizeLarge,
    ...style.fontWeightMedium1x,
    color: blackColor,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  infoBanner: {
    backgroundColor: actionPurpleBgColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.xxLarge,
    gap: spacings.normal,
  },
  infoText: {
    ...style.fontSizeNormal,
    color: actionPurpleColor,
    flex: 1,
    lineHeight: 20,
  },
  actionGrid: {
    justifyContent: 'space-between',
    marginBottom: spacings.normal,
  },
  actionCard: {
    width: '48%',
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    alignItems: 'center',
    marginBottom: spacings.normal,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  actionCardFull: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
    gap: spacings.normal,
  },
  actionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacings.normal,
  },
  actionLabel: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  dashboardButton: {
    borderRadius: 12,
    marginTop: spacings.small,
  },
});
