import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  accountAvatarBlueColor,
  actionPurpleColor,
  blackColor,
  inputBorderColor,
  priorityLowBgColor,
  priorityLowTextColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, alignItemsCenter } = BaseStyle;

const ProfileContactCard = ({
  initials,
  name,
  role,
  department,
  email,
  phone,
}) => {
  return (
    <View style={styles.card}>
      <View style={[flexDirectionRow, styles.topRow]}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        <View style={styles.infoWrap}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{role}</Text>
          <View style={styles.departmentBadge}>
            <Text style={styles.departmentText}>{department}</Text>
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={[flexDirectionRow, alignItemsCenter, styles.contactRow]}>
        <Icon name="email-outline" size={18} color={textSecondaryColor} />
        <Text style={styles.contactText}>{email}</Text>
      </View>
      <View style={[flexDirectionRow, alignItemsCenter, styles.contactRow]}>
        <Icon name="phone-outline" size={18} color={textSecondaryColor} />
        <Text style={styles.contactText}>{phone}</Text>
      </View>
    </View>
  );
};

export default ProfileContactCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: whiteColor,
    borderRadius: 10,
    padding: spacings.xLarge,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  topRow: {
    marginBottom: spacings.large,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: accountAvatarBlueColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacings.large,
    borderWidth: 2,
    borderColor: actionPurpleColor,
  },
  initials: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: whiteColor,
  },
  infoWrap: {
    flex: 1,
  },
  name: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  role: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginBottom: spacings.normal,
  },
  departmentBadge: {
    alignSelf: 'flex-start',
    backgroundColor: priorityLowBgColor,
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
  },
  departmentText: {
    ...style.fontSizeSmall1x,
    color: priorityLowTextColor,
  },
  divider: {
    height: 1,
    backgroundColor: inputBorderColor,
    marginBottom: spacings.large,
  },
  contactRow: {
    marginBottom: spacings.normal,
  },
  contactText: {
    ...style.fontSizeNormal,
    color: blackColor,
    marginLeft: spacings.normal,
    flex: 1,
  },
});
