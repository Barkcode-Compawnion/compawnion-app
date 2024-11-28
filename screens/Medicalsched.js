import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Alert,FlatList,Image,Dimensions,Modal,TextInput,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

export default function MedicalSched() {
  const navigation = useNavigation();
  const [medSched, setMedSched] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    vetClinic: '',
    pet: '',
  });

  useEffect(() => {
    const fetchMedicalSchedules = async () => {
      try {
        const companionId = await AsyncStorage.getItem('companionId');
        const response = await axios.get(
          `https://compawnion-backend.onrender.com/Compawnions/schedules/${companionId}`
        );
        const data = response.data.data;
        setMedSched(data.MedSched);
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
    navigation.navigate('ScheduleDetails', { schedule });
  };

  const handleAddSchedule = () => {
    setModalVisible(true);
  };

  const handleSubmitSchedule = () => {
    // Logic to submit the schedule
    setModalVisible(false);
    Alert.alert('Success', 'Schedule added successfully!');
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
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text>No schedules available.</Text>}
        />
      )}

      {/* Modal for Add New Schedule */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Schedule</Text>

            <TextInput
              style={styles.input}
              placeholder="Schedule Title"
              onChangeText={(text) => setForm({ ...form, title: text })}
              value={form.title}
            />

            <Picker
              selectedValue={form.date}
              onValueChange={(itemValue) => setForm({ ...form, date: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="November 9, 2024" value="November 9, 2024" />
              <Picker.Item label="November 10, 2024" value="November 10, 2024" />
            </Picker>

            <Picker
              selectedValue={form.time}
              onValueChange={(itemValue) => setForm({ ...form, time: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="8:00 AM" value="8:00 AM" />
              <Picker.Item label="9:00 AM" value="9:00 AM" />
            </Picker>

            <Picker
              selectedValue={form.vetClinic}
              onValueChange={(itemValue) => setForm({ ...form, vetClinic: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="Vetlink Clinic" value="Vetlink Clinic" />
              <Picker.Item label="Other Clinic" value="Other Clinic" />
            </Picker>

            <Picker
              selectedValue={form.pet}
              onValueChange={(itemValue) => setForm({ ...form, pet: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="Ming" value="Ming" />
              <Picker.Item label="Barky" value="Barky" />
            </Picker>

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleSubmitSchedule}
            >
              <Text style={styles.addButtonText}>Add Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddSchedule}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Medicalsched')}>
          <Image source={require('../assets/pcs/Medicalb.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Homepage')}>
          <Image source={require('../assets/pcs/Home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Compawnionsched')}>
          <Image source={require('../assets/pcs/Calendar.png')} style={styles.icon} />
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
  floatingButton: {
    backgroundColor: '#C35E26',
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
    right: 180,
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 30,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#C35E26',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#C35E26',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
