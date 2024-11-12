import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Pets({ route }) {
    const { pet } = route.params;
    const navigation = useNavigation();

    const handleCompawns = () => { navigation.navigate('Compawnionsched');};
    const handleMedical = () => { navigation.navigate('Medicalsched'); };

    const handlereadmore = () => {
      };

    return (
        <ScrollView style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/pcs/Backbutton.png')} style={styles.back} />
            </TouchableOpacity>

            {/* Pet Name, Breed, and Gender */}
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.petName}>{pet.personal.name}</Text>
                </View>
                <Text style={styles.petBreed}>{pet.personal.breed}</Text>
            </View>

            {/* Pet Image */}
            <Image source={{ uri: pet.personal.picture }} style={styles.petImage} />

            {/* Personality */}
            <Text style={styles.petPersonality}>{pet.background.personality}</Text>

            {/* Age and Weight Section */}
            <View style={styles.infoContainer}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Age</Text>
                    <Text style={styles.infoText}>
                        {pet.personal.age.year} years {pet.personal.age.month} months
                    </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Weight</Text>
                    <Text style={styles.infoText}>{pet.personal.weight} kg</Text>
                </View>
            </View>

            {/* Rescue and Adoption Dates */}
            <View style={styles.datesContainer}>
                <View style={styles.dateBox}>
                    <Text style={styles.dateLabel}>Rescue Date</Text>
                    <Text style={styles.dateText}>{pet.background.rescueDate}</Text>
                </View>
                <View style={styles.dateBox}>
                    <Text style={styles.dateLabel}>Adoption Date</Text>
                    <Text style={styles.dateText}>{pet.adoptionDate}</Text>
                </View>
            </View>

            {/* Rescue Story */}
            <Text style={styles.storyTitle}>Rescue Story</Text>
            <Text style={styles.storyText}>
                {pet.background.backgroundStory} 
                <TouchableOpacity onPress={handlereadmore}>
                <Text style={styles.readMore}>Read More</Text>
                </TouchableOpacity>
            </Text>

            {/* Action Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={handleMedical}>
                    <Image source={require('../assets/pcs/Medical.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={handleCompawns}>
                    <Image source={require('../assets/pcs/Calendar.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9E9E9',
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 10,
        zIndex: 1,
    },
    back: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    header: {
        marginTop: 80,
        marginBottom: 10,
        alignItems: 'center',
    },
    petName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#C35E26',
        marginRight: 10,
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
        marginBottom: 10,
    },
    genderIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    petImage: {
        width: '100%',
        height: 250,
        borderRadius: 20,
        marginVertical: 10,
    },
    petPersonality: {
        fontSize: 18,
        color: '#45362F',
        textAlign: 'center',
        marginVertical: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        backgroundColor: '#C35E26',
        borderRadius: 15,
        padding: 15,
        marginVertical: 20,
    },
    infoBox: {
        flex: 1,
        alignItems: 'center',
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 10,
    },
    infoLabel: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 16,
        color: '#fff',
    },
    datesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    dateBox: {
        backgroundColor: '#45362F',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
    },
    dateLabel: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    dateText: {
        color: '#fff',
        fontSize: 14,
    },
    storyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#C35E26',
        marginTop: 10,
    },
    storyText: {
        fontSize: 16,
        color: '#45362F',
        marginBottom: 20,
    },
    readMore: {
        color: '#C35E26',
        fontWeight: 'bold',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        bottom: -80,
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
