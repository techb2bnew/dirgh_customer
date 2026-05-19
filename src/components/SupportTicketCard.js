import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ASSIGNED_TO_LABEL, LAST_UPDATE_LABEL } from '../constants/Constants';
import {
  actionLavenderBgColor,
  actionLavenderColor,
  blackColor,
  inputBorderColor,
  priorityHighTextColor,
  priorityLowBgColor,
  priorityLowTextColor,
  productCategoryBgColor,
  productCategoryTextColor,
  statusProcessingBgColor,
  statusProcessingTextColor,
  statusUnpaidBgColor,
  statusUnpaidTextColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter } = BaseStyle;

const STATUS_STYLES = {
  Open: { bg: statusUnpaidBgColor, text: statusUnpaidTextColor },
  'In Progress': { bg: statusProcessingBgColor, text: statusProcessingTextColor },
  Resolved: { bg: actionLavenderBgColor, text: actionLavenderColor },
  Closed: { bg: priorityLowBgColor, text: priorityLowTextColor },
};

const PRIORITY_STYLES = {
  High: { color: priorityHighTextColor },
  Medium: { color: statusUnpaidTextColor },
  Low: { color: priorityLowTextColor },
};

const SupportTicketCard = ({
  ticketId,
  subject,
  status,
  category,
  priority,
  lastUpdate,
  assignedTo,
}) => {
  const statusStyle = STATUS_STYLES[status] ?? STATUS_STYLES.Open;
  const priorityStyle = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.Low;

  return (
    <View style={styles.card}>
      <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter]}>
        <Text style={styles.ticketId}>{ticketId}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.statusText, { color: statusStyle.text }]}>{status}</Text>
        </View>
      </View>
      <Text style={styles.subject}>{subject}</Text>
      <View style={[flexDirectionRow, alignItemsCenter, styles.tagsRow]}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        <View style={[flexDirectionRow, alignItemsCenter, styles.priorityWrap]}>
          <Icon name="alert" size={14} color={priorityStyle.color} />
          <Text style={[styles.priorityText, { color: priorityStyle.color }]}>{priority}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={[flexDirectionRow, justifyContentSpaceBetween]}>
        <View>
          <Text style={styles.metaLabel}>{LAST_UPDATE_LABEL}</Text>
          <Text style={styles.metaValue}>{lastUpdate}</Text>
        </View>
        <View style={styles.assignedCol}>
          <Text style={styles.metaLabel}>{ASSIGNED_TO_LABEL}</Text>
          <Text style={styles.metaValue}>{assignedTo}</Text>
        </View>
      </View>
    </View>
  );
};

export default SupportTicketCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: whiteColor,
    borderRadius: 10,
    padding: spacings.xLarge,
    marginBottom: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  ticketId: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: blackColor,
  },
  statusBadge: {
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
  },
  statusText: {
    ...style.fontSizeSmall,
    ...style.fontWeightMedium,
  },
  subject: {
    ...style.fontSizeNormal,
    color: blackColor,
    marginVertical: spacings.large,
  },
  tagsRow: {
    marginBottom: spacings.large,
  },
  categoryBadge: {
    backgroundColor: productCategoryBgColor,
    paddingHorizontal: spacings.normal,
    paddingVertical: spacings.xsmall,
    borderRadius: 20,
    marginRight: spacings.normal,
  },
  categoryText: {
    ...style.fontSizeSmall1x,
    color: productCategoryTextColor,
  },
  priorityWrap: {
    gap: spacings.xsmall,
  },
  priorityText: {
    ...style.fontSizeSmall1x,
    ...style.fontWeightMedium,
    marginLeft: spacings.xsmall,
  },
  divider: {
    height: 1,
    backgroundColor: inputBorderColor,
    marginBottom: spacings.large,
  },
  metaLabel: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 0.5,
    marginBottom: spacings.small,
  },
  metaValue: {
    ...style.fontSizeSmall2x,
    color: blackColor,
  },
  assignedCol: {
    alignItems: 'flex-end',
  },
});
