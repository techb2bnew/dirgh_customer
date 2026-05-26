import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../CustomButton';
import {
  ADD_ADDRESS_SUBTITLE,
  ADD_ADDRESS_TITLE,
  ADDRESS_NAME_LABEL,
  ADDRESS_NAME_PLACEHOLDER,
  ADDRESS_NAME_REQUIRED,
  ADDRESS_TYPE_LABEL,
  ADDRESS_TYPE_REQUIRED,
  ADDRESS_TYPE_SHIPPING,
  ADDRESS_TYPE_WAREHOUSE,
  BADGE_DEFAULT,
  BADGE_SHIPPING,
  BADGE_WAREHOUSE,
  CANCEL,
  CITY_LABEL,
  CITY_PLACEHOLDER,
  CITY_REQUIRED,
  formatDeliveryAddressLine2,
  PINCODE_INVALID,
  PINCODE_LABEL,
  PINCODE_PLACEHOLDER,
  PINCODE_REQUIRED,
  SAVE_ADDRESS,
  SECTION_ADDRESS_DETAILS,
  SECTION_LOCATION,
  SET_DEFAULT_ADDRESS,
  STATE_LABEL,
  STATE_PLACEHOLDER,
  STATE_REQUIRED,
  STREET_ADDRESS_LABEL,
  STREET_ADDRESS_PLACEHOLDER,
  STREET_ADDRESS_REQUIRED,
} from '../../constants/Constants';
import {
  backgroundBeigeColor,
  blackColor,
  blackOpacity7,
  inputBorderColor,
  placeholderColor,
  primaryColor,
  redColor,
  textSecondaryColor,
  whiteColor,
} from '../../constants/Color';
import { BaseStyle } from '../../constants/Style';
import { style, spacings } from '../../constants/Fonts';

const { flexDirectionRow, alignItemsCenter, justifyContentSpaceBetween } = BaseStyle;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const PAD = spacings.xxxxLarge;
const SCROLL_MAX = SCREEN_HEIGHT * 0.52;

const EMPTY_FORM = {
  addressName: '',
  street: '',
  city: '',
  state: '',
  pincode: '',
  addressType: ADDRESS_TYPE_SHIPPING,
  isDefault: false,
};

const Field = ({
  label,
  required,
  placeholder,
  value,
  onChangeText,
  error,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  style: fieldStyle,
}) => (
  <View style={[styles.field, fieldStyle]}>
    <Text style={styles.label}>
      {label}
      {required ? <Text style={styles.asterisk}> *</Text> : null}
    </Text>
    <TextInput
      style={[styles.input, multiline && styles.inputMulti, error && styles.inputErr]}
      placeholder={placeholder}
      placeholderTextColor={placeholderColor}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
      numberOfLines={multiline ? 3 : 1}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
    {error ? <Text style={styles.errText}>{error}</Text> : null}
  </View>
);

const AddAddressModal = ({ visible, onClose, onSave }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!visible) {
      setForm(EMPTY_FORM);
      setErrors({});
    }
  }, [visible]);

  const set = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.addressName.trim()) e.addressName = ADDRESS_NAME_REQUIRED;
    if (!form.street.trim()) e.street = STREET_ADDRESS_REQUIRED;
    if (!form.city.trim()) e.city = CITY_REQUIRED;
    if (!form.state.trim()) e.state = STATE_REQUIRED;
    const pin = form.pincode.trim();
    if (!pin) e.pincode = PINCODE_REQUIRED;
    else if (!/^\d{6}$/.test(pin)) e.pincode = PINCODE_INVALID;
    if (!form.addressType) e.addressType = ADDRESS_TYPE_REQUIRED;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = () => {
    if (!validate()) return;
    const typeBadge =
      form.addressType === ADDRESS_TYPE_WAREHOUSE
        ? { label: BADGE_WAREHOUSE, type: ADDRESS_TYPE_WAREHOUSE }
        : { label: BADGE_SHIPPING, type: ADDRESS_TYPE_SHIPPING };
    const badges = [typeBadge];
    if (form.isDefault) badges.push({ label: BADGE_DEFAULT, type: 'default' });
    onSave({
      id: String(Date.now()),
      title: form.addressName.trim(),
      badges,
      address: `${form.street.trim()}\n${formatDeliveryAddressLine2(
        form.city.trim(),
        form.state.trim(),
        form.pincode.trim(),
      )}`,
      isDefault: form.isDefault,
    });
  };

  const types = [
    { id: ADDRESS_TYPE_SHIPPING, label: BADGE_SHIPPING },
    { id: ADDRESS_TYPE_WAREHOUSE, label: BADGE_WAREHOUSE },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
       
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.kav}
          pointerEvents="box-none">
          <SafeAreaView edges={['bottom']} style={styles.safe}>
            <View style={styles.sheet}>
              <View style={styles.grab} />

              <View style={[styles.head, flexDirectionRow, alignItemsCenter]}>
                <View style={styles.headText}>
                  <Text style={styles.headTitle}>{ADD_ADDRESS_TITLE}</Text>
                  <Text style={styles.headSub}>{ADD_ADDRESS_SUBTITLE}</Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.headClose} activeOpacity={0.7}>
                  <Icon name="close" size={18} color={textSecondaryColor} />
                </TouchableOpacity>
              </View>

              <ScrollView
                style={{ maxHeight: SCROLL_MAX }}
                contentContainerStyle={styles.body}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                {/* <Text style={styles.secTitle}>{SECTION_ADDRESS_DETAILS}</Text> */}
                <Field
                  label={ADDRESS_NAME_LABEL}
                  required
                  placeholder={ADDRESS_NAME_PLACEHOLDER}
                  value={form.addressName}
                  onChangeText={v => set('addressName', v)}
                  error={errors.addressName}
                />
                <Field
                  label={STREET_ADDRESS_LABEL}
                  required
                  placeholder={STREET_ADDRESS_PLACEHOLDER}
                  value={form.street}
                  onChangeText={v => set('street', v)}
                  error={errors.street}
                  // multiline
                />

                {/* <Text style={[styles.secTitle, styles.secGap]}>{SECTION_LOCATION}</Text> */}
                <View style={styles.row2}>
                  <Field
                    label={CITY_LABEL}
                    required
                    placeholder={CITY_PLACEHOLDER}
                    value={form.city}
                    onChangeText={v => set('city', v)}
                    error={errors.city}
                    style={styles.colCity}
                  />
                  <Field
                    label={PINCODE_LABEL}
                    required
                    placeholder={PINCODE_PLACEHOLDER}
                    value={form.pincode}
                    onChangeText={v => set('pincode', v.replace(/\D/g, '').slice(0, 6))}
                    error={errors.pincode}
                    keyboardType="number-pad"
                    style={styles.colPin}
                  />
                </View>
                <Field
                  label={STATE_LABEL}
                  required
                  placeholder={STATE_PLACEHOLDER}
                  value={form.state}
                  onChangeText={v => set('state', v)}
                  error={errors.state}
                  autoCapitalize="words"
                />

                <Text style={[styles.secTitle, styles.secGap]}>{ADDRESS_TYPE_LABEL}</Text>
                <View style={[flexDirectionRow, justifyContentSpaceBetween, styles.typeRow]}>
                  {types.map(({ id, label }) => {
                    const on = form.addressType === id;
                    return (
                      <TouchableOpacity
                        key={id}
                        activeOpacity={0.7}
                        onPress={() => set('addressType', id)}
                        style={[styles.pick, on && styles.pickOn]}>
                        <View style={[styles.radio, on && styles.radioOn]}>
                          {on ? <View style={styles.radioDot} /> : null}
                        </View>
                        <Text style={[styles.pickLabel, on && styles.pickLabelOn]}>{label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {errors.addressType ? <Text style={styles.errText}>{errors.addressType}</Text> : null}

                <TouchableOpacity
                  style={styles.checkRow}
                  activeOpacity={0.7}
                  onPress={() => set('isDefault', !form.isDefault)}>
                  <View style={[styles.check, form.isDefault && styles.checkOn]}>
                    {form.isDefault ? <Icon name="check" size={12} color={whiteColor} /> : null}
                  </View>
                  <Text style={styles.checkLabel}>{SET_DEFAULT_ADDRESS}</Text>
                </TouchableOpacity>
              </ScrollView>

              <View style={styles.foot}>
                <CustomButton title={CANCEL} variant="outline" onPress={onClose} style={styles.footBtn} />
                <CustomButton title={SAVE_ADDRESS} onPress={save} style={styles.footBtn} />
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default AddAddressModal;

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end',backgroundColor: 'rgba(64, 59, 59, 0.47)' },
  dim: { backgroundColor: 'rgba(64, 59, 59, 0.47)', ...StyleSheet.absoluteFillObject },
  kav: { width: '100%' },
  safe: { width: '100%' },
  sheet: {
    backgroundColor: backgroundBeigeColor,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  grab: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: inputBorderColor,
    marginTop: spacings.small,
    marginBottom: spacings.small,
  },
  head: {
    paddingHorizontal: PAD,
    paddingBottom: spacings.large,
    backgroundColor: backgroundBeigeColor,
    borderBottomWidth: 1,
    borderBottomColor: inputBorderColor,
    marginBottom: spacings.large,
  },
  headText: { flex: 1, paddingRight: spacings.normal },
  headTitle: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: blackColor,
    marginBottom: spacings.xsmall,
    // fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  headSub: { ...style.fontSizeNormal, color: textSecondaryColor, lineHeight: 20 },
  headClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  body: { paddingHorizontal: PAD, paddingBottom: spacings.large },
  secTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.large,
  },
  secGap: { marginTop: spacings.xxLarge },
  field: { marginBottom: spacings.large },
  label: {
    ...style.fontSizeNormal,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.small,
  },
  asterisk: { color: primaryColor },
  input: {
    backgroundColor: whiteColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: inputBorderColor,
    paddingHorizontal: spacings.large,
    paddingVertical: Platform.OS === 'ios' ? 11 : 9,
    minHeight: 46,
    ...style.fontSizeNormal2x,
    color: blackColor,
  },
  inputMulti: { minHeight: 80, paddingTop: 11, lineHeight: 20 },
  inputErr: { borderColor: redColor },
  errText: { ...style.fontSizeSmall1x, color: redColor, marginTop: spacings.xsmall },
  row2: { flexDirection: 'row', gap: spacings.normal },
  colCity: { flex: 1.5 },
  colPin: { flex: 1, minWidth: 96 },
  typeRow: {
    marginBottom: spacings.normal,
    gap: spacings.normal,
  },
  pick: {
    flex: 1,
    ...flexDirectionRow,
    backgroundColor: whiteColor,
    borderRadius: 12,
    padding: spacings.large,
    borderWidth: 1,
    borderColor: inputBorderColor,
  },
  pickOn: { borderColor: primaryColor, borderWidth: 1.5 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: inputBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacings.large,
  },
  radioOn: { borderColor: primaryColor },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: primaryColor },
  pickLabel: { ...style.fontSizeNormal2x, ...style.fontWeightMedium, color: blackColor },
  pickLabelOn: { color: primaryColor },
  checkRow: { ...flexDirectionRow, alignItemsCenter, marginTop: spacings.small },
  check: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: inputBorderColor,
    backgroundColor: whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacings.normal,
  },
  checkOn: { backgroundColor: primaryColor, borderColor: primaryColor },
  checkLabel: { ...style.fontSizeNormal, color: blackColor, flex: 1 },
  foot: {
    ...flexDirectionRow,
    gap: spacings.normal,
    paddingHorizontal: PAD,
    paddingTop: spacings.large,
    paddingBottom: spacings.large,
    backgroundColor: whiteColor,
    borderTopWidth: 1,
    borderTopColor: inputBorderColor,
  },
  footBtn: { flex: 1 },
});
