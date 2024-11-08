import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Homepage() {
    const navigation = useNavigation();
    const [pets, setPets] = useState([]); // State to hold pet data

    // Fetch pets from backend API
    useEffect(() => {
        async function fetchPets() {
            try {
                const response = await axios.get('https://compawnion-backend.onrender.com');
                if (Array.isArray(response.data)) {
                    setPets(response.data);
                } else {
                    console.error("Expected an array but received:", response.data);
                    setPets([]);
                }
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        }

        fetchPets();
    }, []);

    const handleProfilePress = () => {
        navigation.navigate('Profilescreen');
    };

    const handlePetPress = (pet) => {
        navigation.navigate('Pets', { pet });
    };

    const handleMedical = () => {
        navigation.navigate('Medicalsched');
    };

    const handleCompawns = () => {
        navigation.navigate('Compawnionsched');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={[styles.greeting, styles.fontStyle, { fontFamily: 'Poppins-Regular' }]}>Hello,</Text>
            <TouchableOpacity onPress={handleProfilePress}>
                <Image source={require('../assets/pcs/Dog.png')} style={styles.profilePic} />
            </TouchableOpacity>
            
            {/* Donate Card */}
            <View style={styles.donateCard}>
                <Image source={require('../assets/pcs/Dog.png')} style={styles.dogImage} />
                <Text style={[styles.donateText, styles.fontStyle, { fontFamily: 'Poppins-Regular' }]}>
                    Please{"\n"}Please Please{"\n"}Mag donate po~.
                </Text>
                <TouchableOpacity style={styles.donateButton}>
                    <Text style={styles.donateButtonText}>Donate Now</Text>
                </TouchableOpacity>
            </View>

            {/* My Pets Section */}
            <Text style={[styles.myPets, styles.fontStyle]}>My Pets</Text>
            <View style={styles.petList}>
                {pets.map((pet, index) => (
                    <TouchableOpacity key={index} style={styles.petCard} onPress={() => handlePetPress(pet)}>
                        <Image source={{ uri: pet.personal.picture }} style={styles.petImage} />
                        <Text style={styles.petName}>{pet.personal.name}</Text>
                        <Text style={styles.petBreed}>{pet.personal.breed}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={handleMedical}>
                    <Image source={require('../assets/pcs/Medical.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Image source={require('../assets/pcs/Homeb.png')} style={styles.icon} />
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
    greeting: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#45362F',
    },
    fontStyle: {
        fontFamily: 'Poppins-Regular',
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 100,
        position: 'absolute',
        right: 110,
        top: -65,
    },
    // Donate Card Styles
    donateCard: {
        backgroundColor: '#C35E26',
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        width: '90%',
        alignSelf: 'center',
        overflow: 'hidden',
        height: 150,
        top: 60,
    },
    dogImage: {
        position: 'absolute',
        right: 20,
        width: 150,
        height: 150,
    },
    donateText: {
        color: '#FFFFFF',
        fontSize: 14,
        marginBottom: 10,
        flexWrap: 'wrap',
        bottom: 10,
    },
    donateButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingVertical: 5,
        paddingHorizontal: 45,
        top: 40,
        right: 100,
    },
    donateButtonText: {
        color: '#D27D2D',
        fontWeight: 'bold',
    },
    // My Pets
    myPets: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#C35E26',
        marginVertical: 10,
        top: 80,
    },
    petList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        top: 80,
    },
    petCard: {
        backgroundColor: '#FFF',
        borderRadius: 30,
        padding: 10,
        alignItems: 'center',
        width: 150,
        height: 160,
        marginVertical: 10,
    },
    petImage: {
        width: 100,
        height: 100,
    },
    petName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#C35E26',
    },
    petBreed: {
        fontSize: 15,
        color: '#45362F',
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
