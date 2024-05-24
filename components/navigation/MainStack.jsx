import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBarStackComponent from './TabBarStack';
import MoodPickerScreen from '../../screens/MoodPickerScreen';

const Stack = createNativeStackNavigator();

export default function MainStackComponent() {
    return (
        <Stack.Navigator initialRouteName="MoodPickerScreen">
            <Stack.Screen name="HomeTab" component={TabBarStackComponent} options={{ headerShown: false }} />
            <Stack.Screen name="MoodPickerScreen" component={MoodPickerScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}
