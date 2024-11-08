import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Navigate to Forgot Password screen
    const handlePressForgot = () => {
        navigation.navigate('Forgotpass');
    };

    // Navigate to Signup screen
    const handlePressSignup = () => {
        navigation.navigate('Signup');
    };

    // Login button handler
    const handleLoginPress = async () => {
        try {
            const response = await fetch('https://compawnion-backend.onrender.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Login successful!');
                navigation.navigate('Homepage'); // Navigate to the homepage upon successful login
            } else {
                Alert.alert('Login Failed', data.message || 'Invalid username or password');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while trying to log in.');
        }
    };

    const handlePresslogger = () =>{
        navigation.navigate('Homepage')
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
            <TouchableOpacity onPress={handlePressForgot}>
                <Text style={styles.forgotpass}>Forgot Password</Text>
            </TouchableOpacity>
            <Text style={styles.haveacc}>Don't have an account?</Text>
            <TouchableOpacity onPress={handlePressSignup}>
                <Text style={styles.signup}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePresslogger}>
                <Text style={styles.test}>Test butt</Text>
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
        marginLeft: 140,
        color: '#C35E26',
        position: 'absolute',
        zIndex: 1,
    },
    username: {
        height: 50,
        width: 300,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginTop: 260,
        marginLeft: 50,
        fontSize: 16,
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 1,
    },
    password: {
        height: 50,
        width: 300,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginTop: 360,
        marginLeft: 50,
        fontSize: 16,
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 1,
    },
    button: {
        height: 30,
        width: 180,
        backgroundColor: '#C35E26',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        position: 'absolute',
        marginTop: 470,
        left: 110,
        paddingVertical: 2,
        paddingHorizontal: 30,
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
        marginLeft: 60,
        color: '#45362F',
        position: 'absolute',
        zIndex: 0,
    },
    pass: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 330,
        marginLeft: 60,
        color: '#45362F',
        position: 'absolute',
        zIndex: 0,
    },
    forgotpass: {
        fontSize: 12,
        color: '#45362F',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        zIndex: 0,
        position: 'absolute',
        marginTop: 420,
        left:135,
    },
    haveacc: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 630,
        marginLeft: 130,
        color: '#45362F',
        position: 'absolute',
        zIndex: 0,
    },
    signup: {
        fontSize: 14,
        color: '#C35E26',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        zIndex: 0,
        position: 'absolute',
        marginTop: 630,
        marginLeft: 155,
    },
    test: {
        fontSize: 14,
        color: '#C35E26',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        zIndex: 0,
        position: 'absolute',
        marginTop: 200,
        marginLeft: 100,
    }
});
