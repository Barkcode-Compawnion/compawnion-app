import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute

// Get screen dimensions
const { width, height } = Dimensions.get('window');

export default function Medicalsched() {
    const [modalVisible, setModalVisible] = useState(false); // Modal state
    const [schedules, setSchedules] = useState([]); // Store fetched schedules
    const [newSchedule, setNewSchedule] = useState({
        title: '',
        date: '',
        time: '',
        vetClinic: '',
        pet: ''
    });
    const navigation = useNavigation();
    const route = useRoute(); // Get the route object to access params
    const { username } = route.params; // Access username from route params

    // Fetch schedules from the backend when the component mounts
    useEffect(() => {
        fetch('https://compawnion-backend.onrender.com/Compawnions/addDetails')
            .then((response) => response.json())
            .then((data) => {
                setSchedules(data); // Save data to state
            })
            .catch((error) => {
                console.error('Error fetching schedules:', error);
            });
    }, []);

    // Navigation functions
    const handleHomep = () => navigation.navigate('Homepage');
    const handleCompawns = () => navigation.navigate('Compawnionsched');
    const handletrustvet = () => {
        setModalVisible(false); // Close modal on navigating
        navigation.navigate('Trustedveti');
    };

    // Render each schedule item
    const renderScheduleItem = ({ item }) => (
        <View style={styles.scheduleItem}>
            <Text style={styles.scheduleTitle}>{item.title}</Text>
            <Text style={styles.scheduleDetail}>Date: {item.date}</Text>
            <Text style={styles.scheduleDetail}>Time: {item.time}</Text>
            <Text style={styles.scheduleDetail}>Vet Clinic: {item.vetClinic}</Text>
            <Text style={styles.scheduleDetail}>Pet: {item.pet}</Text>
        </View>
    );

    // Add a new schedule to the list and send it to the backend
    const addNewSchedule = () => {
        fetch('https://compawnion-backend.onrender.com/Compawnions/addDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                SchedTitle: newSchedule.title,
                SchedDate: newSchedule.date,
                SchedTime: newSchedule.time,
                SchedVetClinic: newSchedule.vetClinic,
                SchedPet: newSchedule.pet,
                Username: username // Add the username here
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                setSchedules([...schedules, newSchedule]); // Update frontend state
                resetForm(); // Reset input fields
                setModalVisible(false); // Close modal
            } else {
                console.error('Failed to add schedule:', data.message);
            }
        })
        .catch((error) => {
            console.error('Error adding schedule:', error);
        });
    };

    // Reset form fields after adding a schedule
    const resetForm = () => {
        setNewSchedule({
            title: '',
            date: '',
            time: '',
            vetClinic: '',
            pet: ''
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Medical{"\n"}Schedules</Text>

            {/* FlatList for displaying schedules */}
            <FlatList
                data={schedules}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderScheduleItem}
                contentContainerStyle={styles.scheduleList}
            />

            {/* Add Button for Modal */}
            <TouchableOpacity
                style={styles.Addbutton}
                onPress={() => setModalVisible(true)} // Trigger Modal visibility
            >
                <Image source={require('../assets/pcs/Plus.png')} style={styles.Addmed} />
            </TouchableOpacity>

            {/* Modal for adding schedule */}
            <Modal
                animationType="slide"
                transparent={true} // Ensure background is transparent
                visible={modalVisible} // Conditional rendering of the modal
                onRequestClose={() => setModalVisible(false)} // Close modal on request
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        {/* Close Button */}
                        <TouchableOpacity
                            style={styles.Closebutton}
                            onPress={() => setModalVisible(false)} // Close modal
                        >
                            <Image source={require('../assets/pcs/Linec.png')} style={styles.Closemed} />
                        </TouchableOpacity>
                        <Text style={styles.titlesched}>Add New Schedule</Text>

                        {/* Input Fields for Schedule */}
                        <TextInput
                            style={styles.input}
                            placeholder="Schedule Title"
                            value={newSchedule.title}
                            onChangeText={(text) => setNewSchedule({ ...newSchedule, title: text })}
                        />

                        {/* Date Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Date (YYYY-MM-DD)"
                            value={newSchedule.date}
                            onChangeText={(text) => setNewSchedule({ ...newSchedule, date: text })}
                        />

                        {/* Time Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Time (HH:mm)"
                            value={newSchedule.time}
                            onChangeText={(text) => setNewSchedule({ ...newSchedule, time: text })}
                        />

                        {/* Vet Clinic and Pet Inputs */}
                        <TextInput
                            style={styles.input}
                            placeholder="Vet Clinic"
                            value={newSchedule.vetClinic}
                            onChangeText={(text) => setNewSchedule({ ...newSchedule, vetClinic: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Pet"
                            value={newSchedule.pet}
                            onChangeText={(text) => setNewSchedule({ ...newSchedule, pet: text })}
                        />

                        {/* Add Schedule Button */}
                        <TouchableOpacity
                            style={styles.addingButton}
                            onPress={addNewSchedule} // Add the new schedule
                        >
                            <Text style={styles.addButtonText}>Add Schedule</Text>
                        </TouchableOpacity>

                        {/* Edit Trusted Vet Button */}
                        <TouchableOpacity onPress={handletrustvet}>
                            <Text style={styles.editText}>Edit trusted Veterinarian Clinics</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Footer buttons for navigation */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                    <Image source={require('../assets/pcs/Medicalb.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={handleHomep}>
                    <Image source={require('../assets/pcs/Home.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={handleCompawns}>
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
        fontSize: width > 400 ? 50 : 30, // Dynamic font size based on screen width
        fontWeight: 'bold',
        textAlign: 'flex-start',
        marginTop: width > 400 ? 50 : 30,
        marginLeft: width > 400 ? 50 : 30,
        color: '#C35E26',
    },
    scheduleList: {
        marginTop: 120,
        paddingBottom: 100,
    },
    scheduleItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    scheduleTitle: {
        fontSize: width > 400 ? 18 : 14, // Dynamic font size for schedule title
        fontWeight: 'bold',
        color: '#C35E26',
        marginBottom: 5,
    },
    scheduleDetail: {
        fontSize: width > 400 ? 14 : 12, // Dynamic font size for details
        color: '#45362F',
    },
    Addbutton: {
        position: 'absolute',
        bottom: width > 400 ? 120 : 80,
        left: width > 400 ? 150 : 125,
        padding: 15,
        borderRadius: 40,
        zIndex: 10,
    },
    Addmed: {
        width: 80,
        height: 40,
    },

    Closebutton: {
        padding: 15,
        borderRadius: 50,
        left: 0,
        top: -10,
    },
    Closemed: {
        width: 200,
        height: 10,
    },
    titlesched: {
        fontSize: width > 400 ? 24 : 20, // Adjust title size in modal
        fontWeight: 'bold',
        color: '#D27D2D',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 30,
        marginBottom: 10,
        width: '100%',
    },
    addingButton: {
        backgroundColor: '#D27D2D',
        padding: 15,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignItems: 'center',
        width: width > 400 ? 270 : 200,
        height: 40,
        left: 0,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: width > 400 ? 18 : 16,
    },
    editText: {
        color: '#D27D2D',
        textAlign: 'center',
        marginTop: 10,
        textDecorationLine: 'underline',
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        bottom: height * 0.05,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: '#C35E26',
        alignSelf: 'center',
        width: width * 0.9,
        height: height * 0.09,
      },
      footerButton: {
        alignItems: 'center',
        padding: 10,
      },
      icon: {
        width: 70,
        height: 30,
      },

    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: width > 400 ? 400 : 300,
        height: height > 600 ? 700 : 500,
        backgroundColor: '#E9E9E9',
        borderRadius: 30,
        padding: 20,
        alignItems: 'center',
        top: 100,
    },
});
