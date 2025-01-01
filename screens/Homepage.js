import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function Homepage({ route }) {
  const navigation = useNavigation();
  const [pets, setPets] = useState([]);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [appPetID, setAppPetID] = useState('');

  // Fetch username, profile image, and appPetID from AsyncStorage or route params
  useEffect(() => {
    const fetchData = async () => {
      const storedUsername = route?.params?.username || await AsyncStorage.getItem('username');
      const storedProfileImage = await AsyncStorage.getItem('profileImage');
      const storedAppPetID = await AsyncStorage.getItem('appPetID'); // Get appPetID from storage
      setUsername(storedUsername || 'User');
      setProfileImage(storedProfileImage || ''); // Default profile image if not found
      setAppPetID(storedAppPetID || ''); // Set appPetID if available
    };
    fetchData();
  }, [route]);

  // Fetch pet data based on appPetID from the backend
  useEffect(() => {
    async function fetchPets() {
        try {
          const appPetID = await AsyncStorage.getItem('appPetID', appPetID);
            const response = await axios.get(`https://compawnion-backend.onrender.com/adoptedAnimals/${appPetID}`);
            
            if (Array.isArray(response.data)) {
                setPets(response.data);
            } else {
                setPets(Object.values(response.data).slice(1));
                console.log(Object.values(response.data).slice(1));
            }
        } catch (error) {
            console.error('Error fetching pets:', error);
        }
    }
    fetchPets();
}, []);

  const handlePetPress = (pet) => {
    // Navigate to pet detail screen
    navigation.navigate('Pets', { pet });
  };

  const handleProfilePress = () => {
    navigation.navigate('Profilescreen', { profileImage });
  };

  const handleMedical = () => {
    // Navigate to medical schedule
    navigation.navigate('Medicalsched');
  };

  const handleCompawns = () => {
    navigation.navigate('Compawnionsched');
  };

  return (
    <View style={styles.container}>
      {/* Username and Profile Picture Section */}
      <Text style={[styles.greeting, styles.fontStyle]}>Hello,{"\n"}{username}</Text>


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
       <View style={styles.centerContainer}>
    <Text style={[styles.myPets, styles.fontStyle]}>My Pets</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.petList}>
        {pets.map((pet, index) => (
            <TouchableOpacity key={index} style={styles.petCard} onPress={() => handlePetPress(pet)}>
                <Image source={{ uri: pet.personal.picture }} style={styles.petImage} />
                <Text style={styles.petName}>{pet.personal.name}</Text>
                <Text style={styles.petBreed}>{pet.personal.breed}</Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
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
    fontSize: width * 0.10,
    fontWeight: 'bold',
    color: '#45362F',
  },
  fontStyle: {
    fontFamily: 'Poppins-Regular',
  },
  centerContainer: {
    flex: 1,                   // Takes up available space between "Donate" and footer
    justifyContent: 'center',   // Centers content vertically
    alignItems: 'center', 
    top:height * -0.15,     // Centers content horizontally
},
myPets: {
    fontSize: width * 0.09,
    fontWeight: 'bold',
    color: '#C35E26',
    marginBottom: 20,  
    top:height *0.14,
    left:width *-0.25,
},
petList: {
    flexDirection: 'row',
    alignItems: 'center',       // Center-aligns items within the row
},
petCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    width: width * 0.40,
    height: height * 0.25,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    top:height * 0.05,
},
petImage: {
    width: width * 0.30,
    height: height * 0.15,
    borderRadius: 15,
},
petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C35E26',
},
petBreed: {
    fontSize: 14,
    color: '#45362F',
},
  donateCard: {
    backgroundColor: '#C35E26',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    alignSelf: 'center',
    overflow: 'hidden',
    width: width * 0.75,
    height: width * 0.35,
    top: height * -0.01,
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