import { createContext, useState, useEffect, useContext } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
} from "firebase/auth";
import { FB_AUTH, FB_DB } from "../firebaseconfig";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [hasCompletedTastePicker, setHasCompletedTastePicker] = useState(false);
  const [loading, setLoading] = useState(true);

  // Inscription d'un nouvel utilisateur
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(FB_AUTH, email, password);
  };

  const completeTastePicker = () => {
    setHasCompletedTastePicker(true);
  };

  // Connexion d'un utilisateur
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(FB_AUTH, email, password);
  };

  // Reseter d'un password oublié par email de l'utilisateur
  const resetPassword = (email) => {
    return sendPasswordResetEmail(FB_AUTH, email);
  };

  // Fonction pour changer le mot de passe de l'utilisateur
      // Pour cela il faut d'abord le Reuthenticate
      const reauthenticate = (currentPassword) => {
        const user = FB_AUTH.currentUser;
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
      
        return reauthenticateWithCredential(user, credential);
      };
  const changeUserPassword = (newPassword) => {
    if (!currentUser) {
      return Promise.reject(new Error("Aucun utilisateur connecté."));
    }

    return updatePassword(currentUser, newPassword);
  };
  // Fonction pour changer l'email de l'utilisateur
  const changeUserEmail = (newEmail, currentPassword) => {
    return reauthenticate(currentPassword).then(() => {
      const user = FB_AUTH.currentUser;
      return updateEmail(user, newEmail);
    });
  };

  // Déconnexion de l'utilisateur
  const logOut = () => {
    return signOut(FB_AUTH);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FB_AUTH, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Récupérer les données de l'utilisateur depuis Firestore
        const userRef = doc(FB_DB, "users", user.uid);
        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setHasCompletedTastePicker(
              userData.hasCompletedTastePicker || false
            );
          } else {
            // Si l'utilisateur n'a pas de données dans Firestore
            setHasCompletedTastePicker(false);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données de l'utilisateur :",
            error
          );
          // Gérer l'erreur éventuelle
        }
      } else {
        // Réinitialiser les états lorsque l'utilisateur se déconnecte
        setHasCompletedTastePicker(false);
      }
      setLoading(false); // Données chargées ou utilisateur non connecté
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    logOut,
    resetPassword,
    hasCompletedTastePicker,
    setHasCompletedTastePicker,
    completeTastePicker,
    reauthenticate,
    changeUserPassword,
    changeUserEmail,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
