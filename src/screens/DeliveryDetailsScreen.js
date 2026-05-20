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
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckoutProgressBar from '../components/CheckoutProgressBar';
import CustomButton from '../components/CustomButton';
import { ROUTE_REVIEW_ORDER } from '../navigation/AppNavigator';
import {
  ADD_NEW_ADDRESS,
  BACK_TO_CART,
  BADGE_DEFAULT,
  BADGE_REGISTERED,
  BADGE_SHIPPING,
  CONTINUE_TO_PAYMENT,
  DELIVERY_ADDRESS,
  DELIVERY_DETAILS_SUBTITLE,
  DELIVERY_DETAILS_TITLE,
  DELIVERY_SUMMARY,
  DELIVERY_TIME_SLOT,
  formatCharacterCount,
  formatDeliverySummaryLine,
  NEXT_DAY_DELIVERY_HINT,
  OPTIONAL_SUFFIX,
  PREFERRED_DELIVERY_DATE,
  SPECIAL_INSTRUCTIONS_LABEL,
  SPECIAL_INSTRUCTIONS_PLACEHOLDER,
  TIME_SLOT_AFTERNOON,
  TIME_SLOT_AFTERNOON_RANGE,
  TIME_SLOT_EVENING,
  TIME_SLOT_EVENING_RANGE,
  TIME_SLOT_MORNING,
  TIME_SLOT_MORNING_RANGE,
} from '../constants/Constants';
import {
  actionBlueBgColor,
  actionBlueColor,
  actionLavenderBgColor,
  actionLavenderColor,
  actionTealBgColor,
  actionTealColor,
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
  justifyContentSpaceBetween,
  flexWrap,
} = BaseStyle;

const MAX_INSTRUCTIONS_LENGTH = 250;
const CHECKOUT_STEP = 1;

const DeliveryDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [addressList, setAddressList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [timeSlotList, setTimeSlotList] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [selectedDateId, setSelectedDateId] = useState('');
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState('morning');
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    setAddressList([
      {
        id: '1',
        title: 'Corporate Office',
        badges: [{ label: BADGE_REGISTERED, type: 'registered' }],
        address:
          'Tower A, 5th Floor, Embassy Tech Village, Outer Ring Road, Bangalore, Karnataka - 560103',
      },
      {
        id: '2',
        title: 'Main Warehouse',
        badges: [
          { label: BADGE_SHIPPING, type: 'shipping' },
          { label: BADGE_DEFAULT, type: 'default' },
        ],
        address:
          'Plot 23, KIADB Industrial Area, Bommasandra, Bangalore, Karnataka - 560099',
      },
      {
        id: '3',
        title: 'Branch Office - Mumbai',
        badges: [{ label: BADGE_REGISTERED, type: 'registered' }],
        address: 'Unit 402, Andheri East, Mumbai, Maharashtra - 400069',
      },
    ]);

    setDateList([
      { id: '1', dayLabel: 'Mon', dateLabel: 'Apr 20', fullLabel: 'Mon, Apr 20' },
      { id: '2', dayLabel: 'Tue', dateLabel: 'Apr 21', fullLabel: 'Tue, Apr 21' },
      { id: '3', dayLabel: 'Wed', dateLabel: 'Apr 22', fullLabel: 'Wed, Apr 22' },
      { id: '4', dayLabel: 'Thu', dateLabel: 'Apr 23', fullLabel: 'Thu, Apr 23' },
      { id: '5', dayLabel: 'Fri', dateLabel: 'Apr 24', fullLabel: 'Fri, Apr 24' },
      { id: '6', dayLabel: 'Sat', dateLabel: 'Apr 25', fullLabel: 'Sat, Apr 25' },
    ]);

    setTimeSlotList([
      { id: 'morning', label: TIME_SLOT_MORNING, timeRange: TIME_SLOT_MORNING_RANGE },
      { id: 'afternoon', label: TIME_SLOT_AFTERNOON, timeRange: TIME_SLOT_AFTERNOON_RANGE },
      { id: 'evening', label: TIME_SLOT_EVENING, timeRange: TIME_SLOT_EVENING_RANGE },
    ]);

    setSelectedAddressId('2');
    setSelectedDateId('3');
  }, []);

  const selectedAddress = useMemo(
    () => addressList.find(item => item.id === selectedAddressId),
    [addressList, selectedAddressId],
  );

  const selectedDate = useMemo(
    () => dateList.find(item => item.id === selectedDateId),
    [dateList, selectedDateId],
  );

  const selectedTimeSlot = useMemo(
    () => timeSlotList.find(item => item.id === selectedTimeSlotId),
    [timeSlotList, selectedTimeSlotId],
  );

  const deliverySummaryLine = useMemo(() => {
    if (!selectedDate || !selectedTimeSlot) {
      return '';
    }
    return formatDeliverySummaryLine(selectedDate.fullLabel, selectedTimeSlot.label);
  }, [selectedDate, selectedTimeSlot]);

  const handleInstructionsChange = value => {
    if (value.length <= MAX_INSTRUCTIONS_LENGTH) {
      setSpecialInstructions(value);
    }
  };

  const getBadgeStyle = type => {
    if (type === 'default') {
      return { bg: actionTealBgColor, text: actionTealColor };
    }
    return { bg: actionLavenderBgColor, text: actionLavenderColor };
  };

  const handleContinue = () => {
    navigation.navigate(ROUTE_REVIEW_ORDER, {
      ...route.params,
      delivery: {
        address: selectedAddress,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        specialInstructions: specialInstructions.trim(),
      },
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
            <Text style={styles.backText}>{BACK_TO_CART}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{DELIVERY_DETAILS_TITLE}</Text>
          <Text style={styles.subtitle}>{DELIVERY_DETAILS_SUBTITLE}</Text>
          <CheckoutProgressBar currentStep={CHECKOUT_STEP} />

          <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter, styles.sectionHeader]}>
            <Text style={styles.sectionTitle}>{DELIVERY_ADDRESS}</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.addNewText}>{ADD_NEW_ADDRESS}</Text>
            </TouchableOpacity>
          </View>

          {addressList.map(address => {
            const isSelected = selectedAddressId === address.id;
            return (
              <TouchableOpacity
                key={address.id}
                style={[styles.addressCard, isSelected && styles.cardSelected]}
                onPress={() => setSelectedAddressId(address.id)}
                activeOpacity={0.7}>
                <View style={[flexDirectionRow, styles.addressTopRow]}>
                  <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                    {isSelected ? <View style={styles.radioInner} /> : null}
                  </View>
                  <View style={styles.addressContent}>
                    <View style={[flexDirectionRow, alignItemsCenter, flexWrap]}>
                      <Text style={styles.addressTitle}>{address.title}</Text>
                      {address.badges.map(badge => {
                        const badgeStyle = getBadgeStyle(badge.type);
                        return (
                          <View
                            key={badge.label}
                            style={[styles.badge, { backgroundColor: badgeStyle.bg }]}>
                            <Text style={[styles.badgeText, { color: badgeStyle.text }]}>
                              {badge.label}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                    <Text style={styles.addressText}>{address.address}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          <Text style={[styles.sectionTitle, styles.sectionSpacing]}>{PREFERRED_DELIVERY_DATE}</Text>
          <View style={styles.dateGrid}>
            {dateList.map(dateItem => {
              const isSelected = selectedDateId === dateItem.id;
              return (
                <TouchableOpacity
                  key={dateItem.id}
                  style={[styles.dateCard, isSelected && styles.cardSelected]}
                  onPress={() => setSelectedDateId(dateItem.id)}
                  activeOpacity={0.7}>
                  <Text style={styles.dateDay}>{dateItem.dayLabel}</Text>
                  <Text style={styles.dateValue}>{dateItem.dateLabel}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={[flexDirectionRow, alignItemsCenter, styles.infoBox]}>
            <Icon name="lightbulb-outline" size={20} color={actionBlueColor} />
            <Text style={styles.infoText}>{NEXT_DAY_DELIVERY_HINT}</Text>
          </View>

          <Text style={[styles.sectionTitle, styles.sectionSpacing]}>{DELIVERY_TIME_SLOT}</Text>
          <View style={[flexDirectionRow, styles.timeSlotRow]}>
            {timeSlotList.map(slot => {
              const isSelected = selectedTimeSlotId === slot.id;
              return (
                <TouchableOpacity
                  key={slot.id}
                  style={[styles.timeSlotCard, isSelected && styles.cardSelected]}
                  onPress={() => setSelectedTimeSlotId(slot.id)}
                  activeOpacity={0.7}>
                  <Text style={styles.timeSlotLabel}>{slot.label}</Text>
                  <Text style={styles.timeSlotRange}>{slot.timeRange}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.sectionTitle, styles.sectionSpacing]}>
            {SPECIAL_INSTRUCTIONS_LABEL}{' '}
            <Text style={styles.optionalText}>{OPTIONAL_SUFFIX}</Text>
          </Text>
          <TextInput
            style={styles.instructionsInput}
            placeholder={SPECIAL_INSTRUCTIONS_PLACEHOLDER}
            placeholderTextColor={placeholderColor}
            value={specialInstructions}
            onChangeText={handleInstructionsChange}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>
            {formatCharacterCount(specialInstructions.length, MAX_INSTRUCTIONS_LENGTH)}
          </Text>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>{DELIVERY_SUMMARY}</Text>
            <View style={[flexDirectionRow, alignItemsCenter, styles.summaryContent]}>
              <Icon name="map-marker" size={20} color={primaryColor} />
              <View style={styles.summaryTextCol}>
                <Text style={styles.summaryTitle}>{selectedAddress?.title ?? ''}</Text>
                <Text style={styles.summaryMeta}>{deliverySummaryLine}</Text>
              </View>
            </View>
          </View>
          <CustomButton title={CONTINUE_TO_PAYMENT} onPress={handleContinue} style={styles.continueButton} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryDetailsScreen;

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
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  subtitle: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginBottom: spacings.large,
  },
  sectionHeader: {
    marginBottom: spacings.large,
  },
  sectionTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  sectionSpacing: {
    marginTop: spacings.xxLarge,
    marginBottom: spacings.large,
  },
  addNewText: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: primaryColor,
  },
  addressCard: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.normal,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  cardSelected: {
    borderColor: primaryColor,
    borderWidth: 1.5,
  },
  addressTopRow: {
    alignItems: 'flex-start',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: inputBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacings.large,
    marginTop: spacings.xsmall,
  },
  radioOuterSelected: {
    borderColor: primaryColor,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: primaryColor,
  },
  addressContent: {
    flex: 1,
  },
  addressTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginRight: spacings.small,
    marginBottom: spacings.small,
  },
  badge: {
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
    marginRight: spacings.small,
    marginBottom: spacings.small,
  },
  badgeText: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightMedium,
  },
  addressText: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    lineHeight: 20,
  },
  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacings.large,
  },
  dateCard: {
    width: '31%',
    backgroundColor: whiteColor,
    borderRadius: 12,
    paddingVertical: spacings.large,
    alignItems: 'center',
    marginBottom: spacings.normal,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  dateDay: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  dateValue: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  infoBox: {
    backgroundColor: actionBlueBgColor,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: actionBlueColor,
    padding: spacings.large,
    marginBottom: spacings.large,
  },
  infoText: {
    ...style.fontSizeNormal,
    color: actionBlueColor,
    flex: 1,
    marginLeft: spacings.normal,
    lineHeight: 20,
  },
  timeSlotRow: {
    gap: spacings.small,
    marginBottom: spacings.large,
  },
  timeSlotCard: {
    flex: 1,
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  timeSlotLabel: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  timeSlotRange: {
    ...style.fontSizeSmall1x,
    color: textSecondaryColor,
    textAlign: 'center',
  },
  optionalText: {
    ...style.fontWeightThin,
    color: textSecondaryColor,
  },
  instructionsInput: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: inputBorderColor,
    padding: spacings.large,
    minHeight: 120,
    ...style.fontSizeNormal2x,
    color: blackColor,
  },
  charCount: {
    ...style.fontSizeSmall1x,
    color: textSecondaryColor,
    textAlign: 'right',
    marginTop: spacings.small,
    marginBottom: spacings.large,
  },
  footer: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.large,
    paddingBottom: spacings.xxLarge,
    backgroundColor: whiteColor,
    borderTopWidth: 1,
    borderTopColor: inputBorderColor,
  },
  summaryBox: {
    backgroundColor: backgroundBeigeColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.large,
  },
  summaryLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.normal,
  },
  summaryContent: {
    gap: spacings.normal,
  },
  summaryTextCol: {
    flex: 1,
  },
  summaryTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  summaryMeta: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  continueButton: {
    borderRadius: 12,
  },
});
