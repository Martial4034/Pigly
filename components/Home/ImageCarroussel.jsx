import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import ArrowUp from '../../assets/icons/ArrowUp.svg';
import Save from '../../assets/icons/Save.svg';
import SaveFill from '../../assets/icons/SaveFill.svg';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import * as Haptics from 'expo-haptics';


function ImageCarroussel({restaurant}) {
    const navigation = useNavigation();
    const { likes, addLike, removeLike } = useUser(); // Utilisez useUser
    const [isSaved, setIsSaved] = useState(likes.includes(restaurant.id)); // Initialisez isSaved

    useEffect(() => {
        setIsSaved(likes.includes(restaurant.id)); // Mettez à jour isSaved lorsque les likes changent
    }, [likes, restaurant.id]);

    const handleSaveClick = () => {
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          )
        if (isSaved) {
            removeLike(restaurant.id); // Appeler removeLike si le restaurant est déjà en favori
        } else {
            addLike(restaurant.id); // Appeler addLike si le restaurant n'est pas en favori
        }
    };
    const redirectToRestaurantScreen = (restaurantId) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        navigation.navigate('RestaurantScreen', { restaurantId });
      };
    

        return (
        <TouchableWithoutFeedback onPress={() => redirectToRestaurantScreen(restaurant.id)}>
            <View style={styles.container}>
                <ImageBackground source={{ uri: restaurant.photo[0] }} style={styles.image}>
                    <View style={styles.layout}>
                        <View style={styles.top}>
                            <TouchableWithoutFeedback onPress={handleSaveClick}>
                                {isSaved ? <SaveFill width={48} height={48}/> : <Save width={48} height={48} />}
                            </TouchableWithoutFeedback>
                        </View>
                    <View style={styles.bottom}>
                        <View>
                            <Text style={styles.title}>{restaurant.nom}</Text>
                            <Text style={styles.description}>{restaurant.description}</Text>
                        </View>
                    <ArrowUp width={48} height={48} color={'white'}/>
                </View>
            </View>
            </ImageBackground> 
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 400,
        borderRadius: 25,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 8,
    },
    description: {
        fontSize: 14,
        color: 'white',
        maxWidth: '85%'
    },
    layout: {
        display: "flex",
        justifyContent: "space-between",
        height: '100%',
        width: '100%',
        padding: 20,
    },
    top: {
        alignItems: 'flex-end'
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }
});

export default ImageCarroussel;
