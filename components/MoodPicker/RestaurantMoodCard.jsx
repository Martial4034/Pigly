import React, { useState, useRef, useContext } from 'react';
import { StyleSheet, Text, Animated, View, Button, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { main } from '../../constants/color';
import RestaurantContext from '../../context/RestaurantContext';

function RestaurantMoodCard() {
  const { restaurantMood } = useContext(RestaurantContext);
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const position = useRef(new Animated.Value(0)).current;

  const toggleCards = () => {
    Animated.spring(position, {
      toValue: isExpanded ? 0 : 1,
      useNativeDriver: false,
      friction: 5,
      tension: 20,
    }).start();
  
    setIsExpanded(!isExpanded);
  };  

  const cardShadow = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  };

  const getDynamicCardStyle = (index, count) => {
   const stackOffset = 10; 
  const maxOffset = 60; 

  return {
    transform: [{
      translateY: position.interpolate({
        inputRange: [0, 1],
        outputRange: [-maxOffset * index, stackOffset * index], 
      }),
    }],
    zIndex: count - index,
    ...cardShadow,
  };
};

  const stackOffset = 10;
  const maxOffset = 60;
  const expandedHeight = 180 + (restaurantMood.length - 1) * stackOffset;
  const collapsedHeight = expandedHeight + restaurantMood.length * maxOffset;

  const containerHeight = position.interpolate({
    inputRange: [0, 1],
    outputRange: [expandedHeight, collapsedHeight],
  });

  return (
    <Animated.View style={[styles.container, { height: containerHeight }]}>
      <View style={styles.TitleContainer}>
        <Text style={styles.Title}>Restaurant</Text>
        <Button title={isExpanded ? "Voir moins" : "Voir plus"} onPress={toggleCards} />
      </View>
      <View style={styles.cardContainer}>
        {restaurantMood.map((moodItem, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('HomeTab', { screen: 'HomeScreen' })}>
            <Animated.View style={[
              styles.card,
              getDynamicCardStyle(index, restaurantMood.length)
            ]}>
              <Text style={styles.CardTitle}>{moodItem}</Text>
              <Text style={styles.CardSubTitle}>Une sélection de restaurant {moodItem}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  TitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginHorizontal: 'auto',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  card: {
    width: '100%',
    height: 70,
    padding: 8,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: main.LogoBlack,
  },
  CardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: main.LogoPink,
  },
  CardSubTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#939393',
  },
  Title: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default RestaurantMoodCard;
