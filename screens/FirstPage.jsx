import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function FirstPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur notre application!</Text>
      <Button 
        title="Inscription"
        onPress={() => navigation.navigate('SignUp')}
        color="#4CAF50"
      />
      
      <View style={styles.space} />
      
      <Button 
        title="Connexion"
        onPress={() => navigation.navigate('SignIn')}
        color="#2196F3"
      />

      <Button 
        title="TastePicker"
        onPress={() => navigation.navigate('TastePicker')}
        color="#2196F3"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  space: {
    height: 20,
  },
});
