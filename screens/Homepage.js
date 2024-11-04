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

    const handleProfilePress = () => {
        navigation.navigate('Profilescreen');
    };

    const handlePetPress = (pet) => {
        navigation.navigate('Pets', { pet });
    };

    const handleMedical = () =>{
        navigation.navigate('Medicalsched')
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={[styles.greeting, styles.fontStyle]}>Hello, Po</Text>
            <TouchableOpacity onPress={handleProfilePress}>
                <Image source={require('../assets/pcs/Dog.png')} style={styles.profilePic} />
            </TouchableOpacity>
            
            {/* Donate Card */}
            <View style={styles.donateCard}>
                <Image source={require('../assets/pcs/Dog.png')} style={styles.dogImage} />
                <Text style={[styles.donateText, styles.fontStyle]}>Please{"\n"}Please Please{"\n"}Mag donate po kayo~.</Text>
                <TouchableOpacity style={styles.donateButton}>
                    <Text style={styles.donateButtonText}>Donate Now</Text>
                </TouchableOpacity>
            </View>
            
            {/* My Pets Section */}
            <Text style={[styles.myPets,styles.fontStyle]}>My Pets</Text>
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
                <TouchableOpacity style={styles.footerButton} onPress={handleMedical}>
                <Image source={require('../assets/pcs/Medical.png')}
                style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                <Image source={require('../assets/pcs/Homeb.png')}
                style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                <Image source={require('../assets/pcs/Calendar.png')}
                style={styles.icon}/>
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
    fontStyle:{
        fontFamily:'Poppins-Regular'
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        right: 180,
        top: -40,
    },
    // Donate Card Styles
    donateCard: {
        backgroundColor: '#C35E26',
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        width: '90%', // Adjusted width to fit screen with some margin
        alignSelf: 'center',
        overflow: 'hidden',
        height: 150, // Adjust height as needed
        top:60,
    },
    textContainer: {
       flex: 1,
       paddingRight: 10,
       zIndex: 1,
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
       top:40,
       right:100,
    },
    donateButtonText: {
       color: '#D27D2D',
       fontWeight: 'bold',
    },

    //   My Pets   // 
    myPets: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#45362F',
        marginVertical: 10,
        top:80,
    },
    petList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        top:80,
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
