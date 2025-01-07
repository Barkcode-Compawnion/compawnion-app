import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, Dimensions, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function Profilescreen({ route }) {
  const navigation = useNavigation();
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [companionId, setCompanionId] = useState(''); // Store the companionId from AsyncStorage
  const { id } = route.params; // Retrieve the `companionId` from navigation route params

  useEffect(() => {
    loadProfileImage();
    fetchUserData();
    getCompanionId();
  }, []);

  const loadProfileImage = async () => {
    const savedProfileImage = await AsyncStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
  };

  const getCompanionId = async () => {
    const storedCompanionId = await AsyncStorage.getItem('companionId');
    if (storedCompanionId) {
      setCompanionId(storedCompanionId);
    }
  };

  const fetchUserData = async () => {
  setLoading(true);
  try {
    const authToken = await AsyncStorage.getItem('authToken');
    const companionId = await AsyncStorage.getItem('companionId'); // Retrieve companionId from AsyncStorage

    if (!companionId) {
      Alert.alert('Error', 'Companion ID not found.');
      return;
    }

    const response = await axios({
      method: 'GET',
      url: `https://compawnion-backend.onrender.com/Compawnions/accountget/${companionId}`, // Use companionId from AsyncStorage in the URL
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.data && response.data.data) {
      const { FirstName, LastName, Username, Email, PhoneNumber } = response.data.data;

      // Set the fetched values to the state
      setFirstName(FirstName || '');
      setLastName(LastName || '');
      setUsername(Username || '');
      setEmail(Email || '');
      setPhoneNumber(PhoneNumber || '');
    } else {
      Alert.alert('Error', 'No companion data received.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    Alert.alert('Error', 'Failed to load companion data.');
  } finally {
    setLoading(false);
  }
};

  

const handleSaveChanges = async () => {
  if (!FirstName || !LastName || !Username || !Email || !PhoneNumber) {
    Alert.alert('Validation Error', 'All fields are required.');
    return;
  }

  try {
    const authToken = await AsyncStorage.getItem('authToken');
    const formData = {
      FirstName,
      LastName,
      Username,
      Email,
      PhoneNumber,
    };

    const response = await axios({
      method: 'PUT',
      url: `https://compawnion-backend.onrender.com/Compawnions/accountUpdate/${companionId}`, // Use companionId here
      data: formData,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.data.success) {
      Alert.alert('Success', 'Your profile has been updated!');
    } else {
      Alert.alert('Success', 'Your profile has been updated!.');
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C35E26" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/pcs/Backbutton.png')} style={styles.back} />
      </TouchableOpacity>
      <Text style={styles.title}>Account Settings</Text>

      <TextInput
  style={[styles.input, { width: width * 0.8 }]}
  value={FirstName}  // Bind to state
  onChangeText={setFirstName}  // Handle text input change
  placeholder={FirstName || "First Name"}  // If FirstName is empty, show the default placeholder
/>

<TextInput
  style={[styles.input, { width: width * 0.8 }]}
  value={LastName}  // Bind to state
  onChangeText={setLastName}  // Handle text input change
  placeholder={LastName || "Last Name"}  // If LastName is empty, show the default placeholder
/>

<TextInput
  style={[styles.input, { width: width * 0.8 }]}
  value={Username}  // Bind to state
  onChangeText={setUsername}  // Handle text input change
  placeholder={Username || "Username"}  // If Username is empty, show the default placeholder
/>

<TextInput
  style={[styles.input, { width: width * 0.8 }]}
  value={Email}  // Bind to state
  onChangeText={setEmail}  // Handle text input change
  placeholder={Email || "Email"}  // If Email is empty, show the default placeholder
  keyboardType="email-address"
/>

<TextInput
  style={[styles.input, { width: width * 0.8 }]}
  value={PhoneNumber}  // Bind to state
  onChangeText={setPhoneNumber}  // Handle text input change
  placeholder={PhoneNumber || "Phone Number"}  // If PhoneNumber is empty, show the default placeholder
  keyboardType="phone-pad"
/>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
        <Text style={styles.buttonCpass}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={() => setShowLogoutModal(true)}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleContactSupport}>
        <Text style={styles.contactSupport}>Contact Support</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={showLogoutModal}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
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
                  handleLogout();
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
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C35E26',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonYes: {
    backgroundColor: '#C32626',
  },
  modalButtonNo: {
    backgroundColor: '#ddd',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
