import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Top10RestaurantCard from './Top10RestaurantCard'

export default function Top10Slider() {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            <Top10RestaurantCard/>
            <Top10RestaurantCard/>
            <Top10RestaurantCard/>
            <Top10RestaurantCard/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})
