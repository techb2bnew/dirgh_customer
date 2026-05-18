import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  actionBlueBgColor,
  actionBlueColor,
  blackColor,
  inputBorderColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { style, spacings } from '../constants/Fonts';

const ProfileAddressCard = ({ title, addressLines }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Icon name="map-marker-outline" size={22} color={actionBlueColor} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{addressLines}</Text>
      </View>
    </View>
  );
};

export default ProfileAddressCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: whiteColor,
    borderRadius: 10,
    padding: spacings.xLarge,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: actionBlueBgColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacings.large,
  },
  content: {
    flex: 1,
  },
  title: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.normal,
  },
  address: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    lineHeight: 22,
  },
});
