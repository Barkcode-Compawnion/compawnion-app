import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function Medicalinfo() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params; // Get the passed schedule data

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://compawnion-backend.onrender.com/Compawnions/deleteMedSched/${item._id}`
      );
      if (response.status === 200) {
        Alert.alert('Success', 'Schedule deleted successfully!');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error deleting schedule:', error);
      Alert.alert('Error', 'Failed to delete schedule.');
    }
  };

  const handleReschedule = () => {
    navigation.navigate('RescheduleScreen', { item }); // Redirect to reschedule page with item details
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/pcs/Backbutton.png')} style={styles.back} />
      </TouchableOpacity>
      <Text style={styles.title}>Medical Schedule Information</Text>

      <View style={styles.infoBox}>
        <Text style={styles.sectionTitle}>Heart Surgery</Text>
        <Text style={styles.subTitle}>{item.SchedVetClinic}</Text>

        <Text style={styles.sectionHeader}>Pet Information</Text>
        <Text style={styles.infoText}>Name: {item.SchedPet}</Text>
        <Text style={styles.infoText}>Type: Dog</Text> {/* Static placeholder */}
        <Text style={styles.infoText}>Breed: Chihuahua</Text> {/* Static placeholder */}
        <Text style={styles.infoText}>Age: 2 Years and 4 Months</Text> {/* Static placeholder */}
        <Text style={styles.infoText}>Weight: 2.5 Kg</Text> {/* Static placeholder */}

        <Text style={styles.sectionHeader}>Schedule Information</Text>
        <Text style={styles.infoText}>Date: {item.SchedDate}</Text>
        <Text style={styles.infoText}>Time: {item.SchedTime}</Text>
        <Text style={styles.infoText}>
          Vet Address: {item.SchedVetClinic}, Road 001, Commonwealth, Quezon City
        </Text>
      </View>

      <TouchableOpacity style={styles.rescheduleButton} onPress={handleReschedule}>
        <Text style={styles.rescheduleButtonText}>Reschedule</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
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
  rescheduleButton: {
    backgroundColor: '#C35E26',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  rescheduleButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
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
});
