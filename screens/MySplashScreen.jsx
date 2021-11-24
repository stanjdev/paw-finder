import React, { useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AppButton from '../components/AppButton';
const { width, height } = Dimensions.get('window');

export default function MySplashScreen ({ route, navigation }) {
  const isFocused = useIsFocused();

  let [fontsLoaded] = useFonts({
    'Nunito-Regular': require('../assets/fonts/Nunito/Nunito-Regular.ttf'),
    'Nunito-ExtraBold': require('../assets/fonts/Nunito/Nunito-ExtraBold.ttf'),
  });

  const navTo = () => route.params ? 
                      navigation.navigate('MainSwipeScreen')
                    : navigation.navigate('MainSwipeScreen', { screen: 'Meditate' })

  useEffect(() => {
    let timeout = setTimeout(() => {
      navTo();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isFocused])

  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <View>
        <AppButton
          buttonStyles={styles.pressScreenButton} 
          onPress={navTo}
        />
        <View style={{height: height, width: width, justifyContent: "center", alignItems: "center"}}>
          {/* <ImageBackground source={bgImage} style={styles.image}> */}
            <Text style={[styles.titleText, styles.nunitoExtraBold]}>PawFinder</Text>
            {/* <Text style={[styles.subTitleText, styles.nunitoRegular]}>by Stan Jeong</Text> */}
          {/* </ImageBackground> */}
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    height: 312,
    width: 312,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    // transform: [{rotateY: "180deg"}]
  },
  body: {
    flex: 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  footerIntro: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 45,
    justifyContent: "space-evenly",
  },
  pressScreenButton: {
    height: height,
    width: width,
    position: "absolute",
    zIndex: 10,
    top: 0,
    right: 0,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    flex: 1,
    textAlign: "center",
    fontSize: 24,
  },
  titleText: {
    color: "white",
    fontSize: 40,
    marginBottom: 15,
    // transform: [{rotateY: "180deg"}],
    width: 300,
    textAlign: "center"
  },
  subTitleText: {
    color: "#828282",
    fontSize: 20,
    // transform: [{rotateY: "180deg"}]
  },
  nunitoExtraBold: {
    fontFamily: 'Nunito-ExtraBold'
  }
});