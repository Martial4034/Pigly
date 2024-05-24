import React, { useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import LikeIcon from '../../assets/icons/LikeThis.svg';
import DisLikeIcon from '../../assets/icons/DisLikeThis.svg';
import LoveIcon from '../../assets/icons/LoveThis.svg';


const Rating = ({ onRating }) => {
  const [rating, setRating] = useState(null); // null, 'like', 'dislike', 'love'
  const scaleAnim = new Animated.Value(1);

  const animateIcon = (newRating) => {
    setRating(newRating);
    onRating(newRating);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <Animated.View style={{ transform: [{ scale: rating === 'dislike' ? scaleAnim : 1 }] }}>
        <TouchableOpacity onPress={() => animateIcon('dislike')}>
          <DisLikeIcon fill={rating === 'dislike' ? 'red' : 'grey'} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={{ transform: [{ scale: rating === 'like' ? scaleAnim : 1 }] }}>
        <TouchableOpacity onPress={() => animateIcon('like')}>
          <LikeIcon fill={rating === 'like' ? 'blue' : 'grey'} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: rating === 'love' ? scaleAnim : 1 }] }}>
        <TouchableOpacity onPress={() => animateIcon('love')}>
          <LoveIcon fill={rating === 'love' ? 'green' : 'grey'} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
export default Rating;