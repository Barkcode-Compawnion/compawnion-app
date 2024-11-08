import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function Addschedule() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  
  const handletrustvet = () => {
    console.log("Navigating to Trustedvets screen");
    setModalVisible(false);
    navigation.navigate('Trustedveti');
  };


  return (
    <View style={styles.container}>

      {/* Main screen button to open the modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openButton}>
        <Text style={styles.openButtonText}>Add New Schedule</Text>
      </TouchableOpacity>
       
      {/* Modal popup for the schedule form */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Add New Schedule</Text>
            <TextInput placeholder="Schedule Title" style={styles.input} />

            <View style={styles.pickerContainer}>
              <Picker>
                <Picker.Item label="November 9, 2024" value="date" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Picker>
                <Picker.Item label="8:00 AM" value="time" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Picker>
                <Picker.Item label="Vetlink Clinic" value="clinic" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Picker>
                <Picker.Item label="Ming" value="pet" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.addButtonText}>Add Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handletrustvet}>
              <Text style={styles.editText}>Edit trusted Veterinarian Clinics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
  },
  testerko:{
    fontSize:10,
    top:-10,
  },
  openButton: {
    backgroundColor: '#D27D2D',
    padding: 15,
    borderRadius: 20,
  },
  openButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D27D2D',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: '100%',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#D27D2D',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editText: {
    color: '#D27D2D',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

