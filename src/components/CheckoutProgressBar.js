import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CHECKOUT_STEPS } from '../constants/Constants';
import { inputBorderColor, primaryColor } from '../constants/Color';
import { spacings } from '../constants/Fonts';

const CheckoutProgressBar = ({ currentStep }) => {
  return (
    <View style={styles.row}>
      {Array.from({ length: CHECKOUT_STEPS }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        return (
          <View
            key={stepNumber}
            style={[styles.segment, isActive ? styles.segmentActive : styles.segmentInactive]}
          />
        );
      })}
    </View>
  );
};

export default CheckoutProgressBar;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacings.small,
    marginBottom: spacings.xxLarge,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  segmentActive: {
    backgroundColor: primaryColor,
  },
  segmentInactive: {
    backgroundColor: inputBorderColor,
  },
});
