import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Resetconfirm() {
  const navigation = useNavigation();

  const handletolog = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Reset}>Password{"\n"}has been{"\n"}reset</Text>
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
  Reset: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 120,
    marginLeft: 115,
    color: '#C35E26',
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
