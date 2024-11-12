import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Scaling functions for responsiveness
const scaleWidth = (size) => (width / 375) * size;
const scaleHeight = (size) => (height / 812) * size;

export default function ForgotPass() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handlereset = async () => {
        if (!email) {
            Alert.alert("Validation Error", "Please enter an email address.");
            return;
        }

        try {
            const response = await fetch('https://compawnion-backend.onrender.com/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Success", "Please check your email for password reset instructions.");
                navigation.navigate('Resetpass');
            } else {
                Alert.alert("Error", data.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Error during reset request:", error);
            Alert.alert("Network Error", "Could not connect to the server.");
        }
    };

    const handleBackto = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Reset}>Reset{"\n"}Password</Text>

            <TextInput
                style={styles.email}
                placeholder="Enter your email"
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: scaleWidth(20),
        backgroundColor: '#E9E9E9',
    },
    Reset: {
        fontSize: scaleWidth(32),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#45362F',
        marginBottom: scaleHeight(30),
    },
    email: {
        height: scaleHeight(50),
        width: '90%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginBottom: scaleHeight(20),
        fontSize: scaleWidth(16),
        backgroundColor: '#fff',
    },
    eaddress: {
        fontSize: scaleWidth(16),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#45362F',
        marginBottom: scaleHeight(20),
    },
    buttonreset: {
        height: scaleHeight(45),
        width: scaleWidth(250),
        backgroundColor: '#C35E26',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scaleHeight(20),
    },
    resetpass: {
        color: '#fff',
        fontSize: scaleWidth(18),
    },
    buttonback: {
        height: scaleHeight(45),
        width: scaleWidth(250),
        backgroundColor: '#45362F',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backto: {
        color: '#fff',
        fontSize: scaleWidth(18),
    },
});
