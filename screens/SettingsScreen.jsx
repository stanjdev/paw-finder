import React from 'react';
import { Text, View, StatusBar, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import AppButton from '../components/AppButton';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from 'expo-font';
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

export default function SettingsScreen({ navigation, route }) {

  const viewScheduled = async () => {
    // See what's scheduled (array): 
    console.log(await Notifications.getAllScheduledNotificationsAsync());
  }

  const killSwitch = async () => {
    // EMERGENCY KILL SWITCH
    console.log(await Notifications.cancelAllScheduledNotificationsAsync());
  };

  const isFocused = useIsFocused();

  let [fontsLoaded] = useFonts({
    'Nunito-Regular': require('../assets/fonts/Nunito/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('../assets/fonts/Nunito/Nunito-SemiBold.ttf'),
    'Nunito-ExtraBold': require('../assets/fonts/Nunito/Nunito-ExtraBold.ttf'),
  });


  return (
    <View style={{ flex: 1, resizeMode: "cover", justifyContent: "center", backgroundColor: "white" }}>
      {isFocused ? <StatusBar hidden={false} barStyle="dark-content"/> : null} 
      <TouchableOpacity onPress={() => navigation.navigate('MainSwipeScreen')} style={{ padding: 10, position: "absolute", top: height * 0.052, zIndex: 100, left: 10, }}>
        <Image source={require('../assets/screen-icons/back-arrow.png')} style={{ height: 23, width: 23 }} resizeMode="contain"/>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate('AddHabitScreen', { sets, workTime, rest })} style={{ padding: 10, position: "absolute", top: height * 0.063, right: width * 0.05, zIndex: 100,  }}>
        <Image source={require('../assets/screen-icons/plus-symbol.png')} style={{height: 20, width: 20}} resizeMode="contain"/>
      </TouchableOpacity> */}

      <View style={{marginTop: 20}}>
      <Text style={[{textAlign: "center", fontSize: 36, zIndex: -1, width: width}, styles.nunitoExtraBold]}>Settings</Text>
        <View style={{flexDirection: "row", padding: 20}}>
          <View style={{backgroundColor: "white", flex: 1, height: height * 0.8, justifyContent: "space-around", alignItems: "center" }}>

            <View style={{borderColor: 'blue', borderWidth: 2, width: '100%', padding: 20}}>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Size</Text>
                <Text style={[ styles.nunitoRegular ]}>Small</Text>
              </View>

              <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.5 }}/>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Age</Text>
                <Text style={[ styles.nunitoRegular ]}>Puppy (0-2 years)</Text>
              </View>

              <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.5 }}/>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Coat Color</Text>
                <Text style={[ styles.nunitoRegular ]}>Light Brown</Text>
              </View>

              <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.5 }}/>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Breed</Text>
                <Text style={[ styles.nunitoRegular ]}>Basenji</Text>
              </View>
              
              <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.5 }}/>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Distance</Text>
                <Text style={[ styles.nunitoRegular ]}>40 miles</Text>
              </View>
            </View>


            <AppButton 
              title="Log Scheduled"
              iconStyles={{height: 14, width: 11 }}
              buttonStyles={styles.yellowButton}
              buttonTextStyles={styles.buttonText}
              onPress={viewScheduled}
            />
            <AppButton 
              title="Kill Switch"
              iconStyles={{height: 14, width: 11 }}
              buttonStyles={styles.yellowButton}
              buttonTextStyles={styles.buttonText}
              onPress={killSwitch}
            />

          </View>
        </View>
      </View>

    </View>
  )
};


const styles = StyleSheet.create({
  yellowButton: {
    backgroundColor: "#87CEFA",
    height: 47,
    width: width * 0.8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {width: 3, height: 3},
  },
  buttonText: {
    color: "#000",
    // flex: 1,
    // textAlign: "center",
    paddingLeft: 13,
    fontSize: 19,
    letterSpacing: 1,
    fontFamily: "Nunito-Regular"
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
  }
});