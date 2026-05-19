import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import FinancialSummaryScreen from '../screens/FinancialSummaryScreen';
import MakePaymentScreen from '../screens/MakePaymentScreen';
import NewOrderScreen from '../screens/NewOrderScreen';
import ProductListingScreen from '../screens/ProductListingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CartScreen from '../screens/CartScreen';
import DocumentsScreen from '../screens/DocumentsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import QuickReordersScreen from '../screens/QuickReordersScreen';
import RaiseEnquiryScreen from '../screens/RaiseEnquiryScreen';
import SelectAccountScreen from '../screens/SelectAccountScreen';
import ViewLedgerScreen from '../screens/ViewLedgerScreen';

export const ROUTE_LOGIN = 'Login';
export const ROUTE_FORGOT_PASSWORD = 'ForgotPassword';
export const ROUTE_SELECT_ACCOUNT = 'SelectAccount';
export const ROUTE_HOME = 'Home';
export const ROUTE_NEW_ORDER = 'NewOrder';
export const ROUTE_FINANCIAL_SUMMARY = 'FinancialSummary';
export const ROUTE_VIEW_LEDGER = 'ViewLedger';
export const ROUTE_MAKE_PAYMENT = 'MakePayment';
export const ROUTE_PROFILE = 'Profile';
export const ROUTE_RAISE_ENQUIRY = 'RaiseEnquiry';
export const ROUTE_DOCUMENTS = 'Documents';
export const ROUTE_CATEGORIES = 'Categories';
export const ROUTE_PRODUCT_LISTING = 'ProductListing';
export const ROUTE_CART = 'Cart';
export const ROUTE_ORDERS = 'Orders';
export const ROUTE_QUICK_REORDER = 'QuickReorder';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE_LOGIN}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTE_LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTE_FORGOT_PASSWORD} component={ForgotPasswordScreen} />
      <Stack.Screen name={ROUTE_SELECT_ACCOUNT} component={SelectAccountScreen} />
      <Stack.Screen name={ROUTE_HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTE_NEW_ORDER} component={NewOrderScreen} />
      <Stack.Screen name={ROUTE_FINANCIAL_SUMMARY} component={FinancialSummaryScreen} />
      <Stack.Screen name={ROUTE_VIEW_LEDGER} component={ViewLedgerScreen} />
      <Stack.Screen name={ROUTE_MAKE_PAYMENT} component={MakePaymentScreen} />
      <Stack.Screen name={ROUTE_PROFILE} component={ProfileScreen} />
      <Stack.Screen name={ROUTE_RAISE_ENQUIRY} component={RaiseEnquiryScreen} />
      <Stack.Screen name={ROUTE_DOCUMENTS} component={DocumentsScreen} />
      <Stack.Screen name={ROUTE_CATEGORIES} component={CategoryScreen} />
      <Stack.Screen name={ROUTE_PRODUCT_LISTING} component={ProductListingScreen} />
      <Stack.Screen name={ROUTE_CART} component={CartScreen} />
      <Stack.Screen name={ROUTE_ORDERS} component={OrdersScreen} />
      <Stack.Screen name={ROUTE_QUICK_REORDER} component={QuickReordersScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
