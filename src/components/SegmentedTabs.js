import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { actionIconBgColor, blackColor, textSecondaryColor, whiteColor } from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flexDirectionRow, flex, alignItemsCenter, justifyContentCenter } = BaseStyle;

const SegmentedTabs = ({ tabs, activeId, onChange }) => {
  return (
    <View style={[flexDirectionRow, styles.container]}>
      {tabs.map(tab => {
        const isActive = tab.id === activeId;

        return (
          <TouchableOpacity
            key={tab.id}
            style={[flex, styles.tab, isActive && styles.tabActive]}
            onPress={() => onChange(tab.id)}
            activeOpacity={0.7}>
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SegmentedTabs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: actionIconBgColor,
    borderRadius: 10,
    padding: spacings.xsmall,
    marginBottom: spacings.xxLarge,
  },
  tab: {
    paddingVertical: spacings.large,
    borderRadius: 8,
    ...alignItemsCenter,
    ...justifyContentCenter,
  },
  tabActive: {
    backgroundColor: whiteColor,
    shadowColor: blackColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
  },
  tabTextActive: {
    ...style.fontWeightMedium,
    color: blackColor,
  },
});
