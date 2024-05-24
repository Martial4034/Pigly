import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function RestaurantCard({ restaurant }) {

   const navigation = useNavigation();

    const redirection = () => {
        navigation.navigate('RestaurantScreen', { restaurantId: restaurant.id }); // Naviguer avec l'ID du restaurant
    }

    console.log("Data du restaurant pour RestaurantCard :",{ restaurant });
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={redirection}>
            <ImageBackground source={{ uri: restaurant?.photo[0]}} resizeMode="cover" style={styles.image}>
                <Text style={styles.RestaurantTitle}>{restaurant.nom}</Text>
            </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: 128,
        height: 192,
        borderRadius: 11,
        backgroundColor: 'red',
        overflow: 'hidden',
        marginHorizontal: 4
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    RestaurantTitle: {
        padding: 10,
        color: 'white',
        fontSize: 12,
        fontWeight: '700'
    }
})