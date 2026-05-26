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
import ConfirmModal from '../components/Modal/ConfirmModal';
import ProfileAddressCard from '../components/ProfileAddressCard';
import ProfileContactCard from '../components/ProfileContactCard';
import ProfileDetailCard from '../components/ProfileDetailCard';
import SegmentedTabs from '../components/SegmentedTabs';
import { ROUTE_LOGIN } from '../navigation/AppNavigator';
import {
  ACCOUNT_INFORMATION,
  ACCOUNT_MANAGER_LABEL,
  BACK_TO_DASHBOARD,
  BILLING_ADDRESS,
  CIN_LABEL,
  COMPANY_DETAILS,
  COMPANY_PROFILE_TITLE,
  CREDIT_LIMIT_PROFILE_LABEL,
  EMPLOYEES_LABEL,
  GST_LABEL,
  INCORPORATION_LABEL,
  INDUSTRY_LABEL,
  LOGOUT,
  LOGOUT_CONFIRM_MESSAGE,
  LOGOUT_CONFIRM_TITLE,
  NOTIFICATION_SETTINGS,
  PAN_LABEL,
  PAYMENT_TERMS_LABEL,
  REGISTERED_ADDRESS,
  REGISTRATION_TAX,
  REVENUE_LABEL,
  SHIPPING_ADDRESS,
  TAB_ADDRESSES,
  TAB_COMPANY,
  TAB_CONTACTS,
} from '../constants/Constants';
import {
  actionBlueBgColor,
  actionBlueColor,
  backgroundBeigeColor,
  blackColor,
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
} = BaseStyle;

const TAB_COMPANY_ID = 'company';
const TAB_CONTACTS_ID = 'contacts';
const TAB_ADDRESSES_ID = 'addresses';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const account = route.params?.account;

  const [activeTab, setActiveTab] = useState(TAB_COMPANY_ID);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyDetailSections, setCompanyDetailSections] = useState([]);
  const [contactsList, setContactsList] = useState([]);
  const [addressesList, setAddressesList] = useState([]);

  const handleLogoutPress = () => setShowLogoutModal(true);

  const handleLogoutCancel = () => setShowLogoutModal(false);

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTE_LOGIN }],
    });
  };

  useEffect(() => {
    // TODO: replace with API response
    setCompanyName(account?.companyLegalName ?? 'Meridian Technologies Pvt. Ltd.');

    setCompanyDetailSections([
      {
        id: '1',
        title: COMPANY_DETAILS,
        fields: [
          { label: INDUSTRY_LABEL, value: 'Information Technology' },
          { label: EMPLOYEES_LABEL, value: '247' },
          { label: INCORPORATION_LABEL, value: '2018-03-15' },
          { label: REVENUE_LABEL, value: '$12.5M' },
        ],
      },
      {
        id: '2',
        title: REGISTRATION_TAX,
        fields: [
          { label: CIN_LABEL, value: 'U74999MH2018PTC308642', fullWidth: true },
          { label: PAN_LABEL, value: 'AAMCM1234F' },
          { label: GST_LABEL, value: '27AAMCM1234F1Z5' },
        ],
      },
      {
        id: '3',
        title: ACCOUNT_INFORMATION,
        fields: [
          { label: CREDIT_LIMIT_PROFILE_LABEL, value: '$250,000' },
          { label: PAYMENT_TERMS_LABEL, value: 'Net 30' },
          { label: ACCOUNT_MANAGER_LABEL, value: 'Sarah Chen', fullWidth: true },
        ],
      },
    ]);

    setContactsList([
      {
        id: '1',
        initials: 'RK',
        name: 'Rajesh Kumar',
        role: 'Chief Procurement Officer',
        department: 'Procurement',
        email: 'rajesh.kumar@meridiantech.com',
        phone: '+91 98765 43210',
      },
      {
        id: '2',
        initials: 'SP',
        name: 'Sneha Patel',
        role: 'Finance Manager',
        department: 'Finance',
        email: 'sneha.patel@meridiantech.com',
        phone: '+91 98765 43211',
      },
      {
        id: '3',
        initials: 'AM',
        name: 'Amit Mehta',
        role: 'Operations Head',
        department: 'Operations',
        email: 'amit.mehta@meridiantech.com',
        phone: '+91 98765 43212',
      },
    ]);

    setAddressesList([
      {
        id: '1',
        title: REGISTERED_ADDRESS,
        addressLines:
          'Tower A, 5th Floor, Tech Park, Hiranandani Business Park\nMumbai, Maharashtra 400076\nIndia',
      },
      {
        id: '2',
        title: BILLING_ADDRESS,
        addressLines:
          'Tower A, 5th Floor, Tech Park, Hiranandani Business Park\nMumbai, Maharashtra 400076\nIndia',
      },
      {
        id: '3',
        title: SHIPPING_ADDRESS,
        addressLines:
          'Warehouse 12, Logistics Hub, MIDC Industrial Area\nPune, Maharashtra 411019\nIndia',
      },
    ]);
  }, [account]);

  const renderTabContent = () => {
    if (activeTab === TAB_COMPANY_ID) {
      return companyDetailSections.map(section => (
        <ProfileDetailCard key={section.id} title={section.title} fields={section.fields} />
      ));
    }

    if (activeTab === TAB_CONTACTS_ID) {
      return contactsList.map(contact => (
        <ProfileContactCard
          key={contact.id}
          initials={contact.initials}
          name={contact.name}
          role={contact.role}
          department={contact.department}
          email={contact.email}
          phone={contact.phone}
        />
      ));
    }

    return addressesList.map(address => (
      <ProfileAddressCard
        key={address.id}
        title={address.title}
        addressLines={address.addressLines}
      />
    ));
  };

  return (
    <SafeAreaView style={[flex, styles.safeArea]}>
      <View
        style={[
          flexDirectionRow,
          alignItemsCenter,
          justifyContentSpaceBetween,
          styles.headerRow,
        ]}>
        <TouchableOpacity
          style={[flexDirectionRow, alignItemsCenter, styles.backButton]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <Icon name="chevron-left" size={24} color={textSecondaryColor} />
          <Text style={styles.backText}>{BACK_TO_DASHBOARD}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[flexDirectionRow, alignItemsCenter, styles.logoutButton]}
          onPress={handleLogoutPress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={LOGOUT}>
          <Icon name="logout-variant" size={20} color={primaryColor} />
          <Text style={styles.logoutText}>{LOGOUT}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{COMPANY_PROFILE_TITLE}</Text>
        <Text style={styles.subtitle}>{companyName}</Text>

        <SegmentedTabs
          tabs={[
            { id: TAB_COMPANY_ID, label: TAB_COMPANY },
            { id: TAB_CONTACTS_ID, label: TAB_CONTACTS },
            { id: TAB_ADDRESSES_ID, label: TAB_ADDRESSES },
          ]}
          activeId={activeTab}
          onChange={setActiveTab}
        />

        {/* <TouchableOpacity
          style={[flexDirectionRow, alignItemsCenter, justifyContentSpaceBetween, styles.notificationBar]}
          activeOpacity={0.7}>
          <View style={[flexDirectionRow, alignItemsCenter]}>
            <View style={styles.notificationIconWrap}>
              <Icon name="bell-outline" size={20} color={actionBlueColor} />
            </View>
            <Text style={styles.notificationText}>{NOTIFICATION_SETTINGS}</Text>
          </View>
          <Icon name="chevron-right" size={24} color={textSecondaryColor} />
        </TouchableOpacity> */}

        <View style={styles.contentArea}>{renderTabContent()}</View>
      </ScrollView>

      <ConfirmModal
        visible={showLogoutModal}
        variant="logout"
        title={LOGOUT_CONFIRM_TITLE}
        message={LOGOUT_CONFIRM_MESSAGE}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: backgroundBeigeColor,
    flex: 1,
  },
  headerRow: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.large,
    marginBottom: spacings.xxLarge,
  },
  scrollContent: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingBottom: spacings.ExtraLarge,
  },
  backButton: {
    flex: 1,
    marginRight: spacings.large,
  },
  logoutButton: {
    height: 40,
    paddingHorizontal: spacings.large,
    borderRadius: 10,
    backgroundColor: whiteColor,
    borderWidth: 1,
    borderColor: inputBorderColor,
    flexShrink: 0,
  },
  logoutText: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: primaryColor,
    marginLeft: spacings.small,
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
  notificationBar: {
    backgroundColor: actionBlueBgColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.xxLarge,
  },
  notificationIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacings.normal,
  },
  notificationText: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  contentArea: {
    marginTop: spacings.small,
  },
});
