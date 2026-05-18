import React from 'react';
import { StyleSheet, View } from 'react-native';
import { actionTealColor, verylightGrayColor } from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { spacings } from '../constants/Fonts';

const { flexDirectionRow, width100Percent } = BaseStyle;

const PaymentStepIndicator = ({ currentStep, totalSteps = 3 }) => {
  return (
    <View style={[flexDirectionRow, styles.container]}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;

        return (
          <View
            key={stepNumber}
            style={[
              styles.segment,
              index < totalSteps - 1 && styles.segmentGap,
              { backgroundColor: isActive ? actionTealColor : verylightGrayColor },
            ]}
          />
        );
      })}
    </View>
  );
};

export default PaymentStepIndicator;

const styles = StyleSheet.create({
  container: {
    ...width100Percent,
    marginBottom: spacings.xxLarge,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  segmentGap: {
    marginRight: spacings.small,
  },
});
