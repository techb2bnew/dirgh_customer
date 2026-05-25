import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { pick, types, errorCodes, isErrorWithCode } from '@react-native-documents/picker';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import SupportTicketCard from '../components/SupportTicketCard';
import {
  ADD_ATTACHMENT,
  ATTACHMENT_PICK_FAILED,
  ATTACHMENTS_LABEL,
  BACK_TO_DASHBOARD,
  BACK_TO_SUPPORT,
  CATEGORY_LABEL,
  CATEGORY_REQUIRED,
  FILTER_ALL,
  FILTER_CLOSED,
  FILTER_IN_PROGRESS,
  FILTER_OPEN,
  FILTER_RESOLVED,
  MESSAGE_LABEL,
  MESSAGE_PLACEHOLDER,
  MESSAGE_REQUIRED,
  NEW_ENQUIRY_SUBTITLE,
  NEW_ENQUIRY_TITLE,
  PRIORITY_HIGH,
  PRIORITY_LABEL,
  PRIORITY_LOW,
  PRIORITY_MEDIUM,
  RAISE_NEW_TICKET,
  SUBJECT_LABEL,
  SUBJECT_PLACEHOLDER,
  SUBJECT_REQUIRED,
  SUBMIT_ENQUIRY,
  SUPPORT_TICKETS_TITLE,
  TICKETS_COUNT_SUFFIX,
  NO_TICKETS_TITLE,
  NO_TICKETS_SUBTITLE,
} from '../constants/Constants';
import {
  actionIconBgColor,
  addOrderBorderColor,
  backgroundBeigeColor,
  balanceBadgeTextColor,
  blackColor,
  inputBorderColor,
  primaryColor,
  redColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const { flex, flexDirectionRow, flexWrap, alignItemsCenter, alignJustifyCenter } = BaseStyle;

const VIEW_LIST = 'list';
const VIEW_FORM = 'form';

const FILTER_OPTIONS = [
  { id: 'all', label: FILTER_ALL },
  { id: 'open', label: FILTER_OPEN },
  { id: 'inProgress', label: FILTER_IN_PROGRESS },
  { id: 'resolved', label: FILTER_RESOLVED },
  { id: 'closed', label: FILTER_CLOSED },
];

const PRIORITY_OPTIONS = [PRIORITY_HIGH, PRIORITY_MEDIUM, PRIORITY_LOW];

const formatFileSize = bytes => {
  if (!bytes) {
    return '';
  }
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const RaiseEnquiryScreen = () => {
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState(VIEW_LIST);
  const [activeFilter, setActiveFilter] = useState('all');
  const [ticketsList, setTicketsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedPriority, setSelectedPriority] = useState(PRIORITY_MEDIUM);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // TODO: replace with API response
    setTicketsList([
      {
        id: '1',
        ticketId: 'TKT-892',
        subject: 'Shipping delay inquiry for Order ORD-4683',
        status: 'Open',
        category: 'Order Issue',
        priority: PRIORITY_HIGH,
        lastUpdate: '2026-04-16 10:23 AM',
        assignedTo: 'Sarah Chen',
        filterStatus: 'open',
      },
      {
        id: '2',
        ticketId: 'TKT-891',
        subject: 'Product specification clarification',
        status: 'Resolved',
        category: 'Product Info',
        priority: PRIORITY_LOW,
        lastUpdate: '2026-04-14 03:15 PM',
        assignedTo: 'Mike Johnson',
        filterStatus: 'resolved',
      },
      {
        id: '3',
        ticketId: 'TKT-890',
        subject: 'Invoice discrepancy on INV-2821',
        status: 'In Progress',
        category: 'Billing',
        priority: PRIORITY_MEDIUM,
        lastUpdate: '2026-04-13 11:40 AM',
        assignedTo: 'Sarah Chen',
        filterStatus: 'inProgress',
      },
      {
        id: '4',
        ticketId: 'TKT-889',
        subject: 'Portal login issue',
        status: 'Closed',
        category: 'Technical',
        priority: PRIORITY_HIGH,
        lastUpdate: '2026-04-10 09:00 AM',
        assignedTo: 'Support Team',
        filterStatus: 'closed',
      },
    ]);

    setCategoryList([
      { id: 'order', label: 'Order Issue', icon: 'package-variant' },
      { id: 'product', label: 'Product Info', icon: 'clipboard-text-outline' },
      { id: 'billing', label: 'Billing', icon: 'cash' },
      { id: 'technical', label: 'Technical', icon: 'cog-outline' },
      { id: 'sales', label: 'Sales', icon: 'briefcase-outline' },
      { id: 'account', label: 'Account', icon: 'account-outline' },
      { id: 'quality', label: 'Quality', icon: 'star-outline' },
      { id: 'general', label: 'General', icon: 'message-text-outline' },
    ]);
  }, []);

  const filteredTickets = useMemo(() => {
    if (activeFilter === 'all') {
      return ticketsList;
    }
    return ticketsList.filter(ticket => ticket.filterStatus === activeFilter);
  }, [ticketsList, activeFilter]);

  const ticketsCountLabel = `${ticketsList.length} ${TICKETS_COUNT_SUFFIX}`;

  const resetForm = () => {
    setSelectedCategoryId('');
    setSelectedPriority(PRIORITY_MEDIUM);
    setSubject('');
    setMessage('');
    setAttachments([]);
    setErrors({});
  };

  const openNewEnquiry = () => {
    resetForm();
    setViewMode(VIEW_FORM);
  };

  const handleBack = () => {
    if (viewMode === VIEW_FORM) {
      setViewMode(VIEW_LIST);
      return;
    }
    navigation.goBack();
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!selectedCategoryId) {
      nextErrors.category = CATEGORY_REQUIRED;
    }
    if (!subject.trim()) {
      nextErrors.subject = SUBJECT_REQUIRED;
    }
    if (!message.trim()) {
      nextErrors.message = MESSAGE_REQUIRED;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildEnquiryFormData = () => {
    const category = categoryList.find(item => item.id === selectedCategoryId);
    const formData = new FormData();

    formData.append('categoryId', selectedCategoryId);
    formData.append('category', category?.label ?? '');
    formData.append('priority', selectedPriority);
    formData.append('subject', subject.trim());
    formData.append('message', message.trim());

    attachments.forEach(file => {
      formData.append('attachments', {
        uri: file.uri,
        name: file.name,
        type: file.type || 'application/octet-stream',
      });
    });

    return formData;
  };

  const handlePickAttachment = async () => {
    try {
      const results = await pick({
        allowMultiSelection: true,
        type: [types.pdf, types.images, types.doc, types.docx, types.plainText],
      });

      setAttachments(prev => {
        const existingUris = new Set(prev.map(file => file.uri));
        const pickedFiles = results
          .filter(file => file.uri && !existingUris.has(file.uri))
          .map(file => ({
            id: file.uri,
            name: file.name ?? 'attachment',
            uri: file.uri,
            type: file.type ?? null,
            size: file.size ?? null,
          }));

        return [...prev, ...pickedFiles];
      });
    } catch (err) {
      if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) {
        return;
      }
      Alert.alert(ATTACHMENT_PICK_FAILED);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedCategory = categoryList.find(item => item.id === selectedCategoryId);
      const formData = buildEnquiryFormData();
      // TODO: API submit enquiry — e.g. fetch(url, { method: 'POST', body: formData })
      void formData;
      await new Promise(resolve => setTimeout(resolve, 1000));

      setTicketsList(prev => [
        {
          id: String(Date.now()),
          ticketId: `TKT-${880 + prev.length}`,
          subject: subject.trim(),
          status: 'Open',
          category: selectedCategory?.label ?? 'General',
          priority: selectedPriority,
          lastUpdate: new Date().toISOString().slice(0, 16).replace('T', ' '),
          assignedTo: 'Unassigned',
          filterStatus: 'open',
        },
        ...prev,
      ]);

      resetForm();
      setViewMode(VIEW_LIST);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFilterTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterRow}>
      {FILTER_OPTIONS.map(filter => {
        const isActive = activeFilter === filter.id;
        return (
          <TouchableOpacity
            key={filter.id}
            style={[styles.filterPill, isActive && styles.filterPillActive]}
            onPress={() => setActiveFilter(filter.id)}
            activeOpacity={0.7}>
            <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{filter.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const renderListView = () => (
    <>
      <Text style={styles.countText}>{ticketsCountLabel}</Text>
      {renderFilterTabs()}
      {filteredTickets.length > 0 ? (
        filteredTickets.map(ticket => (
          <SupportTicketCard
            key={ticket.id}
            ticketId={ticket.ticketId}
            subject={ticket.subject}
            status={ticket.status}
            category={ticket.category}
            priority={ticket.priority}
            lastUpdate={ticket.lastUpdate}
            assignedTo={ticket.assignedTo}
          />
        ))
      ) : (
        <View style={[alignJustifyCenter, styles.emptyPlaceholder]}>
          <View style={styles.emptyIconWrap}>
            <Icon name="ticket-outline" size={48} color={textSecondaryColor} />
          </View>
          <Text style={styles.emptyTitle}>{NO_TICKETS_TITLE}</Text>
          <Text style={styles.emptySubtitle}>{NO_TICKETS_SUBTITLE}</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            // onPress={openNewEnquiry}
            activeOpacity={0.85}>
            <Icon name="plus" size={20} color={whiteColor} />
            <Text style={styles.emptyButtonText}>{RAISE_NEW_TICKET}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );

  const renderFormView = () => (
    <>
      <Text style={styles.formSectionLabel}>{CATEGORY_LABEL}</Text>
      <View style={[flexDirectionRow, flexWrap, styles.categoryGrid]}>
        {categoryList.map(category => {
          const isSelected = selectedCategoryId === category.id;
          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryTile, isSelected && styles.categoryTileSelected]}
              onPress={() => {
                setSelectedCategoryId(category.id);
                if (errors.category) {
                  setErrors(prev => ({ ...prev, category: '' }));
                }
              }}
              activeOpacity={0.7}>
              <Icon name={category.icon} size={18} color={isSelected ? primaryColor : textSecondaryColor} />
              <Text style={[styles.categoryTileText, isSelected && styles.categoryTileTextSelected]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
        {errors.category ? <Text style={styles.errorText}>{errors.category}</Text> : null}
      </View>

      <Text style={styles.formSectionLabel}>{PRIORITY_LABEL}</Text>
      <View style={[flexDirectionRow, styles.priorityRow]}>
        {PRIORITY_OPTIONS.map(priority => {
          const isSelected = selectedPriority === priority;
          return (
            <TouchableOpacity
              key={priority}
              style={[styles.priorityButton, isSelected && styles.priorityButtonSelected]}
              onPress={() => setSelectedPriority(priority)}
              activeOpacity={0.7}>
              <Text style={[styles.priorityButtonText, isSelected && styles.priorityButtonTextSelected]}>
                {priority}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <CustomInput
        label={SUBJECT_LABEL}
        placeholder={SUBJECT_PLACEHOLDER}
        value={subject}
        onChangeText={text => {
          setSubject(text);
          if (errors.subject) {
            setErrors(prev => ({ ...prev, subject: '' }));
          }
        }}
        required
        error={errors.subject}
        autoCapitalize="sentences"
      />

      <CustomInput
        label={MESSAGE_LABEL}
        placeholder={MESSAGE_PLACEHOLDER}
        value={message}
        onChangeText={text => {
          setMessage(text);
          if (errors.message) {
            setErrors(prev => ({ ...prev, message: '' }));
          }
        }}
        required
        error={errors.message}
        multiline
        numberOfLines={5}
        autoCapitalize="sentences"
      />

      <Text style={styles.formSectionLabel}>{ATTACHMENTS_LABEL}</Text>
      <TouchableOpacity
        style={styles.attachmentBox}
        onPress={handlePickAttachment}
        activeOpacity={0.7}>
        <Icon name="plus" size={22} color={addOrderBorderColor} />
        <Text style={styles.attachmentText}>{ADD_ATTACHMENT}</Text>
      </TouchableOpacity>
      {attachments.length > 0 ? (
        <View style={styles.attachmentList}>
          {attachments.map(file => (
            <View key={file.id} style={[flexDirectionRow, alignItemsCenter, styles.attachmentItem]}>
              <Icon name="paperclip" size={20} color={addOrderBorderColor} />
              <View style={styles.attachmentInfo}>
                <Text style={styles.attachmentFileName} numberOfLines={1}>
                  {file.name}
                </Text>
                {file.size ? (
                  <Text style={styles.attachmentFileSize}>{formatFileSize(file.size)}</Text>
                ) : null}
              </View>
              <TouchableOpacity
                onPress={() => setAttachments(prev => prev.filter(item => item.id !== file.id))}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Icon name="close" size={18} color={textSecondaryColor} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : null}
    </>
  );

  return (
    <SafeAreaView style={[flex, styles.safeArea]}>
      <View style={flex}>
        <ScrollView
          style={flex}
          contentContainerStyle={[
            styles.scrollContent,
            viewMode === VIEW_LIST && styles.scrollContentWithFooter,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            style={[flexDirectionRow, alignItemsCenter, styles.backButton]}
            onPress={handleBack}
            activeOpacity={0.7}>
            <Icon name="chevron-left" size={24} color={textSecondaryColor} />
            <Text style={styles.backText}>
              {viewMode === VIEW_FORM ? BACK_TO_SUPPORT : BACK_TO_DASHBOARD}
            </Text>
          </TouchableOpacity>

          <Text style={styles.title}>
            {viewMode === VIEW_FORM ? NEW_ENQUIRY_TITLE : SUPPORT_TICKETS_TITLE}
          </Text>
          {viewMode === VIEW_FORM ? (
            <Text style={styles.subtitle}>{NEW_ENQUIRY_SUBTITLE}</Text>
          ) : null}

          {viewMode === VIEW_LIST ? renderListView() : renderFormView()}
        </ScrollView>

        <View style={styles.footer}>
          {viewMode === VIEW_LIST ? (
            <TouchableOpacity
              style={[flexDirectionRow, alignItemsCenter, styles.raiseButton]}
              onPress={openNewEnquiry}
              activeOpacity={0.85}>
              <Icon name="plus" size={22} color={whiteColor} />
              <Text style={styles.raiseButtonText}>{RAISE_NEW_TICKET}</Text>
            </TouchableOpacity>
          ) : (
            <CustomButton title={SUBMIT_ENQUIRY} onPress={handleSubmit} loading={isSubmitting} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RaiseEnquiryScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: backgroundBeigeColor,
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingTop: spacings.large,
    paddingBottom: spacings.large,
  },
  scrollContentWithFooter: {
    paddingBottom: spacings.ExtraLarge,
  },
  backButton: {
    marginBottom: spacings.xxLarge,
  },
  backText: {
    ...style.fontSizeNormal2x,
    color: textSecondaryColor,
    marginLeft: spacings.xsmall,
  },
  title: {
    ...style.fontSizeLarge2x,
    ...style.fontWeightMedium1x,
    color: blackColor,
    marginBottom: spacings.small,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  subtitle: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginBottom: spacings.xxLarge,
  },
  countText: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    marginBottom: spacings.large,
  },
  filterRow: {
    paddingBottom: spacings.xxLarge,
    gap: spacings.small,
  },
  filterPill: {
    paddingHorizontal: spacings.large,
    paddingVertical: spacings.normal,
    borderRadius: 20,
    marginRight: spacings.small,
  },
  filterPillActive: {
    backgroundColor: whiteColor,
    shadowColor: blackColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  filterText: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  filterTextActive: {
    ...style.fontWeightMedium,
    color: blackColor,
  },
  emptyPlaceholder: {
    paddingVertical: spacings.ExtraLarge3x,
    paddingHorizontal: spacings.xxLarge,
    minHeight: 280,
  },
  emptyIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: actionIconBgColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacings.xLarge,
  },
  emptyTitle: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.small,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
    textAlign: 'center',
    marginBottom: spacings.xxLarge,
  },
  emptyButton: {
    ...flexDirectionRow,
    alignItemsCenter,
    backgroundColor: primaryColor,
    paddingHorizontal: spacings.xxLarge,
    paddingVertical: spacings.normal,
    borderRadius: 10,
  },
  emptyButtonText: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: whiteColor,
    marginLeft: spacings.normal,
  },
  formSectionLabel: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: blackColor,
    marginBottom: spacings.large,
  },
  categoryGrid: {
    justifyContent: 'space-between',
    marginBottom: spacings.xxLarge,
  },
  categoryTile: {
    width: '48%',
    backgroundColor: whiteColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: inputBorderColor,
    padding: spacings.large,
    marginBottom: spacings.normal,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTileSelected: {
    borderColor: primaryColor,

  },
  categoryTileText: {
    ...style.fontSizeNormal,
    color: blackColor,
    marginLeft: spacings.normal,
    flex: 1,
  },
  categoryTileTextSelected: {
    ...style.fontWeightMedium,
    color: balanceBadgeTextColor,
  },
  priorityRow: {
    gap: spacings.normal,
    marginBottom: spacings.xxLarge,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: spacings.normal,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: inputBorderColor,
    backgroundColor: whiteColor,
    alignItems: 'center',
  },
  priorityButtonSelected: {
    borderColor: primaryColor,
  },
  priorityButtonText: {
    ...style.fontSizeNormal,
    color: textSecondaryColor,
  },
  priorityButtonTextSelected: {
    ...style.fontWeightMedium,
    color: balanceBadgeTextColor,
  },
  attachmentBox: {
    ...flexDirectionRow,
    alignItemsCenter,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: inputBorderColor,
    borderRadius: 10,
    paddingVertical: spacings.xLarge,
    marginBottom: spacings.xxLarge,
  },
  attachmentText: {
    ...style.fontSizeNormal2x,
    color: addOrderBorderColor,
    marginLeft: spacings.normal,
  },
  attachmentList: {
    marginBottom: spacings.large,
  },
  attachmentItem: {
    backgroundColor: whiteColor,
    borderRadius: 8,
    padding: spacings.normal,
    marginBottom: spacings.small,
    borderWidth: 1,
    borderColor: inputBorderColor,
    justifyContent: 'space-between',
    gap: spacings.normal,
  },
  attachmentInfo: {
    flex: 1,
  },
  attachmentFileName: {
    ...style.fontSizeNormal,
    color: blackColor,
  },
  attachmentFileSize: {
    ...style.fontSizeSmall1x,
    color: textSecondaryColor,
    marginTop: spacings.xsmall,
  },
  errorText: {
    ...style.fontSizeSmall1x,
    color: redColor,
    marginTop: -spacings.normal,
    marginBottom: spacings.normal,
  },
  footer: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingBottom: spacings.xxLarge,
    paddingTop: spacings.normal,
    backgroundColor: backgroundBeigeColor,
  },
  raiseButton: {
    backgroundColor: primaryColor,
    borderRadius: 12,
    paddingVertical: spacings.large,
    justifyContent: 'center',
  },
  raiseButtonText: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: whiteColor,
    marginLeft: spacings.normal,
  },
});
