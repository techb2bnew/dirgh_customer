import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { blackColor, primaryColor, whiteColor } from '../constants/Color';
import { VIEW_ALL } from '../constants/Constants';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter, width100Percent } =
  BaseStyle;

const ListSectionCard = ({ title, children, onViewAll }) => {
  return (
    <View style={styles.card}>
      <View style={[flexDirectionRow, justifyContentSpaceBetween, alignItemsCenter, styles.header]}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
          <Text style={styles.viewAll}>{VIEW_ALL}</Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

export default ListSectionCard;

const styles = StyleSheet.create({
  card: {
    ...width100Percent,
    backgroundColor: whiteColor,
    borderRadius: 10,
    paddingHorizontal: spacings.large,
    paddingTop: spacings.large,
    paddingBottom: spacings.small,
    marginBottom: spacings.large,
  },
  header: {
    marginBottom: spacings.large,
  },
  title: {
    ...style.fontSizeMedium1x,
    ...style.fontWeightThin1x,
    color: blackColor,
  },
  viewAll: {
    ...style.fontSizeNormal,
    ...style.fontWeightThin,
    color: primaryColor,
  },
});
