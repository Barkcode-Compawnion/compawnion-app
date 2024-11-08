import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Signup() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSignupPress = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('https://compawnion-backend.onrender.com/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Unexpected server response.');
      }

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Plscheck');
      } else {
        console.log('Server Response:', data);
        Alert.alert('Signup Failed', data.message || 'An error occurred during registration.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Could not connect to the server.');
    }
  };

  const handlePressLogin = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePressLogin}>
          <Image source={require('../assets/pcs/Backbutton.png')} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
      </View>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor="#888"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#888"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
      />
      {isPasswordFocused && (
        <Text style={styles.passwordRequirement}>
          Must be 8 characters long with a combination of letters, numbers, and symbols.
        </Text>
      )}

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Re-enter your password"
        placeholderTextColor="#888"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.haveAcc}>Already have an account?</Text>
      <TouchableOpacity onPress={handlePressLogin}>
        <Text style={styles.login}>Log in</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  back: {
    width: 70,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#C35E26',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: '5%',
    marginTop: 20,
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginTop: 5,
    fontSize: 16,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  passwordRequirement: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
    width: '90%',
    alignSelf: 'center',
    textAlign: 'left',
  },
  button: {
    height: 40,
    width: 250,
    backgroundColor: '#C35E26',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  haveAcc: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: '#45362F',
  },
  login: {
    fontSize: 14,
    color: '#C35E26',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 5,
  },
});
