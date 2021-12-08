import React, { useState } from 'react';
import { Text, View, StatusBar, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from 'expo-font';
const { width, height } = Dimensions.get('window');
import Slider from '@react-native-community/slider';
import RNPickerSelect from 'react-native-picker-select';

export default function SettingsScreen({ navigation, route }) {
  const sizes = [
    {
      label: 'Teacup',
      value: 'teacup',
    },
    {
      label: 'Small',
      value: 'small',
    },
    {
      label: 'Medium',
      value: 'medium',
    },
    {
      label: 'Large',
      value: 'large',
    },
    {
      label: 'Huge',
      value: 'huge',
    },
  ];
  const [ size, setSize ] = useState(sizes[1].label);

  const ages = [
    {
      label: 'Puppy (0-2 years)',
      value: 'puppy',
    },
    {
      label: 'Young (2-5 years)',
      value: 'young',
    },
    {
      label: 'Adult (5-9 years)',
      value: 'adult',
    },
    {
      label: 'Old (10+)',
      value: 'old',
    },
  ];
  const [ age, setAge ] = useState(ages[0].label);

  const coatColors = [
    {
      label: 'Black',
      value: 'black',
    },
    {
      label: 'White',
      value: 'white',
    },
    {
      label: 'Gold',
      value: 'gold',
    },
    {
      label: 'Mixed',
      value: 'mixed',
    },
    {
      label: 'Brown',
      value: 'brown',
    },
    {
      label: 'Light Brown',
      value: 'light-brown',
    },
  ];
  const [ coatColor, setCoatColor ] = useState(coatColors[5].label);

  const breeds = [
    {
      label: 'Basenji',
      value: 'basenji',
    },
    {
      label: 'Terrier',
      value: 'terrier',
    },
    {
      label: 'Poodle',
      value: 'poodle',
    },
    {
      label: 'Golden Retriever',
      value: 'golden-retriever',
    },
    {
      label: 'German Shephard',
      value: 'german-shephard',
    },
    {
      label: 'St. Bernard',
      value: 'st-bernard',
    },
    {
      label: 'Husky',
      value: 'husky',
    },
    {
      label: 'Pitbull',
      value: 'pitbull',
    },
    {
      label: 'Yorkshire',
      value: 'yorkshire',
    },
    {
      label: 'Boston Terrier',
      value: 'boston-terrier',
    },
    {
      label: 'Bulldog',
      value: 'bulldog',
    },
    {
      label: 'Labrador',
      value: 'labrador',
    },
  ];
  const [ breed, setBreed ] = useState(breeds[0].label);

  const [ miles, setMiles ] = useState(30);

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

      <View style={{marginTop: 20}}>
      <Text style={[{textAlign: "center", fontSize: 36, zIndex: -1, width: width}, styles.nunitoExtraBold]}>Settings</Text>
        <View style={{flexDirection: "row", padding: 20}}>
          <View style={{backgroundColor: "white", flex: 1, height: height * 0.8 }}>

            <View style={{ width: '100%', padding: 20}}>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Size</Text>
                <RNPickerSelect
                  placeholder={{
                      label: 'Select a size...',
                      value: null,
                  }}
                  items={sizes}
                  onValueChange={(value) => setSize(value)}
                  style={{...styles.nunitoRegular}}
                  value={size}
                />
              </View>

              <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.5 }}/>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Age</Text>
                <RNPickerSelect
                  placeholder={{
                      label: 'Select an age...',
                      value: null,
                  }}
                  items={ages}
                  onValueChange={(value) => setAge(value)}
                  style={{...styles.nunitoRegular}}
                  value={age}
                />
              </View>

              <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.5 }}/>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Coat Color</Text>
                <RNPickerSelect
                  placeholder={{
                      label: 'Select a coat color...',
                      value: null,
                  }}
                  items={coatColors}
                  onValueChange={(value) => setCoatColor(value)}
                  style={{...styles.nunitoRegular}}
                  value={coatColor}
                />
              </View>

              <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.5 }}/>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Breed</Text>
                <RNPickerSelect
                  placeholder={{
                      label: 'Select a breed...',
                      value: null,
                  }}
                  items={breeds}
                  onValueChange={(value) => setBreed(value)}
                  style={{...styles.nunitoRegular}}
                  value={breed}
                />
              </View>
              
              <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.5 }}/>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={[ styles.nunitoRegular, { color: '#898989' }]}>Distance</Text>
                <Text style={[ styles.nunitoRegular ]}>{miles} miles</Text>
                <Slider
                  style={{width: width * 0.8, height: 20}}
                  minimumValue={0}
                  maximumValue={1}
                  value={miles/100}
                  onValueChange={(value) => setMiles(Math.floor(value * 100))}
                  minimumTrackTintColor="#58C0E1"
                  maximumTrackTintColor="#000000"
                />
              </View>
            </View>

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