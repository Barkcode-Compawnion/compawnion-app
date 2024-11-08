import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Resetpass() {
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    const handlereset = async () => {
        if (!password || !repassword) { 
            Alert.alert("Validation Error", "Please enter a password.");
            return;
        }

        if (password !== repassword) {
            Alert.alert("Validation Error", "Passwords do not match.");
            return;
        }

        try {
            const response = await fetch('https://compawnion-backend.onrender.com/update-password', { // Adjust endpoint if needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Success", "Your password has been reset successfully.");
                navigation.navigate('Resetconfirm');  // Navigate to Resetconfirm screen if successful
            } else {
                Alert.alert("Error", data.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Error during reset request:", error);
            Alert.alert("Network Error", "Could not connect to the server.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Reset}>Reset{"\n"}Password</Text>

            <TextInput
                style={styles.password}
                placeholder="Enter new password"
                placeholderTextColor="#888"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />
            
            <Text style={styles.Enternew}>Enter new password</Text>

            <TextInput
                style={styles.repassword}
                placeholder="Confirm new password"
                placeholderTextColor="#888"
                onChangeText={(text) => setRePassword(text)}
                value={repassword}
                secureTextEntry
            />
            
            <Text style={styles.reEnternew}>Confirm password</Text>

            <TouchableOpacity style={styles.buttonreset} onPress={handlereset}>
                <Text style={styles.resetpass}>Reset Password</Text>
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
        marginLeft: 137,
        color: '#C35E26',
        position: 'absolute',
        zIndex: 0,
    },
    buttonreset: {
        height: 40,
        width: 200,
        backgroundColor: '#C35E26',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        position: 'absolute',
        marginTop: 470,
        marginLeft: 100,
    },
    resetpass: {
        color: '#fff',
        fontSize: 18,
    },
    password: {
        height: 40,
        width: 300,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginTop: 280,
        marginLeft: 50,
        fontSize: 16,
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 1,
    },
    Enternew: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 250,
        marginLeft: 60,
        color: '#45362F',
        position: 'absolute',
        zIndex: 0,
    },
    repassword: {
        height: 40,
        width: 300,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginTop: 370,
        marginLeft: 50,
        fontSize: 16,
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 1,
    },
    reEnternew: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 340,
        marginLeft: 60,
        color: '#45362F',
        position: 'absolute',
        zIndex: 0,
    },
});
