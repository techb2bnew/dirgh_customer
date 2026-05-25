export const WELCOME_TITLE = 'Welcome back';
export const WELCOME_SUBTITLE = 'Sign in to access your business dashboard';
export const EMAIL_LABEL = 'EMAIL ADDRESS';
export const EMAIL_PLACEHOLDER = 'your.email@company.com';
export const PASSWORD_LABEL = 'PASSWORD';
export const PASSWORD_PLACEHOLDER = '••••••••';
export const REMEMBER_ME = 'Remember me';
export const FORGOT_PASSWORD = 'Forgot Password';
export const SIGN_IN = 'Sign In';
export const OR_CONTINUE_WITH = 'OR CONTINUE WITH';
export const NO_ACCOUNT = "Don't have an account?";
export const CONTACT_SALES = 'Contact Sales';
export const CONTACT_SALES_SUBTITLE = 'Reach out to our sales team';
export const SALES_EMAIL_LABEL = 'EMAIL';
export const SALES_PHONE_LABEL = 'PHONE';
export const SALES_EMAIL = 'sales@dirgh.com';
export const SALES_PHONE = '+1 (800) 555-0199';
export const CLOSE = 'Close';

export const EMAIL_REQUIRED = 'Email is required';
export const EMAIL_INVALID = 'Please enter a valid email address';
export const PASSWORD_REQUIRED = 'Password is required';
export const PASSWORD_MIN_LENGTH = 'Password must be at least 8 characters';
export const REMEMBER_ME_REQUIRED = 'Please check Remember me to continue';

export const BACK = 'Back';
export const SELECT_ACCOUNT_TITLE = 'Select account';
export const SELECT_ACCOUNT_SUBTITLE = 'Choose which business to access';
export const ADD_NEW_ACCOUNT = 'Add new account';
export const ACCOUNT_ID_LABEL = 'Account ID: ';

export const ACCOUNT_BALANCE = 'ACCOUNT BALANCE';
export const CREDIT_LABEL = 'Credit:';
export const OUTSTANDING_LABEL = 'Outstanding:';
export const QUICK_REORDER = 'Quick Reorder';
export const QUICK_REORDER_SUBTITLE = 'Your frequently purchased items';
export const SEARCH_QUICK_REORDER_PLACEHOLDER = 'Search products...';
export const NO_QUICK_REORDER_SEARCH_TITLE = 'No matching products';
export const NO_QUICK_REORDER_SEARCH_SUBTITLE =
  'Try a different product name or SKU, or clear your search to see all items.';
export const NO_QUICK_REORDER_EMPTY_TITLE = 'No items to reorder yet';
export const NO_QUICK_REORDER_EMPTY_SUBTITLE =
  'Products you order frequently will show up here. Check back after your next purchase.';
export const CLEAR_SEARCH = 'Clear search';
export const CLEAR_ALL = 'Clear All';
export const USUAL_LABEL = 'Usual';
export const ORDER_TOTAL_LABEL = 'ORDER TOTAL';
export const TOTAL_ITEMS_LABEL = 'TOTAL ITEMS';
export const ORDERED_COUNT_SUFFIX = 'x';

export const formatOrderedCount = (count: number) => `Ordered ${count}${ORDERED_COUNT_SUFFIX}`;

export const formatUsualQty = (qty: number) => `(${qty})`;

export const formatAddItemsToCart = (count: number) =>
  `Add ${count} Item${count === 1 ? '' : 's'} to Cart`;

export const formatQuickReorderMeta = (lastOrdered: string, orderCount: number) =>
  `Last ordered ${lastOrdered} • ${formatOrderedCount(orderCount)}`;

export const ORDERS = 'ORDERS';
export const INVOICES = 'INVOICES';
export const TICKETS = 'TICKETS';
export const RECENT_ORDERS = 'Recent Orders';
export const RECENT_INVOICES = 'Recent Invoices';
export const SUPPORT_TICKETS = 'Support Tickets';
export const VIEW_ALL = 'View All';

export const FORGOT_PASSWORD_TITLE = 'Forgot Password';
export const FORGOT_PASSWORD_STEP1_SUBTITLE =
  "Enter your registered email address and we'll send you a verification code to reset your password.";
export const FORGOT_PASSWORD_STEP2_SUBTITLE =
  "We've sent a 6-digit verification code to:";
export const FORGOT_PASSWORD_STEP3_SUBTITLE =
  'Create a new password with at least 8 characters. Make sure both passwords match.';
export const OTP_LABEL = 'VERIFICATION CODE';
export const OTP_PLACEHOLDER = '000000';
export const RESEND_OTP = 'Resend';
export const RESEND_OTP_IN = 'Resend in';
export const NEW_PASSWORD_LABEL = 'NEW PASSWORD';
export const CONFIRM_PASSWORD_LABEL = 'CONFIRM PASSWORD';
export const NEXT = 'Next';
export const CONTINUE = 'Continue';
export const OK = 'OK';
export const OTP_REQUIRED = 'Verification code is required';
export const OTP_INVALID = 'Please enter a valid 6-digit code';
export const CONFIRM_PASSWORD_REQUIRED = 'Please confirm your password';
export const PASSWORDS_DO_NOT_MATCH = 'Passwords do not match';
export const FORGOT_SUCCESS_TITLE = 'Password Updated';
export const FORGOT_SUCCESS_MESSAGE =
  'Your password has been reset successfully. You can now sign in with your new password.';

export const BACK_TO_DASHBOARD = 'Back to Dashboard';
export const NEW_ORDER_TITLE = 'New Order';
export const PRODUCTS_AVAILABLE = 'products available';
export const PREVIOUS_ORDERS = 'Previous Orders';
export const BROWSE_CATALOG = 'Browse Catalog';
export const SEARCH_PRODUCTS_PLACEHOLDER = 'Search products, SKU, category...';
export const SKU_LABEL = 'SKU:';
export const STOCK_LABEL = 'Stock:';
export const MIN_LABEL = 'Min:';
export const PER_UNIT = 'per unit';
export const ADD_TO_ORDER = 'Add to Order';
export const ORDER_SUMMARY = 'ORDER SUMMARY';
export const PLACE_ORDER = 'Place Order';
export const INCL_TAX = 'incl. tax';
export const BULLET_SEPARATOR = ' • ';
export const INSUFFICIENT_STOCK = 'Not enough stock available';

export const formatAllStockAddedMessage = (stockCount: number) =>
  `You have added all ${stockCount} units available in stock`;

export const formatRemainingBelowMinOrderMessage = (
  remainingStock: number,
  minOrder: number,
) =>
  `Only ${remainingStock} left in stock. Minimum order is ${minOrder} units.`;

export const FINANCIAL_SUMMARY_TITLE = 'Financial Summary';
export const FINANCIAL_SUMMARY_SUBTITLE = 'Account ledger and payment history';
export const TAB_OVERVIEW = 'Overview';
export const TAB_PAYMENT_HISTORY = 'Payment History';
export const CREDIT_LIMIT_LABEL = 'CREDIT LIMIT';
export const USED_LABEL = 'Used';
export const AVAILABLE_LABEL = 'Available';
export const OUTSTANDING_CAPS = 'OUTSTANDING';
export const OVERDUE_CAPS = 'OVERDUE';
export const NEXT_PAYMENT_DUE = 'Next Payment Due';
export const MAKE_PAYMENT = 'Make Payment';
export const VIEW_LEDGER = 'View Ledger';
export const AMOUNT_LABEL = 'AMOUNT';
export const METHOD_LABEL = 'METHOD';
export const INVOICE_PREFIX = 'Invoice:';
export const COMPLETED = 'Completed';
export const BACK_TO_FINANCIAL_SUMMARY = 'Back to Financial Summary';
export const LEDGER_TITLE = 'Ledger';
export const LEDGER_SUBTITLE = 'Detailed transaction history';
export const FILTER_30_DAYS = '30 Days';
export const FILTER_60_DAYS = '60 Days';
export const FILTER_90_DAYS = '90 Days';
export const FILTER_YEAR = 'Year';
export const DEBITS_LABEL = 'DEBITS';
export const CREDITS_LABEL = 'CREDITS';
export const BALANCE_LABEL = 'BALANCE';
export const RUNNING_BALANCE_LABEL = 'RUNNING BALANCE';
export const CREDIT_BADGE = 'Credit';
export const DEBIT_BADGE = 'Debit';
export const DOWNLOAD_STATEMENT = 'Download Statement';

export const MAKE_PAYMENT_TITLE = 'Make Payment';
export const SELECT_INVOICES_SUBTITLE = 'Select invoices to pay';
export const CHOOSE_PAYMENT_METHOD_SUBTITLE = 'Choose payment method';
export const REVIEW_CONFIRM_SUBTITLE = 'Review and confirm';
export const SELECT_INVOICES_HINT = 'Select one or more invoices';
export const CHOOSE_PAYMENT_HINT = "Choose how you'd like to pay";
export const ISSUED_PREFIX = 'Issued:';
export const DUE_PREFIX = 'Due:';
export const UNPAID = 'Unpaid';
export const OVERDUE = 'Overdue';
export const CONFIRM_PAYMENT = 'Confirm Payment';
export const INVOICES_TO_PAY = 'Invoices to Pay';
export const PAYMENT_METHOD = 'Payment Method';
export const PAYMENT_SUMMARY = 'Payment Summary';
export const SUBTOTAL = 'Subtotal';
export const TOTAL_CAPS = 'TOTAL';
export const WIRE_TRANSFER = 'Wire Transfer';
export const ACH_TRANSFER = 'ACH Transfer';
export const CREDIT_DEBIT_CARD = 'Credit/Debit Card';
export const CHECK_PAYMENT = 'Check';
export const WIRE_TRANSFER_DAYS = '1-2 business days';
export const ACH_TRANSFER_DAYS = '3-5 business days';
export const CARD_INSTANT = 'Instant';
export const CHECK_DAYS = '5-7 business days';
export const CARD_FEE_LABEL = '+2.5%';

export const formatContinueWithCount = (count: number) =>
  `Continue (${count} selected)`;

export const COMPANY_PROFILE_TITLE = 'Company Profile';
export const TAB_COMPANY = 'Company';
export const TAB_CONTACTS = 'Contacts';
export const TAB_ADDRESSES = 'Addresses';
export const NOTIFICATION_SETTINGS = 'Notification Settings';
export const COMPANY_DETAILS = 'Company Details';
export const REGISTRATION_TAX = 'Registration & Tax';
export const ACCOUNT_INFORMATION = 'Account Information';
export const INDUSTRY_LABEL = 'INDUSTRY';
export const EMPLOYEES_LABEL = 'EMPLOYEES';
export const INCORPORATION_LABEL = 'INCORPORATION';
export const REVENUE_LABEL = 'REVENUE';
export const CIN_LABEL = 'CIN';
export const PAN_LABEL = 'PAN';
export const GST_LABEL = 'GST';
export const CREDIT_LIMIT_PROFILE_LABEL = 'CREDIT LIMIT';
export const PAYMENT_TERMS_LABEL = 'PAYMENT TERMS';
export const ACCOUNT_MANAGER_LABEL = 'ACCOUNT MANAGER';
export const REGISTERED_ADDRESS = 'Registered Address';
export const BILLING_ADDRESS = 'Billing Address';
export const SHIPPING_ADDRESS = 'Shipping Address';

export const SUPPORT_TICKETS_TITLE = 'Support Tickets';
export const TICKETS_COUNT_SUFFIX = 'tickets';
export const NO_TICKETS_TITLE = 'No tickets found';
export const NO_TICKETS_SUBTITLE = 'Try another filter or raise a new enquiry';
export const FILTER_ALL = 'All';
export const FILTER_OPEN = 'Open';
export const FILTER_IN_PROGRESS = 'In Progress';
export const FILTER_RESOLVED = 'Resolved';
export const FILTER_CLOSED = 'Closed';
export const RAISE_NEW_TICKET = 'Raise New Ticket';
export const BACK_TO_SUPPORT = 'Back to Support';
export const NEW_ENQUIRY_TITLE = 'New Enquiry';
export const NEW_ENQUIRY_SUBTITLE = 'Submit a support request';
export const CATEGORY_LABEL = 'Category';
export const PRIORITY_LABEL = 'Priority';
export const SUBJECT_LABEL = 'Subject';
export const MESSAGE_LABEL = 'Message';
export const ATTACHMENTS_LABEL = 'Attachments';
export const SUBJECT_PLACEHOLDER = 'Brief description of your enquiry';
export const MESSAGE_PLACEHOLDER = 'Provide detailed information about your enquiry...';
export const ADD_ATTACHMENT = 'Add Attachment';
export const ATTACHMENT_PICK_FAILED = 'Unable to pick file. Please try again.';
export const SUBMIT_ENQUIRY = 'Submit Enquiry';
export const LAST_UPDATE_LABEL = 'LAST UPDATE';
export const ASSIGNED_TO_LABEL = 'ASSIGNED TO';
export const PRIORITY_HIGH = 'High';
export const PRIORITY_MEDIUM = 'Medium';
export const PRIORITY_LOW = 'Low';
export const CATEGORY_REQUIRED = 'Please select a category';
export const SUBJECT_REQUIRED = 'Subject is required';
export const MESSAGE_REQUIRED = 'Message is required';

export const DOCUMENT_CENTER_TITLE = 'Document Center';
export const DOCUMENTS_COUNT_SUFFIX = 'documents';
export const SEARCH_DOCUMENTS_PLACEHOLDER = 'Search documents...';
export const FILTER_INVOICE = 'Invoice';
export const FILTER_STATEMENT = 'Statement';
export const FILTER_DELIVERY_CHALLAN = 'Delivery Challan';
export const FILTER_REPORT = 'Report';
export const DOWNLOAD_ALL = 'Download All';

export const formatDocumentsCount = (count: number) => `${count} ${DOCUMENTS_COUNT_SUFFIX}`;

export const formatDownloadAll = (count: number) => `${DOWNLOAD_ALL} (${count})`;
export const NO_DOCUMENTS_SEARCH_TITLE = 'No matching documents';
export const NO_DOCUMENTS_SEARCH_SUBTITLE =
  'Try a different title, type, or reference number, or clear your search to see all documents.';
export const formatNoDocumentsFilterTitle = (filterLabel: string) =>
  `No ${filterLabel.toLowerCase()} documents`;
export const NO_DOCUMENTS_FILTER_SUBTITLE =
  'There are no documents in this category. View all documents or try another filter.';
export const NO_DOCUMENTS_EMPTY_TITLE = 'No documents yet';
export const NO_DOCUMENTS_EMPTY_SUBTITLE =
  'Invoices, statements, and delivery challans will appear here once they are ready.';
export const SHOW_ALL_DOCUMENTS = 'Show all documents';

export const PRODUCT_CATEGORIES_TITLE = 'Product Categories';
export const PRODUCT_CATEGORIES_SUBTITLE = 'Browse wholesale catalog by category';
export const SEARCH_CATEGORIES_PLACEHOLDER = 'Search categories...';
export const NO_CATEGORIES_SEARCH_TITLE = 'No matching categories';
export const NO_CATEGORIES_SEARCH_SUBTITLE =
  'Try a different category name or clear your search to browse the full catalog.';
export const NO_CATEGORIES_EMPTY_TITLE = 'No categories yet';
export const NO_CATEGORIES_EMPTY_SUBTITLE =
  'Product categories will appear here once the catalog is ready.';
export const TOTAL_CATEGORIES_LABEL = 'TOTAL CATEGORIES';
export const TOTAL_PRODUCTS_LABEL = 'TOTAL PRODUCTS';
export const ITEMS_SUFFIX = 'items';

export const formatCategoryItemCount = (count: number) =>
  `${count.toLocaleString()} ${ITEMS_SUFFIX}`;

export const BACK_TO_CATEGORIES = 'Back to Categories';
export const SEARCH_BY_NAME_OR_SKU = 'Search by name or SKU...';
export const PRODUCTS_COUNT_SUFFIX = 'products';
export const LISTING_PRICE_LABEL = 'PRICE';
export const LISTING_STOCK_LABEL = 'STOCK';
export const LAST_ORDER_LABEL = 'LAST ORDER';
export const REPEAT_BADGE = 'REPEAT';
export const ADD_TO_CART = 'Add to Cart';
export const ADD_MORE = 'Add More';
export const CART_TOTAL_LABEL = 'CART TOTAL';
export const ITEMS_LABEL = 'ITEMS';
export const PACKS_SUFFIX = 'packs';

export const formatProductsCount = (count: number) => `${count} ${PRODUCTS_COUNT_SUFFIX}`;

export const formatPacksCount = (count: number) => `${count} ${PACKS_SUFFIX}`;

export const formatReviewOrder = (count: number) =>
  `Review Order (${count} ${count === 1 ? 'product' : 'products'})`;

export const NO_PRODUCTS_FOUND = 'No products found';
export const NO_PRODUCTS_SUBTITLE = 'Try a different search or check back later';
export const LISTING_OUT_OF_STOCK = 'Out of stock';

export const formatInCart = (count: number) => `In cart: ${count}`;

export const formatOnlyAvailableToAdd = (remaining: number) =>
  `Only ${remaining} available to add`;

export const ORDER_CART_TITLE = 'Order Cart';
export const CONTINUE_SHOPPING = 'Continue Shopping';
export const CLEAR_CART = 'Clear Cart';
export const PER_PACK = 'per pack';
export const SUBTOTAL_LABEL = 'Subtotal';
export const DELIVERY_LABEL = 'Delivery';
export const FREE_LABEL = 'FREE';
export const TAX_LABEL = 'TAX';
export const TOTAL_LABEL = 'Total';
export const PROCEED_TO_CHECKOUT = 'Proceed to Checkout';
export const DELIVERY_METHOD = 'Delivery Method';
export const STANDARD_DELIVERY = 'Standard Delivery';
export const STANDARD_DELIVERY_DAYS = '3-5 business days';
export const EXPRESS_DELIVERY = 'Express Delivery';
export const EXPRESS_DELIVERY_DAYS = '1-2 business days';
export const TOTAL_ITEMS_SUFFIX = 'total items';

export const ORDERS_TITLE = 'Orders';
export const ORDERS_COUNT_SUFFIX = 'orders';
export const FILTER_PENDING = 'Pending';
export const FILTER_PROCESSING = 'Processing';
export const FILTER_DISPATCHED = 'Dispatched';
export const FILTER_DELIVERED = 'Delivered';
export const FILTER_CANCELLED = 'Cancelled';
export const EXPECTED_LABEL = 'EXPECTED';
export const DELIVERED_DATE_LABEL = 'DELIVERED';

export const formatOrdersCount = (count: number) => `${count} ${ORDERS_COUNT_SUFFIX}`;
export const formatNoOrdersFilterTitle = (filterLabel: string) =>
  `No ${filterLabel.toLowerCase()} orders`;
export const NO_ORDERS_FILTER_SUBTITLE =
  'There are no orders with this status. View all orders or pick another filter.';
export const NO_ORDERS_EMPTY_TITLE = 'No orders yet';
export const NO_ORDERS_EMPTY_SUBTITLE =
  'Orders you place will appear here. Check back after your next purchase.';
export const SHOW_ALL_ORDERS = 'Show all orders';

export const formatCartSubtitle = (products: number, items: number) =>
  `${products} products • ${items} ${TOTAL_ITEMS_SUFFIX}`;

export const formatSubtotalItems = (count: number) => `${SUBTOTAL_LABEL} (${count} items)`;

export const formatTaxPercent = (percent: number) => `${TAX_LABEL} (${percent}%)`;

export const formatPerPack = (price: string) => `${price} ${PER_PACK}`;

export const BACK_TO_CART = 'Back to Cart';
export const DELIVERY_DETAILS_TITLE = 'Delivery Details';
export const DELIVERY_DETAILS_SUBTITLE = 'Select address and delivery preferences';
export const DELIVERY_ADDRESS = 'Delivery Address';
export const ADD_NEW_ADDRESS = '+ Add New';
export const PREFERRED_DELIVERY_DATE = 'Preferred Delivery Date';
export const NEXT_DAY_DELIVERY_HINT =
  'Orders placed before 2 PM are eligible for next-day delivery';
export const DELIVERY_TIME_SLOT = 'Delivery Time Slot';
export const SPECIAL_INSTRUCTIONS_LABEL = 'Special Instructions';
export const OPTIONAL_SUFFIX = '(Optional)';
export const SPECIAL_INSTRUCTIONS_PLACEHOLDER =
  'Add delivery notes, access codes, or specific handling requirements...';
export const DELIVERY_SUMMARY = 'DELIVERY SUMMARY';
export const CONTINUE_TO_PAYMENT = 'Continue to Payment';
export const BADGE_REGISTERED = 'Registered';
export const BADGE_SHIPPING = 'Shipping';
export const BADGE_WAREHOUSE = 'Warehouse';
export const BADGE_DEFAULT = 'DEFAULT';

export const ADD_ADDRESS_TITLE = 'Add New Address';
export const ADD_ADDRESS_SUBTITLE = 'Add a delivery location for this order';
export const ADDRESS_NAME_LABEL = 'Address name';
export const ADDRESS_NAME_PLACEHOLDER = 'e.g. Main Warehouse';
export const STREET_ADDRESS_LABEL = 'Street / building / area';
export const STREET_ADDRESS_PLACEHOLDER = '145, Brigade Road, Shanthala Nagar';
export const CITY_LABEL = 'City';
export const CITY_PLACEHOLDER = 'Bangalore';
export const STATE_LABEL = 'State';
export const STATE_PLACEHOLDER = 'e.g. Karnataka';
export const PINCODE_LABEL = 'PIN';
export const PINCODE_PLACEHOLDER = '560001';
export const ADDRESS_TYPE_LABEL = 'Address type';
export const SET_DEFAULT_ADDRESS = 'Set as default delivery address';
export const SAVE_ADDRESS = 'Save address';
export const CANCEL = 'Cancel';
export const SECTION_ADDRESS_DETAILS = 'Address details';
export const SECTION_LOCATION = 'Location';
export const ADDRESS_NAME_REQUIRED = 'Address name is required';
export const STREET_ADDRESS_REQUIRED = 'Street address is required';
export const CITY_REQUIRED = 'City is required';
export const STATE_REQUIRED = 'State is required';
export const PINCODE_REQUIRED = 'PIN code is required';
export const PINCODE_INVALID = 'Enter a valid 6-digit PIN code';
export const ADDRESS_TYPE_REQUIRED = 'Please select address type';

export const ADDRESS_TYPE_SHIPPING = 'shipping';
export const ADDRESS_TYPE_WAREHOUSE = 'warehouse';

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry',
  'Chandigarh',
];

export const formatDeliveryAddressLine2 = (
  city: string,
  state: string,
  pincode: string,
) => `${city}, ${state} - ${pincode}`;
export const TIME_SLOT_MORNING = 'Morning';
export const TIME_SLOT_AFTERNOON = 'Afternoon';
export const TIME_SLOT_EVENING = 'Evening';
export const TIME_SLOT_MORNING_RANGE = '8 AM - 12 PM';
export const TIME_SLOT_AFTERNOON_RANGE = '12 PM - 4 PM';
export const TIME_SLOT_EVENING_RANGE = '4 PM - 8 PM';

export const BACK_TO_DELIVERY = 'Back to Delivery';
export const REVIEW_ORDER_TITLE = 'Review Order';
export const REVIEW_ORDER_SUBTITLE = 'Confirm details before placing order';
export const CREDIT_STATUS = 'Credit Status';
export const NET_30_DAYS = 'Net 30 Days';
export const AVAILABLE_CREDIT = 'Available Credit';
export const AFTER_THIS_ORDER = 'After this order';
export const CHECKOUT_CREDIT_LIMIT = 'Credit Limit';
export const DELIVERY_DETAILS_SECTION = 'Delivery Details';
export const ORDER_ITEMS_SECTION = 'Order Items';
export const PO_NUMBER_LABEL = 'Purchase Order Number';
export const PO_NUMBER_PLACEHOLDER = 'Enter your PO number for reference';
export const TERMS_PREFIX = 'I agree to the ';
export const TERMS_AND_CONDITIONS = 'Terms and Conditions';
export const TERMS_SUFFIX =
  ' and confirm that the order details are correct. Payment terms of Net 30 Days apply.';
export const ACCEPT_TERMS_TO_CONTINUE = 'Accept Terms to Continue';
export const ORDER_TOTAL_CAPS = 'Order Total';
export const QTY_PREFIX = 'Qty:';

export const CHECKOUT_STEPS = 3;

export const formatCharacterCount = (current: number, max: number) => `${current}/${max}`;

export const formatOrderItemsCount = (count: number) =>
  `${ORDER_ITEMS_SECTION} (${count} items)`;

export const formatQtyLine = (qty: number, unitPrice: number) =>
  `${QTY_PREFIX} ${qty} x $${unitPrice.toFixed(2)}`;

export const formatDeliverySummaryLine = (dateLabel: string, slotLabel: string) =>
  `${dateLabel} • ${slotLabel}`;

export const formatScheduleLine = (dateLabel: string, slotLabel: string, timeRange: string) =>
  `${dateLabel} • ${slotLabel} (${timeRange})`;

export const ORDER_PLACED_SUCCESS_TITLE = 'Order Placed Successfully!';
export const ORDER_PLACED_SUCCESS_MESSAGE =
  "Thank you for your order. We've sent a confirmation email with your order details.";
export const ORDER_NUMBER_LABEL = 'ORDER NUMBER';
export const COPY = 'Copy';
export const COPIED = 'Copied';
export const PLACED_ON_PREFIX = 'Placed on';
export const EXPECTED_DELIVERY = 'Expected Delivery';
export const ORDER_SUMMARY_TITLE = 'Order Summary';
export const ORDER_SUMMARY_TOTAL_ITEMS = 'Total Items';
export const PAYMENT_DUE_INFO =
  'Payment is due within 30 days. Invoice will be sent separately to your registered email address.';
export const TRACK_ORDER = 'Track Order';
export const VIEW_ORDERS = 'View Orders';
export const GO_TO_DASHBOARD = 'Go to Dashboard';

export const formatPlacedOn = (date: string) => `${PLACED_ON_PREFIX} ${date}`;

export const formatTimeSlotDisplay = (slotLabel: string, timeRange: string) =>
  `${slotLabel} (${timeRange})`;

export const formatDeliveryLocation = (title: string, shortLocation: string) =>
  `${title}, ${shortLocation}`;

export const BACK_TO_ORDERS = 'Back to Orders';
export const TOTAL_AMOUNT_LABEL = 'TOTAL AMOUNT';
export const DELIVERY_DATE_LABEL = 'DELIVERY DATE';
export const TAB_ITEMS = 'Items';
export const TAB_TRACKING = 'Tracking';
export const ORDER_ITEMS_TITLE = 'Order Items';
export const TRACKING_HISTORY = 'Tracking History';
export const VIEW_INVOICE = 'View Invoice';
export const QUANTITY_LABEL = 'Quantity';
export const EXPECTED_SUFFIX = 'Expected';
export const IN_TRANSIT = 'In Transit';
export const OUT_FOR_DELIVERY = 'Out for Delivery';
export const ORDER_PLACED = 'Order Placed';
export const PROCESSING_STATUS = 'Processing';

export const formatItemsTab = (count: number) => `${TAB_ITEMS} (${count})`;

export const formatQuantity = (qty: number) => `${QUANTITY_LABEL}: ${qty}`;

export const formatTrackingTimestamp = (date: string, time: string) =>
  `${date} • ${time}`;

export const CART_EMPTY_TITLE = 'Your cart is empty';
export const CART_EMPTY_SUBTITLE = 'Add products from the catalog to get started';
