import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator, TouchableOpacity,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Resetpass(){
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [repassword, setrePassword] = useState('');

    const handlereset = () => {
        if (!password || !repassword) { 
          Alert.alert("Validation Error", "Please enter a password.");
          return;
        } else{
            navigation.navigate('Resetconfirm');
        }
        console.log("Password:", password);
        console.log("rePassword:", repassword);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.Reset}>Reset{"\n"}Password</Text>
            <TextInput
            style={styles.password}
            placeholder=""
            placeholderTextColor="#888"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            />
            <TextInput
            style={styles.repassword}
            placeholder=""
            placeholderTextColor="#888"
            onChangeText={(text) => setrePassword(text)}
            value={repassword}
            secureTextEntry
            />
            <TouchableOpacity style={styles.buttonreset} onPress={handlereset}>
            <Text style={styles.resetpass}>Reset Password</Text>
            </TouchableOpacity>

            <Text style={styles.Enternew}>
              Enter new password
            </Text>
            <Text style={styles.reEnternew}>
              Confirm password
            </Text>

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
        color: '#C35E26',
        position:'absolute',
        zIndex:0,
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
        marginTop: 470,
        marginLeft:100,
      },
      resetpass: {
        color: '#fff',
        fontSize: 18,
      },
      password: {
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
      Enternew: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 250,
        marginLeft:60,
        color: '#45362F',
        position:'absolute',
        zIndex:0,
      },
      repassword: {
        height: 50,
        width:300,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginTop: 370,
        marginLeft:50,
        fontSize: 16,
        backgroundColor: '#fff',
        position:'absolute',
        zIndex:1,
      },
      reEnternew: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 340,
        marginLeft:60,
        color: '#45362F',
        position:'absolute',
        zIndex:0,
      },

    });