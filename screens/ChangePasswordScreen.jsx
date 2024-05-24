import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { main } from '../constants/color';
import Header from '../components/Reusable/Header';

const ChangePasswordScreen = () => {
    const navigation = useNavigation(); // Assurez-vous que useNavigation est importé
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { changeUserPassword, reauthenticate } = useAuth(); // Récupérez changeUserPassword du contexte

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        if (newPassword.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }

        // Appel de la fonction changeUserPassword avec le nouveau mot de passe
        // Ensuite, relog l'utilisateur avec son mot de passe actuel
        reauthenticate(currentPassword)
            .then(() => {
                // Après une authentification réussie, changez le mot de passe
                return changeUserPassword(newPassword);
            })
            .then(() => {
                // Gérer la réussite
                setError('');
                alert('Mot de passe changé avec succès.');
                navigation.goBack(); // Retourner à l'écran précédent
            })
            .catch((error) => {
                // Gérer l'erreur de réauthentification ou de changement de mot de passe
                setError(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Header />
            <SafeAreaView style={styles.safeAreaView}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("SettingsScreen")}
                >
                    <Text style={styles.backText}>Retour</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <Text style={styles.text}>Défini ton nouveau Mot De Passe.</Text>
            <TextInput
                style={styles.input}
                placeholder="Mot de passe actuel"
                placeholderTextColor={main.Grey}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Nouveau mot de passe"
                placeholderTextColor={main.Grey}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmez le nouveau mot de passe"
                placeholderTextColor={main.Grey}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity
                style={styles.button}
                onPress={handleChangePassword}
            >
                <Text>Changer le mot de passe</Text>
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

export default ChangePasswordScreen;