import React, { useEffect, useMemo, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentListItem from '../components/DocumentListItem';
import {
  BACK_TO_DASHBOARD,
  DOCUMENT_CENTER_TITLE,
  FILTER_ALL,
  FILTER_DELIVERY_CHALLAN,
  FILTER_INVOICE,
  FILTER_REPORT,
  FILTER_STATEMENT,
  formatDocumentsCount,
  formatDownloadAll,
  formatNoDocumentsFilterTitle,
  NO_DOCUMENTS_SEARCH_TITLE,
  NO_DOCUMENTS_SEARCH_SUBTITLE,
  NO_DOCUMENTS_FILTER_SUBTITLE,
  NO_DOCUMENTS_EMPTY_TITLE,
  NO_DOCUMENTS_EMPTY_SUBTITLE,
  CLEAR_SEARCH,
  SHOW_ALL_DOCUMENTS,
  SEARCH_DOCUMENTS_PLACEHOLDER,
} from '../constants/Constants';
import {
  actionIconBgColor,
  actionPurpleColor,
  backgroundBeigeColor,
  blackColor,
  inputBorderColor,
  placeholderColor,
  textSecondaryColor,
  whiteColor,
} from '../constants/Color';
import { BaseStyle } from '../constants/Style';
import { style, spacings } from '../constants/Fonts';

const {
  flex,
  flexDirectionRow,
  alignItemsCenter,
  alignJustifyCenter,
} = BaseStyle;

const DocumentsScreen = () => {
  const navigation = useNavigation();
  const [documentList, setDocumentList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // TODO: replace with API response
    setFilterList([
      { id: 'all', label: FILTER_ALL },
      { id: 'invoice', label: FILTER_INVOICE },
      { id: 'statement', label: FILTER_STATEMENT },
      { id: 'deliveryChallan', label: FILTER_DELIVERY_CHALLAN },
      { id: 'report', label: FILTER_REPORT },
    ]);

    setDocumentList([
      {
        id: '1',
        title: 'Invoice INV-2847',
        type: FILTER_INVOICE,
        typeKey: 'invoice',
        referenceId: 'INV-2847',
        date: '2026-04-01',
        size: '245 KB',
      },
      {
        id: '2',
        title: 'Delivery Challan DCN-4683',
        type: FILTER_DELIVERY_CHALLAN,
        typeKey: 'deliveryChallan',
        referenceId: 'ORD-4683',
        date: '2026-04-15',
        size: '156 KB',
      },
      {
        id: '3',
        title: 'Invoice INV-2821',
        type: FILTER_INVOICE,
        typeKey: 'invoice',
        referenceId: 'INV-2821',
        date: '2026-03-01',
        size: '223 KB',
      },
      {
        id: '4',
        title: 'Account Statement - February 2026',
        type: FILTER_STATEMENT,
        typeKey: 'statement',
        referenceId: '',
        date: '2026-03-01',
        size: '487 KB',
      },
      {
        id: '5',
        title: 'Tax Certificate 2025-26',
        type: FILTER_REPORT,
        typeKey: 'report',
        referenceId: '',
        date: '2026-02-15',
        size: '312 KB',
      },
      {
        id: '6',
        title: 'Invoice INV-2805',
        type: FILTER_INVOICE,
        typeKey: 'invoice',
        referenceId: 'INV-2805',
        date: '2026-02-28',
        size: '198 KB',
      },
      {
        id: '7',
        title: 'Delivery Challan DCN-4659',
        type: FILTER_DELIVERY_CHALLAN,
        typeKey: 'deliveryChallan',
        referenceId: 'ORD-4659',
        date: '2026-04-10',
        size: '165 KB',
      },
      {
        id: '8',
        title: 'Annual Spending Report 2025',
        type: FILTER_REPORT,
        typeKey: 'report',
        referenceId: '',
        date: '2026-01-20',
        size: '1.2 MB',
      },
      {
        id: '9',
        title: 'Invoice INV-2791',
        type: FILTER_INVOICE,
        typeKey: 'invoice',
        referenceId: 'INV-2791',
        date: '2026-03-15',
        size: '267 KB',
      },
      {
        id: '10',
        title: 'Account Statement - January 2026',
        type: FILTER_STATEMENT,
        typeKey: 'statement',
        referenceId: '',
        date: '2026-02-01',
        size: '502 KB',
      },
      {
        id: '11',
        title: 'Delivery Challan DCN-4620',
        type: FILTER_DELIVERY_CHALLAN,
        typeKey: 'deliveryChallan',
        referenceId: 'ORD-4620',
        date: '2026-03-28',
        size: '142 KB',
      },
      {
        id: '12',
        title: 'Quarterly Compliance Report Q1',
        type: FILTER_REPORT,
        typeKey: 'report',
        referenceId: '',
        date: '2026-04-05',
        size: '890 KB',
      },
    ]);
  }, []);

  const filteredDocuments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return documentList.filter(doc => {
      const matchesFilter = activeFilter === 'all' || doc.typeKey === activeFilter;
      if (!matchesFilter) {
        return false;
      }
      if (!query) {
        return true;
      }
      return (
        doc.title.toLowerCase().includes(query) ||
        doc.type.toLowerCase().includes(query) ||
        doc.referenceId.toLowerCase().includes(query)
      );
    });
  }, [documentList, activeFilter, searchQuery]);

  const isSearchActive = searchQuery.trim().length > 0;
  const isFilterActive = activeFilter !== 'all';
  const activeFilterLabel =
    filterList.find(filter => filter.id === activeFilter)?.label ?? '';
  const emptyTitle = isSearchActive
    ? NO_DOCUMENTS_SEARCH_TITLE
    : isFilterActive
      ? formatNoDocumentsFilterTitle(activeFilterLabel)
      : NO_DOCUMENTS_EMPTY_TITLE;
  const emptySubtitle = isSearchActive
    ? NO_DOCUMENTS_SEARCH_SUBTITLE
    : isFilterActive
      ? NO_DOCUMENTS_FILTER_SUBTITLE
      : NO_DOCUMENTS_EMPTY_SUBTITLE;

  const handleDownload = documentId => {
    // TODO: download single document
    void documentId;
  };

  const handleDownloadAll = () => {
    // TODO: download all filtered documents
  };

  return (
    <SafeAreaView style={[flex, styles.safeArea]}>
      <View style={flex}>
        <ScrollView
          style={flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            style={[flexDirectionRow, alignItemsCenter, styles.backButton]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Icon name="chevron-left" size={24} color={textSecondaryColor} />
            <Text style={styles.backText}>{BACK_TO_DASHBOARD}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{DOCUMENT_CENTER_TITLE}</Text>
          <Text style={styles.subtitle}>{formatDocumentsCount(documentList.length)}</Text>

          <View style={[flexDirectionRow, alignItemsCenter, styles.searchWrap]}>
            <Icon name="magnify" size={22} color={textSecondaryColor} />
            <TextInput
              style={styles.searchInput}
              placeholder={SEARCH_DOCUMENTS_PLACEHOLDER}
              placeholderTextColor={placeholderColor}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}>
            {filterList.map(filter => {
              const isActive = activeFilter === filter.id;
              return (
                <TouchableOpacity
                  key={filter.id}
                  style={[styles.filterPill, isActive && styles.filterPillActive]}
                  onPress={() => setActiveFilter(filter.id)}
                  activeOpacity={0.7}>
                  <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {filteredDocuments.length > 0 ? (
            filteredDocuments.map(doc => (
              <DocumentListItem
                key={doc.id}
                title={doc.title}
                type={doc.type}
                referenceId={doc.referenceId}
                date={doc.date}
                size={doc.size}
                onDownload={() => handleDownload(doc.id)}
              />
            ))
          ) : (
            <View style={[alignJustifyCenter, styles.emptyPlaceholder]}>
              <View style={styles.emptyIconWrap}>
                <Icon name="file-document-outline" size={48} color={textSecondaryColor} />
              </View>
              <Text style={styles.emptyTitle}>{emptyTitle}</Text>
              <Text style={styles.emptySubtitle}>{emptySubtitle}</Text>
              {isSearchActive ? (
                <TouchableOpacity
                  style={styles.emptyButton}
                  onPress={() => setSearchQuery('')}
                  activeOpacity={0.85}>
                  <Text style={styles.emptyButtonText}>{CLEAR_SEARCH}</Text>
                </TouchableOpacity>
              ) : isFilterActive ? (
                <TouchableOpacity
                  style={styles.emptyButton}
                  onPress={() => setActiveFilter('all')}
                  activeOpacity={0.85}>
                  <Text style={styles.emptyButtonText}>{SHOW_ALL_DOCUMENTS}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[flexDirectionRow, alignItemsCenter, styles.downloadAllButton]}
            onPress={handleDownloadAll}
            activeOpacity={0.85}>
            <Icon name="download" size={22} color={whiteColor} />
            <Text style={styles.downloadAllText}>
              {formatDownloadAll(filteredDocuments.length)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DocumentsScreen;

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
  searchWrap: {
    backgroundColor: whiteColor,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: inputBorderColor,
    paddingHorizontal: spacings.large,
    marginBottom: spacings.large,
  },
  searchInput: {
    flex: 1,
    ...style.fontSizeNormal2x,
    color: blackColor,
    paddingVertical: spacings.large,
    marginLeft: spacings.normal,
  },
  filterRow: {
    paddingBottom: spacings.xxLarge,
    gap: spacings.small,
  },
  filterPill: {
    paddingHorizontal: spacings.large,
    paddingVertical: spacings.normal,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: inputBorderColor,
    marginRight: spacings.small,
    backgroundColor: 'transparent',
  },
  filterPillActive: {
    backgroundColor: whiteColor,
    borderColor: whiteColor,
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
    backgroundColor: actionPurpleColor,
    paddingHorizontal: spacings.xxLarge,
    paddingVertical: spacings.normal,
    borderRadius: 10,
  },
  emptyButtonText: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: whiteColor,
  },
  footer: {
    paddingHorizontal: spacings.xxxxLarge,
    paddingBottom: spacings.xxLarge,
    paddingTop: spacings.normal,
    backgroundColor: backgroundBeigeColor,
  },
  downloadAllButton: {
    backgroundColor: actionPurpleColor,
    borderRadius: 12,
    paddingVertical: spacings.large,
    justifyContent: 'center',
  },
  downloadAllText: {
    ...style.fontSizeNormal2x,
    ...style.fontWeightMedium,
    color: whiteColor,
    marginLeft: spacings.normal,
  },
});
