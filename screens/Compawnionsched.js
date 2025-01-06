import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, FlatList, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function Compawnionsched() {
  const navigation = useNavigation();
  const [compawnionSched, setCompawnionSched] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the CompawnionSched data from the backend
  const fetchCompawnionSchedules = async () => {
    try {
      const companionId = await AsyncStorage.getItem('companionId');
      if (!companionId) {
        throw new Error('Companion ID is missing');
      }
      
      const response = await axios.get(
        `https://compawnion-backend.onrender.com/Compawnions/CompawnionSched/${companionId}`
      );
      const data = response.data.data; // Assuming response contains 'data.data'

      if (Array.isArray(data)) {
        setCompawnionSched(data);
      } else {
        throw new Error('Invalid data format');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch schedules');
    }
  };

  useEffect(() => {
    fetchCompawnionSchedules();
  }, []);

  const handleEnterRoom = (link) => {
    // Navigate to a detail screen and pass schedule data
    Linking.openURL(link).catch(err => console.error("Couldn't load page", err));
  };

  const renderScheduleItem = ({ item }) => (
    <View style={styles.scheduleBox}>
      <Text style={styles.scheduleTitle}>{item.EventTitle}</Text>
      <Text style={styles.scheduleDetails}>Date: {item.CSDate}</Text>
      <Text style={styles.scheduleDetails}>Time: {item.CSTime}</Text>
      <Text style={styles.scheduleDetails}>Gmeet Room: {item.GmeetRoom}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => handleEnterRoom(item.GmeetRoom)}
      >
        <Text style={styles.detailsButtonText}>Enter Room</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compawnions Schedules</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={compawnionSched}
          renderItem={renderScheduleItem}
          keyExtractor={(item, index) => index.toString()} // Use index as key if no unique ID exists
          ListEmptyComponent={<Text>No schedules available.</Text>} // Handle empty compawnionSched
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
    bottom: 10,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.1,
    backgroundColor: '#C35E26',
    alignSelf: 'center',
    width: '100%',
    bottom: height * 0.05,
  },
  footerButton: {
    alignItems: 'center',
    padding: width * 0.03,
  },
  icon: {
    width: width * 0.2,
    height: height * 0.05,
  },
});
