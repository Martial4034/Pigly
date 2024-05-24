import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Button } from 'react-native'; // Importez TouchableOpacity et ScrollView
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { FB_DB } from '../firebaseconfig';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

const fetchTastes = async () => {
  try {
    const tastesCollectionRef = collection(FB_DB, 'tastes');
    const tastesSnapshot = await getDocs(tastesCollectionRef);
    const tastesList = tastesSnapshot.docs.map((doc) => doc.data().tastes);
    return tastesList[0];
  } catch (error) {
    console.error('Erreur lors de la récupération des goûts depuis Firestore :', error);
    return [];
  }
};

export default function TastePickerScreen() {
  const [tastes, setTastes] = useState([]);
  const [selectedTastes, setSelectedTastes] = useState([]);
  const { addTastes } = useUser(); 
  const { currentUser, completeTastePicker } = useAuth();
  
  useEffect(() => {
    const fetchData = async () => {
      const tastesList = await fetchTastes();
      if (tastesList) {
        setTastes(tastesList);
      }
    };

    fetchData();
  }, []);

  const handleTasteSelection = (taste) => {
    if (selectedTastes.includes(taste)) {
      setSelectedTastes((prevSelectedTastes) =>
        prevSelectedTastes.filter((selectedTaste) => selectedTaste !== taste)
      );
    } else {
      setSelectedTastes((prevSelectedTastes) => [...prevSelectedTastes, taste]);
    }
  };

  const handleSaveTastes = async () => {
    console.log('Goûts sélectionnés :', selectedTastes);
    await addTastes(selectedTastes);
    
    if (currentUser) {
      const userRef = doc(FB_DB, 'users', currentUser.uid);
      await updateDoc(userRef, {
        hasCompletedTastePicker: true
      });
      completeTastePicker(); // Mettre à jour le statut dans AuthContext
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text>Liste des goûts :</Text>
      <ScrollView style={styles.tastesContainer}>
        {tastes && tastes.length > 0 ? (
          tastes.map((taste, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tasteItem,
                selectedTastes.includes(taste) && styles.selectedTasteItem,
              ]}
              onPress={() => handleTasteSelection(taste)}
            >
              <Text>{taste}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Aucun goût trouvé.</Text>
        )}
      </ScrollView>
      <Button title="Sauvegarder" onPress={handleSaveTastes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tastesContainer: {
    maxHeight: 200, // Ajustez la hauteur selon vos besoins
  },
  tasteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  selectedTasteItem: {
    backgroundColor: 'lightblue', // Changez la couleur de fond pour indiquer la sélection
  },
});
