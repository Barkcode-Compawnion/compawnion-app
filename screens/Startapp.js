import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Startapp({ navigation }) {
  const handleButtonPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Main Heading */}
      <Text style={styles.text}>
        Love{"\n"}Beyond{"\n"}<Text style={styles.rescuetext}>Rescue</Text>.
      </Text>

      {/* Dog Image */}
      <Image source={require('../assets/pcs/Duge.png')} style={styles.image} />

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleButtonPress} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Let's go!</Text>
      </TouchableOpacity>

      {/* Subtext */}
      <Text style={styles.salita}>Be a Compawnion.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
  },
  text: {
    fontSize: width * 0.1, // Dynamic font size based on screen width
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'flex-start',
    marginBottom: height * 0.05,
    left:-40,
  },
  rescuetext: {
    color: '#C35E26',
  },
  image: {
    width: width * 0.6, // 60% of screen width
    height: width * 0.6, // Maintain square aspect ratio
    resizeMode: 'contain',
    marginBottom: height * 0.05,
  },
  button: {
    backgroundColor: '#C35E26',
    borderRadius: 20,
    paddingVertical: height * 0.015, // Dynamic vertical padding
    paddingHorizontal: width * 0.2, // Dynamic horizontal padding
    marginBottom: height * 0.03,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: width * 0.05, // Dynamic font size based on screen width
  },
  salita: {
    fontSize: width * 0.05, // Dynamic font size based on screen width
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});
