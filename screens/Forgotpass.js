import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator, TouchableOpacity,TextInput, Alert } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function ForgotPass(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handlereset = () => {
        if (!email) { 
          Alert.alert("Validation Error", "Please enter email.");
          return;
        } else{
            navigation.navigate('Resetpass');
        }
        console.log("Email:", email);
    }
    const handleBackto = () => {
        navigation.navigate('Login');
    };
    return(
        <View style={styles.container}>
            <Text style={styles.Reset}>Reset{"\n"}Password</Text>
            <TextInput style={styles.email}
             placeholder="Email"
             placeholderTextColor="#888"
             onChangeText={(text) => setEmail(text)}
             value={email}
             keyboardType="email-address"
             autoCapitalize="none"
            />
            <Text style={styles.eaddress}>Email Address</Text>
             <TouchableOpacity style={styles.buttonreset} onPress={handlereset}>
          <Text style={styles.resetpass}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonback} onPress={handleBackto}>
          <Text style={styles.backto}>Back to Log in</Text>
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
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 120,
        marginLeft:137,
        color: '#45362F',
        position:'absolute',
        zIndex:0,
      },
      eaddress: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 250,
        marginLeft:60,
        color: '#45362F',
        position:'absolute',
        zIndex:0,
      },
      email: {
        height: 50,
        width:300,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginTop: 280,
        marginLeft:50,
        fontSize: 16,
        backgroundColor: '#fff',
        position:'absolute',
        zIndex:1,
      },
      buttonreset: {
        height: 50,
        width:200,
        backgroundColor: '#C35E26',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:1,
        position:'absolute',
        marginTop: 390,
        marginLeft:100,
      },
      resetpass: {
        color: '#fff',
        fontSize: 18,
      },
      buttonback: {
        height: 50,
        width:200,
        backgroundColor: '#45362F',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:1,
        position:'absolute',
        marginTop: 460,
        marginLeft:100,
      },
      backto: {
        color: '#fff',
        fontSize: 18,
      },
})
