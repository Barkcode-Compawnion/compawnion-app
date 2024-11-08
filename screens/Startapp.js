import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Image, PixelRatio } from 'react-native';

const scale = PixelRatio.get();

export default function Startapp({ navigation }) {
  const handleButtonPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontFamily: 'Poppins-Regular' }]}>
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
    position: 'absolute',
    flex: 1,
    backgroundColor: '#E9E9E9',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#333',
    position: 'absolute',
    zIndex: 1,
    textAlign: 'left',
    top: 70,
    left: 50,
  },
  rescuetext: {
    color: '#C35E26',
  },
  salita: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 570,
    marginLeft: 110,
    zIndex:1,
    position:'absolute',
  },
  button: {
    top: 610,
    left: 95,
    padding: 10,
    backgroundColor: '#C35E26',
    borderRadius: 20,
    width: 200,
    height: 30,
    zIndex:0,
    position:'absolute',
    paddingHorizontal: 30,
    paddingVertical: 2,
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
    top: 270,
    left: 60,
    zIndex: 0,
  },

});
