import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const RestaurantCarousel = ({ photos }) => {
    console.log(photos);
    const [activeIndex, setActiveIndex] = useState(0);

    // Pré-charger toutes les images, sauf la première (déjà chargée)
    useEffect(() => {
        const prefetchImages = async () => {
            const prefetchTasks = photos.slice(1).map((image) => Image.prefetch(image));
            await Promise.all(prefetchTasks);
        };

        prefetchImages();
    }, [photos]);

    const renderItem = ({ item }) => (
        <Image source={{ uri: item }} style={styles.image} />
    );

    const renderIndicator = () => (
        <View style={styles.indicatorContainer}>
            {photos.map((_, index) => (
                <View key={index} style={[
                    styles.indicator,
                    activeIndex === index ? styles.activeIndicator : styles.inactiveIndicator,
                ]} />
            ))}
        </View>
    );

    return (
        <View>
            <FlatList
                data={photos}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(
                        e.nativeEvent.contentOffset.x / Dimensions.get('window').width
                    );
                    setActiveIndex(index);
                }}
            />
            {renderIndicator()}
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width,
        height: 435,
    },
    indicatorContainer: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeIndicator: {
        backgroundColor: 'white',
    },
    inactiveIndicator: {
        backgroundColor: 'gray',
    },
});

export default RestaurantCarousel;