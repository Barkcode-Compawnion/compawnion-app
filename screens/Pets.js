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

    // Font scaling based on width
    const scaleFont = (size) => size * (width / 375);

    return (
        <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.container, { minHeight: height * 1.2 }]}
        >
            {/* Back Button */}
            <TouchableOpacity style={[styles.backButton, { top: height * 0.05 }]} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/pcs/Backbutton.png')} style={[styles.back, { width: width * 0.08, height: width * 0.08 }]} />
            </TouchableOpacity>

            {/* Pet Name, Breed, and Gender */}
            <View style={styles.headerContainer}>
                <Text style={[styles.petName, { fontSize: scaleFont(24) }]}>{pet.personal.name}</Text>
                <Text style={[styles.petBreed, { fontSize: scaleFont(18) }]}>{pet.personal.breed}</Text>
            </View>

            {/* Pet Image */}
            <Image
                source={{ uri: pet.personal.picture }}
                style={[styles.petImage, { width: width * 0.9, height: height * 0.35 }]}
            />

            {/* Personality */}
            <Text style={[styles.petPersonality, { fontSize: scaleFont(16), marginVertical: height * 0.02 }]}>
                {pet.background.personality}
            </Text>

            {/* Age and Weight Section */}
            <View style={[styles.infoContainer, { padding: width * 0.04 }]}>
                <View style={styles.infoBox}>
                    <Text style={[styles.infoLabel, { fontSize: scaleFont(16) }]}>Age</Text>
                    <Text style={[styles.infoText, { fontSize: scaleFont(14) }]}>
                        {pet.personal.age.year} years {pet.personal.age.month} months
                    </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoBox}>
                    <Text style={[styles.infoLabel, { fontSize: scaleFont(16) }]}>Weight</Text>
                    <Text style={[styles.infoText, { fontSize: scaleFont(14) }]}>{pet.personal.weight} kg</Text>
                </View>
            </View>

            {/* Rescue and Adoption Dates */}
            <View style={styles.datesContainer}>
                <View style={[styles.dateBox, { padding: width * 0.03 }]}>
                    <Text style={[styles.dateLabel, { fontSize: scaleFont(14) }]}>Rescue Date</Text>
                    <Text style={[styles.dateText, { fontSize: scaleFont(14) }]}>{pet.background.rescueDate}</Text>
                </View>
                <View style={[styles.dateBox, { padding: width * 0.03 }]}>
                    <Text style={[styles.dateLabel, { fontSize: scaleFont(14) }]}>Adoption Date</Text>
                    <Text style={[styles.dateText, { fontSize: scaleFont(14) }]}>{pet.adoptionDate}</Text>
                </View>
            </View>

            {/* Rescue Story */}
            <Text style={[styles.storyTitle, { fontSize: scaleFont(18), marginVertical: height * 0.02 }]}>Rescue Story</Text>
            <Text style={[styles.storyText, { fontSize: scaleFont(14) }]}>
                {pet.background.backgroundStory}{' '}
                <TouchableOpacity onPress={handlereadmore}>
                    <Text style={[styles.readMore, { fontSize: scaleFont(14) }]}>Read More</Text>
                </TouchableOpacity>
            </Text>

            {/* Action Buttons */}
            <View style={[styles.footer, { paddingHorizontal: width * 0.05, height: height * 0.1 }]}>
                <TouchableOpacity style={styles.footerButton} onPress={handleMedical}>
                    <Image source={require('../assets/pcs/Medical.png')} style={[styles.icon, { width: width * 0.15, height: width * 0.15 }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={handleCompawns}>
                    <Image source={require('../assets/pcs/Calendar.png')} style={[styles.icon, { width: width * 0.15, height: width * 0.15 }]} />
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
    },
    backButton: {
        position: 'absolute',
        left: 10,
        zIndex: 1,
    },
    back: {
        resizeMode: 'contain',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    petName: {
        fontWeight: 'bold',
        color: '#C35E26',
        textAlign: 'center',
    },
    petBreed: {
        color: '#45362F',
        textAlign: 'center',
    },
    petImage: {
        borderRadius: 20,
        marginVertical: 20,
    },
    petPersonality: {
        color: '#45362F',
        textAlign: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        backgroundColor: '#C35E26',
        borderRadius: 15,
    },
    infoBox: {
        flex: 1,
        alignItems: 'center',
    },
    divider: {
        width: 1,
        backgroundColor: '#FFFFFF',
    },
    infoLabel: {
        color: '#fff',
        fontWeight: 'bold',
    },
    infoText: {
        color: '#fff',
    },
    datesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    dateBox: {
        backgroundColor: '#45362F',
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
    },
    dateLabel: {
        color: '#fff',
        fontWeight: 'bold',
    },
    dateText: {
        color: '#fff',
    },
    storyTitle: {
        fontWeight: 'bold',
        color: '#C35E26',
    },
    storyText: {
        color: '#45362F',
    },
    readMore: {
        color: '#C35E26',
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#C35E26',
        borderRadius: 30,
        width: '100%',
    },
    footerButton: {
        alignItems: 'center',
    },
    icon: {
        resizeMode: 'contain',
    },
});
