import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  blackColor,
  inputBorderColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, alignItemsCenter, justifyContentSpaceBetween } = BaseStyle;

const AccountCard = ({
  initial,
  avatarColor,
  name,
  role,
  employees,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={[flexDirectionRow, alignItemsCenter, styles.cardContent]}>
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.businessName}>{name}</Text>
          <Text style={styles.details}>
            {role} • {employees}
          </Text>
        </View>
        <Icon name="chevron-right" size={24} color={inputBorderColor} />
      </View>
    </TouchableOpacity>
  );
};

export default AccountCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    marginBottom: spacings.large,
    shadowColor: blackColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    padding: spacings.large,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacings.large,
  },
  avatarText: {
    ...style.fontSizeLargeX,
    ...style.fontWeightMedium1x,
    color: whiteColor,
  },
  textContainer: {
    flex: 1,
    marginRight: spacings.small,
  },
  businessName: {
    ...style.fontSizeMedium1x,
    ...style.fontWeightThin,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  details: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
});
