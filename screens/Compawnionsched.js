import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function MedicalSched() {
  const navigation = useNavigation();
  const [medSched, setMedSched] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the MedSched data from the backend
    const fetchMedicalSchedules = async () => {
      try {
        const companionId = await AsyncStorage.getItem('companionId'); 
        const response = await axios.get(
          `https://compawnion-backend.onrender.com/Compawnions/schedules/${companionId}` // Adjust the URL as needed
        );
        const data = response.data.data; // Assuming response contains 'data.data'
        setMedSched(data.MedSched); // Set the MedSched data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schedules:', error);
        setLoading(false);
        Alert.alert('Error', 'Failed to fetch schedules');
      }
    };

    fetchMedicalSchedules();
  }, []);

  const handleViewDetails = (schedule) => {
    // Navigate to a detail screen and pass schedule data
    navigation.navigate('ScheduleDetails', { schedule });
  };

  const renderScheduleItem = ({ item }) => (
    <View style={styles.scheduleBox}>
      <Text style={styles.scheduleTitle}>{item.SchedTitle}</Text>
      <Text style={styles.scheduleDetails}>Date: {item.SchedDate}</Text>
      <Text style={styles.scheduleDetails}>Time: {item.SchedTime}</Text>
      <Text style={styles.scheduleDetails}>Pet: {item.SchedPet}</Text>
      <Text style={styles.scheduleDetails}>Vet Clinic: {item.SchedVetClinic}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => handleViewDetails(item)}
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Schedules</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={medSched}
          renderItem={renderScheduleItem}
          keyExtractor={(item, index) => index.toString()} // Use index as key if no unique ID exists
          ListEmptyComponent={<Text>No schedules available.</Text>} // Handle empty MedSched
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Medicalsched')}>
          <Image source={require('../assets/pcs/Medical.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Homepage')}>
          <Image source={require('../assets/pcs/Home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={require('../assets/pcs/Calendarb.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E9E9E9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#C35E26',
  },
  scheduleBox: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scheduleDetails: {
    fontSize: 14,
    color: '#555',
  },
  detailsButton: {
    backgroundColor: '#C35E26',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#C35E26',
    alignSelf: 'center',
    width: '90%',
  },
  footerButton: {
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 70,
    height: 30,
  },
});