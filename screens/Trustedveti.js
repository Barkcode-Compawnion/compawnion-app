import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, Image, Dimensions, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

export default function Trustedveti() {
  const navigation = useNavigation();
  const [trustedVets, setTrustedVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newVet, setNewVet] = useState({ name: '', address: '' });

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

  useEffect(() => {
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
        console.log('Unexpected response:', response);
        Alert.alert('Error', 'Failed to add vet');
      }
    } catch (error) {
      console.error('Error adding vet:', error.response || error.message || error);
      Alert.alert('Error', 'Failed to add vet');
    }
  };

  const handleDeleteVet = async (vetId) => {
    try {
      const companionId = await AsyncStorage.getItem('companionId');
      if (!companionId) {
        Alert.alert('Error', 'Companion ID is missing.');
        return;
      }

      const index = trustedVets.findIndex(vet => vet._id === vetId); // Get the index of the vet to delete
      if (index === -1) {
        Alert.alert('Error', 'Vet not found.');
        return;
      }

      const response = await axios.delete(
        `https://compawnion-backend.onrender.com/Compawnions/deleteTrustedVet/${companionId}/${index}`
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Vet deleted');
        fetchTrustedVets(); // Refresh the list after deleting the vet
      } else {
        console.log('Unexpected response:', response);
        Alert.alert('Error', 'Failed to delete vet');
      }
    } catch (error) {
      console.error('Error deleting vet:', error.response || error.message || error);
      Alert.alert('Error', 'Failed to delete vet');
    }
  };

  const renderVetItem = ({ item }) => (
    <View style={styles.vetCard}>
      <Text style={styles.vetName}>{item.TVVetClinic}</Text>
      <Text style={styles.vetAddress}>{item.TVAddress}</Text>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteVet(item._id)} // Use the vet's _id to delete
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
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
    padding: wp(5), // Adjust padding based on screen width
    backgroundColor: '#E9E9E9',
  },
  title: {
    fontSize: hp(3), // Adjust font size based on screen height
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp(2), // Adjust margin based on screen height
    color: '#C35E26',
  },
  vetCard: {
    backgroundColor: 'white',
    padding: wp(4), // Adjust padding based on screen width
    marginBottom: hp(2), // Adjust margin based on screen height
    borderRadius: wp(3), // Radius scaling based on screen width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: wp(90), // Adjust width based on screen width
    height: hp(10), // Adjust height based on screen height
  },
  vetName: {
    fontSize: hp(2.4), // Adjusted font size based on screen height
    fontWeight: 'bold',
    color: '#333',
  },
  vetAddress: {
    fontSize: hp(1.8), // Adjusted font size based on screen height
    color: '#555',
    marginBottom: hp(1.5),
  },
  addButton: {
    backgroundColor: '#C35E26',
    padding: wp(4), // Adjusted padding based on screen width
    borderRadius: wp(3), // Radius scaling based on screen width
    marginTop: hp(2), // Adjust margin based on screen height
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: hp(15), // Adjust bottom position based on screen height
    left: wp(35), // Center horizontally
    width: wp(30), // Scalable width based on screen width
    height: hp(6), // Scalable height based on screen height
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp(2.1), // Adjusted font size based on screen height
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: wp(80), // Responsive width based on screen width
    backgroundColor: '#fff',
    padding: wp(5), // Scalable padding based on screen width
    borderRadius: wp(3), // Radius scaling based on screen width
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: hp(2.4), // Scalable font size based on screen height
    fontWeight: 'bold',
    marginBottom: hp(2), // Adjust margin based on screen height
  },
  input: {
    width: '100%',
    padding: wp(4), // Scalable padding based on screen width
    marginBottom: hp(1.5), // Scalable margin based on screen height
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: '#C35E26',
    padding: wp(4), // Scalable padding based on screen width
    borderRadius: 5,
    width: '100%',
    marginTop: hp(2), // Scalable margin based on screen height
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    paddingTop: hp(2), // Scalable padding based on screen height
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
    bottom: hp(5), // Scalable bottom margin based on screen height
    paddingVertical: hp(1), // Scalable vertical padding
    paddingHorizontal: wp(5), // Scalable horizontal padding
    borderRadius: wp(10), // Radius scaling based on screen width
    backgroundColor: '#C35E26',
    alignSelf: 'center',
    width: '100%',
  },
  footerButton: {
    alignItems: 'center',
    padding: wp(3), // Scalable padding based on screen width
  },
  icon: {
    width: wp(20), // Scalable width based on screen width
    height: hp(5), // Scalable height based on screen height
  },
  deleteButton: {
    marginTop: hp(1), // Adjusted margin based on screen height
    backgroundColor: '#C32626',
    paddingVertical: hp(1), // Scalable vertical padding based on screen height
    paddingHorizontal: wp(4), // Scalable horizontal padding based on screen width
    borderRadius: wp(2), // Scalable radius based on screen width
    alignItems: 'center',
    width: wp(20), // Scalable width based on screen width
    height: hp(4), // Scalable height based on screen height
    left: hp(27),
    bottom:hp(7),
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});