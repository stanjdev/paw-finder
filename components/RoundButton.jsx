import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
const { SCREEN_WIDTH, SCREEN_HEIGHT } = Dimensions.get('window');

const RoundButton = ({onPress, title, buttonStyles, buttonTextStyles, icon, iconStyles, name, size, color, disabled}) => (
  <TouchableOpacity onPress={onPress} style={buttonStyles || styles.button} disabled={disabled || false}>
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
      {
      icon ? <Image source={icon} style={iconStyles} resizeMode="contain" /> : 
      <Text style={[buttonTextStyles, {paddingLeft: icon ? 13 : 0}]}>{title}</Text>
      }
    </View>
  </TouchableOpacity>
);

export default RoundButton;

const styles = StyleSheet.create({
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
    bottom: SCREEN_HEIGHT * 0.1
  },
});


