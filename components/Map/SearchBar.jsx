import React from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import SearchIcon from '../../assets/icons/Search.svg'; // Assurez-vous que le chemin est correct

const SearchBar = ({ onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Chercher un restaurant..." style={styles.input} />
      <TouchableOpacity onPress={onSearch}>
        <SearchIcon style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Autres styles pour la barre de recherche...
  },
  input: {
    flex: 1,
    // Styles pour le champ de saisie...
  },
  icon: {
    // Styles pour l'icône de recherche...
  },
});

export default SearchBar;
