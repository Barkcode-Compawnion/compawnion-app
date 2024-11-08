import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Medicalinfo(){
    const navigation = useNavigation();
    
    
    return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Image source={require('../assets/pcs/Backbutton.png')} style={styles.back}/>
      </TouchableOpacity>
      <Text style={styles.title}>Medical{"\n"}Schedule{"\n"}Information</Text>
    </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#E9E9E9',
      alignItems: 'center',
    },
    back: {
      width: 70,
      height: 30,
      resizeMode: 'contain',
    },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#C35E26',
        marginTop: 20,
    },
});