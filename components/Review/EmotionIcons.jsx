// EmotionIcons.jsx
import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import DisLikeIcon from '../../assets/icons/DisLikeThis.svg';
import LikeIcon from '../../assets/icons/LikeThis.svg';
import LoveIcon from '../../assets/icons/LoveThis.svg';
import { main } from '../../constants/color';

const EmotionIcons = ({ initialScore, onSelectScore }) => {
    const [selectedScore, setSelectedScore] = useState(initialScore);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const animateAndSelect = (score) => {
        // Mise à jour de l'état pour refléter la sélection
        setSelectedScore(score);
        onSelectScore(score); // Remonter l'info au composant parent si nécessaire

        // Animation pour l'élément sélectionné
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.5,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            })
        ]).start();
    };

    const Separator = () => <View style={styles.separator} />;

    return (
        <View style={styles.sentimentContainer}>
      {/* Icône Dislike */}
      <TouchableOpacity onPress={() => animateAndSelect(0)}>
        <DisLikeIcon fill={selectedScore === 0 ? 'pink' : 'gray'} width={60} height={60} />
      </TouchableOpacity>

      <Separator />

      {/* Icône Like */}
      <TouchableOpacity onPress={() => animateAndSelect(1)}>
        <LikeIcon fill={selectedScore === 1 ? 'pink' : 'gray'} width={60} height={60} />
      </TouchableOpacity>

      <Separator />

      {/* Icône Love */}
      <TouchableOpacity onPress={() => animateAndSelect(2)}>
        <Animated.View style={{ transform: [{ scale: selectedScore === 2 ? scaleAnim : 1 }] }}>
          <LoveIcon fill={selectedScore === 2 ? 'pink' : 'gray'} width={60} height={60} />
        </Animated.View>
      </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
    sentimentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#ff69b4', // Rose
        borderRadius: 20,
        padding: 10,
        width: '83%', // Réduire la largeur selon vos besoins
        alignSelf: 'center', // Centrer le conteneur
      },
      separator: {
        height: 50,
        width: 1,
        backgroundColor: '#2E2A27',
        alignSelf: 'center', // Centrer verticalement dans le conteneur
      },
});
export default EmotionIcons;
