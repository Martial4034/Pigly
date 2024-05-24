import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { main } from '../../constants/color'
import { useNavigation } from '@react-navigation/native';

export default function MoodTag() {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.container}>
                <Text style={styles.text}>Romantique</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({    
container: {
    backgroundColor: main.LogoBlack,
    height: 32,
    width: 'auto',
    paddingHorizontal: 10,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',     
},
text: {
    color: main.LogoPink,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600'
}})
