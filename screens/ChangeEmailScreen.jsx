import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { main } from '../constants/color';
import Header from '../components/Reusable/Header';
import { useNavigation } from '@react-navigation/native';

/////////////////////////  /////////////////////////

///     Cette fonctionalité n'est pas encore implémentée 
///     Il faudra avant cela mettre en place un systeme de vérification
///     d'email avant de vouloir changer l'email de l'utilisateur 

/////////////////////////  /////////////////////////














const ChangeEmailScreen = () => {
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('');
  const { changeUserEmail } = useAuth();
  const navigation = useNavigation();

  const handleChangeEmail = () => {
    if (newEmail === '') {
      setError("L'adresse email ne peut pas être vide.");
      return;
    }
    changeUserEmail(newEmail, currentPassword)
      .then(() => {
        // Gérer la réussite
        setError('');
        alert('Adresse email changée avec succès.');
        navigation.goBack(); // Retourner à l'écran précédent
      })
      .catch((error) => {
        // Gérer l'erreur
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Header/>
      <SafeAreaView style={styles.safeAreaView}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("SettingsScreen")}
        >
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Text style={styles.text}>Entrez votre nouvelle adresse email.</Text>
      <TextInput
        style={styles.input}
        placeholder="Nouvelle adresse email"
        value={newEmail}
        onChangeText={setNewEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe actuel"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.button}
        onPress={handleChangeEmail}
      >
        <Text>Changer l'adresse email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    // Je met mes styles ici comme ca tu peux voir aisément ce que je touche
    errorText: {
        fontSize: 13,
        color: 'red',
        marginLeft: '10%',
        marginBottom: 5,
    },
    container: {
        backgroundColor: main.LogoBlack,
        flex: 1,
        padding: 10
    },
    text: {
        fontWeight: 'bold',
        fontSize: 37,
        color: 'white',
        marginTop: '15%',
        marginLeft: '10%',
        marginBottom: '10%',
    },
    txtBtn2: {
        color: 'white'
    },
    main: {
        width: '100%',
        marginTop: '15%'
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        marginBottom: 15,
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%'
    },
    button: {
        marginTop: 50,
        height: 47,
        width: '80%',
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: '10%',
        marginRight: '10%'
    },
    backButton: {
        marginTop: 20,
        marginLeft: 10,
    },
    backText: {
        color: main.LogoPink,
        fontSize: 16,
    },
})

export default ChangeEmailScreen;
