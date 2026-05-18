import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  blackColor,
  inputBorderColor,
  primaryColor,
  priorityHighBgColor,
  priorityHighTextColor,
  priorityLowBgColor,
  priorityLowTextColor,
  statusResolvedTextColor,
  textSecondaryColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, justifyContentSpaceBetween } = BaseStyle;

const TicketListItem = ({ title, ticketId, status, priority, isLast = false }) => {
  const isHighPriority = priority === 'High';
  const isOpen = status === 'Open';

  return (
    <View style={[styles.container, !isLast && styles.borderBottom]}>
      <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.titleRow]}>
        <Text style={styles.title}>{title}</Text>
        <View
          style={[
            styles.priorityBadge,
            isHighPriority ? styles.highBadge : styles.lowBadge,
          ]}>
          <Text
            style={[
              styles.priorityText,
              isHighPriority ? styles.highText : styles.lowText,
            ]}>
            {priority}
          </Text>
        </View>
      </View>
      <Text style={styles.meta}>
        {ticketId} •{' '}
        <Text style={isOpen ? styles.openStatus : styles.resolvedStatus}>{status}</Text>
      </Text>
    </View>
  );
};

export default TicketListItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacings.large,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: inputBorderColor,
  },
  titleRow: {
    marginBottom: spacings.small,
  },
  title: {
    ...style.fontSizeNormal2x,
    color: blackColor,
    flex: 1,
    marginRight: spacings.normal,
  },
  priorityBadge: {
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
  },
  highBadge: {
    backgroundColor: priorityHighBgColor,
  },
  lowBadge: {
    backgroundColor: priorityLowBgColor,
  },
  priorityText: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightMedium,
  },
  highText: {
    color: priorityHighTextColor,
  },
  lowText: {
    color: priorityLowTextColor,
  },
  meta: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  openStatus: {
    color: primaryColor,
  },
  resolvedStatus: {
    color: statusResolvedTextColor,
  },
});
