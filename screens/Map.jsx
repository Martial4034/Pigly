import React, { useContext, useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert, Text, Image, Animated, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import RestaurantContext from '../context/RestaurantContext';
import RestaurantDetails from '../components/Map/RestaurantDetails';
import SearchBar from '../components/Map/SearchBar';
import * as Location from 'expo-location';

export default function Map({ navigation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { restaurants } = useContext(RestaurantContext);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const screenHeight = Dimensions.get('window').height;
  const detailsPosition = useRef(new Animated.Value(screenHeight)).current;

  const [searchBarVisible, setSearchBarVisible] = useState(true);
  const searchBarHeight = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "L'accès à la localisation est nécessaire pour cette fonctionnalité.");
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        Alert.alert("Erreur", "Impossible de récupérer la localisation.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const showDetails = () => {
    Animated.timing(detailsPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideDetails = () => {
    Animated.timing(detailsPosition, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Selection of a new restaurant
  const onSelectRestaurant = (restaurant) => {
    if (selectedRestaurant) {
      hideDetails(); // First, hide the current details
      setTimeout(() => {
        setSelectedRestaurant(restaurant);
        showDetails(); // Then, show the new details
      }, 300);
    } else {
      setSelectedRestaurant(restaurant);
      showDetails();
    }
  };

  const toggleSearchBar = () => {
    if (searchBarVisible) {
      Animated.timing(searchBarHeight, {
        toValue: -50, // Assuming the SearchBar's height is 50
        duration: 200,
        useNativeDriver: true,
      }).start(() => setSearchBarVisible(false));
    } else {
      setSearchBarVisible(true);
      Animated.timing(searchBarHeight, {
        toValue: 0, // Slide in from the top
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };


  // Dismiss details when tapping outside
  const onMapPress = () => {
    // Affiché la searchBar
    toggleSearchBar();
    if (selectedRestaurant) {
      hideDetails();
      setTimeout(() => setSelectedRestaurant(null), 200);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : userLocation ? (
        <MapView onPress={onMapPress}
          style={styles.map}
          initialRegion={{
            ...userLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={userLocation}
            title="Votre position"
            pinColor="blue"
          />
          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(restaurant.position.lat),
                longitude: parseFloat(restaurant.position.long),
              }}
              title={restaurant.nom}
              onPress={() => onSelectRestaurant(restaurant)}
            >
              <Callout tooltip onPress={() => onSelectRestaurant(restaurant)}>
                <View style={styles.calloutView}>
                  <Image source={{ uri: restaurant.photo[0] }} style={styles.calloutImage} />
                  <Text style={styles.calloutText}>{restaurant.nom}</Text>
                </View>
              </Callout>
            </Marker>

          ))}
        </MapView>
      ) : (
        <Text>La carte est en cours de chargement...</Text>
      )}
      {selectedRestaurant && (
        <Animated.View
          style={[
            styles.detailsContainer,
            { transform: [{ translateY: detailsPosition }] },
          ]}
        >
          <RestaurantDetails restaurant={selectedRestaurant} onClose={hideDetails} />
        </Animated.View>
      )}
      {searchBarVisible && (
        <Animated.View
          style={{
            style: styles.searchBarPosition,
            transform: [{ translateY: searchBarHeight }]
          }}
        >
          <SearchBar onSearch={() => {/* handle the search logic */ }} />
        </Animated.View>
      )
      }

    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    alignSelf: 'stretch',
    height: '100%',
  },
  calloutView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    maxWidth: 250,
    elevation: 3,
  },
  calloutImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  calloutText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  searchBarPosition: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
