import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
            const response = await axios.get('https://compawnion-backend.onrender.com/ra');
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

      <TouchableOpacity onPress={handleProfilePress}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../assets/pcs/Dog.png')} // Check if profileImage exists, use URI or fallback to local image
          style={styles.profilePic}
        />
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
       <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.petList}>
    {pets.map((pet, index) => (
        <TouchableOpacity key={index} style={styles.petCard} onPress={() => handlePetPress(pet)}>
            <Image source={{ uri: pet.personal.picture }} style={styles.petImage} />
            <Text style={styles.petName}>{pet.personal.name}</Text>
            <Text style={styles.petBreed}>{pet.personal.breed}</Text>
        </TouchableOpacity>
    ))}
       </ScrollView>
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
    top: -150,
  },
  myPets: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#C35E26',
    marginVertical: 20,
    marginLeft: 20,
    top:40,
},
petList: {
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    top:-80,
},
petCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    width: 140,
    height: 180,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
},
petImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginBottom: 10,
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
