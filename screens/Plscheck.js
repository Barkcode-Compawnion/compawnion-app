import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Plscheck() {
  const navigation = useNavigation();

  const handletolog = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Check}>Please check{"\n"}your email</Text>
      <Text style={styles.Anemail}>An email has been sent to{"\n"}for your{"\n"}account creation</Text>
      <TouchableOpacity style={styles.buttonreset} onPress={handletolog}>
        <Text style={styles.gotolog}>Go to Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#E9E9E9',
  },
  Check: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 120,
    marginLeft: 80,
    color: '#C35E26',
    position: 'absolute',
    zIndex: 0,
  },
  Anemail: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 270,
    marginLeft: 80,
    color: '#45362F',
    position: 'absolute',
    zIndex: 0,
  },
  buttonreset: { 
    height: 50,
    width: 200,
    backgroundColor: '#C35E26',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    marginTop: 390,
    marginLeft: 100,
  },
  gotolog: {
    color: '#FFFFFF',
    fontSize: 18,
  }
});
