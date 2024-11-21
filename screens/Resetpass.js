import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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
            const response = await fetch('https://compawnion-backend.onrender.com/update-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Success", "Your password has been reset successfully.");
                navigation.navigate('Resetconfirm');
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
            <Text style={styles.title}>Reset Password</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor="#888888"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Text style={styles.label}>Enter new password</Text>

            <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor="#888888"
                onChangeText={setRePassword}
                value={repassword}
                secureTextEntry
            />
            <Text style={styles.label}>Confirm password</Text>

            <TouchableOpacity style={styles.button} onPress={handlereset}>
                <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#E9E9E9',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#C35E26',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        height: 50,
        width: '90%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#45362F',
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginBottom: 10,
    },
    button: {
        height: 50,
        width: '70%',
        backgroundColor: '#C35E26',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
