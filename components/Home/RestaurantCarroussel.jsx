import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { FB_DB } from '../../firebaseconfig';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import ImageCarroussel from './ImageCarroussel';

const PAGE_WIDTH = Dimensions.get('window').width;

function RestaurantCarroussel() {
  const [restaurants, setRestaurants] = useState([]);
  const progressValue = useSharedValue(0);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const querySnapshot = await getDocs(collection(FB_DB, 'restaurants'));
        const fetchedRestaurants = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRestaurants(fetchedRestaurants);
      } catch (error) {
        console.error("Erreur de récupération des restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <Carousel
        style={{ width: PAGE_WIDTH }}
        loop
        width={PAGE_WIDTH}
        height={PAGE_WIDTH}
        onProgressChange={(_, absoluteProgress) => progressValue.value = absoluteProgress}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={restaurants}
        renderItem={({ item }) => <ImageCarroussel restaurant={item} />}
      />
    </View>
  );
}

export default RestaurantCarroussel;
