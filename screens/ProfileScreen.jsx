import React from 'react';
import { Text, ScrollView, View, StatusBar, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from 'expo-font';
const { width, height } = Dimensions.get('window');

export default function ProfileScreen({ navigation, route }) {
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

      <View style={{marginTop: 20}}>
        <Text style={[{textAlign: "center", fontSize: 36, zIndex: -1, width: width}, styles.nunitoExtraBold]}>Profile</Text>
        <View style={{flexDirection: "row", padding: 20}}>
          <ScrollView style={{backgroundColor: "white", flex: 1, height: height * 0.8 }}>

            <View style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: height * 0.3}}>
              <View>
                <Image source={require('../assets/nice-girl.jpeg')} style={{ height: 150, width: 150, borderRadius: 500, borderWidth: 4, borderColor: '#EEEEEE'}} resizeMethod="auto"/>
                <TouchableOpacity>
                  <Image source={require('../assets/screen-icons/iconaddphoto.png')} style={{ height: 50, width: 50, borderRadius: 500, position: 'absolute' , right: 0, bottom: 0}} resizeMethod="auto"/>
                </TouchableOpacity>
              </View>
              <View style={{display: 'flex', alignItems: 'center', }}>
                <Text style={[styles.nunitoRegular, { fontSize: 20, color: '#000000'}]}>Stephanie</Text>
                <Text style={[styles.nunitoRegular, { fontSize: 16, color: '#898989'}]}>Salt Lake City, UT</Text>
              </View>
            </View>

            <View style={{ borderBottomColor: '#000', borderBottomWidth: 2 }}/>

            <View style={{ width: '100%', padding: 20}}>
              <Text style={[styles.nunitoRegular, { fontSize: 20, color: 'rgb(143,55,255)'}]}>About</Text>
              <Text style={[ styles.nunitoRegular, { color: '#000000', marginTop: 10, marginBottom: 10}]}>Hi, I'm Stephanie! I'm a lover of dogs and I am from Salt Lake City, Utah. I have 3 years of experience fostering dogs and helping them get adopted! I love all animals and I am passionate to work with rescues to make sure dogs are off the streets. I am open to fostering and adopting a dog now!</Text>
              
              <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.5 }}/>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Full Name</Text>
                <Text style={[ styles.nunitoRegular, { color: '#000000' }]}>Stephanie West</Text>
              </View>

              <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.5 }}/>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Email</Text>
                <Text style={[ styles.nunitoRegular, { color: '#000000' }]}>stephwest@gmail.com</Text>
              </View>

              <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.5 }}/>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Work</Text>
                <Text style={[ styles.nunitoRegular, { color: '#000000' }]}>Software Engineer</Text>
              </View>

              <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.5 }}/>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Education</Text> 
                <Text style={[ styles.nunitoRegular, { color: '#000000' }]}>Dominican University</Text>
              </View>
              
              <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.5 }}/>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Social Media</Text>
                <Text style={[ styles.nunitoRegular, { color: '#000000' }]}>@stephwest</Text>
              </View>
            </View>

          </ScrollView>
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