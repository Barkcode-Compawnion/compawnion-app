import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Changepassword() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [storedUsername, setStoredUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [companionId, setCompanionId] = useState(''); 

  
  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedCompanionId = await AsyncStorage.getItem('companionId');
        if (storedUsername) {
          setStoredUsername(storedUsername);
        }
        if (storedCompanionId) {
          setCompanionId(storedCompanionId);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStoredData();
  }, []);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }

    const usernameToUse = username.trim() || storedUsername;

    if (!usernameToUse) {
      Alert.alert("Error", "Username is required.");
      return;
    }

    if (!companionId) {
      Alert.alert("Error", "Companion ID is missing.");
      return;
    }

    try {
      
      const response = await fetch(`https://compawnion-backend.onrender.com/Compawnions/changePassword/${companionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameToUse, 
          currentPassword,
          newPassword,
          confirmNewPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Your password has been changed.");
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "Password change failed.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while changing the password.");
      console.error('Error changing password:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/pcs/Backbutton.png')} style={styles.back} />
      </TouchableOpacity>
      <Text style={styles.title}>Change Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Type Username (optional)"
        placeholderTextColor="#888888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Type Current Password"
        placeholderTextColor="#888888"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Type New Password"
        placeholderTextColor="#888888"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        placeholderTextColor="#888888"
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />

      <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
  },
  back: {
    width: 70,
    height: 30,
    resizeMode: 'contain',
    top: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C35E26',
    marginTop: 20,
  },
  input: {
    height: 45,
    width: '90%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  changePasswordButton: {
    height: 50,
    width: '90%',
    backgroundColor: '#C35E26',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
