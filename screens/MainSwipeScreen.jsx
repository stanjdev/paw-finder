import React, { useState, useEffect, useRef } from 'react';
import { 
  Text, 
  View, 
  Alert, 
  StyleSheet, 
  StatusBar, 
  Dimensions, 
  TouchableOpacity, 
  Image, 
  TouchableWithoutFeedback,
  Platform,
  Animated,
  PanResponder
} from 'react-native';
import SwipeableCard from '../components/SwipeableCard';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AppButton from '../components/AppButton';
import RoundButton from '../components/RoundButton';
const paw = require('../assets/screen-icons/PAW.png');
const trashcan = require('../assets/screen-icons/trashcan.png');
const { width, height } = Dimensions.get('window');
import PresetButton from '../components/PresetButton';

import Constants from 'expo-constants';
import * as Google from 'expo-google-app-auth';
import * as Notifications from 'expo-notifications';


import {sheetID, API_KEY, IOS_CLIENT_ID} from '@env';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    priority: 'high'
  }),
});


import AsyncStorage from '@react-native-async-storage/async-storage';

import { SwipeListView } from 'react-native-swipe-list-view';

export default function MainSwipeScreen ({ route, navigation }) {
  const isFocused = useIsFocused();

  let [fontsLoaded] = useFonts({
    'Nunito-Regular': require('../assets/fonts/Nunito/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('../assets/fonts/Nunito/Nunito-SemiBold.ttf'),
    'Nunito-ExtraBold': require('../assets/fonts/Nunito/Nunito-ExtraBold.ttf'),
  });

  const goBack = () => {
    navigation.navigate("AddHabitScreen");
  }
  const { habitInfo } = route.params;












  const [ dogs, setDogs ] = useState([
    {
      id: '1', card_Title: '人物', backgroundColor: '#FFC107',
    },{
      id: '2', card_Title: 'Card 2', backgroundColor: '#ED2525',
    },{
      id: '3', card_Title: 'Card 3', backgroundColor: '#E7O88E',
    },{
      id: '4', card_Title: 'Card 4', backgroundColor: '#00BCD4',
    },{
      id: '5', card_Title: 'Card 5', backgroundColor: '#FFFB14',
    }
  ]);

  useEffect(() => {
    setDogs(dogs.reverse())
  }, [])

  const removeCard = (id) => {
    dogs.splice(
      dogs.findIndex((x) => x.id === id), 1
    );
  }

  

/* NOTIFICATIONS LOGIC */  
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  let ACCESS_TOKEN = useRef();


  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log('register for push notifs token:', token))
    .catch(err => console.error(err))

    /* NOTIFICATION RESPONSE LISTENERS */
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    
    responseListener.current = Notifications.addNotificationResponseReceivedListener(async response => {
      if (response.actionIdentifier == "expo.modules.notifications.actions.DEFAULT") return;

      const note = response.userText;
      const habit = await response.notification.request.content.data.habit;

      // Actual writing to Google Sheet
      await writeToSheet(habit, note);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])


  /* ASK DEVICE FOR PERMISSION TO SEND NOTIFICATIONS */
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      console.log('Must use physical device for Push Notifications!');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }

  /* GOOGLE SIGN IN FOR ACCESS TOKEN */
  async function signInWithGoogleAsync() {
    try {
      const { type, accessToken, user, refreshToken } = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        //androidClientId: AND_CLIENT_ID,
        scopes: [
          // 'profile', 
          // 'email', 
          'https://www.googleapis.com/auth/spreadsheets',
        ],
      });

      if (type === 'success') {
        return accessToken;
      } else {
        return false;
      }
    } catch (e) {
      return { error: true };
    }
  }


  /* SCHEDULE NOTIFICATION */
  async function schedulePushNotification(habitName) {
    await Notifications.setNotificationCategoryAsync("habit", [
        {
          actionId: "markDone",
          identifier: "markDone",
          buttonTitle: 'DONE',
          isDestructive: false,
          isAuthenticationRequired: false,
          options: {
            opensAppToForeground: false
          }
        },
        {
          actionId: "markDoneAndNote",
          identifier: "markDoneAndNote",
          buttonTitle: 'DONE + ADD NOTE',
          textInput: {
            submitButtonTitle: 'Submit Note',
          },
          isDestructive: false,
          isAuthenticationRequired: false,
          options: {
            opensAppToForeground: false
          }
        },
      ],
    );
    
    // const trigger = new Date();
    // trigger.setHours(9);
    // trigger.setMinutes(0);
    // trigger.setSeconds(0);
    // console.log(trigger);

    // let trigger = Date.now();
    // trigger += 5000;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Simple Habits",
        body: `Did you do: ${habitName}?`,
        data: { 
          data: 'Some data goes here',
          habit: habitName,
          'content-available': 1
        },
        priority: 'high',
        categoryIdentifier: 'habit',
        sound: 'default'
      },
      trigger: {
        // seconds: 0
      }
    });
  }


    // Could be customizable:
    const sheetName = 'simple-habits';
    
    /* SHEET OPERATIONS: */
    // READ:
    const getSheetValues = async () => {
      const request = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}?key=${API_KEY}`
      );
      const data = await request.json();
      return data;
    };
  
    // WRITE: (Requires Access Token)
    const writeToSheet = async (habit, note='') => {
      try {
        const request = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}!A1:E1:append?valueInputOption=USER_ENTERED`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${ACCESS_TOKEN.current}`,
            },
            body: JSON.stringify({
              "range": "simple-habits!A1:E1",
              "majorDimension": "ROWS",
              "values": [
                [habit, Date(), note],
              ],
            }),
          }
        );
        const data = await request.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    };
  

 /* PRESS A HABIT ACTION */
  const pressHabit = async (habitName) => {
    if (!ACCESS_TOKEN.current) {
      ACCESS_TOKEN.current = await signInWithGoogleAsync();
    }
    if (ACCESS_TOKEN.current !== false) await schedulePushNotification(habitName);
  };


  return (
    <View style={styles.container}>
      <StatusBar hidden={false} barStyle="light-content" />

      <View style={{ width: width, flexDirection: "row", alignItems: "center", marginTop: height < 700 ? 40 : height * 0.07, position: "absolute", zIndex: 100 }}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('AddHabitScreen')} style={{ padding: 15, paddingLeft: 0}}>
          <Image source={require('../assets/screen-icons/plus-symbol.png')} style={{height: 20, }} resizeMode="contain"/>
        </TouchableOpacity> */}
        <View style={{ position: 'absolute', top: height * -0.1, width: width, backgroundColor: 'purple', height: height * 0.4, borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }}/>
        <Text style={[{marginLeft: 20, textAlign: "left", fontSize: 36, color: "#E0E0E0", zIndex: 1, width: width}, styles.nunitoExtraBold]}>PawFinder</Text>        
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')} style={{ padding: 10, position: "absolute", top: height * 0.005, right: width * 0.05, zIndex: 100 }}>
          <Image source={require('../assets/screen-icons/settings-gear-white.png')} style={{ height: 27, width: 27 }} resizeMode="contain"/>
        </TouchableOpacity>
      </View>


    {dogs.length ? 
      <View style={{ alignItems: "center", marginTop: height * 0.17, marginBottom: height * 0.05 }}>
        <View style={styles.MainContainer}>
          {dogs.map((dog, key) => {
            <SwipeableCard
              key={key}
              dog={dog}
              removeCard={removeCard}
            />
          })}
        </View>
        <SwipeableCard
          key={12}
          dog={{ id: '5', card_Title: 'Card 5', backgroundColor: '#FFFB14' }}
          removeCard={removeCard}
        />
      </View>
    :
      <View style={{height: height, width: width, justifyContent: "center", alignItems: "center" }}>
        <Text style={[styles.titleText, styles.nunitoSemiBold]}>NO MORE DOGS</Text>
        <RoundButton 
          buttonStyles={[styles.button, styles.buttonColor]}
          buttonTextStyles={[styles.buttonText, styles.nunitoSemiBold]}
          icon={paw}
          iconStyles={{ height: 35, width: 35, marginTop: 8 }}
          onPress={() => console.log('paw!')}
        />
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
    backgroundColor: 'lightblue',
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
    position: "absolute",
    bottom: height * 0.1
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
    color: "white",
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

