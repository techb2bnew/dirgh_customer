import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatCategoryItemCount } from '../constants/Constants';
import {
  actionIconBgColor,
  blackColor,
  inputBorderColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';
import { heightPercentageToDP } from '../utils';

const { flexDirectionRow, alignItemsCenter } = BaseStyle;

const CategoryCard = ({ name, itemCount, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconWrap}>
        <Icon name={icon} size={22} color={textSecondaryColor} />
      </View>

      <View style={[flexDirectionRow, alignItemsCenter, styles.bottomRow]}>
        <View style={styles.textCol}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.count}>{formatCategoryItemCount(itemCount)}</Text>
        </View>
        <Icon name="chevron-right" size={22} color={textSecondaryColor} />
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    marginBottom: spacings.xLarge,
    borderWidth: 1,
    borderColor: inputBorderColor,
    minHeight: heightPercentageToDP(18),
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: actionIconBgColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacings.large,
    alignSelf: 'flex-start',
  },
  bottomRow: {
    justifyContent: 'space-between',
    marginTop: spacings.large
  },
  textCol: {
    flex: 1,
    marginRight: spacings.small,
  },
  name: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.xsmall,
  },
  count: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
});
