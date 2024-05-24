import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import RestaurantScreen from '../../screens/RestaurantScreen';
import { useNavigation } from '@react-navigation/native';

export default function RestaurantDetails({ restaurant,  }) {
    const navigation = useNavigation();

    console.log('Restaurant details received:', restaurant);
    if (!restaurant) return null;

  // Fonction pour calculer la distance (à implémenter selon votre logique)
  const getDistanceFromUser = (restaurantLocation) => {
    // Supposons que vous avez la latitude et la longitude de l'utilisateur
    const userLat = 45.764043; // exemple de latitude de l'utilisateur
    const userLong = 4.835659; // exemple de longitude de l'utilisateur

    // Ici, vous calculeriez la distance et la renverriez
    // Pour l'instant, nous allons simplement renvoyer une valeur fictive
    return '0,7 km';
  };
  const redirection = () => {
    navigation.navigate('RestaurantScreen', { restaurantId: restaurant.id }); // Naviguer avec l'ID du restaurant
}


  return (
    <TouchableOpacity style={styles.container} onPress={redirection}>
      <Image source={{ uri: restaurant.photo[0] }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{restaurant.nom}</Text>
        <Text style={styles.distance}>{getDistanceFromUser(restaurant.position)}</Text>
        <View style={styles.tagContainer}>
          {restaurant.tag.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  distance: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e2e2e2',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  tagText: {
    color: '#333',
    fontSize: 12,
  },
});
