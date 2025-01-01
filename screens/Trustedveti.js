import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, Image, Dimensions, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function Trustedveti() {
  const navigation = useNavigation();
  const [trustedVets, setTrustedVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newVet, setNewVet] = useState({ name: '', address: '' });

  useEffect(() => {
    // Fetch the TrustedVet data from the backend
    const fetchTrustedVets = async () => {
      try {
        const companionId = await AsyncStorage.getItem('companionId');
        if (!companionId) {
          throw new Error('Companion ID is missing');
        }

        const response = await axios.get(
          `https://compawnion-backend.onrender.com/Compawnions/TrustedVet/${companionId}`
        );
        const data = response.data.data; // Assuming response contains 'data.data'

        if (Array.isArray(data)) {
          setTrustedVets(data);
        } else {
          throw new Error('Invalid data format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trusted vets:', error);
        setLoading(false);
        Alert.alert('Error', 'Failed to fetch trusted vets');
      }
    };

    fetchTrustedVets();
  }, []);

  const handleAddVet = async () => {
    if (!newVet.name || !newVet.address) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }
  
    try {
      const companionId = await AsyncStorage.getItem('companionId');
      if (!companionId) {
        Alert.alert('Error', 'Companion ID is missing.');
        return;
      }
  
      const response = await axios.post(
        `https://compawnion-backend.onrender.com/Compawnions/addTrustedVet/${companionId}`,
        {
          TrustedVet: {
            TVVetClinic: newVet.name,
            TVAddress: newVet.address,
          }
        }
      );
  
      if (response.status === 200) {
        Alert.alert('Success', 'New vet added');
        setModalVisible(false);
        setNewVet({ name: '', address: '' });
        fetchTrustedVets(); // Refresh the list after adding a new vet
      } else {
        // Log the response in case the status is not 200
        console.log('Unexpected response:', response);
        Alert.alert('Error', 'Failed to add vet');
      }
    } catch (error) {
      // Log the error and check its details
      console.error('Error adding vet:', error.response || error.message || error);
      Alert.alert('Error', 'Failed to add vet');
    }
  };
  
  

  const renderVetItem = ({ item }) => (
    <View style={styles.vetCard}>
      <Text style={styles.vetName}>{item.TVVetClinic}</Text>
      <Text style={styles.vetAddress}>{item.TVAddress}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trusted Vets</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={trustedVets}
          renderItem={renderVetItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text>No trusted vets available.</Text>}
        />
      )}

      {/* Add Vet Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add New Vet</Text>
      </TouchableOpacity>

      {/* Add Vet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Vet</Text>
            <TextInput
              style={styles.input}
              placeholder="Vet Clinic Name"
              value={newVet.name}
              onChangeText={(text) => setNewVet({ ...newVet, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Vet Address"
              value={newVet.address}
              onChangeText={(text) => setNewVet({ ...newVet, address: text })}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddVet}
            >
              <Text style={styles.modalButtonText}>Add Vet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Footer with navigation buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Medicalsched')}>
          <Image source={require('../assets/pcs/Medicalb.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Homepage')}>
          <Image source={require('../assets/pcs/Home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
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
  vetCard: {
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
  vetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  vetAddress: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#C35E26',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 130,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: '#C35E26',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    paddingTop: 15,
  },
  closeButtonText: {
    color: '#C35E26',
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
