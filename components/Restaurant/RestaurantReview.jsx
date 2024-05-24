import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { main } from '../../constants/color';

export default function RestaurantReview({ score, totalReviews }) {
    return (
        <View style={styles.container}>
            <Text style={styles.score}>Score : {score}%</Text>
            <View style={styles.separator} />
            <Text style={styles.reviews}>{totalReviews} avis</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: main.LogoPink,
        height: 100,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    score: {
        fontSize: 24, // Ajustez la taille de police selon vos besoins
        fontWeight: 'bold',
        color: '#000', // Ajustez la couleur selon vos besoins
    },
    separator: {
        width: '70%', // 60% de la largeur de l'écran
        height: 1, // Hauteur de la ligne de séparation
        backgroundColor: main.LogoBlack, // Couleur de la ligne de séparation
        marginVertical: 5, // Espacement vertical autour de la ligne
    },
    reviews: {
        fontSize: 20, // Ajustez la taille de police selon vos besoins
        color: '#000', // Ajustez la couleur selon vos besoins
    },
})
