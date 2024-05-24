import { StyleSheet, View, Button, Text, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import Header from '../components/Reusable/Header';
import RestaurantCarroussel from '../components/Home/RestaurantCarroussel';
import RestaurantTag from '../components/Restaurant/RestaurantTag';
import Top10Slider from '../components/Home/Top10Slider';
import RestaurantContext from '../context/RestaurantContext';
import RestaurantCard from '../components/Home/RestaurantCard';



export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header/>
      <RestaurantCarroussel/>
      <View style={styles.subTitleBlock}>
        <Text style={styles.subTitle}>Les 10 meilleurs</Text>
        <RestaurantTag text='Lyon'/>
      </View>
      <Top10Slider/>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCarrousel:{
    flexDirection: 'row',
    paddingBottom: 500
  },
  container: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  subTitleBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '700'
  }
});
