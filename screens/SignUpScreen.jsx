import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FB_DB } from '../firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';
import { main } from '../constants/color';

export default function SignUpScreen() {

    const navigation = useNavigation();
    const { signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // Gestion d'affichage des Erreurs
    const [errorFirstName, setErrorFirstName] = useState('');
    const [errorLastName, setErrorLastName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');


    const SignUpUser = () => {
        // Reset des erreurs
        setErrorFirstName('');
        setErrorLastName('');
        setErrorEmail('');
        setErrorPassword('');

        let isValid = true; // Pour suivre la validité des champs

        // Verif du prénom
        if (!firstName.trim()) {
            setErrorFirstName("Le prénom est requis");
            isValid = false;
        }
        // Verif du nom de famille
        if (!lastName.trim()) {
            setErrorLastName("Le nom de famille est requis");
            isValid = false;
        }
        //Verif de l'email
        if (!email.trim()) {
            setErrorEmail("L'email est requis");
            isValid = false;
        }
        // Verif du mot de passe
        if (!password.trim()) {
            setErrorPassword("Le mot de passe est requis");
            isValid = false;
        }

        // Si tout est valide => on peut créer le compte
        if (isValid) {
            signUp(email, password, firstName, lastName)
            .then((userCredential) => {
                // Enregistrement des informations de l'utilisateur dans Firestore
                const userDocRef = doc(FB_DB, 'users', userCredential.user.uid);
                setDoc(userDocRef, {
                    FirstName: firstName,
                    LastName: lastName,
                })
                .then(() => {
                    console.log('Informations de lutilisateur enregistrées dans Firestore');
                    navigation.navigate('TastePicker')
                })
                .catch((error) => {
                    console.error('Erreur lors de lenregistrement des informations de lutilisateur:', error);
                });
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                        setErrorEmail("L'email est déjà utilisé");
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                        setErrorEmail("L'email saisie est invalide");
                    }

                    if (error.code === 'auth/weak-password') {
                        console.log('Mot de passe trop faible');
                        setErrorPassword("Votre mot de passe doit contenir au moins 6 caractères");
                    }
                    console.error(error);
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
            <Text style={styles.text}>Créer un {'\n'}compte. </Text>
            <View style={styles.main}>
                <TextInput
                    style={styles.input}
                    placeholder="Prénom"
                    onChangeText={(text) => setFirstName(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                />
                {errorFirstName ? <Text style={styles.errorText}>{errorFirstName}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Nom de famille"
                    onChangeText={(text) => setLastName(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                />
                {errorLastName ? <Text style={styles.errorText}>{errorLastName}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                />
                {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                />
                {errorPassword ? <Text style={styles.errorText}>{errorPassword}</Text> : null}
            </View>
            <TouchableOpacity
                onPress={() => SignUpUser(email, password, firstName, lastName)}
                style={styles.button}
            >
                <Text>S'inscrire</Text>
            </TouchableOpacity>

            {/* <View style={styles.rowseparator}>
                <View style={styles.separator} />
                <Text style={styles.txtseparator}>Ou</Text>
                <View style={styles.separator} />
            </View>

            <TouchableOpacity
                onPress={() => console.log('google')}
                style={styles.buttonGoogle}
            >
                <Text>S'inscrire avec google</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => console.log('facebook')}
                style={styles.buttonFacebook}
            >
                <Text style={styles.txtBtn2}>S'inscrire avec facebook</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
                onPress={() => navigation.navigate('SignIn')}
                style={styles.button2}
            >
                <Text style={styles.txtBtn2}>Tu as déjà un compte? Connecte toi</Text>
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
    container: {
        flex: 1,
        backgroundColor: main.LogoBlack
    },
    text: {
        fontWeight: 'bold',
        fontSize: 37,
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
    rowseparator: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    separator: {
        width: '30%',
        height: 1,
        backgroundColor: 'white',
        marginTop: 25,
    },
    txtseparator: {
        marginTop: 15,
        width: '20%',
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center',
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
    buttonFacebook: {
        marginTop: 20,
        height: 47,
        width: '80%',
        backgroundColor: "#172ACE",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: '10%',
        marginRight: '10%',
    },
    buttonGoogle: {
        marginTop: 50,
        height: 47,
        width: '80%',
        backgroundColor: 'white',
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