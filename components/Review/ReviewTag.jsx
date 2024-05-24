// ReviewTag.jsx
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { main } from '../../constants/color';
import * as Font from 'expo-font';

const ReviewTag = ({ text, isSelected, isUnavailable, onSelect }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'Aclonica': require('../../assets/fonts/Aclonica-Regular.ttf'),
    });
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View />;
  }

  const onTagPress = () => {
    if (!isUnavailable) onSelect(text);
  };

  const tagStyle = [
    styles.tag,
    isSelected ? styles.tagSelected : isUnavailable ? styles.tagUnavailable : styles.tagAvailable,
  ];

  const textStyle = [
    styles.text,
    isSelected ? styles.textSelected : isUnavailable ? styles.textUnavailable : styles.textAvailable,
  ];

  return (
    <TouchableOpacity onPress={onTagPress} style={tagStyle}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '50%',
  },
  tagAvailable: {
    backgroundColor: 'transparent',
    borderColor: main.LogoPink,
  },
  tagSelected: {
    backgroundColor: main.LogoPink,
    borderColor: main.LogoPink,
  },
  tagUnavailable: {
    backgroundColor: 'transparent',
    borderColor: 'grey',
  },
  text: {
    fontSize: 12,
    fontFamily: 'Aclonica',
  },
  textAvailable: {
    color: main.LogoPink,
  },
  textSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  textUnavailable: {
    color: 'grey',
  },
});

export default ReviewTag;
