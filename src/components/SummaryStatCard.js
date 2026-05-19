import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { VIEW_ALL } from '../constants/Constants';
import { blackColor, primaryColor, textSecondaryColor, whiteColor } from '../constants/Color';
import { style, spacings } from '../constants/Fonts';

const SummaryStatCard = ({ label, value, onPress, showViewAll = false }) => {
  const content = (
    <>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {showViewAll && onPress ? <Text style={styles.viewAll}>{VIEW_ALL}</Text> : null}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.card}>{content}</View>;
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
  viewAll: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightThin,
    color: primaryColor,
    marginTop: spacings.small,
  },
});
