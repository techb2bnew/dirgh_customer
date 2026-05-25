import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ROUTE_FORGOT_PASSWORD, ROUTE_SELECT_ACCOUNT } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import ContactSalesModal from '../components/Modal/ContactSalesModal';
import {
  CONTACT_SALES,
  EMAIL_INVALID,
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  EMAIL_REQUIRED,
  FORGOT_PASSWORD,
  NO_ACCOUNT,
  OR_CONTINUE_WITH,
  PASSWORD_LABEL,
  PASSWORD_MIN_LENGTH,
  PASSWORD_PLACEHOLDER,
  PASSWORD_REQUIRED,
  REMEMBER_ME,
  REMEMBER_ME_REQUIRED,
  SIGN_IN,
  WELCOME_SUBTITLE,
  WELCOME_TITLE,
} from '../constants/Constants';
import {
  backgroundBeigeColor,
  blackColor,
  inputBorderColor,
  primaryColor,
  redColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';

const {
  flex,
  alignItemsCenter,
  flexDirectionRow,
  justifyContentSpaceBetween,
  width100Percent,
  alignJustifyCenter,
  justifyContentCenter,
  textAlign
} = BaseStyle;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

const validateEmail = value => {
  const trimmed = value.trim();
  if (!trimmed) {
    return EMAIL_REQUIRED;
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return EMAIL_INVALID;
  }
  return '';
};

const validatePassword = value => {
  if (!value.trim()) {
    return PASSWORD_REQUIRED;
  }
  if (value.length < MIN_PASSWORD_LENGTH) {
    return PASSWORD_MIN_LENGTH;
  }
  return '';
};

const validateRememberMe = checked => {
  if (!checked) {
    return REMEMBER_ME_REQUIRED;
  }
  return '';
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', rememberMe: '' });
  const [showContactSalesModal, setShowContactSalesModal] = useState(false);

  const handleEmailChange = value => {
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = value => {
    setPassword(value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleRememberMeToggle = () => {
    setRememberMe(prev => {
      const next = !prev;
      if (next && errors.rememberMe) {
        setErrors(prevErrors => ({ ...prevErrors, rememberMe: '' }));
      }
      return next;
    });
  };

  const handleSignIn = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const isCredentialsValid = !emailError && !passwordError;
    const rememberMeError = isCredentialsValid
      ? validateRememberMe(rememberMe)
      : '';

    setErrors({
      email: emailError,
      password: passwordError,
      rememberMe: rememberMeError,
    });

    if (isCredentialsValid && !rememberMeError) {
      navigation.navigate(ROUTE_SELECT_ACCOUNT);
    }
  };

  return (
    <>
      <SafeAreaView style={[flex, styles.safeArea]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={[justifyContentCenter, { height: hp(18) }]}>
            <View style={[alignJustifyCenter, styles.logoBox]}>
              <Icon name="square-outline" size={28} color={whiteColor} />
            </View>
          </View>
          <Text style={styles.title}>{WELCOME_TITLE}</Text>
          <Text style={styles.subtitle}>{WELCOME_SUBTITLE}</Text>

          <CustomInput
            label={EMAIL_LABEL}
            placeholder={EMAIL_PLACEHOLDER}
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            required
            error={errors.email}
          />

          <CustomInput
            label={PASSWORD_LABEL}
            placeholder={PASSWORD_PLACEHOLDER}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            required
            error={errors.password}
          />

          <View style={styles.rememberMeSection}>
            <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.optionsRow]}>
              <Pressable
                style={[flexDirectionRow, alignItemsCenter]}
                onPress={handleRememberMeToggle}>
                <Icon
                  name={rememberMe ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  size={22}
                  color={
                    rememberMe
                      ? primaryColor
                      : errors.rememberMe
                        ? redColor
                        : textSecondaryColor
                  }
                />
                <Text style={styles.rememberMeText}>
                  {REMEMBER_ME}
                  {/* <Text style={styles.required}> *</Text> */}
                </Text>
              </Pressable>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate(ROUTE_FORGOT_PASSWORD)}>
                <Text style={styles.forgotText}>{FORGOT_PASSWORD}</Text>
              </TouchableOpacity>
            </View>
            {errors.rememberMe ? (
              <Text style={styles.rememberMeError}>{errors.rememberMe}</Text>
            ) : null}
          </View>

          <CustomButton
            title={SIGN_IN}
            onPress={handleSignIn}
            style={styles.signInButton}
          />

          <View style={[flexDirectionRow, alignItemsCenter, styles.dividerRow]}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{OR_CONTINUE_WITH}</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.socialRow]}>
            <CustomButton
              variant="outline"
              onPress={() => { }}
              style={styles.socialButton}
              activeOpacity={0.7}>
              <FontAwesome name="google" size={22} color={blackColor} />
            </CustomButton>
            <CustomButton
              variant="outline"
              onPress={() => { }}
              style={styles.socialButton}
              activeOpacity={0.7}>
              <Icon name="apple" size={26} color={blackColor} />
            </CustomButton>
          </View>

          <Text style={[styles.footerText, textAlign]}>
            {NO_ACCOUNT}{' '}
            <Text
              style={styles.footerLink}
              onPress={() => setShowContactSalesModal(true)}>
              {CONTACT_SALES}
            </Text>
          </Text>
        </ScrollView>
      </SafeAreaView>

      <ContactSalesModal
        visible={showContactSalesModal}
        onClose={() => setShowContactSalesModal(false)}
      />
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: backgroundBeigeColor,
    height: hp(100),
    width: wp(100)
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacings.xxxxLarge,
    paddingVertical: spacings.large,
  },
  logoBox: {
    width: hp(10),
    height: hp(10),
    backgroundColor: primaryColor,
    borderRadius: 14,
    marginBottom: spacings.xxLarge,
  },
  title: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: blackColor,
    marginBottom: spacings.normal,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  subtitle: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
    marginBottom: spacings.ExtraLarge,
  },
  rememberMeSection: {
    ...width100Percent,
    marginBottom: spacings.large,
  },
  optionsRow: {
    ...width100Percent,
  },
  rememberMeText: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginLeft: spacings.small,
  },
  required: {
    color: primaryColor,
    ...style.fontWeightMedium1x,
  },
  rememberMeError: {
    ...style.fontSizeSmall1x,
    color: redColor,
    marginTop: spacings.xsmall,
    marginLeft: spacings.xxLarge,
  },
  forgotText: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: primaryColor,
  },
  signInButton: {
    marginVertical: spacings.xxLarge,
  },
  dividerRow: {
    ...width100Percent,
    marginVertical: spacings.xxLarge,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: inputBorderColor,
  },
  dividerText: {
    ...style.fontSizeExtraSmall,
    color: textSecondaryColor,
    letterSpacing: 1,
    marginHorizontal: spacings.normal,
    textTransform: 'uppercase',
  },
  socialRow: {
    ...width100Percent,
    marginVertical: spacings.xxxxLarge,
    gap: spacings.large,
  },
  socialButton: {
    flex: 1,
  },
  footerText: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginTop: spacings.large
  },
  footerLink: {
    color: primaryColor,
    ...style.fontWeightMedium,
    fontWeight: style.fontWeightThin1x.fontWeight
  },
});
