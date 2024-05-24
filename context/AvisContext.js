import { createContext, useState, useEffect, useContext } from "react";
import { FB_DB } from "../firebaseconfig";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  runTransaction,
} from "firebase/firestore";

const AvisContext = createContext();

export const useAvis = () => useContext(AvisContext);

export const AvisProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState({});

  // Fonction pour récupérer les tags pour la Review dee pour l'instant tous les restaurant
  // Et a l'avenir pour un restaurant spécifique
  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(FB_DB, "reviews", "listeTag");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Triez les tags ici avant de les mettre à jour dans l'état
          const fetchedTags = docSnap.data();
          const sortedKeys = Object.keys(fetchedTags).sort((a, b) => {
            const orderA = parseInt(a.match(/\d+/)[0], 10);
            const orderB = parseInt(b.match(/\d+/)[0], 10);
            return orderA - orderB;
          });
          const sortedTags = {};
          for (const key of sortedKeys) {
            sortedTags[key] = fetchedTags[key];
          }
          setTags(sortedTags);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
      setIsLoading(false);
    };

    fetchTags();
  }, []);

  const calculateRecommendationScore = (likes, loves, dislikes, totalReviews) => {
    if (totalReviews === 0) return 0;
    // Augmentez l'impact des loves en ajustant leur poids dans le calcul
    const score = ((likes + 3 * loves - dislikes) / (totalReviews * 2)) * 100;
    // Utilisez Math.round pour arrondir à l'unité
    return Math.round(score);
  };
  

  const addReview = async (restaurantId, userId, score, selectedTags) => {
    setIsLoading(true);
    try {
      // Création d'une nouvelle review
      const reviewRef = await addDoc(collection(FB_DB, "reviews"), {
        restaurantId,
        userId,
        score,
        selectedTags,
        date: new Date(),
      });
      const reviewId = reviewRef.id;

      // Mise à jour du document de l'utilisateur avec l'ID de la nouvelle review
      const userRef = doc(FB_DB, "users", userId);
      const userDoc = await getDoc(userRef);
      let userData = userDoc.exists() ? userDoc.data() : {};

      // Si 'reviews' n'existe pas, initialisez-le comme un tableau vide
      if (!userData.reviews) {
        userData.reviews = [];
      }

      // Ajoutez l'ID de la nouvelle review au tableau 'reviews'
      userData.reviews.push({ restaurantId: restaurantId, reviewId: reviewId });

      // Mettez à jour le document de l'utilisateur
      await updateDoc(userRef, { reviews: userData.reviews });
      // Mise à jour du document du restaurant avec les compteurs
      const restaurantRef = doc(FB_DB, "restaurants", restaurantId);
      await runTransaction(FB_DB, async (transaction) => {
        const restaurantDoc = await transaction.get(restaurantRef);
        let restaurantData = restaurantDoc.exists() ? restaurantDoc.data() : {};

        if (!restaurantData.compteur) {
          restaurantData.compteur = {
            totalReviews: 0,
            likes: 0,
            loves: 0,
            dislikes: 0,
            tags: {},
            recommendationScore: 0,
          };
        }

        const updatedCompteur = { ...restaurantData.compteur };
        updatedCompteur.totalReviews += 1;
        updatedCompteur.likes += score === 1 ? 1 : 0;
        updatedCompteur.loves += score === 2 ? 1 : 0;
        updatedCompteur.dislikes += score === 0 ? 1 : 0;

        Object.entries(selectedTags).forEach(([category, tagsArray]) => {
          tagsArray.forEach((tag) => {
            updatedCompteur.tags[category] =
              updatedCompteur.tags[category] || {};
            updatedCompteur.tags[category][tag] =
              (updatedCompteur.tags[category][tag] || 0) + 1;
          });
        });

        const recommendationScore = calculateRecommendationScore(
          updatedCompteur.likes,
          updatedCompteur.loves,
          updatedCompteur.dislikes,
          updatedCompteur.totalReviews
        );
        updatedCompteur.recommendationScore = recommendationScore;

        transaction.set(
          restaurantRef,
          { compteur: updatedCompteur },
          { merge: true }
        );
      });

      console.log("Nouvelle review ajoutée avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la nouvelle review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AvisContext.Provider
      value={{
        addReview,
        isLoading,
        tags,
      }}
    >
      {children}
    </AvisContext.Provider>
  );
};
