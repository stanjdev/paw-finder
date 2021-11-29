import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  StatusBar, 
  Dimensions, 
  TouchableOpacity, 
  Image, 
  Platform,
} from 'react-native';
import SwipeableCard from '../components/SwipeableCard';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import RoundButton from '../components/RoundButton';
const paw = require('../assets/screen-icons/PAW.png');
const redXButton = require('../assets/screen-icons/x-button.png');

const { width, height } = Dimensions.get('window');

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    priority: 'high'
  }),
});

export default function MainSwipeScreen ({ route, navigation }) {
  const isFocused = useIsFocused();

  let [fontsLoaded] = useFonts({
    'Nunito-Regular': require('../assets/fonts/Nunito/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('../assets/fonts/Nunito/Nunito-SemiBold.ttf'),
    'Nunito-ExtraBold': require('../assets/fonts/Nunito/Nunito-ExtraBold.ttf'),
  });

  const [ dogs, setDogs ] = useState([
    {
      id: '1', 
      card_Title: '人物', 
      backgroundColor: '#FFC107',
      name: 'Bugsy',
      imgUrl: require('../assets/dogs/bugsy.jpeg'),
    }, {
      id: '2', 
      card_Title: 'Card 2', 
      backgroundColor: '#ED2525',
      name: 'Wally',
      imgUrl: require('../assets/dogs/wally.jpeg'),
    }, {
      id: '3', 
      card_Title: 'Card 3', 
      backgroundColor: '#E7O88E',
      name: 'Smiley',
      imgUrl: require('../assets/dogs/smiley.jpeg'),
    }, {
      id: '4', 
      card_Title: 'Card 4', 
      backgroundColor: '#00BCD4',
      name: 'Buster',
      imgUrl: require('../assets/dogs/buster.jpeg'),
    }, {
      id: '5', 
      card_Title: 'Card 5', 
      backgroundColor: '#FFFB14',
      name: 'Fido',
      imgUrl: require('../assets/dogs/fido.jpeg'),
    }
  ]);

  useEffect(() => {
    setDogs(dogs.reverse())
  }, [])

  const removeCard = (id) => {
    dogs.splice(
      dogs.findIndex((x) => x.id === id), 1
    );
    console.log('removed', id, '!')
  }


  return (
    <View style={styles.container}>
      <StatusBar hidden={false} barStyle="light-content" />

      <View style={{ width: width, flexDirection: "row", alignItems: "center", marginTop: height < 700 ? 40 : height * 0.07, position: "absolute", zIndex: 100 }}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('AddHabitScreen')} style={{ padding: 15, paddingLeft: 0}}>
          <Image source={require('../assets/screen-icons/plus-symbol.png')} style={{height: 20, }} resizeMode="contain"/>
        </TouchableOpacity> */}
        <View style={{ position: 'absolute', top: height * -0.1, width: width, backgroundColor: 'purple', height: height * 0.4, borderBottomRightRadius: 50, borderBottomLeftRadius: 50, zIndex: -1 }}/>
        <Text style={[{marginLeft: 20, textAlign: "left", fontSize: 36, color: "#E0E0E0", zIndex: 1, width: width}, styles.nunitoExtraBold]}>PawFinder</Text>        
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')} style={{ padding: 10, position: "absolute", top: height * 0.005, right: width * 0.05, zIndex: 100 }}>
          <Image source={require('../assets/screen-icons/settings-gear-white.png')} style={{ height: 27, width: 27 }} resizeMode="contain"/>
        </TouchableOpacity>
      </View>

    {dogs.length ? 
      <View style={{ alignItems: "center", marginTop: height * 0.15, width: width * 0.8, alignSelf: 'center', marginBottom: height * 0.05, zIndex: 100 }}>
        <View style={styles.MainContainer}>
          {dogs.map((dog, key) => (
            <SwipeableCard
              key={key + 1}
              dog={dog}
              removeCard={removeCard}
            />
          ))}

          <View style={{ display: 'flex', flexDirection: 'row', width: width, height: 70, justifyContent: 'space-evenly', alignItems: 'center', bottom: -height * 0.74 }}>
            <RoundButton 
              buttonStyles={[styles.button, styles.buttonColor]}
              buttonTextStyles={[styles.buttonText, styles.nunitoSemiBold]}
              icon={redXButton}
              iconStyles={{ height: 20, width: 20 }}
              onPress={() => console.log('X pressed')}
            />
            <RoundButton 
              buttonStyles={[styles.button, styles.buttonColor]}
              buttonTextStyles={[styles.buttonText, styles.nunitoSemiBold]}
              icon={paw}
              iconStyles={{ height: 35, width: 35, marginTop: 8 }}
              onPress={() => navigation.navigate('DogProfile')}
            />
          </View>

        </View>
      </View>
    :
      <View style={{height: height, width: width, justifyContent: "center", alignItems: "center" }}>
        <Text style={[styles.titleText, styles.nunitoSemiBold]}>NO MORE DOGS</Text>
      </View>
    }
    </View>
  )
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  container: {
    flex: 1,
    // backgroundColor: 'lightblue',
    // alignItems: 'center'
  },
  image: {
    height: 312,
    width: 312,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    // transform: [{rotateY: "180deg"}]
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 3, height: 3 },
  },
  buttonColor: {
    backgroundColor: 'white',
  },
  buttonText: {
    color: "#000",
    flex: 1,
    textAlign: "center",
    fontSize: 19,
  },
  titleText: {
    color: "#000",
    fontSize: 24,
    // transform: [{rotateY: "180deg"}]
  },
  subTitleText: {
    color: "#828282",
    fontSize: 20,
  },
  nunitoSemiBold: {
    fontFamily: 'Nunito-SemiBold'
  },
  nunitoExtraBold: {
    fontFamily: 'Nunito-ExtraBold'
  },
  rowBack: {
    backgroundColor: 'maroon',
    height: 90,
    width: width * 0.8,
    alignSelf: "flex-end",
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 7,
    marginBottom: 7
  }
});

