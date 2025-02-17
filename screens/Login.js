import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const navigation = useNavigation();

 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

 
  const handleLoginPress = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://compawnion-backend.onrender.com/Compawnions/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Username: username,
            Password: password,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        
        if (rememberMe) {
          await AsyncStorage.setItem('savedUsername', username);
          await AsyncStorage.setItem('savedPassword', password);
        } else {
          await AsyncStorage.removeItem('savedUsername');
          await AsyncStorage.removeItem('savedPassword');
        }

        // Save other tokens/data
        await AsyncStorage.setItem('authToken', data.token);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('appPetID', data.appPetID);
        await AsyncStorage.setItem('companionId', data.companionId);

        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Homepage', { username });
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const loadSavedCredentials = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('savedUsername');
      const savedPassword = await AsyncStorage.getItem('savedPassword');

      if (savedUsername) setUsername(savedUsername);
      if (savedPassword) setPassword(savedPassword);
      if (savedUsername || savedPassword) setRememberMe(true);

      const savedAuthToken = await AsyncStorage.getItem('authToken');
      console.log(savedAuthToken);

      const response = await fetch('https://compawnion-backend.onrender.com/Compawnions/authenticate', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          authToken: savedAuthToken
        })
      });

      if (!response.ok) return;

      const { valid } = await response.json();

      if (valid) {
        navigation.navigate('Homepage', { username });
      };
    } catch (error) {
      console.error('Failed to load saved credentials:', error);
    }
  };

 
  useEffect(() => {
    loadSavedCredentials();
  }, []);

  
  const handlePressForgot = () => navigation.navigate('Forgotpass');
  const handlePressSignup = () => navigation.navigate('Signup');

  return (
    <View style={styles.container}>
      
      <Image source={require('../assets/pcs/Logo.png')} style={styles.image} />

      
      <Text style={styles.title}>Log in</Text>

     
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888888"
        onChangeText={setUsername}
        value={username}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.password}
          placeholder="Password"
          placeholderTextColor="#888888"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleButtonText}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>


      {/* Login Button */}
      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleLoginPress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log in</Text>
        )}
      </TouchableOpacity>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={handlePressForgot}>
        <Text style={styles.forgotpass}>Forgot Password</Text>
      </TouchableOpacity>

      {/* Signup Section */}
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
    fontSize: width * 0.1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#C35E26',
    marginBottom: height * 0.03,
  },
  input: {
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: height * 0.06,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginTop: height * 0.02,
    backgroundColor: '#fff',
  },
  password: {
    flex: 1,
    fontSize: width * 0.04,
  },
  toggleButton: {
    marginLeft: 10,
  },
  toggleButtonText: {
    fontSize: width * 0.04,
    color: '#C35E26',
    fontWeight: 'bold',
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
  disabledButton: {
    backgroundColor: '#AAB8C2',
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
