import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator, TouchableOpacity,TextInput } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Login(){
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handlePressforgot = () => {
        navigation.navigate('Forgotpass');
    };
    const handlePressSignup = () => {
        navigation.navigate('Signup');
    };

    const handleLoginPress = () => {
      navigation.navigate('Homepage')
        console.log("Username:", username);
        console.log("Password:", password);
      };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>
        <TextInput
          style={styles.username}
          placeholder="Username"
          placeholderTextColor="#888"
          onChangeText={(text) => setUsername(text)}
          value={username}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.password}
          placeholder="Password"
          placeholderTextColor="#888"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <Image source={require('../assets/pcs/Logo.png')} style={styles.image} />
      <Text style={styles.user}>Username </Text>
      <Text style={styles.pass}>Password</Text>
      <TouchableOpacity onPress={handlePressforgot}>
        <Text style={styles.forgotpass}>Forgot Password</Text>
      </TouchableOpacity>
      <Text style={styles.haveacc}>Don't have an account?</Text>
      <TouchableOpacity onPress={handlePressSignup}>
        <Text style={styles.signup}>Sign up</Text>
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
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 150,
      marginLeft:140,
      color: '#C35E26',
      position:'absolute',
      zIndex:1,
    },
    username: {
      height: 50,
      width:300,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginTop: 260,
      marginLeft:50,
      fontSize: 16,
      backgroundColor: '#fff',
      position:'absolute',
      zIndex:1,
    },
    password: {
        height: 50,
        width:300,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginTop: 360,
        marginLeft:50,
        fontSize: 16,
        backgroundColor: '#fff',
        position:'absolute',
        zIndex:1,
      },
    button: {
      height: 50,
      width:200,
      backgroundColor: '#C35E26',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex:1,
      position:'absolute',
      marginTop: 470,
      marginLeft:100,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    image: {
        width: 140,
        height: 50,
        position: 'absolute',
        top: 70,
        left: 128,
        zIndex: 0,
      },
      user: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 230,
        marginLeft:60,
        color: '#45362F',
        position:'absolute',
        zIndex:0,
      },
      pass: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 330,
        marginLeft:60,
        color: '#45362F',
        position:'absolute',
        zIndex:0,
      },
      forgotpass:{
        fontSize:10,
        color: '#45362F',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        zIndex:0,
        position:'absolute',
        marginTop:420,
        marginLeft:138,
      },
      haveacc: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 630,
        marginLeft:130,
        color: '#45362F',
        position:'absolute',
        zIndex:0,
      },
      signup:{
        fontSize:14,
        color: '#C35E26',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        zIndex:0,
        position:'absolute',
        marginTop:630,
        marginLeft:155,
      }
  });