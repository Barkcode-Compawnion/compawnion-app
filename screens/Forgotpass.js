import React, { useState } from 'react';
import { 
    Text, 
    View, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
    Alert, 
    Dimensions, 
    Modal, 
    TouchableWithoutFeedback, 
    Keyboard 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Scaling functions for responsiveness
const scaleWidth = (size) => (width / 375) * size;
const scaleHeight = (size) => (height / 812) * size;

export default function ForgotPass() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [resetCode, setResetCode] = useState(''); // Reset code state

    // Handler for Reset Password
    const handlereset = async () => {
        if (!email || !username) {
            Alert.alert("Validation Error", "Please enter both email and username.");
            return;
        }

        try {
            // Verify email and username with backend
            const response = await fetch('https://compawnion-backend.onrender.com/Compawnions/forgotPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username }),  // Send email and username to backend for verification
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Success", "Email and username verified. A verification code has been sent to your email.");
                setShowModal(true);  // Show modal to enter verification code
            } else {
                Alert.alert("Error", data.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Error during verification:", error);
            Alert.alert("Network Error", "Could not connect to the server.");
        }
    };

    const handleBackto = () => {
        navigation.navigate('Login');
    };

    // Handler for Verification Code Submission
    const handleVerification = async () => {
        if (!resetCode) {
            Alert.alert("Validation Error", "Please enter the verification code.");
            return;
        }

        try {
            // Send reset code to backend for verification
            const response = await fetch('https://compawnion-backend.onrender.com/Compawnions/forgotPassword/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, resetCode }), // Send email and resetCode to backend
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Success", "Verification successful. Please proceed with your password reset.");
                setShowModal(false); // Close modal on successful verification
                setResetCode(''); // Reset the reset code field

                // Navigate to Resetpass.js
                navigation.navigate('Resetpass', { email }); // Pass email to Resetpass.js
            } else {
                Alert.alert("Error", data.message || "Invalid verification code. Please try again.");
            }
        } catch (error) {
            console.error("Error during verification:", error);
            Alert.alert("Network Error", "Could not connect to the server.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Reset}>Reset{"\n"}Password</Text>
            <Text style={styles.eaddress}>Email Address</Text>
            <TextInput
                style={styles.email}
                placeholder="Enter your email"
                placeholderTextColor="#888888"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            
            <Text style={styles.eaddress}>Username</Text>
            <TextInput
                style={styles.email}
                placeholder="Enter your username"
                placeholderTextColor="#888888"
                onChangeText={(text) => setUsername(text)}
                value={username}
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.buttonreset} onPress={handlereset}>
                <Text style={styles.resetpass}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonback} onPress={handleBackto}>
                <Text style={styles.backto}>Back to Log in</Text>
            </TouchableOpacity>

            {/* Modal for reset code input */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Enter Verification Code</Text>
                            <TextInput
                                style={styles.email}
                                placeholder="Enter verification code"
                                placeholderTextColor="#888888"
                                onChangeText={(text) => setResetCode(text)}
                                value={resetCode}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity style={styles.buttonreset} onPress={handleVerification}>
                                <Text style={styles.resetpass}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonback} onPress={() => setShowModal(false)}>
                                <Text style={styles.backto}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: scaleWidth(20),
        borderRadius: 10,
        width: scaleWidth(300),
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: scaleWidth(18),
        fontWeight: 'bold',
        color: '#45362F',
        marginBottom: scaleHeight(20),
    },
});
