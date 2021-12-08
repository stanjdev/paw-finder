import React from 'react';
import { Text, ScrollView, View, StatusBar, Image, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RoundButton from '../components/RoundButton';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from 'expo-font';
const { width, height } = Dimensions.get('window');

const paw = require('../assets/screen-icons/PAW.png');
const chatIcon = require('../assets/screen-icons/contact-buttons/chat-message.png');
const phoneIcon = require('../assets/screen-icons/contact-buttons/phone-call.png');
const videoIcon = require('../assets/screen-icons/contact-buttons/video-call.png');
const calendarIcon = require('../assets/screen-icons/contact-buttons/calendar.png');


export default function DogProfile({ navigation, photoURL, name, route }) {

  const isFocused = useIsFocused();

  const { dog } = route.params;

  let [fontsLoaded] = useFonts({
    'Nunito-Regular': require('../assets/fonts/Nunito/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('../assets/fonts/Nunito/Nunito-SemiBold.ttf'),
    'Nunito-ExtraBold': require('../assets/fonts/Nunito/Nunito-ExtraBold.ttf'),
  });

  const alertMessage = (msgTitle, message) =>
  Alert.alert(
    msgTitle,
    message,
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "OK" }
    ]
  );

  return (
    <View style={{ flex: 1, resizeMode: "cover" }}>
      {isFocused ? <StatusBar hidden={false} barStyle="dark-content"/> : null} 
      <TouchableOpacity onPress={() => navigation.navigate('MainSwipeScreen')} style={{ padding: 10, position: "absolute", top: height * 0.052, zIndex: 100, left: 10, }}>
        <Image source={require('../assets/screen-icons/back-arrow-white.png')} style={{ height: 23, width: 23 }} resizeMode="contain"/>
      </TouchableOpacity>

      <View style={{display: 'flex'}}>
        <View style={{flexDirection: "row", }}>
          <View style={{flex: 1, height: height * 0.8, justifyContent: "space-between", alignItems: "center" }}>

            <View>
              <Image source={dog.imgUrl} style={{width: width, height: 500, }} resizeMode="cover" />
              <View style={styles.nameTag}>
                <Text style={styles.Card_Title}>{dog.name}</Text>
                <View>
                  <Text style={[styles.subText]}>2 miles away, <Text>@ {dog.foundation}</Text></Text>
                </View>
              </View>
            </View>

            <View style={{ width: width, padding: 20 }}>
              <Text style={[styles.nunitoRegular, { fontSize: 18, }]}>About</Text>
              <Text style={[styles.nunitoRegular, ]}>{dog.about}</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: width * 0.4, justifyContent: 'center', }}>
              <RoundButton 
                buttonStyles={[styles.button, styles.buttonColor]}
                icon={chatIcon}
                iconStyles={{ height: 27, width: 27 }}
                onPress={() => alertMessage('Chat Message', 'Are you sure you want to send a chat message?')}
              />
              <RoundButton 
                buttonStyles={[styles.button, styles.buttonColor]}
                icon={phoneIcon}
                iconStyles={{ height: 24, width: 24 }}
                onPress={() => alertMessage('Phone Call', 'Are you sure you want to make a phone call?')}
              />
              <RoundButton 
                buttonStyles={[styles.button, styles.buttonColor]}
                icon={videoIcon}
                iconStyles={{ height: 27, width: 27 }}
                onPress={() => alertMessage('Video Call', 'Are you sure you want to make a video call?')}
              />
              <RoundButton 
                buttonStyles={[styles.button, styles.buttonColor]}
                icon={calendarIcon}
                iconStyles={{ height: 27, width: 27 }}
                onPress={() => alertMessage('Schedule Appointment', 'Are you sure you want schedule a calendar appointment?')}
              />
            </View>

          </View>
        </View>
      </View>

    </View>
  )
};


const styles = StyleSheet.create({
  nameTag: {
    backgroundColor: "#fff",
    height: 74,
    width: width,
    paddingLeft: 15,
    borderRadius: 15,
    alignItems: "flex-start",
    justifyContent: "center",
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {width: 3, height: 3},
    marginTop: -60,
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
    margin: 4,
  },
  buttonColor: {
    backgroundColor: 'white',
  },
  nunitoRegular: {
    fontFamily: "Nunito-Regular"
  },
  nunitoSemiBold: {
    fontFamily: "Nunito-SemiBold"
  },
  nunitoExtraBold: {
    fontFamily: "Nunito-ExtraBold"
  },
  nunitoMedium: {
    fontFamily: "Nunito-Medium"
  },
  Card_Title: {
    color: '#000',
    fontSize: 24,
    fontFamily: "Nunito-ExtraBold"
  },
  subText: {
    fontFamily: 'Nunito-Regular',
    color: '#9B9B9B'
  },
});