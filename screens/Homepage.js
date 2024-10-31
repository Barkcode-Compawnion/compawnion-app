import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Homepage() {
    const navigation = useNavigation();

    // Sample data for each pet
    const pets = [
        {
            name: 'Jason',
            breed: 'Chihuahua',
            image: require('../assets/pcs/Duge.png'),
        },
        {
            name: 'Ming',
            breed: 'Puspin',
            image: require('../assets/pcs/Duge.png'),
        },
        // Add more pets as needed
    ];

    // Handler to navigate to the Profile screen
    const handleProfilePress = () => {
        navigation.navigate('ProfileScreen'); // Navigate to Profile screen
    };

    // Handler to navigate to Pet Detail screen with pet data
    const handlePetPress = (pet) => {
        navigation.navigate('Pets', { pet }); // Pass the pet object as a parameter
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.greeting}>Hello, Po</Text>
            <TouchableOpacity onPress={handleProfilePress}>
                <Image source={require('../assets/pcs/Duge.png')} style={styles.profilePic} />
            </TouchableOpacity>
            
            {/* Donate Card */}
            <View style={styles.donateCard}>
                <Image source={require('../assets/pcs/Duge.png')} style={styles.dogImage} />
                <Text style={styles.donateText}>Please Please Please Mag donate po kayo~.</Text>
                <TouchableOpacity style={styles.donateButton}>
                    <Text style={styles.donateButtonText}>Donate Now</Text>
                </TouchableOpacity>
            </View>
            
            {/* My Pets Section */}
            <Text style={styles.myPets}>My Pets</Text>
            <View style={styles.petList}>
                {pets.map((pet, index) => (
                    <TouchableOpacity key={index} style={styles.petCard} onPress={() => handlePetPress(pet)}>
                        <Image source={pet.image} style={styles.petImage} />
                        <Text style={styles.petName}>{pet.name}</Text>
                        <Text style={styles.petBreed}>{pet.breed}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>🏠</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>📅</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>⚙️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    greeting: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#45362F',
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        right: 180,
        top: -40,
    },
    donateCard: {
        backgroundColor: '#D27D2D',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        marginVertical: 20,
    },
    dogImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    donateText: {
        color: '#FFFFFF',
        marginVertical: 10,
    },
    donateButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 10,
    },
    donateButtonText: {
        color: '#D27D2D',
        fontWeight: 'bold',
    },
    myPets: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#45362F',
        marginVertical: 10,
    },
    petList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    petCard: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        width: 100,
        marginVertical: 10,
    },
    petImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    petName: {
        fontWeight: 'bold',
    },
    petBreed: {
        fontSize: 12,
        color: '#888',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
    footerButton: {
        padding: 15,
    },
    footerButtonText: {
        fontSize: 24,
        color: '#D27D2D',
    },
});
