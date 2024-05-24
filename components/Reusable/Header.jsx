import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import MoodTag from './MoodTag';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { main } from '../../constants/color';

export default function Header() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'Thunder-BlackLC': require('../../assets/fonts/Thunder-BlackLC.otf'),
    });
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View/>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Pigly</Text>
      <MoodTag/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000000', 
    paddingBottom: Platform.OS === 'android' ? 25 : -25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    fontSize: 40,
    fontFamily: 'Thunder-BlackLC',
    color: main.LogoPink,
  },
});
