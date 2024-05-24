import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { PasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ForgotPasswordScreen() {

    const navigation = useNavigation();
    const { resetPassword } = useAuth();
    
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    // Gestion d'affichage des Erreurs
    const [errorEmail, setErrorEmail] = useState('');



    const sendPasswordResetEmail = () => {
        // Reset des erreurs
        setErrorEmail('');
        setSuccessMessage('');
        let isValid = true; // Pour suivre la validité des champs
         //Verif de l'email saisie ?
         if (!email.trim()) {
            setErrorEmail("L'email est requis");
            isValid = false;
        }
        if (isValid){
            resetPassword(email)
            .then(() => {
                setSuccessMessage('Un email de réinitialisation de mot de passe a été envoyé à ' + email + '.');
            }
            )
            .catch((error) => {
                if (error.code === 'auth/invalid-email') {
                    setErrorEmail("Désoler, mais l'email saisie semble incorrect");
                }
                console.error("Erreur lors de l'envoie du mail", error);
            });
        }
    };



    return (
        <View style={styles.container}>
            <SafeAreaView>
                <TouchableOpacity
                    style={styles.BackBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text>Retour</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <Text style={styles.text}>Tu as oublié ton {'\n'}Mot de passe ? </Text>
            <View style={styles.main}>
            <TextInput
                    style={styles.input}
                    placeholder="Indique nous ton email"
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                />
                {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}
                {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
            </View>
            <TouchableOpacity
                onPress={() => sendPasswordResetEmail()}
                style={styles.button}
            >
                <Text>Recevoir mon lien</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={styles.button2}
            >
            <Text style={styles.txtBtn2}>Tu n'as pas de compte? Inscris toi</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    // Je met mes styles ici comme ca tu peux voir aisément ce que je touche
    errorText: {
        fontSize: 13,
        color: 'red',
        marginLeft: '10%',
        marginBottom: 5,
    },
    successText: {
        fontSize: 13,
        color: 'green',
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 34,
        color: 'white',
        marginTop: '5%',
        marginLeft: '10%'
    },
    text2: {
        fontWeight: 'light',
        fontSize: 20,
        color: 'white',
        marginTop: '5%',
        marginLeft: '10%'
    },
    txtBtn2: {
        color: 'white'
    },
    main: {
        width: '100%',
        marginTop: '10%'
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
    button2: {
        marginTop: 20,
        marginLeft: '10%',
        marginRight: '10%',
        alignItems: 'center'
    },
    BackBtn: {
        marginLeft: '10%'
    }
})