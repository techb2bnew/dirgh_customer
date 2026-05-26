import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Platform,
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
import OTPTextView from 'react-native-otp-textinput';
import {
  BACK,
  CONFIRM_PASSWORD_LABEL,
  CONFIRM_PASSWORD_REQUIRED,
  CONTINUE,
  EMAIL_INVALID,
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  EMAIL_REQUIRED,
  FORGOT_PASSWORD_STEP1_SUBTITLE,
  FORGOT_PASSWORD_STEP2_SUBTITLE,
  FORGOT_PASSWORD_STEP3_SUBTITLE,
  FORGOT_PASSWORD_TITLE,
  FORGOT_SUCCESS_MESSAGE,
  FORGOT_SUCCESS_TITLE,
  NEW_PASSWORD_LABEL,
  NEXT,
  OTP_INVALID,
  OTP_LABEL,
  OTP_REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_PLACEHOLDER,
  PASSWORD_REQUIRED,
  PASSWORDS_DO_NOT_MATCH,
  RESEND_OTP,
  RESEND_OTP_IN,
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
  width100Percent,
  alignJustifyCenter,
} = BaseStyle;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

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

const validateOtp = value => {
  if (!value.trim()) {
    return OTP_REQUIRED;
  }
  if (value.length !== OTP_LENGTH) {
    return OTP_INVALID;
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

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const otpInputRef = useRef(null);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [resendTimer, setResendTimer] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = useCallback(() => {
    setStep(1);
    setEmail('');
    setOtp('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    setResendTimer(0);
    setShowSuccessModal(false);
    setIsLoading(false);
    otpInputRef.current?.clear();
  }, []);

  useFocusEffect(
    useCallback(() => {
      resetForm();
    }, [resetForm]),
  );

  useEffect(() => {
    if (resendTimer <= 0) {
      return undefined;
    }
    const timerId = setInterval(() => {
      setResendTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerId);
  }, [resendTimer]);

  const handleEmailChange = value => {
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleOtpChange = value => {
    setOtp(value);
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: '' }));
    }
  };

  const handlePasswordChange = value => {
    setPassword(value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleConfirmPasswordChange = value => {
    setConfirmPassword(value);
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) {
      return;
    }
    // TODO: API resend OTP
    otpInputRef.current?.clear();
    setOtp('');
    setErrors(prev => ({ ...prev, otp: '' }));
    setResendTimer(RESEND_SECONDS);
  };

  const handleStep1Next = async () => {
    const emailError = validateEmail(email);
    setErrors({ email: emailError });
    if (emailError) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: API send OTP to email
      await new Promise(resolve => setTimeout(resolve, 800));
      setStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Next = async () => {
    const otpError = validateOtp(otp);
    setErrors({ otp: otpError });
    if (otpError) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: API verify OTP
      await new Promise(resolve => setTimeout(resolve, 800));
      setStep(3);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep3Continue = async () => {
    const passwordError = validatePassword(password);
    let confirmPasswordError = '';

    if (!confirmPassword.trim()) {
      confirmPasswordError = CONFIRM_PASSWORD_REQUIRED;
    } else if (password !== confirmPassword) {
      confirmPasswordError = PASSWORDS_DO_NOT_MATCH;
    }

    setErrors({
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (passwordError || confirmPasswordError) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: API reset password
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

  const renderStep1 = () => (
    <>
      <CustomInput
        label={EMAIL_LABEL}
        placeholder={EMAIL_PLACEHOLDER}
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        required
        error={errors.email}
      />
      <CustomButton
        title={NEXT}
        onPress={handleStep1Next}
        loading={isLoading}
        style={styles.primaryButton}
      />
    </>
  );

  const renderStep2 = () => (
    <>
      <View style={styles.otpSection}>
        <Text style={styles.otpLabel}>
          {OTP_LABEL}
          <Text style={styles.required}> *</Text>
        </Text>
        <OTPTextView
          ref={otpInputRef}
          inputCount={OTP_LENGTH}
          defaultValue={otp}
          handleTextChange={handleOtpChange}
          keyboardType="number-pad"
          autoFocus
          tintColor={errors.otp ? redColor : primaryColor}
          offTintColor={errors.otp ? redColor : inputBorderColor}
          containerStyle={styles.otpContainer}
          textInputStyle={styles.otpInput}
        />
        {errors.otp ? <Text style={styles.otpError}>{errors.otp}</Text> : null}
      </View>
      <TouchableOpacity
        onPress={handleResendOtp}
        disabled={resendTimer > 0}
        activeOpacity={0.7}
        style={styles.resendWrap}>
        {resendTimer > 0 ? (
          <Text style={styles.resendTimerText}>
            {RESEND_OTP_IN} {resendTimer}s
          </Text>
        ) : (
          <Text style={styles.resendText}>{RESEND_OTP}</Text>
        )}
      </TouchableOpacity>
      <CustomButton
        title={NEXT}
        onPress={handleStep2Next}
        loading={isLoading}
        style={styles.primaryButton}
      />
    </>
  );

  const renderStep3 = () => (
    <>
      <CustomInput
        label={NEW_PASSWORD_LABEL}
        placeholder={PASSWORD_PLACEHOLDER}
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        required
        error={errors.password}
      />
      <CustomInput
        label={CONFIRM_PASSWORD_LABEL}
        placeholder={PASSWORD_PLACEHOLDER}
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        secureTextEntry
        required
        error={errors.confirmPassword}
      />
      <CustomButton
        title={CONTINUE}
        onPress={handleStep3Continue}
        loading={isLoading}
        style={styles.primaryButton}
      />
    </>
  );

  const renderSubtitle = () => {
    if (step === 1) {
      return <Text style={styles.subtitle}>{FORGOT_PASSWORD_STEP1_SUBTITLE}</Text>;
    }
    if (step === 2) {
      return (
        <Text style={styles.subtitle}>
          {FORGOT_PASSWORD_STEP2_SUBTITLE}
          {'\n'}
          <Text style={styles.subtitleEmail}>{email}</Text>
        </Text>
      );
    }
    return <Text style={styles.subtitle}>{FORGOT_PASSWORD_STEP3_SUBTITLE}</Text>;
  };

  return (
    <>
      <SafeAreaView style={[flex, styles.safeArea]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={[flexDirectionRow, alignItemsCenter, styles.backButton]}
            onPress={() => (step > 1 ? setStep(step - 1) : navigation.goBack())}
            activeOpacity={0.7}>
            <Icon name="chevron-left" size={28} color={textSecondaryColor} />
            <Text style={styles.backText}>{BACK}</Text>
          </TouchableOpacity>
          <View style={[{ height: hp(75) }, alignJustifyCenter]}>
            <View style={[alignJustifyCenter, styles.logoBox]}>
              <Icon name="square-outline" size={28} color={whiteColor} />
            </View>

            <Text style={styles.title}>{FORGOT_PASSWORD_TITLE}</Text>
            {renderSubtitle()}

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </View>
        </ScrollView>
      </SafeAreaView>

      <SuccessModal
        visible={showSuccessModal}
        title={FORGOT_SUCCESS_TITLE}
        message={FORGOT_SUCCESS_MESSAGE}
        onOk={handleSuccessOk}
      />
    </>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: backgroundBeigeColor,
    height: hp(100),
    width: wp(100),
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacings.xxxxLarge,
    paddingVertical: spacings.large,
  },
  backButton: {
    marginTop: Platform.OS === "android" ? spacings.large : spacings.small,
    marginBottom: spacings.large,
  },
  backText: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
    marginLeft: spacings.xsmall,
  },
  logoBox: {
    width: hp(10),
    height: hp(10),
    backgroundColor: primaryColor,
    borderRadius: 14,
    alignSelf: 'center',
    marginBottom: spacings.xxLarge,
  },
  title: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: blackColor,
    marginBottom: spacings.normal,
    // fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  subtitle: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
    marginBottom: spacings.ExtraLarge,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: spacings.small,
  },
  subtitleEmail: {
    ...style.fontWeightMedium1x,
    color: blackColor,
    marginTop: spacings.small,
  },
  resendWrap: {
    alignSelf: 'flex-end',
    marginBottom: spacings.xxLarge,
    marginTop: spacings.xsmall,
  },
  resendText: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: primaryColor,
  },
  resendTimerText: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  primaryButton: {
    marginTop: spacings.large,
  },
  otpSection: {
    ...width100Percent,
    marginBottom: spacings.large,
  },
  otpLabel: {
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
  otpContainer: {
    ...width100Percent,
  },
  otpInput: {
    width: 46,
    height: 52,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    backgroundColor: whiteColor,
    marginHorizontal: spacings.xsmall,
    ...style.fontSizeLargeX,
    ...style.fontWeightMedium1x,
    color: blackColor,
  },
  otpError: {
    ...style.fontSizeSmall1x,
    color: redColor,
    marginTop: spacings.xsmall,
  },
});
