import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, Alert, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePressForgot = () => navigation.navigate('Forgotpass');
  const handlePressSignup = () => navigation.navigate('Signup');

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
      console.log(data);
      
      if (response.ok) {
        await AsyncStorage.setItem('authToken', data.token);
        await AsyncStorage.setItem('appPetID', data.appPetID);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('companionId', data.companionId);
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Homepage', { username });
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
      <Image source={require('../assets/pcs/Logo.png')} style={styles.image} />
      <Text style={styles.title}>Log in</Text>
      <TextInput
        style={styles.username}
        placeholder="Username"
        placeholderTextColor="#888888"
        onChangeText={setUsername}
        value={username}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.password}
        placeholder="Password"
        placeholderTextColor="#888888"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLoginPress} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Log in'}
        </Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    padding: width * 0.05,
    backgroundColor: '#E9E9E9',
  },
  title: {
    fontSize: width * 0.1, // Responsive font size
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#C35E26',
    marginBottom: height * 0.03,
  },
  username: {
    height: height * 0.06,
    width: '80%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginTop: height * 0.05,
    fontSize: width * 0.04,
    backgroundColor: '#fff',
  },
  password: {
    height: height * 0.06,
    width: '80%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginTop: height * 0.02,
    fontSize: width * 0.04,
    backgroundColor: '#fff',
  },
  button: {
    height: height * 0.06,
    width: '80%',
    backgroundColor: '#C35E26',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.05,
  },
  image: {
    width: width * 0.4,
    height: height * 0.07,
    resizeMode: 'contain',
    marginTop: height * 0.05,
  },
  forgotpass: {
    fontSize: width * 0.035,
    color: '#45362F',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: height * 0.02,
  },
  haveacc: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * 0.04,
    color: '#45362F',
  },
  signup: {
    fontSize: width * 0.045,
    color: '#C35E26',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: height * 0.01,
  },
});

