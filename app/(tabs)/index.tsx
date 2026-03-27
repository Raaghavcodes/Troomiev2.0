import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Animated, PanResponder, Image } from 'react-native';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

const DUMMY_DATA = [
  { id: '1', name: 'John Doe', age: 22, city: 'New York', property: '3 bed 2 bath', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80' },
  { id: '2', name: 'Sarah Smith', age: 24, city: 'Los Angeles', property: '2 bed 1 bath', image: 'https://images.unsplash.com/photo-1502672260266-1c1de2d9d10e?auto=format&fit=crop&w=800&q=80' },
  { id: '3', name: 'Mike Ross', age: 28, city: 'Chicago', property: '4 bed 2 bath', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80' },
];

export default function MatchingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  // PanResponder to handle swiping gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          // Swipe Right (Like)
          forceSwipe('right');
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          // Swipe Left (Dislike)
          forceSwipe('left');
        } else {
          // Reset
          resetPosition();
        }
      }
    })
  ).current;

  const forceSwipe = (direction: 'right' | 'left') => {
    const x = direction === 'right' ? width * 1.5 : -width * 1.5;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: 'right' | 'left') => {
    // Record swipe action in backend here
    console.log(`Swiped ${direction} on User ${DUMMY_DATA[currentIndex].name}`);
    
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((prev) => prev + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      useNativeDriver: false
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-width * 1.5, 0, width * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  };

  const renderCards = () => {
    if (currentIndex >= DUMMY_DATA.length) {
      return (
         <View style={styles.noMoreCards}>
           <Text style={styles.noMoreText}>No more potential housemates in your area.</Text>
         </View>
      );
    }

    // We render the cards in reverse order so the current one is on top.
    return DUMMY_DATA.map((item, index) => {
      if (index < currentIndex) return null;

      if (index === currentIndex) {
        return (
          <Animated.View
            key={item.id}
            style={[getCardStyle(), styles.card, { zIndex: 99 }]}
            {...panResponder.panHandlers}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoBox}>
               <Text style={styles.name}>{item.name}, {item.age}</Text>
               <Text style={styles.property}>{item.property} - {item.city}</Text>
            </View>
            
            {/* Swipe Labels */}
            <Animated.View style={[styles.likeLabel, { opacity: position.x.interpolate({ inputRange: [0, SWIPE_THRESHOLD], outputRange: [0, 1], extrapolate: 'clamp' }) }]}>
               <Text style={styles.likeText}>LIKE</Text>
            </Animated.View>
            <Animated.View style={[styles.nopeLabel, { opacity: position.x.interpolate({ inputRange: [-SWIPE_THRESHOLD, 0], outputRange: [1, 0], extrapolate: 'clamp' }) }]}>
               <Text style={styles.nopeText}>NOPE</Text>
            </Animated.View>
          </Animated.View>
        );
      }

      // Next cards
      return (
        <Animated.View
          key={item.id}
          style={[styles.card, { top: 10 * (index - currentIndex), zIndex: 1 }]}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.infoBox}>
             <Text style={styles.name}>{item.name}, {item.age}</Text>
             <Text style={styles.property}>{item.property} - {item.city}</Text>
          </View>
        </Animated.View>
      );
    }).reverse();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        {renderCards()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc' },
  cardContainer: { flex: 1, marginTop: 20 },
  card: {
    position: 'absolute',
    width: width * 0.9,
    height: '80%',
    left: width * 0.05,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  image: { flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  infoBox: { padding: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  property: { fontSize: 16, color: '#666', marginTop: 4 },
  noMoreCards: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noMoreText: { fontSize: 18, color: '#666' },
  likeLabel: { position: 'absolute', top: 40, left: 40, padding: 10, borderWidth: 4, borderColor: '#4CAF50', borderRadius: 10, transform: [{ rotate: '-20deg' }] },
  likeText: { color: '#4CAF50', fontSize: 32, fontWeight: 'bold' },
  nopeLabel: { position: 'absolute', top: 40, right: 40, padding: 10, borderWidth: 4, borderColor: '#FF5A5F', borderRadius: 10, transform: [{ rotate: '20deg' }] },
  nopeText: { color: '#FF5A5F', fontSize: 32, fontWeight: 'bold' },
});
