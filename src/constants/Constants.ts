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
