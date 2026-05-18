import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_HOME } from '../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountCard from '../components/AccountCard';
import {
  ADD_NEW_ACCOUNT,
  BACK,
  SELECT_ACCOUNT_SUBTITLE,
  SELECT_ACCOUNT_TITLE,
} from '../constants/Constants';
import {
  accountAvatarBlueColor,
  accountAvatarBrownColor,
  accountAvatarPurpleColor,
  backgroundBeigeColor,
  blackColor,
  inputBorderColor,
  primaryColor,
  textSecondaryColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';

const {
  flex,
  flexDirectionRow,
  alignItemsCenter,
  width100Percent,
  alignJustifyCenter
} = BaseStyle;

const SelectAccountScreen = () => {
  const navigation = useNavigation();
  const [accountsList, setAccountsList] = useState([]);

  useEffect(() => {
    // TODO: replace with API response
    setAccountsList([
      {
        id: '1',
        initial: 'M',
        name: 'Meridian Technologies',
        role: 'Owner',
        employees: '247 employees',
        avatarColor: primaryColor,
        accountId: '291847',
        balanceAmount: '$98,200.00',
        balancePercent: '+8.2%',
        credit: '$40K',
        outstanding: '$22K',
      },
      {
        id: '2',
        initial: 'V',
        name: 'Vertex Solutions Inc.',
        role: 'Admin',
        employees: '89 employees',
        avatarColor: accountAvatarBlueColor,
        accountId: '563921',
        balanceAmount: '$54,800.00',
        balancePercent: '+5.1%',
        credit: '$25K',
        outstanding: '$12K',
      },
      {
        id: '3',
        initial: 'A',
        name: 'Atlas Consulting Group',
        role: 'Manager',
        employees: '156 employees',
        avatarColor: accountAvatarPurpleColor,
        accountId: '718204',
        balanceAmount: '$76,350.00',
        balancePercent: '+9.8%',
        credit: '$35K',
        outstanding: '$18K',
      },
      {
        id: '4',
        initial: 'Q',
        name: 'Quantum Industries',
        role: 'Member',
        employees: '1,203 employees',
        avatarColor: accountAvatarBrownColor,
        accountId: '847392',
        balanceAmount: '$127,450.00',
        balancePercent: '+12.5%',
        credit: '$50K',
        outstanding: '$32K',
      },
    ]);
  }, []);

  const handleAccountPress = account => {
    navigation.navigate(ROUTE_HOME, { account });
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
          <Icon name="chevron-left" size={28} color={textSecondaryColor} />
          <Text style={styles.backText}>{BACK}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{SELECT_ACCOUNT_TITLE}</Text>
        <Text style={styles.subtitle}>{SELECT_ACCOUNT_SUBTITLE}</Text>

        <View style={styles.accountList}>
          {accountsList.map(account => (
            <AccountCard
              key={account.id}
              initial={account.initial}
              avatarColor={account.avatarColor}
              name={account.name}
              role={account.role}
              employees={account.employees}
            onPress={() => handleAccountPress(account)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.separator} />
        <TouchableOpacity
          style={[flexDirectionRow, alignItemsCenter, styles.addAccountButton]}
          activeOpacity={0.7}
          onPress={() => { }}>
          <Icon name="plus" size={22} color={textSecondaryColor} />
          <Text style={styles.addAccountText}>{ADD_NEW_ACCOUNT}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectAccountScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: backgroundBeigeColor,
    height: hp(100),
    width: wp(100),
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacings.xxxxLarge,
    paddingVertical: spacings.xLarge,
  },
  footer: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingBottom: spacings.large,
    backgroundColor: backgroundBeigeColor,
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
    marginBottom: spacings.normal,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  subtitle: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
    marginBottom: spacings.xxxxLarge,
  },
  accountList: {
    ...width100Percent,
  },
  separator: {
    ...width100Percent,
    height: 1,
    backgroundColor: inputBorderColor,
    marginBottom: spacings.large,
  },
  addAccountButton: {
    alignSelf: 'center',
    paddingVertical: spacings.normal,
  },
  addAccountText: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
    marginLeft: spacings.small,
  },
});
