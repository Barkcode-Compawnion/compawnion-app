import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Pets({ route }) {
    const { pet } = route.params; // Get the pet object passed from Homepage
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
             <Image source={require('../assets/pcs/Backbutton.png')} style={styles.back}/>
            </TouchableOpacity>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petBreed}>{pet.breed}</Text>
            <Image source={{ uri: pet.picture }} style={styles.petImage} />
            <Text style={styles.petpersonality}>{pet.personality}</Text>
            <View style={styles.agecontainer}>
            <View style={styles.infoBox}>
                <Text style={styles.ages}>AGE</Text>
            <Text style={styles.petage}>{pet.year} year</Text>
            <Text style={styles.petage}>{pet.month} month</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoBox}>
            <Text style={styles.ages}>Weight</Text>
            <Text style={styles.petweight}>{pet.weight}</Text>
            </View>
            </View>
            <Text style={styles.petsize}>{pet.size}</Text>
            <Text style={styles.pettype}>{pet.type}</Text>
            
            <Text style={styles.petAdoptDate}>{pet.adoptionDate}</Text>
            <Text style={styles.petStatus}>{pet.Status}</Text>
            <Text style={styles.petBgstory}>{pet.backgroundStory}</Text>
            <Text style={styles.petmedCert}>{pet.medicalCert}</Text>
            <Text style={styles.petmedDate}>{pet.medicalDate}</Text>
            
            <Text style={styles.petrescDate}>{pet.rescueDate}</Text>
            <Text style={styles.petvacDate}>{pet.vaccinationDate}</Text>
            <Text style={styles.petvacExp}>{pet.vaccinationExp}</Text>
            <Text style={styles.petpetID}>{pet.petId}</Text>
            {/* Add other pet details as needed */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#E9E9E9',
    },
    back: {
        width: 70,
        height: 30,
        resizeMode: 'contain',
    },
      backButton: {
        position: 'absolute',
        top: 40,
        left: 10,
    },
    petImage: {
        width: 250,
        height: 250,
        borderRadius: 30,
        top:-10,
    },
    petName: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#C35E26',
        top:-50,
        right:80,
    },
    petBreed: {
        fontSize: 20,
        color: '#45362F',
        top: -50,
        right: 60,
    },
    //AGE and weight container//
    agecontainer:{
        backgroundColor: '#C35E26',
        borderRadius: 20,
        width: 300,
        height: 100,
        top:40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignSelf: 'center',
    },
    infoBox: {
        flex: 1,
        alignItems: 'center',
    },
    divider: {
        width: 1,
        height: '60%',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 10,
    },
    ages:{
        fontSize: 20,
        color:'#fff',
        fontWeight: 'bold',
    },
    petage: {
        fontSize: 18,
        color: '#fff',
    },
    petweight: {
        fontSize: 18,
        color: '#fff',
    },
    petsize: {
        fontSize: 18,
        color: '#45362F',
    },
    pettype: {
        fontSize: 18,
        color: '#45362F',
    },
    petAdoptDate: {
        fontSize: 18,
        color: '#45362F',
    },
    petStatus: {
        fontSize: 18,
        color: '#45362F',
    },
    petBgstory: {
        fontSize: 18,
        color: '#45362F',
    },
    petmedDate: {
        fontSize: 18,
        color: '#45362F',
    },
    petrescDate: {
        fontSize: 18,
        color: '#45362F',
    },
    petvacDate: {
        fontSize: 18,
        color: '#45362F',
    },
    petvacExp: {
        fontSize: 18,
        color: '#45362F',
    },
    petpetID: {
        fontSize: 18,
        color: '#45362F',
    },
});
