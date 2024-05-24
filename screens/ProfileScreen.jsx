import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList,  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Reusable/Header';
import { signOut } from 'firebase/auth';
import { FB_AUTH } from '../firebaseconfig';
import { useUser } from '../context/UserContext';
import RestaurantContext from '../context/RestaurantContext';
import RestaurantCard from '../components/Home/RestaurantCard';
import { main } from '../constants/color';



export default function ProfileScreen() {
    const navigation = useNavigation();
    const { profile, likes } = useUser();
    console.log({ profile });

    const { restaurants } = useContext(RestaurantContext);
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);


    useEffect(() => {
        // Filtrer pour obtenir uniquement les restaurants favoris basés sur les likes
        const updatedFavorites = restaurants.filter(restaurant =>
            likes.includes(restaurant.id)
        );
        setFavoriteRestaurants(updatedFavorites);
        console.log("Favoris mis à jour depuis le contexte", updatedFavorites);
    }, [likes, restaurants]);

    const handleSignOut = () => {
        signOut(FB_AUTH)
            .then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Auth' }],
                });
            })
            .catch((error) => {
                console.error('Erreur lors de la déconnexion:', error);
            });
    };
    //Le menu
    const actions = {
        'Changer mes préférences': () => console.log('Changer mes préferences'),
        'Settings': () => navigation.navigate('SettingsScreen'),
        'Suggérer un mood ou un tag': () => console.log('Suggest Mood/Tag'),
        'Suggérer un restaurant': () => console.log('Suggest Restaurant'),
        'Se déconnecter': handleSignOut,
    };

    const MenuItem = ({ title, onPress }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <Text style={styles.menuItemText}>{title}</Text>
            <Text style={styles.menuItemArrow}>→</Text>
        </TouchableOpacity>
    );

    //Etat de chargement o cas ou ca met du temps a charger
    if (!profile) {
        return <Text>Chargement..</Text>
    }

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.title}>{profile.FirstName} {profile.LastName}!</Text>
            <Text style={styles.restaurantLiked}>Restaurants aimées :</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.containerCarrousel}
                keyboardShouldPersistTaps="handled"
            >
                {favoriteRestaurants.length ? (
                    favoriteRestaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))
                ) : (
                    <Text style={styles.restaurantLiked}>Aucun restaurant en favoris.</Text>
                )}
            </ScrollView>
            <Text style={styles.goutsTitle}>Vos goûts :</Text>
            {profile.tastes && profile.tastes.length > 0 ? (
                <View>
                    {profile.tastes.map((taste, index) => (
                        <Text key={index}>{taste}</Text>
                    ))}
                </View>
            ) : (
                <Text style={styles.goutsElse}>Vous n'avez pas encore sélectionné de goûts.</Text>
            )}
            <FlatList
                data={Object.keys(actions)}
                renderItem={({ item }) => (
                    <MenuItem
                        title={item}
                        onPress={actions[item]} // Passez la fonction correspondante à onPress
                    />
                )}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.menu}
            />
        </View>
    )
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    title: {
        fontSize: width < 350 ? 24 : 27, // Plus petit sur les petits écrans
        fontWeight: 'bold',
        lineHeight: 50,
        textAlign: 'center',
        color: "#fff",
    },
    container: {
        backgroundColor: main.LogoBlack,
        flex: 1,
        padding: 14,
    },
    restaurantLiked: {
        fontWeight: 'bold',
        lineHeight: 50,
        textAlign: 'left',
        color: "#fff",
    },
    containerCarrousel: {
        paddingTop: 10,
        flexDirection: 'row'
    },

    description: {
        marginTop: 32,
        marginBottom: 40,
    },
    goutsTitle: {
        marginTop: 32,
        marginBottom: 10,
        color: "#fff",
    },
    goutsElse: {
        color: "#fff",
    },
    menu: {
        alignItems: 'center', // Centre le contenu horizontalement
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginVertical: 8,
        borderRadius: 10,
        width: width - 28, // Prendre en compte le padding du container
    },
    menuItemText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold', // Si vous voulez que le texte soit en gras
    },
    menuItemArrow: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold', // Si vous voulez que les flèches soient en gras
    },
});