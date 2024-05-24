import React, {useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { main } from '../../constants/color'
import RestaurantContext from '../../context/RestaurantContext';

export default function RestaurantDescription() {

    const { restaurants } = useContext(RestaurantContext);
    const restaurant = restaurants[0];

    return (
        <View style={styles.container}>
            <Text style={styles.description}>
                {restaurant?.description}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: main.LogoBlack,
        borderRadius: 14,
        padding: 8,
        marginBottom: 10
    },
    description: {
        fontSize: 16,
      }
})
