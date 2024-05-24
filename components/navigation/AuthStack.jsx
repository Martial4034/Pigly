import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import SignUpScreen from '../../screens/SignUpScreen';
import SignInScreen from '../../screens/SignInScreen';
import ForgotPassword from '../../screens/ForgotPasswordScreen';
import FirstPage from '../../screens/FirstPage';
import TastePicker from '../../screens/TastePicker';

export default function AuthStackComponent() {
    const MainNavigation = createNativeStackNavigator();
    
    return (
        <MainNavigation.Navigator initialRouteName="FirstPage" screenOptions={{ headerShown: false }}>
            <MainNavigation.Screen name="FirstPage" component={FirstPage} />
            <MainNavigation.Screen name="SignUp" component={SignUpScreen} />
            <MainNavigation.Screen name="SignIn" component={SignInScreen} />
            <MainNavigation.Screen name="TastePicker" component={TastePicker}/>
            <MainNavigation.Screen name="ForgotPassword" component={ForgotPassword}/>
        </MainNavigation.Navigator>
    )
}
