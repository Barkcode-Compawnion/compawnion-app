import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://compawnion-backend.onrender.com/Compawnions/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username: username, Password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('authToken', data.token); // Store token
        await AsyncStorage.setItem('username', username); // Store username
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Homepage', { username }); // Pass username as a param
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while trying to log in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <TextInput
        style={styles.username}
        placeholder="Username"
        placeholderTextColor="#888"
        onChangeText={setUsername}
        value={username}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.password}
        placeholder="Password"
        placeholderTextColor="#888"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLoginPress}
        disabled={loading} // Disable button when loading
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Log in'}
        </Text>
      </TouchableOpacity>
      <Image source={require('../assets/pcs/Logo.png')} style={styles.image} />
      <TouchableOpacity onPress={handlePressForgot}>
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
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E9E9E9',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#C35E26',
  },
  username: {
    height: 50,
    width: '80%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginTop: 100,
    alignSelf: 'center',
    fontSize: 16,
    backgroundColor: '#fff',
  },
  password: {
    height: 50,
    width: '80%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    width: '80%',
    backgroundColor: '#C35E26',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
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
  forgotpass: {
    fontSize: 12,
    color: '#45362F',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: 20,
  },
  haveacc: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    color: '#45362F',
  },
  signup: {
    fontSize: 14,
    color: '#C35E26',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
});
