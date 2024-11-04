import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Profilescreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSaveChanges = () => {
    Alert.alert('Success', 'Your changes have been saved.');
  };

  const handleChangePassword = () => {
    // Navigate to Change Password screen
    navigation.navigate('Changepassword');
  };

  const handleLogout = () => {
    // Add logout functionality here
    Alert.alert('Logout', 'You have been logged out.');
    navigation.navigate('Login');
  };

  const handleContactSupport = () => {
    // Navigate to Contact Support or open support contact info
    Alert.alert('Contact Support', 'You can reach out to support@example.com');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Account Settings</Text>
      
      <Image source={{ uri: 'https://placekitten.com/100/100' }} style={styles.profileImage} />
      <Text style={styles.editImageText}>Edit Image</Text>

      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleContactSupport}>
        <Text style={styles.contactSupport}>Contact Support</Text>
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  backArrow: {
    fontSize: 24,
    color: '#C35E26',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C35E26',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  editImageText: {
    color: '#C35E26',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  input: {
    height: 45,
    width: '90%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  saveButton: {
    height: 50,
    width: '90%',
    backgroundColor: '#C35E26',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  changePasswordButton: {
    height: 50,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButton: {
    height: 50,
    width: '90%',
    backgroundColor: '#B22222',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  contactSupport: {
    fontSize: 12,
    color: '#C35E26',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});
