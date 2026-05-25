import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  blackColor,
  inputBorderColor,
  placeholderColor,
  primaryColor,
  redColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';
import { heightPercentageToDP } from '../utils';

const { width100Percent, positionRelative } = BaseStyle;

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect,
  spellCheck,
  textContentType,
  autoComplete,
  required = false,
  error = '',
  multiline = false,
  numberOfLines = 1,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const hasError = Boolean(error);
  const isPasswordField = secureTextEntry;
  const isEmailInput = keyboardType === 'email-address';

  const handleChangeText = text => {
    if (!onChangeText) return;
    onChangeText(isEmailInput ? text.toLowerCase() : text);
  };

  return (
    <View style={[styles.container, { marginBottom: heightPercentageToDP(2.5) }]}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <View style={[positionRelative, width100Percent]}>
        <TextInput
          style={[
            styles.input,
            isPasswordField && styles.inputWithIcon,
            multiline && styles.inputMultiline,
            hasError && styles.inputError,
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={isPasswordField && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={isEmailInput ? 'none' : autoCapitalize}
          autoCorrect={isEmailInput ? false : autoCorrect}
          spellCheck={isEmailInput ? false : spellCheck}
          textContentType={isEmailInput ? 'emailAddress' : textContentType}
          autoComplete={isEmailInput ? 'email' : autoComplete}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
        {isPasswordField ? (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setIsPasswordVisible(prev => !prev)}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Icon
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={textSecondaryColor}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {hasError ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacings.large,
  },
  label: {
    ...style.fontSizeExtraSmall,
    ...style.fontWeightMedium,
    color: textSecondaryColor,
    letterSpacing: 1,
    marginBottom: spacings.small,
    textTransform: 'uppercase',
  },
  required: {
    color: primaryColor,
    ...style.fontWeightMedium1x,
  },
  input: {
    ...width100Percent,
    backgroundColor: whiteColor,
    borderColor: inputBorderColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: spacings.large,
    ...style.fontSizeNormal2x,
    color: blackColor,
  },
  inputWithIcon: {
    paddingRight: spacings.ExtraLarge2x,
  },
  inputMultiline: {
    minHeight: 120,
    paddingTop: spacings.large,
  },
  inputError: {
    borderColor: redColor,
  },
  eyeButton: {
    position: 'absolute',
    right: spacings.large,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  errorText: {
    ...style.fontSizeSmall1x,
    color: redColor,
    marginTop: spacings.xsmall,
  },
});
