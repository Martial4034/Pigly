import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { main } from '../../constants/color';
import { useMenu } from '../../context/MenuContext';

const RestaurantMenu = ({ restaurantId }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const { categoryData, fetchAllData } = useMenu();
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [underlineAnim] = useState(new Animated.Value(0));

  const SLIDER_WIDTH = Dimensions.get('window').width * 0.85;
  const ITEM_WIDTH = SLIDER_WIDTH * 0.8; // 80% de la largeur de l'écran

  // Charger toutes les données au démarrage du composant
  useEffect(() => {
    setIsLoadingComplete(false);
    fetchAllData(restaurantId).then(() => {
      setIsLoadingComplete(true);
      // Sélectionnez la première catégorie par défaut si possible
      if (Object.keys(categoryData).length > 0) {
        setSelectedCategoryIndex(0);
      }
    });
  }, [restaurantId, fetchAllData]);

  // Afficher les éléments de la catégorie sélectionnée
  const renderCategoryItems = ({ item }) => {
    const categoryItems = categoryData[item] || [];
    
    return (
      <View style={styles.categoryContainer}>
        {categoryItems.map((plat, index) => (
          <View style={styles.RowMenu} key={plat.id || index}>
            <View style={styles.DetailsContainer}>
              <Text style={styles.TitrePlat}>{plat.titre}</Text>
              <Text style={styles.DescriptionPlat}>{plat.description}</Text>
            </View>
            <Text style={styles.Prix}>{`${plat.prix} €`}</Text>
          </View>
        ))}
      </View>
    );
  };

  const handleCarouselChange = (index) => {
    console.log("Carousel changed to indx: ", index);
    selectCategory(index);
  };

  const selectCategory = (index) => {
    setSelectedCategoryIndex(index);
    console.log(`La catégorie sélectionnée: ${Object.keys(categoryData)[index]}`, categoryData[Object.keys(categoryData)[index]]);
  };

  return (
    <View style={styles.container}>
      {/* Titres des catégories (cliquables)*/}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      >
        {Object.keys(categoryData).map((categoryName, index) => (
          <TouchableOpacity
            key={categoryName}
            style={[
              styles.categoryButton,
              index === selectedCategoryIndex && styles.categoryButtonSelected,
            ]}
            onPress={() => selectCategory(index)}
          >
            <Text
              style={[
                styles.Title,
                index === selectedCategoryIndex && styles.TitleSelected,
              ]}
            >
              {categoryName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Carousel par catégorie sélectionnée */}
      {isLoadingComplete ? (
        <Carousel
        data={Object.keys(categoryData)} // On passe les donées
        renderItem={renderCategoryItems}  // on affiche
          width={SLIDER_WIDTH} // largeur du carousel =>  fonctionnel mais pas sur que ce soit le mieux.. 
          height={SLIDER_WIDTH} // hauteur du carousel => fonctionnel mais pas sur que ce soit le mieux.. 
          itemWidth={ITEM_WIDTH} // largeur des items =>  fonctionnel mais pas sur que ce soit le mieux.. 
          onSnapToItem={handleCarouselChange} // lorsque l'on change de catégorie on change l'index
        />
      ) : (
        <Text>Chargement en cours...</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: main.LogoBlack,
    borderRadius: 14,
    padding: 8,
    marginBottom: 10
  },
  Title: {
    fontSize: 20,
    fontWeight: '600'
  },
  categoriesScroll: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  RowMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  DetailsContainer: {
    flex: 1,
    marginRight: 12,
  },
  TitrePlat: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  DescriptionPlat: {
    color: 'rgba(0, 0, 0, .6)',
    flexWrap: 'wrap',
  },
  Prix: {
    width: 60,
    fontSize: 16,
    color: 'black',
    textAlign: 'right',
  },
  categoryButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  categoryButtonSelected: {
    borderBottomWidth: 2,
    borderBottomColor: main.LogoBlack
  },
})
export default RestaurantMenu;