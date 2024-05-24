import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackComponent from './components/navigation/AuthStack';
import MainStackComponent from './components/navigation/MainStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RestaurantProvider } from './context/RestaurantContext';
import { UserProvider } from './context/UserContext';
import { AvisProvider } from './context/AvisContext';
import { MenuProvider } from './context/MenuContext';

const Stack = createNativeStackNavigator();

// Composant AppNavigator
const AppNavigator = () => {
  const { currentUser, hasCompletedTastePicker, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {currentUser ? (
        <Stack.Screen 
          name="Main" 
          component={MainStackComponent} 
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthStackComponent}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

// Composant App
export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <RestaurantProvider>
<AvisProvider>
            <MenuProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                  <AppNavigator />
                </NavigationContainer>
              </GestureHandlerRootView>
            </MenuProvider>
            </AvisProvider>
        </RestaurantProvider>
      </UserProvider>
    </AuthProvider>
  );
}
