import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Pets({ route }) {
    const { pet } = route.params; // Get the pet object passed from Homepage

    return (
        <View style={styles.container}>
            <Image source={{ uri: pet.personal.picture }} style={styles.petImage} />
            <Text style={styles.petName}>{pet.personal.name}</Text>
            <Text style={styles.petBreed}>{pet.personal.breed}</Text>
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
    petImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    petName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#C35E26',
    },
    petBreed: {
        fontSize: 18,
        color: '#45362F',
    },
});
