import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  actionTealBgColor,
  actionTealColor,
  blackColor,
  inputBorderColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, alignItemsCenter } = BaseStyle;

const PaymentMethodCard = ({
  title,
  subtitle,
  icon,
  feeLabel,
  selected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onSelect}
      activeOpacity={0.7}>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>
      <View style={[styles.iconWrap, { backgroundColor: actionTealBgColor }]}>
        <Icon name={icon} size={20} color={actionTealColor} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {feeLabel ? <Text style={styles.feeLabel}>{feeLabel}</Text> : null}
    </TouchableOpacity>
  );
};

export default PaymentMethodCard;

const styles = StyleSheet.create({
  card: {
    ...flexDirectionRow,
    ...alignItemsCenter,
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  cardSelected: {
    borderColor: actionTealColor,
    borderWidth: 1.5,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: inputBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacings.normal,
  },
  radioSelected: {
    borderColor: actionTealColor,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: actionTealColor,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacings.normal,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  subtitle: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  feeLabel: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginLeft: spacings.small,
  },
});
