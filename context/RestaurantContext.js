import React, { createContext, useState, useEffect } from 'react';
import { FB_DB } from '../firebaseconfig';
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore';

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantMood, setRestaurantMood] = useState([]); // État pour RestaurantMood
  const [barMood, setBarMood] = useState([]); // État pour BarMood
  const restaurantsCollectionRef = collection(FB_DB, 'restaurants');
  const moodDocRef = doc(FB_DB, 'mood', 'dwD20IIk076jaEVJhLgO');

  useEffect(() => {
    const unsubscribeFromRestaurants = onSnapshot(restaurantsCollectionRef, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRestaurants(data);
    });

    const fetchMoods = async () => {
      const docSnap = await getDoc(moodDocRef);
      if (docSnap.exists()) {
        const moodData = docSnap.data();
        setRestaurantMood(moodData.RestaurantMood); // Met à jour l'état avec RestaurantMood
        setBarMood(moodData.BarMood); // Met à jour l'état avec BarMood
      } else {
        console.log("Document mood not found");
      }
    };

    fetchMoods();

    return () => {
      unsubscribeFromRestaurants();
    };
  }, []);

  return (
    <RestaurantContext.Provider value={{ restaurants, restaurantMood, barMood }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContext;
