import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Reusable/Header';
import RestaurantMoodCard from '../components/MoodPicker/RestaurantMoodCard';
import BarMoodCard from '../components/MoodPicker/BarMoodCard';
import { useUser } from '../context/UserContext';

export default function MoodPickerScreen() {
  const { profile, location } = useUser();

  const formattedLocation = location
    ? `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`
    : 'Localisation non disponible';

  console.log({ formattedLocation });

  const [isLoading, setIsLoading] = useState(false);

  // const callHelloWorldFunction = async () => {
  //   try {
  //     const user = FB_AUTH.currentUser;
  //     if (user) {
  //       const idToken = await user.getIdToken();
  
  //       const response = await fetch('https://us-central1-pigly-7ae8a.cloudfunctions.net/helloWorld', {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${idToken}`
  //         },
  //       });
  
  //       if (!response.ok) {
  //         throw new Error('Problème de réponse du serveur');
  //       }
  
  //       const data = await response.text();
  //       Alert.alert('Réponse de la fonction:', data);
  //     }
  //   } catch (error) {
  //     Alert.alert('Erreur', error.toString());
  //   }
  // };
  

  if (!profile) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.TextContainer}>
      <Text style={styles.title}>Salut {profile.FirstName} {profile.LastName},</Text>
      <Text style={styles.description}>Donne nous ton mood on te propose une liste d’établissement autour de toi.</Text>
      </View>
      <RestaurantMoodCard />
      <BarMoodCard />
      {/* <Button
        title="Test Clound function"
        onPress={callHelloWorldFunction}
        disabled={isLoading}
      />
      {isLoading && <Text>Chargement de la réponse...</Text>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14
  },
  TextContainer: {
    marginVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700'
  },
  description: {
    marginTop: 20,
    fontSize: 16
  },
});
