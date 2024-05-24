import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { main } from '../../constants/color'

export default function RestaurantTag({text}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: main.LogoBlack,
        height: 25,
        width: 'auto',
        paddingHorizontal: 14,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',     
    },
    text: {
        color: main.LogoPink,
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '600'
    }
})
