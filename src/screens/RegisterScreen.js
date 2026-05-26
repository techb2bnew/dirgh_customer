import React, { useCallback, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import SuccessModal from '../components/Modal/SuccessModal';
import {
  ADDRESS_LABEL,
  ADDRESS_MIN_LENGTH,
  ADDRESS_PLACEHOLDER,
  ADDRESS_REQUIRED,
  ALREADY_HAVE_ACCOUNT,
  BACK,
  COMPANY_NAME_LABEL,
  COMPANY_NAME_MIN_LENGTH,
  COMPANY_NAME_PLACEHOLDER,
  COMPANY_NAME_REQUIRED,
  CONFIRM_PASSWORD_LABEL,
  CONFIRM_PASSWORD_REQUIRED,
  CONTACT_NAME_LABEL,
  CONTACT_NAME_MIN_LENGTH,
  CONTACT_NAME_PLACEHOLDER,
  CONTACT_NAME_REQUIRED,
  EMAIL_INVALID,
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  EMAIL_REQUIRED,
  PASSWORD_LABEL,
  PASSWORD_MIN_LENGTH,
  PASSWORD_PLACEHOLDER,
  PASSWORD_REQUIRED,
  PASSWORDS_DO_NOT_MATCH,
  PHONE_INVALID,
  PHONE_LABEL,
  PHONE_PLACEHOLDER,
  PHONE_REQUIRED,
  REGISTER,
  REGISTER_SUBTITLE,
  REGISTER_SUCCESS_MESSAGE,
  REGISTER_SUCCESS_TITLE,
  REGISTER_TITLE,
  SIGN_IN_LINK,
  TERMS_ACCEPT,
  TERMS_REQUIRED,
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
import { ROUTE_LOGIN } from '../navigation/AppNavigator';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';

const {
  flex,
  flexDirectionRow,
  alignItemsCenter,
  alignJustifyCenter,
  textAlign,
} = BaseStyle;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const MIN_NAME_LENGTH = 2;
const MIN_ADDRESS_LENGTH = 10;
const MIN_PHONE_DIGITS = 10;
const MAX_PHONE_DIGITS = 15;

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

const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword.trim()) {
    return CONFIRM_PASSWORD_REQUIRED;
  }
  if (password !== confirmPassword) {
    return PASSWORDS_DO_NOT_MATCH;
  }
  return '';
};

const validateCompanyName = value => {
  const trimmed = value.trim();
  if (!trimmed) {
    return COMPANY_NAME_REQUIRED;
  }
  if (trimmed.length < MIN_NAME_LENGTH) {
    return COMPANY_NAME_MIN_LENGTH;
  }
  return '';
};

const validateContactName = value => {
  const trimmed = value.trim();
  if (!trimmed) {
    return CONTACT_NAME_REQUIRED;
  }
  if (trimmed.length < MIN_NAME_LENGTH) {
    return CONTACT_NAME_MIN_LENGTH;
  }
  return '';
};

const validateAddress = value => {
  const trimmed = value.trim();
  if (!trimmed) {
    return ADDRESS_REQUIRED;
  }
  if (trimmed.length < MIN_ADDRESS_LENGTH) {
    return ADDRESS_MIN_LENGTH;
  }
  return '';
};

const validatePhone = value => {
  const digits = value.replace(/\D/g, '');
  if (!value.trim()) {
    return PHONE_REQUIRED;
  }
  if (digits.length < MIN_PHONE_DIGITS || digits.length > MAX_PHONE_DIGITS) {
    return PHONE_INVALID;
  }
  return '';
};

const validateTerms = accepted => {
  if (!accepted) {
    return TERMS_REQUIRED;
  }
  return '';
};

const EMPTY_ERRORS = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  address: '',
  password: '',
  confirmPassword: '',
  terms: '',
};

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const resetForm = useCallback(() => {
    setCompanyName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setPassword('');
    setConfirmPassword('');
    setTermsAccepted(false);
    setErrors(EMPTY_ERRORS);
    setIsLoading(false);
    setShowSuccessModal(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      resetForm();
    }, [resetForm]),
  );

  const clearFieldError = field => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTermsToggle = () => {
    setTermsAccepted(prev => {
      const next = !prev;
      if (next && errors.terms) {
        setErrors(prevErrors => ({ ...prevErrors, terms: '' }));
      }
      return next;
    });
  };

  const handleRegister = async () => {
    const nextErrors = {
      companyName: validateCompanyName(companyName),
      contactName: validateContactName(contactName),
      email: validateEmail(email),
      phone: validatePhone(phone),
      address: validateAddress(address),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
      terms: validateTerms(termsAccepted),
    };

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: API register business account
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowSuccessModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessOk = () => {
    setShowSuccessModal(false);
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTE_LOGIN }],
    });
  };

  return (
    <>
      <SafeAreaView style={[flex, styles.safeArea]} edges={['top', 'left', 'right']}>
        <ScrollView
          style={flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={[flexDirectionRow, alignItemsCenter, styles.backButton]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Icon name="chevron-left" size={28} color={textSecondaryColor} />
            <Text style={styles.backText}>{BACK}</Text>
          </TouchableOpacity>

          <View style={[alignJustifyCenter, styles.logoBox]}>
            <Icon name="domain" size={28} color={whiteColor} />
          </View>

          <Text style={styles.title}>{REGISTER_TITLE}</Text>
          <Text style={styles.subtitle}>{REGISTER_SUBTITLE}</Text>

          <CustomInput
            label={COMPANY_NAME_LABEL}
            placeholder={COMPANY_NAME_PLACEHOLDER}
            value={companyName}
            onChangeText={value => {
              setCompanyName(value);
              clearFieldError('companyName');
            }}
            autoCapitalize="words"
            required
            error={errors.companyName}
          />

          <CustomInput
            label={CONTACT_NAME_LABEL}
            placeholder={CONTACT_NAME_PLACEHOLDER}
            value={contactName}
            onChangeText={value => {
              setContactName(value);
              clearFieldError('contactName');
            }}
            autoCapitalize="words"
            required
            error={errors.contactName}
          />

          <CustomInput
            label={EMAIL_LABEL}
            placeholder={EMAIL_PLACEHOLDER}
            value={email}
            onChangeText={value => {
              setEmail(value);
              clearFieldError('email');
            }}
            keyboardType="email-address"
            required
            error={errors.email}
          />

          <CustomInput
            label={PHONE_LABEL}
            placeholder={PHONE_PLACEHOLDER}
            value={phone}
            onChangeText={value => {
              setPhone(value);
              clearFieldError('phone');
            }}
            keyboardType="phone-pad"
            required
            error={errors.phone}
          />

          <CustomInput
            label={ADDRESS_LABEL}
            placeholder={ADDRESS_PLACEHOLDER}
            value={address}
            onChangeText={value => {
              setAddress(value);
              clearFieldError('address');
            }}
            multiline
            numberOfLines={4}
            autoCapitalize="sentences"
            required
            error={errors.address}
          />

          <CustomInput
            label={PASSWORD_LABEL}
            placeholder={PASSWORD_PLACEHOLDER}
            value={password}
            onChangeText={value => {
              setPassword(value);
              clearFieldError('password');
              if (errors.confirmPassword && confirmPassword) {
                clearFieldError('confirmPassword');
              }
            }}
            secureTextEntry
            required
            error={errors.password}
          />

          <CustomInput
            label={CONFIRM_PASSWORD_LABEL}
            placeholder={PASSWORD_PLACEHOLDER}
            value={confirmPassword}
            onChangeText={value => {
              setConfirmPassword(value);
              clearFieldError('confirmPassword');
            }}
            secureTextEntry
            required
            error={errors.confirmPassword}
          />

          <View style={styles.termsSection}>
            <Pressable
              style={[flexDirectionRow, alignItemsCenter, styles.termsRow]}
              onPress={handleTermsToggle}>
              <Icon
                name={termsAccepted ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={22}
                color={
                  termsAccepted ? primaryColor : errors.terms ? redColor : textSecondaryColor
                }
              />
              <Text style={styles.termsText}>{TERMS_ACCEPT}</Text>
            </Pressable>
            {errors.terms ? <Text style={styles.termsError}>{errors.terms}</Text> : null}
          </View>

          <CustomButton
            title={REGISTER}
            onPress={handleRegister}
            loading={isLoading}
            style={styles.registerButton}
          />

          <Text style={[styles.footerText, textAlign]}>
            {ALREADY_HAVE_ACCOUNT}{' '}
            <Text style={styles.footerLink} onPress={() => navigation.goBack()}>
              {SIGN_IN_LINK}
            </Text>
          </Text>
        </ScrollView>
      </SafeAreaView>

      <SuccessModal
        visible={showSuccessModal}
        title={REGISTER_SUCCESS_TITLE}
        message={REGISTER_SUCCESS_MESSAGE}
        onOk={handleSuccessOk}
      />
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: backgroundBeigeColor,
    flex: 1,
    width: wp(100),
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.large,
    paddingBottom: spacings.xxLarge,
  },
  backButton: {
    marginTop: Platform.OS === 'android' ? spacings.large : spacings.small,
    marginBottom: spacings.large,
  },
  backText: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
    marginLeft: spacings.xsmall,
  },
  logoBox: {
    width: hp(8),
    height: hp(8),
    backgroundColor: primaryColor,
    borderRadius: 14,
    marginBottom: spacings.xxLarge,
    alignSelf: 'center',
  },
  title: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: blackColor,
    marginBottom: spacings.normal,
  },
  subtitle: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
    marginBottom: spacings.ExtraLarge,
    lineHeight: 22,
  },
  termsSection: {
    width: '100%',
    marginBottom: spacings.large,
  },
  termsRow: {
    alignItems: 'flex-start',
  },
  termsText: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginLeft: spacings.small,
    flex: 1,
    lineHeight: 20,
  },
  termsError: {
    ...style.fontSizeSmall1x,
    color: redColor,
    marginTop: spacings.xsmall,
    marginLeft: spacings.xxLarge,
  },
  registerButton: {
    marginBottom: spacings.xxLarge,
  },
  footerText: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  footerLink: {
    color: primaryColor,
    ...style.fontWeightMedium,
    fontWeight: style.fontWeightThin1x.fontWeight,
  },
});
