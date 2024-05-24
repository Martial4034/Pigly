import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { main } from '../constants/color';

export default function SignInScreen() {
    const navigation = useNavigation();
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const SignInUser = () => {
        setErrorEmail('');
        setErrorPassword('');

        let isValid = true;

        if (!email.trim()) {
            setErrorEmail("L'email est requis");
            isValid = false;
        }
        if (!password.trim()) {
            setErrorPassword("Le mot de passe est requis");
            isValid = false;
        }

        if (isValid) {
            signIn(email, password)
                .then(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main' }],
                    });
                })
                .catch((error) => {
                    if (error.code === 'auth/invalid-credential') {
                        setErrorPassword("L'email ou le mot de passe est incorrect");
                    }
                    console.error('Erreur lors de la connexion:', error);
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
            <Text style={styles.text}>Content de te {'\n'} revoir.</Text>
            <View style={styles.main}>
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
                onPress={SignInUser}
                style={styles.button}
            >
                <Text>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                style={styles.button2}
            >
                <Text style={styles.txtBtn2}>Mot de passe oublier ?</Text>
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
                <Text>Se connecter avec google</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => console.log('facebook')}
                style={styles.buttonFacebook}
            >
                <Text style={styles.txtBtn2}>Se connecter avec facebook</Text>
            </TouchableOpacity> */}

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
    container: {
        flex: 1,
        backgroundColor: main.LogoBlack
    },
    text: {
        fontWeight: 'bold',
        fontSize: 37,
        color: 'white',
        marginTop: '15%',
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
        marginTop: 30,
    },
    txtseparator: {
        paddingTop: 20, // j'ai rajouté car ca n'était pas aligné verticalement
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