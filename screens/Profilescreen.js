import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker'; // Import Image Picker
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Assuming you are using axios for HTTP requests

export default function Profilescreen({ route }) {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(route?.params?.profileImage || ''); // Default to current profile picture

  const loadProfileImage = async () => {
    const savedProfileImage = await AsyncStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
  };

  // Handle changing profile picture
  const handleChangeImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        console.log('Error picking image:', response.errorMessage);
        Alert.alert('Error', 'Failed to pick image');
      } else {
        const newProfileImage = response.assets[0].uri;
        setProfileImage(newProfileImage); // Update profile picture URI
        AsyncStorage.setItem('profileImage', newProfileImage); // Save to AsyncStorage
      }
    });
  };

  // Save changes including profile image to backend
  const handleSaveChanges = async () => {
    try {
      // Create form data to send to backend
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);

      if (profileImage) {
        const imageUri = profileImage;
        const imageName = imageUri.split('/').pop();
        const imageType = imageUri.match(/\.(\w+)$/)[1];
        
        // Convert the image to a format that can be uploaded
        const image = {
          uri: imageUri,
          type: `image/${imageType}`,
          name: imageName,
        };
        
        formData.append('profileImage', image); // Append the image to form data
      }

      const response = await axios.post('https://your-backend-url.com/updateProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for sending files
        },
      });

      if (response.data.success) {
        Alert.alert('Success', 'Your profile has been updated!');
      } else {
        Alert.alert('Error', 'Failed to update your profile. Please try again later.');
      }
    } catch (error) {
      console.log('Error updating profile:', error);
      Alert.alert('Error', 'An error occurred while updating your profile.');
    }
  };

  const handleChangePassword = () => {
    navigation.navigate('Changepassword');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out.');
    navigation.navigate('Login');
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'You can reach out to barkcodecompawnion@gmail.com');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/pcs/Backbutton.png')} style={styles.back} />
      </TouchableOpacity>
      <Text style={styles.title}>Account Settings</Text>

      {/* Profile Image Section */}
      <TouchableOpacity onPress={handleChangeImage}>
        <Image
          source={{ uri: profileImage || 'https://placekitten.com/100/100' }} // Default to placeholder if no profile image
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.editImageText}>Edit Image</Text>

      {/* Input fields for user information */}
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First Name" />
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last Name" />
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Username" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" keyboardType="phone-pad" />

      {/* Save and other buttons */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
        <Text style={styles.buttonCpass}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      {/* Contact Support Button */}
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
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
  },
  back: {
    width: 70,
    height: 30,
    resizeMode: 'contain',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
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
    borderRadius: 20,
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
  buttonCpass: {
    color: '#000000',
    fontSize: 16,
  },
});
