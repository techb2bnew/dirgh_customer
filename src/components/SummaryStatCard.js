import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { blackColor, textSecondaryColor, whiteColor } from '../constants/Color';
import { style, spacings } from '../constants/Fonts';

const SummaryStatCard = ({ label, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default SummaryStatCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: whiteColor,
    borderRadius: 10,
    padding: spacings.large,
  },
  label: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.small,
  },
  value: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightThin,
    color: blackColor,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
});
