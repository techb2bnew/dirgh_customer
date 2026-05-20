import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatTrackingTimestamp } from '../constants/Constants';
import {
  actionBlueColor,
  blackColor,
  inputBorderColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { style, spacings } from '../constants/Fonts';

const TrackingTimelineItem = ({
  title,
  location,
  date,
  time,
  isCompleted,
  isLast = false,
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.timelineCol}>
        <View style={[styles.dot, isCompleted ? styles.dotCompleted : styles.dotPending]}>
          {isCompleted ? <Icon name="check" size={14} color={whiteColor} /> : null}
        </View>
        {!isLast ? <View style={styles.line} /> : null}
      </View>
      <View style={styles.contentCol}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.timestamp}>{formatTrackingTimestamp(date, time)}</Text>
      </View>
    </View>
  );
};

export default TrackingTimelineItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    minHeight: 72,
  },
  timelineCol: {
    width: 32,
    alignItems: 'center',
    marginRight: spacings.large,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCompleted: {
    backgroundColor: actionBlueColor,
  },
  dotPending: {
    backgroundColor: whiteColor,
    borderWidth: 2,
    borderColor: inputBorderColor,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: inputBorderColor,
    marginVertical: spacings.xsmall,
    minHeight: 40,
  },
  contentCol: {
    flex: 1,
    paddingBottom: spacings.xxLarge,
  },
  title: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  location: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginBottom: spacings.xsmall,
  },
  timestamp: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
});
