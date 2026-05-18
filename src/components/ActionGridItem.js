import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { blackColor, inputBorderColor, whiteColor } from '../constants/Color';
import { style, spacings } from '../constants/Fonts';
import { heightPercentageToDP as hp } from '../utils';

const ActionGridItem = ({ label, icon, iconColor, iconBgColor, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconWrap, { backgroundColor: iconBgColor }]}>
        <Icon name={icon} size={15} color={iconColor} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ActionGridItem;

const styles = StyleSheet.create({
  card: {
    width: '48.5%',
    minHeight: hp(9),
    backgroundColor: whiteColor,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: inputBorderColor,
    padding: spacings.large,
    marginBottom: spacings.large,
    justifyContent: 'space-between',
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  label: {
    ...style.fontSizeNormal,
    ...style.fontWeightThin,
    color: blackColor,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
    marginTop: spacings.normal,
  },
});
