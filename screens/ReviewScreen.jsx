import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, SafeAreaView, } from 'react-native';
import Header from '../components/Reusable/Header';
import { useUser } from '../context/UserContext';
import { useAvis } from '../context/AvisContext';
import { main } from '../constants/color';
import ReviewTag from '../components/Review/ReviewTag';
import SubmitButtonReview from '../components/Review/SubmitButtonReview';
import EmotionIcons from '../components/Review/EmotionIcons';

export default function Review({ navigation, route }) {
    const { profile } = useUser();
    console.log(profile);
    const { restaurantId, userId, initialScore } = route.params;
    const [selectedScore, setSelectedScore] = useState(initialScore);
    const [selectedTags, setSelectedTags] = useState({});
    const { addReview, isLoading, tags } = useAvis();
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [reviewLimitReached, setReviewLimitReached] = useState(false); 

    useEffect(() => {
        // Assurer que profile.reviews est bien initialisé et est un tableau
        if (Array.isArray(profile.reviews)) {
          // Filtrer les avis pour ce restaurant
          const reviewCount = profile.reviews.filter(review => review.restaurantId === restaurantId).length;
          setReviewLimitReached(reviewCount >= 2);
        }
      }, [profile.reviews, restaurantId]);
      

    useEffect(() => {
        const allAnswered = Object.values(selectedTags).every(tags => tags?.length > 0);
        setIsButtonEnabled(allAnswered && selectedScore !== null && !reviewLimitReached);
    }, [selectedTags, selectedScore, reviewLimitReached]);

    const handleSelectTag = (category, tag) => {
        setSelectedTags((prevSelectedTags) => {
            const isMultiSelect = tags[category].multiSelect;
            const updatedTags = prevSelectedTags[category] ? [...prevSelectedTags[category]] : [];
            const tagIndex = updatedTags.indexOf(tag);
            if (tagIndex > -1) updatedTags.splice(tagIndex, 1);
            else updatedTags.push(tag);
            return { ...prevSelectedTags, [category]: isMultiSelect ? updatedTags : [tag] };
        });
    };
    const handleSubmit = () => {
        if (!reviewLimitReached) {
            addReview(restaurantId, userId, selectedScore, selectedTags);
            navigation.navigate("RestaurantScreen", { restaurantId });
        }
    };

    if (isLoading) return <ActivityIndicator size="large" color="#00ff00" />;

    return (
        <View style={styles.container}>
            <Header />
            <SafeAreaView style={styles.safeAreaView}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>Retour</Text>
                </TouchableOpacity>
            </SafeAreaView>

            <Text style={styles.title}>Ajouter un avis</Text>
            <EmotionIcons initialScore={initialScore} onSelectScore={setSelectedScore} />

            {Object.entries(tags).map(([category, value]) => (
                <View key={category}>
                    <Text style={styles.question}>{value.question}</Text>
                    <View style={styles.tagContainer}>
                        {value.choices.map((tag) => (
                            <ReviewTag
                                key={tag}
                                text={tag}
                                isSelected={selectedTags[category]?.includes(tag)}
                                onSelect={() => handleSelectTag(category, tag)}
                            />
                        ))}
                    </View>
                </View>
            ))}

            <SubmitButtonReview
                isEnabled={!reviewLimitReached && isButtonEnabled}
                onPress={handleSubmit}
                title={reviewLimitReached ? "Maximum 2 avis par restaurant" : "Enregistrer mon avis"}
            />        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14,
        backgroundColor: main.LogoBlack,
    },
    title: {
        color: main.White, // Blanc
        fontSize: 26,
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sentimentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#ff69b4', // Rose
        borderRadius: 20,
        padding: 10,
        width: '80%', // ou la largeur souhaitée
    },
    iconWrapper: {
        padding: 10,
        // Ajouter d'autres styles si nécessaire
    },
    selected: {
        transform: [{ scale: 1.1 }], // Changez selon l'effet désiré
        // Ajouter d'autres styles pour l'icône sélectionnée
    },
    // Question du tag
    question: {
        color: main.White, // Blanc
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },

    // Remarques
    inputRemarques: {
        height: 40,
        borderColor: 'gray',
        padding: 10,
        borderWidth: 1,
        width: '80%',
        marginBottom: 20,
        color: main.White, // Blancde
    },
    space: {
        height: 20,
    },
    backButton: {
        marginTop: 20,
        marginLeft: 10,
    },
    backText: {
        color: main.LogoPink,
        fontSize: 16,
    },
});
