import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Trustedveti() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [trustedVets, setTrustedVets] = useState([]);
    const [newVet, setNewVet] = useState({ name: '', address: '' });
    const [dimensions, setDimensions] = useState({ width: screenWidth, height: screenHeight });

    useEffect(() => {
        fetchTrustedVets(); // Fetch trusted vets on mount

        // Listener to detect dimension changes
        const onChange = ({ window }) => {
            setDimensions({
                width: window.width,
                height: window.height,
            });
        };

        // Attach the event listener and store the subscription
        const subscription = Dimensions.addEventListener('change', onChange);

        // Clean up the event listener on unmount
        return () => subscription.remove();
    }, []);

    const modalHeight = dimensions.height > 600 ? 600 : 400; // Dynamically set the modal height based on screen height

    const fetchTrustedVets = async () => {
        try {
            const response = await fetch('https://compawnion.onrender.com/Compawnions/addDetails'); // Replace with actual backend endpoint
            const data = await response.json();
            setTrustedVets(data);
        } catch (error) {
            console.error('Error fetching trusted vets:', error);
        }
    };

    const addNewVet = async () => {
        if (!newVet.name || !newVet.address) {
            Alert.alert('Error', 'Please fill out all fields.');
            return;
        }

        try {
            const response = await fetch('https://compawnion.onrender.com/Compawnions/addDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newVet),
            });

            if (response.ok) {
                Alert.alert('Success', 'Vet added successfully.');
                setNewVet({ name: '', address: '' });
                setModalVisible(false);
                fetchTrustedVets(); // Refresh the list
            } else {
                Alert.alert('Error', 'Failed to add vet.');
            }
        } catch (error) {
            console.error('Error adding vet:', error);
        }
    };

    const renderVetItem = ({ item }) => (
        <View style={styles.vetCard}>
            <View>
                <Text style={styles.vetName}>{TrustedVet.TVVetClinic}</Text>
                <Text style={styles.vetAddress}>{TrustedVet.TVAddress}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/pcs/Backbutton.png')} style={styles.back} />
            </TouchableOpacity>
            <Text style={styles.title}>Trusted{"\n"}Vets</Text>

            <FlatList
                data={trustedVets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderVetItem}
                contentContainerStyle={styles.vetList}
            />

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalBackground}>
                    <View style={[styles.modalContainer, { height: modalHeight }]}>
                        <TouchableOpacity style={styles.Closebutton} onPress={() => setModalVisible(false)}>
                            <Image source={require('../assets/pcs/Linec.png')} style={styles.Closemed} />
                        </TouchableOpacity>

                        <Text style={styles.Newvet}>Add New Vet</Text>
                        <TextInput
                            placeholder="Vet Name"
                            style={styles.input}
                            value={newVet.name}
                            onChangeText={(text) => setNewVet({ ...newVet, name: text })}
                        />
                        <TextInput
                            placeholder="Address"
                            style={styles.input}
                            value={newVet.address}
                            onChangeText={(text) => setNewVet({ ...newVet, address: text })}
                        />

                        <TouchableOpacity style={styles.addingButton} onPress={addNewVet}>
                            <Text style={styles.addButtonText}>Add Vet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={styles.Addbutton} onPress={() => setModalVisible(true)}>
                <Image source={require('../assets/pcs/Plus.png')} style={styles.Addmed} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    // Keep all your existing styles here
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E9E9E9',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    vetCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#C35E26',
        padding: 15,
        borderRadius: 15,
        marginVertical: 10,
        width: '100%',
    },
    vetName: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
    },
    vetAddress: {
        color: '#fff',
        fontSize: 14,
    },
    removeButton: {
        backgroundColor: '#D90000',
        padding: 10,
        borderRadius: 10,
    },
    removeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    back: {
        width: screenWidth > 400 ? 70 : 50,
        height: screenWidth > 400 ? 30 : 20,
        resizeMode: 'contain',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 10,
    },
    title: {
        fontSize: screenWidth > 400 ? 50 : 30,
        fontWeight: 'bold',
        color: '#C35E26',
        marginTop: 20,
        right: 30,
    },
    Addbutton: {
        position: 'absolute', // Position the button absolutely
        bottom: 100, // Keep it fixed at the bottom
        left: '50%', // Position it at the center horizontally
        transform: [{ translateX: -40 }], // Offset by half of the button's width to truly center it
        padding: 15,
        borderRadius: 100,
    },
    Addmed: {
        width: screenWidth > 400 ? 80 : 60,
        height: screenWidth > 400 ? 40 : 30,
        borderRadius: 100,
    },

    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: screenWidth > 400 ? 400 : 350,
        backgroundColor: '#E9E9E9',
        borderRadius: 40,
        padding: 20,
        alignItems: 'flex-start',
    },
    Closebutton: {
        padding: 15,
        borderRadius: 50,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    Closemed: {
        width: 200,
        height: 10,
    },
    Newvet: {
        fontSize: screenWidth > 400 ? 24 : 18,
        fontWeight: 'bold',
        color: '#D27D2D',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 30,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        width: '100%',
    },
    addingButton: {
        backgroundColor: '#D27D2D',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: screenWidth > 400 ? 18 : 16,
    },
});
