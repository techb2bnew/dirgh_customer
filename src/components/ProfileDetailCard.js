import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { blackColor, inputBorderColor, textSecondaryColor, whiteColor } from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, flexWrap } = BaseStyle;

const ProfileDetailCard = ({ title, fields }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={[flexDirectionRow, flexWrap, styles.fieldsWrap]}>
        {fields.map((field, index) => (
          <View
            key={`${field.label}-${index}`}
            style={[styles.fieldItem, field.fullWidth && styles.fieldFullWidth]}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <Text style={styles.fieldValue}>{field.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProfileDetailCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: whiteColor,
    borderRadius: 10,
    padding: spacings.xLarge,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  title: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.xLarge,
  },
  fieldsWrap: {
    justifyContent: 'space-between',
  },
  fieldItem: {
    width: '48%',
    marginBottom: spacings.xLarge,
  },
  fieldFullWidth: {
    width: '100%',
  },
  fieldLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.small,
  },
  fieldValue: {
    ...style.fontSizeNormal,
    color: blackColor,
  },
});
