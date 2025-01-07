import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
  Image,
  Dimensions
} from 'react-native';
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
  const [vetClinics, setVetClinics] = useState([]);
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({
    title: '',
    month: '',
    day: '',
    year: '',
    time: '',
    vetClinic: '',
    pet: '',
  });
  const fetchMedicalSchedules = async () => {
    try {
      const companionId = await AsyncStorage.getItem('companionId');
      const response = await axios.get(
        `https://compawnion-backend.onrender.com/Compawnions/schedules/${companionId}`
      );
      setMedSched(response.data.data?.MedSched || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch schedules');
    }
  };

  useEffect(() => {
    fetchMedicalSchedules();
  }, []);

  const handleDeleteSchedule = async (index) => {
    try {
      const companionId = await AsyncStorage.getItem('companionId'); // Retrieve the companion ID
      const response = await axios.delete(
        `https://compawnion-backend.onrender.com/Compawnions/deleteMedSched/${companionId}/${index}`
      );
  
      if (response.status === 200) {
        Alert.alert('Success', 'Schedule deleted successfully!');
        fetchMedicalSchedules(); // Refresh the schedule list
      }
    } catch (error) {
      console.error('Error deleting schedule:', error);
      Alert.alert('Error', 'Failed to delete schedule.');
    }
  };

  useEffect(() => {
    const fetchVetClinics = async () => {
      try {
        const companionId = await AsyncStorage.getItem('companionId');
        const response = await axios.get(`https://compawnion-backend.onrender.com/Compawnions/TrustedVet/${companionId}`);
        console.log(response.data.data);

        setVetClinics(response.data.data || []);
      } catch (error) {
        console.error('Error fetching vet clinics:', error);
        Alert.alert('Error', 'Failed to fetch vet clinics.');
      }
    };

    fetchVetClinics();
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const appPetID = await AsyncStorage.getItem('appPetID', appPetID);
        const response = await axios.get(`https://compawnion-backend.onrender.com/adoptedAnimals/${appPetID}`);
        console.log(JSON.stringify(Object.values(response.data).slice(1), null, 2))
        setPets(Object.values(response.data).slice(1) || []);
      } catch (error) {
        console.error('Error fetching pets:', error);
        Alert.alert('Error', 'Failed to fetch pets.');
      }
    };

    fetchPets();
  }, []);

  const handleSubmitSchedule = async () => {
    try {
      const companionId = await AsyncStorage.getItem('companionId');
      const scheduleData = {
        MedSched: {
          SchedTitle: form.title,
          SchedDate: `${form.month}/${form.day}/${form.year}`,
          SchedTime: form.time,
          SchedVetClinic: form.vetClinic,
          SchedPet: form.pet,
        },
      };

      const response = await axios.post(
        `https://compawnion-backend.onrender.com/Compawnions/addMedSched/${companionId}`,
        scheduleData
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Schedule added successfully!');
        setModalVisible(false);
        fetchMedicalSchedules();
      }
    } catch (error) {
      console.error('Error submitting schedule:', error);
      Alert.alert('Error', 'Failed to add schedule.');
    }
  };

  const renderScheduleItem = ({ item, index }) => (
    <View style={styles.scheduleBox}>
      <Text style={styles.scheduleTitle}>{item.SchedTitle}</Text>
      <Text style={styles.scheduleDetails}>Date: {item.SchedDate}</Text>
      <Text style={styles.scheduleDetails}>Time: {item.SchedTime}</Text>
      <Text style={styles.scheduleDetails}>Pet: {item.SchedPet}</Text>
      <Text style={styles.scheduleDetails}>Vet Clinic: {item.SchedVetClinic}</Text>
  
      <View style={styles.buttonRow}>

  
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() =>
            Alert.alert(
              'Confirm Delete',
              'Are you sure you want to delete this schedule?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => handleDeleteSchedule(index) },
              ]
            )
          }
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
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

            <View>
              {/* Month Picker */}
              <View style={styles.dateRow}>
                <Picker
                  selectedValue={form.month}
                  style={[styles.picker, styles.dateInput, {width: '100%'}]}
                  onValueChange={(value) => {
                    setForm({ ...form, month: value, day: '' }); // Reset day when month changes
                  }}
                >
                  <Picker.Item label="MM" value="" enabled={false} />
                  {/* {Array.from({ length: 12 }, (_, i) => (
                    <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
                  ))} */}
                  {
                    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                      .map((month, i) =>  <Picker.Item key={i + 1} label={`${month}`} value={`${i + 1}`} />)
                  }
                </Picker>
              </View>

              {/* Day Picker */}
              <View style={styles.dateRow}>
                <Picker
                  selectedValue={form.day}
                  style={[styles.picker, styles.dateInput]}
                  enabled={!!form.month} // Disable if no month is selected
                  onValueChange={(value) => setForm({ ...form, day: value })}
                >
                  <Picker.Item label="DD" value="" enabled={false} style={{width: '50%'}} />
                  {(() => {
                    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    const maxDay = daysInMonth[parseInt(form.month, 10) - 1] || 31;
                    return Array.from({ length: maxDay }, (_, i) => (
                      <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
                    ));
                  })()}
                </Picker>
                <TextInput
                  style={[styles.input, styles.dateInput, {width: '50%'}]}
                  placeholder="YYYY"
                  keyboardType="numeric"
                  maxLength={4}
                  onChangeText={(text) => setForm({ ...form, year: text.replace(/[^0-9]/g, '') })}
                  value={form.year}
                />
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Time (e.g., 8:00 AM)"
              onChangeText={(text) => setForm({ ...form, time: text })}
              value={form.time}
            />

            <Picker
              selectedValue={form.vetClinic}
              onValueChange={(itemValue) => setForm({ ...form, vetClinic: itemValue })}
              style={styles.picker}
              placeholder='Select Vet Clinic'
            >
              <Picker.Item label="Select Vet Clinic" value="" enabled={false} />
              {vetClinics && vetClinics.map((clinic, index) => (
                <Picker.Item key={index} label={clinic.TVVetClinic} value={clinic.TVAddress} />
              ))}
            </Picker>

            <Picker
              selectedValue={form.pet}
              onValueChange={(itemValue) => setForm({ ...form, pet: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="Select Pet" value="" enabled={false} />
              {pets && pets.map((pet, index) => (
                <Picker.Item key={index} label={pet.personal.name} value={pet.personal.name} />
              ))}
            </Picker>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Trustedveti');
              }}
            >
              <Text style={styles.modalButtonText}>Edit Trusted Vets</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleSubmitSchedule}
            >
              <Text style={styles.addButtonText}>Add Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

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
    padding: width * 0.05,
    backgroundColor: '#E9E9E9',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.02,
    color: '#C35E26',
  },
  scheduleBox: {
    backgroundColor: 'white',
    padding: width * 0.05,
    marginBottom: height * 0.01,
    borderRadius: width * 0.03,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  scheduleTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
  },
  scheduleDetails: {
    fontSize: width * 0.04,
    color: '#555',
  },
  detailsButton: {
    backgroundColor: '#C35E26',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: width * 0.02,
    marginTop: height * 0.01,
    alignSelf: 'flex-end',
  },
  detailsButtonText: {
    fontSize: width * 0.04,
    color: 'white',
    fontWeight: 'bold',
  },
  floatingButton: {
    backgroundColor: '#C35E26',
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: height * 0.15,
    right: width * 0.42,
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: width * 0.08,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: width * 0.05,
    borderRadius: width * 0.03,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  input: {
    width: '100%',
    padding: width * 0.03,
    borderWidth: 1,
    borderRadius: width * 0.02,
    borderColor: '#ddd',
    marginBottom: height * 0.01,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: height * 0.01,
  },
  dateInput: {
    width: '30%',
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    height: height * 0.06,
    marginBottom: height * 0.01,
  },
  addButton: {
    backgroundColor: '#C35E26',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: width * 0.03,
    marginTop: height * 0.02,
  },
  addButtonText: {
    fontSize: width * 0.05,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.01,
  },
  deleteButton: {
    backgroundColor: '#C32626',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: width * 0.02,
  },
  deleteButtonText: {
    fontSize: width * 0.04,
    color: 'white',
    fontWeight: 'bold',
  },
});
