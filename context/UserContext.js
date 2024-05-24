import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import { doc, getDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { FB_DB } from '../firebaseconfig';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({});
  const [likes, setLikes] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let unsubscribeFromUser = () => {};

    if (currentUser) {
      const userProfileRef = doc(FB_DB, 'users', currentUser.uid);

      unsubscribeFromUser = onSnapshot(userProfileRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setProfile({
            ...userData,
            uid: currentUser.uid
          });
          setLikes(userData.likes || []);
        } else {
          console.log("No such user!");
        }
      });
    }

    return () => unsubscribeFromUser();
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
    })();
  }, []);

  const addLike = async (itemId) => {
    if (currentUser && currentUser.uid) {
      const userRef = doc(FB_DB, 'users', currentUser.uid);
      try {
        await updateDoc(userRef, {
          likes: arrayUnion(itemId)
        });
        setLikes((prevLikes) => [...prevLikes, itemId]);
      } catch (error) {
        console.error('Error adding like:', error);
      }
    }
  };

  const removeLike = async (itemId) => {
    if (currentUser && currentUser.uid) {
      const userRef = doc(FB_DB, 'users', currentUser.uid);
      try {
        await updateDoc(userRef, {
          likes: arrayRemove(itemId)
        });
        setLikes((prevLikes) => prevLikes.filter((like) => like !== itemId));
      } catch (error) {
        console.error('Error removing like:', error);
      }
    }
  };

  const addTastes = async (tasteList) => {
    if (currentUser && currentUser.uid) {
      const userRef = doc(FB_DB, 'users', currentUser.uid);
      try {
        await updateDoc(userRef, {
          tastes: arrayUnion(...tasteList) // Utilisez arrayUnion pour ajouter des éléments uniques
        });
        // Mettez à jour le profil local avec les nouveaux goûts
        setProfile((prevProfile) => ({
          ...prevProfile,
          tastes: [...(prevProfile.tastes || []), ...tasteList]
      }));
    } catch (error) {
  console.error('Error updating tastes:', error);
  }}}
  const toggleNotifications = async (newNotificationValue) => {
    if (currentUser && currentUser.uid) {
      const userRef = doc(FB_DB, 'users', currentUser.uid);
      try {
        await updateDoc(userRef, {
          notifications: newNotificationValue
        });
        setProfile((prevProfile) => ({
          ...prevProfile,
          notifications: newNotificationValue
        }));
      } catch (error) {
        console.error('Error toggling notifications:', error);
      }
    }
  };
  
  
  const value = {
    profile,
    location,
    likes,
    addLike,
    removeLike,
    addTastes,
    toggleNotifications
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
