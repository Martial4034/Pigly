import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import RestaurantContext from '../../context/RestaurantContext';
 

const RestaurantMap = () => {
  const navigation = useNavigation();
  const [mapRegion, setMapRegion] = useState(null);
  const { restaurants } = useContext(RestaurantContext);
  const restaurant = restaurants[0];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "L'accès à la localisation est nécessaire pour cette fonctionnalité.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMapRegion({
        latitude: restaurant?.position.lat,
        longitude: restaurant?.position.long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>

      {mapRegion && (
        <MapView
          style={{ alignSelf: 'stretch', height: '100%' }}
          region={mapRegion}
        >
          <Marker coordinate={mapRegion} />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'blacks'
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 14,
    zIndex: 5, 
  },
  backIcon: {
    width: 35, 
    height: 35
  }
});

export default RestaurantMap;