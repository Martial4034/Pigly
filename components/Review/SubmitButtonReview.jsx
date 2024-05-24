import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { main } from '../../constants/color';
import * as Font from 'expo-font';

const SubmitButtonReview = ({ isEnabled, onPress, title }) => {

const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'Aclonica': require('../../assets/fonts/Aclonica-Regular.ttf'),
    });
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View />;
  }


  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.button, isEnabled ? styles.buttonEnabled : styles.buttonDisabled]}
      disabled={!isEnabled}
    >
      <Text style={[styles.text, isEnabled ? styles.textEnabled : styles.textDisabled]}>
        {title}
      </Text>
      <Text style={[styles.settingArrow, isEnabled ? styles.settingArrowEnabled : styles.settingArrowDisabled]}>
      →
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      marginTop: '20%',
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignSelf: 'center',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'gray', // Couleur par défaut pour le bouton désactivé
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%', // ou la largeur souhaitée
      marginVertical: 10, // pour ajouter un peu d'espace autour du bouton
    },
    buttonEnabled: {
      borderColor: main.White, // Assurez-vous que cette couleur est définie dans vos constantes
      backgroundColor: main.LogoBlack, // Couleur de fond pour le bouton activé
    },
    buttonDisabled: {
      backgroundColor: '#999999', // Couleur de fond pour le bouton désactivé
    },
    text: {
      fontWeight: 'bold',
      fontFamily: 'Aclonica',
      fontSize: 16,
    },
    textEnabled: {
      color: main.LogoPink, // Couleur du texte pour le bouton activé
    },
    textDisabled: {
      color: 'white', // Couleur du texte pour le bouton désactivé
    },
    settingArrow: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    settingArrowEnabled: {
      color: main.LogoPink, 
    },
    settingArrowDisabled: {
      color: "#999999", 
    },

  });
  
  export default SubmitButtonReview;