// Dans MenuContext.js
import React, { createContext, useState, useContext, useEffect, useCallback,} from "react";
import { collection, onSnapshot, doc, getDocs, getDoc,} from "firebase/firestore";
import { FB_DB } from "../firebaseconfig";

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState({}); // { categoryName: [items] }

  const fetchAllData = useCallback(async (restaurantId) => {
    const allData = {};
    if (restaurantId) {
      const restaurantRef = doc(FB_DB, "restaurants", restaurantId);
      const restaurantDoc = await getDoc(restaurantRef);
      if (restaurantDoc.exists()) {
        const categories = restaurantDoc.data().categories || [];
        for (const categoryName of categories) {
          try {
            const itemsCollectionRef = collection(FB_DB, "restaurants", restaurantId, categoryName);
            const querySnapshot = await getDocs(itemsCollectionRef);
            const itemsData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            allData[categoryName] = itemsData;
          } catch (error) {
            console.error(`Erreur de récupération des éléments de la catégorie ${categoryName}:`, error);
          }
        }
      } else {
        console.log("Document restaurant introuvable.");
      }
    }
    setCategoryData(allData);
  }, []);

  return (
    <MenuContext.Provider
      value={{ categoryData, fetchAllData }}
    >
      {children}
    </MenuContext.Provider>
  );
};
