import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Pets({ route }) {
    const { pet } = route.params;
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();

    const handleCompawns = () => { navigation.navigate('Compawnionsched'); };
    const handleMedical = () => { navigation.navigate('Medicalsched'); };
    const handlereadmore = () => { };

    // Dynamic margin to shift elements down based on screen height
    const dynamicTopMargin = height * 0.1;

    return (
        <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.container, { minHeight: height * 1.2 }]}
        >
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/pcs/Backbutton.png')} style={styles.back} />
            </TouchableOpacity>

            {/* Pet Name, Breed, and Gender */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.petName, { fontSize: width * 0.08 }]}>{pet.personal.name}</Text>
            </View>
            <Text style={[styles.petBreed, { fontSize: width * 0.05 }]}>{pet.personal.breed}</Text>

            {/* Pet Image */}
            <Image
                source={{ uri: pet.personal.picture }}
                style={[styles.petImage, { width: width * 0.9, height: height * 0.3, marginTop: dynamicTopMargin }]}
            />

            {/* Personality */}
            <Text style={[styles.petPersonality, { marginTop: dynamicTopMargin }]}>
                {pet.background.personality}
            </Text>

            {/* Age and Weight Section */}
            <View style={[styles.infoContainer, { marginTop: dynamicTopMargin }]}>
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
            <View style={[styles.datesContainer, { marginTop: dynamicTopMargin }]}>
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
            <Text style={[styles.storyTitle, { marginTop: dynamicTopMargin }]}>Rescue Story</Text>
            <Text style={[styles.storyText, { marginBottom: dynamicTopMargin }]}>
                {pet.background.backgroundStory}
                <TouchableOpacity onPress={handlereadmore}>
                    <Text style={styles.readMore}>Read More</Text>
                </TouchableOpacity>
            </Text>

            {/* Action Buttons */}
            <View style={[styles.footer, { width: width * 0.8, marginTop: dynamicTopMargin }]}>
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
        padding: 20,
        backgroundColor: '#E9E9E9',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        top: 40,
        left: 20,
    },
    petName: {
        fontWeight: 'bold',
        color: '#C35E26',
        top:50,
    },
    petBreed: {
        color: '#45362F',
        top:60,
    },
    petImage: {
        borderRadius: 20,
        marginVertical: 20,
        top:30,
    },
    petPersonality: {
        fontSize: 18,
        color: '#45362F',
        textAlign: 'center',
        top:40,
    },
    infoContainer: {
        flexDirection: 'row',
        backgroundColor: '#C35E26',
        borderRadius: 15,
        padding: 15,
        top: -30,
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
        top: -60,
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
        top: -40,
    },
    storyText: {
        fontSize: 16,
        color: '#45362F',
        top: -40,
    },
    readMore: {
        color: '#C35E26',
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#C35E26',
        borderRadius: 30,
    },
    footerButton: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    icon: {
        width: 70,
        height: 30,
    },
});
