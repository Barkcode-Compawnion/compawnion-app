import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Compawnionsched() {
  const navigation = useNavigation();
  const [compawnionSched, setCompawnionSched] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the CompawnionSched data from the backend
    const fetchCompawnionSched = async () => {
      try {
        const response = await axios.get('https://compawnion-backend.onrender.com/Compawnions/CompawnionSched'); // Adjust the URL as needed
        setCompawnionSched(response.data.data); // Assuming the response contains a 'data' field
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setLoading(false);
        Alert.alert('Error', 'Failed to fetch schedules');
      }
    };

    fetchCompawnionSched();
  }, []);

  const handleHomep = () => {
    navigation.navigate('Homepage');
  };

  const handleMedical = () => {
    navigation.navigate('Medicalsched');
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'You can reach out to barkcodecompawnion@gmail.com');
  };

  const handleViewDetails = (schedId) => {
    // Navigate to a detail screen and pass the schedule ID or other necessary data
    navigation.navigate('ScheduleDetails', { schedId });
  };

  const renderSchedItem = ({ item }) => {
    return (
      <View style={styles.scheduleBox}>
        <Text style={styles.scheduleTitle}>{item.EventTitle}</Text>
        <Text style={styles.scheduleDetails}>Date: {item.CSDate}</Text>
        <Text style={styles.scheduleDetails}>Time: {item.CSTime}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => handleViewDetails(item.id)} // Assuming each item has an 'id' field
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compawnions{"\n"}Schedules</Text>
      <TouchableOpacity onPress={handleContactSupport}>
        <Text style={styles.contactSupport}>Contact Support</Text>
      </TouchableOpacity>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={compawnionSched}
          renderItem={renderSchedItem}
          keyExtractor={(item) => item.id.toString()} // Assuming each schedule has a unique 'id'
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={handleMedical}>
          <Image source={require('../assets/pcs/Medical.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleHomep}>
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
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'flex-start',
    top: 50,
    marginLeft: 50,
    color: '#C35E26',
    position: 'absolute',
    zIndex: 1,
  },
  contactSupport: {
    fontSize: 12,
    color: '#C35E26',
    textDecorationLine: 'underline',
    top: 670,
    left: 140,
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
