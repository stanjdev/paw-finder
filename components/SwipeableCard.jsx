import React, { useState, useEffect, useRef } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Dimensions, 
  Image, 
  TouchableWithoutFeedback,
  Platform,
  Animated,
  PanResponder
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SwipeableCard({ dog, removeCard }) {
  const [ Xposition, setXPosition ] = useState(new Animated.Value(0));
  const [ RightText, setRightText ] = useState(false);
  const [ LeftText, setLeftText ] = useState(false);
  const Card_Opacity = new Animated.Value(1);
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        setXPosition(gestureState.dx);
        if (gestureState.dx > SCREEN_WIDTH - 250) {
          setRightText(true);
          setLeftText(false);
        } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
          setLeftText(true);
          setRightText(false);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (
          gestureState.dx < SCREEN_WIDTH - 150 && 
          gestureState.dx > -SCREEN_WIDTH + 150
        ) {
          setRightText(false);
          setLeftText(false);
          Animated.spring(
            Xposition, {
              toValue: 0, 
              speed: 5, 
              bounciness: 10
            },
            { useNativeDriver: true }
          ).start();
        } else if (gestureState.dx > SCREEN_WIDTH - 150) {
          Animated.parallel(
            [
              Animated.timing(Xposition, {
                toValue: SCREEN_WIDTH,
                duration: 200,
                useNativeDriver: true
              }),
              Animated.timing(Card_Opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
              }),
          ],
          { useNativeDriver: true }
          ).start(() => {
            setLeftText(false);
            setRightText(false);
            removeCard();
          });
        } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
          Animated.parallel(
            [
              Animated.timing(Xposition, {
                toValue: -SCREEN_WIDTH,
                duration: 200,
                useNativeDriver: true
              }),
              Animated.timing(Card_Opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
              }),
            ],
            { useNativeDriver: true }
          ).start(() => {
            setLeftText(false);
            setRightText(false);
            removeCard();
          });
        }
      }
    })
  ).current;

  const rotateCard = Xposition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-20deg', '0deg', '20deg']
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.card_style,
        {
          backgroundColor: dog.backgroundColor,
          opacity: Card_Opacity,
          transform: [
            { translateX: Xposition },
            { rotate: rotateCard },
          ],
        },
      ]}>
        <Text style={styles.Card_Title}>{dog.cardTitle}</Text>
        <Image source={require('../assets/dogs/wally.jpeg')} style={{width: SCREEN_WIDTH, height: 500}} resizeMode="contain" />
        
        {LeftText ? (
          <Text style={styles.Left_Text_Style}> LEFT SWIPE YAY </Text>
        ) : null}
        
        {RightText ? (
          <Text style={styles.Right_Text_Style}> RIGHT SWIPE! YAY </Text>
        ) : null}
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  card_style: {
    width: '75%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 7,
  },

  Card_Title: {
    color: '#fff',
    fontSize: 24,
  },

  Left_Text_Style: {
    top: 22,
    right: 32,
    position: 'absolute',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },

  Right_Text_Style: {
    top: 22,
    left: 32,
    position: 'absolute',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});



