import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function Medicalinfo() {
  const [loading, setLoading] = useState(false); // State for the loader
  const navigation = useNavigation();
  const route = useRoute();
  const { item, index } = route.params;

  useEffect(() => {
    const fetchCompanionId = async () => {
      const storedCompanionId = await AsyncStorage.getItem('companionId');
      console.log('Stored Companion ID:', storedCompanionId);
    };
    fetchCompanionId();
  }, []);

  const handleDelete = async () => {
    setLoading(true); // Show loader
    try {
      const companionId = await AsyncStorage.getItem('companionId');
      console.log('Retrieved Companion ID:', companionId);

      if (!companionId) {
        Alert.alert('Error', 'Companion ID not found. Please log in again.');
        navigation.goBack();
        setLoading(false); // Hide loader
        return;
      }

      const validIndex = parseInt(index, 10);
      if (isNaN(validIndex)) {
        Alert.alert('Error', 'Invalid index provided.');
        setLoading(false); // Hide loader
        return;
      }

      console.log(`Attempting to delete schedule for Companion ID: ${companionId}, index: ${validIndex}`);

      const response = await axios.delete(
        `https://compawnion-backend.onrender.com/Compawnions/deleteMedSched/${companionId}/${validIndex}`
      );

      if (response.status === 200) {
        Alert.alert('Success', response.data.message || 'Schedule deleted successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Error deleting schedule:', error.response ? error.response.data : error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to delete schedule. Please try again later.'
      );
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/pcs/Backbutton.png')} style={styles.back} />
      </TouchableOpacity>
      <Text style={styles.title}>Medical Schedule Information</Text>
      <View style={styles.infoBox}>
        <Text style={styles.sectionTitle}>Title</Text>
        <Text style={styles.subTitle}>{item.SchedVetClinic}</Text>
        <Text style={styles.sectionHeader}>Pet Information</Text>
        <Text style={styles.infoText}>{item.SchedPet}</Text>
        <Text style={styles.sectionHeader}>Schedule Information</Text>
        <Text style={styles.infoText}>Date: {item.SchedDate}</Text>
        <Text style={styles.infoText}>Time: {item.SchedTime}</Text>
        <Text style={styles.infoText}>Vet Address: {item.SchedVetClinic}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#C35E26" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E9E9E9',
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
    marginTop: 60,
    textAlign: 'center',
  },
  infoBox: {
    marginTop: 30,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C35E26',
  },
  subTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
