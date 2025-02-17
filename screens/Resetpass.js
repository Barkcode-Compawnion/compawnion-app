import React, { useState } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Resetpass() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    const handlereset = async () => {
        
        if (!username || !password || !repassword) {
            Alert.alert("Validation Error", "All fields are required.");
            return;
        }

        if (password !== repassword) {
            Alert.alert("Validation Error", "Passwords do not match.");
            return;
        }

        try {
           
            const response = await fetch(
                'https://compawnion-backend.onrender.com/Compawnions/resetPassword',
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username,
                        newPassword: password,
                        confirmPassword: repassword,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Success", data.message);
                navigation.navigate('Resetconfirm'); 
            } else {
                Alert.alert("Error", data.message || "An error occurred.");
            }
        } catch (error) {
            console.error("Error during reset request:", error);
            Alert.alert(
                "Network Error",
                "Could not connect to the server. Please try again."
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor="#888888"
                onChangeText={setUsername}
                value={username}
            />

            <Text style={styles.label}>Enter new password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor="#888888"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />

            <Text style={styles.label}>Confirm password</Text>
            <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor="#888888"
                onChangeText={setRePassword}
                value={repassword}
                secureTextEntry
            />

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
