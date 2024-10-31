import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Image } from 'react-native';

export default function Startapp({ navigation }) {
  const handleButtonPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Love{"\n"}Beyond{"\n"}<Text style={styles.rescuetext}>Rescue</Text>.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Let's go!</Text>
      </TouchableOpacity>
      <Image source={require('../assets/pcs/Duge.png')} style={styles.image} />
      <Text style={styles.salita}>Be a Compawnion.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9E9',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#333',
    position: 'absolute',
    zIndex: 1,
    textAlign: 'left',
    marginLeft: 40,
    marginTop: 70,
  },
  rescuetext: {
    color: '#C35E26',
  },
  salita: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    textAlign: 'center',
    marginTop: 570,
    marginLeft: 110,
    zIndex:1,
    position:'absolute',
  },
  button: {
    marginTop: 620,
    marginLeft: 95,
    padding: 10,
    backgroundColor: '#C35E26',
    borderRadius: 20,
    width:200,
    height:47,
    zIndex:0,
    position:'absolute',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
  },
  image: {
    width: 270,
    height: 270,
    position: 'absolute',
    top: 255,
    left: 60,
    zIndex: 0,
  },

});
