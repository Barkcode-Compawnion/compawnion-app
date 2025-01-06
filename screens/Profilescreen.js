import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, Dimensions, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker'; // Import Image Picker
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Assuming you are using axios for HTTP requests

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get('window');

export default function Profilescreen({ route }) {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(route?.params?.profileImage || ''); // Default to current profile picture
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal visibility state

  useEffect(() => {
    loadProfileImage();
  }, []);

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
    if (!firstName || !lastName || !username || !email || !phoneNumber) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    try {
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
        
        const image = {
          uri: imageUri,
          type: `image/${imageType}`,
          name: imageName,
        };
        
        formData.append('profileImage', image);
      }

      const response = await axios.post('https://your-backend-url.com/updateProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        Alert.alert('Success', 'Your profile has been updated!');
      } else {
        Alert.alert('Error', 'Failed to update your profile.');
      }
    } catch (error) {
      console.log('Error updating profile:', error);
      Alert.alert('Error', 'An error occurred while updating your profile.');
    }
  };

  const handleChangePassword = () => {
    navigation.navigate('Changepassword');
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'You have been logged out.');
    await AsyncStorage.removeItem('authToken');
    navigation.navigate('Login');
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'You can reach out to barkcodecompawnion@gmail.com');
  };

  return (
    <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/pcs/Backbutton.png')} style={styles.back} />
      </TouchableOpacity>
      <Text style={styles.title}>Account Settings</Text>

      {/* Profile Image Section */}
      <TouchableOpacity onPress={handleChangeImage}>
        <Image
          source={{ uri: profileImage || 'https://placekitten.com/100/100' }} // Default to placeholder if no profile image
          style={[styles.profileImage, { width: width * 0.25, height: width * 0.25 }]} // Dynamic size based on screen width
        />
      </TouchableOpacity>
      <Text style={styles.editImageText}>Edit Image</Text>

      {/* Input fields for user information */}
      <TextInput
        style={[styles.input, { width: width * 0.8 }]} 
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        style={[styles.input, { width: width * 0.8 }]}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <TextInput
        style={[styles.input, { width: width * 0.8 }]}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={[styles.input, { width: width * 0.8 }]}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { width: width * 0.8 }]}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />

      {/* Save and other buttons */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
        <Text style={styles.buttonCpass}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={() => setShowLogoutModal(true)}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      {/* Contact Support Button */}
      <TouchableOpacity onPress={handleContactSupport}>
        <Text style={styles.contactSupport}>Contact Support</Text>
      </TouchableOpacity>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        visible={showLogoutModal}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)} // Close modal on back press
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Log Out</Text>
            <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonYes]}
                onPress={() => {
                  setShowLogoutModal(false);
                  handleLogout(); // Perform logout
                }}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonNo]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    borderRadius: 50,
    marginTop: 20,
  },
  editImageText: {
    color: '#C35E26',
    fontSize: 14,
    top: height * -0.01,
    textDecorationLine: 'underline',
  },
  input: {
    height: 45,
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
    borderWidth: 1,
    borderColor: '#C35E26',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButton: {
    height: 50,
    width: '90%',
    backgroundColor: '#C32626',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C35E26',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonCpass: {
    color: '#C35E26',
    fontSize: 16,
  },
  contactSupport: {
    color: '#C35E26',
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C35E26',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    width: '45%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalButtonYes: {
    backgroundColor: '#C35E26',
  },
  modalButtonNo: {
    backgroundColor: '#ddd',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
