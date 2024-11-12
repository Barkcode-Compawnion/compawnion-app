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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsername = route?.params?.username || (await AsyncStorage.getItem('username'));
        const storedProfileImage = await AsyncStorage.getItem('profileImage');
        const storedAppPetID = await AsyncStorage.getItem('appPetID');
        
        setUsername(storedUsername || 'User');
        setProfileImage(storedProfileImage || '');
        setAppPetID(storedAppPetID || '');

        if (storedAppPetID) {
          fetchPets(storedAppPetID);
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [route]);

  const fetchPets = async (appPetID) => {
    try {
      console.log('Fetching pets for appPetID:', appPetID); // Debugging log
      const response = await axios.get(`https://compawnion-backend.onrender.com/adoptedAnimals/${appPetID}`);
      
      if (response.data && Array.isArray(response.data.pets)) {
        setPets(response.data.pets); // Assuming "pets" is an array from the response
      } else {
        console.warn('No pets found for this appPetID.');
        setPets([]);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const handlePetPress = (pet) => {
    navigation.navigate('Pets', { pet });
  };

  const handleProfilePress = () => {
    navigation.navigate('Profilescreen', { profileImage });
  };

  const handleMedical = () => {
    navigation.navigate('Medicalsched', { username });
  };

  const handleCompawns = () => {
    navigation.navigate('Compawnionsched');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.greeting, styles.fontStyle]}>Hello,{"\n"}{username}</Text>

      <TouchableOpacity onPress={handleProfilePress}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../assets/pcs/Dog.png')}
          style={styles.profilePic}
        />
      </TouchableOpacity>

      <View style={styles.donateCard}>
        <Image source={require('../assets/pcs/Dog.png')} style={styles.dogImage} />
        <Text style={[styles.donateText, styles.fontStyle]}>Please{"\n"}Please Please{"\n"}Mag donate po~.</Text>
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateButtonText}>Donate Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerContainer}>
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
      </View>

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
  profilePic: {
    width: width * 0.20,
    height: width * 0.20,
    borderRadius: 100,
    position: 'absolute',
    right: width * 0.40,
    top: height * -0.10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: height * -0.15,
  },
  myPets: {
    fontSize: width * 0.09,
    fontWeight: 'bold',
    color: '#C35E26',
    marginBottom: 20,
    top: height * 0.14,
    left: width * -0.25,
  },
  petList: {
    flexDirection: 'row',
    alignItems: 'center',
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
    top: height * 0.05,
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
});
