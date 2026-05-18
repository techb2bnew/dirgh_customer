import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  blackColor,
  inputBorderColor,
  primaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { width100Percent, borderRadius8, borderWidth1, alignItemsCenter } = BaseStyle;

const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style: containerStyle,
  textStyle,
  children,
  activeOpacity = 0.85,
}) => {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary && styles.primaryButton,
        isOutline && styles.outlineButton,
        isDisabled && styles.disabled,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={activeOpacity}>
      {loading ? (
        <ActivityIndicator color={isPrimary ? whiteColor : primaryColor} />
      ) : (
        children ?? (
          <Text
            style={[
              styles.text,
              isPrimary && styles.primaryText,
              isOutline && styles.outlineText,
              textStyle,
            ]}>
            {title}
          </Text>
        )
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    ...width100Percent,
    ...alignItemsCenter,
    ...borderRadius8,
    paddingVertical: spacings.large,
  },
  primaryButton: {
    backgroundColor: primaryColor,
    shadowColor: primaryColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  outlineButton: {
    backgroundColor: whiteColor,
    ...borderWidth1,
    borderColor: inputBorderColor,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...style.fontSizeMedium1x,
    ...style.fontWeightMedium1x,
  },
  primaryText: {
    color: whiteColor,
  },
  outlineText: {
    color: blackColor,
  },
});
