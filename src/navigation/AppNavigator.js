import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import FinancialSummaryScreen from '../screens/FinancialSummaryScreen';
import MakePaymentScreen from '../screens/MakePaymentScreen';
import NewOrderScreen from '../screens/NewOrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
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
    </Stack.Navigator>
  );
};

export default AppNavigator;
