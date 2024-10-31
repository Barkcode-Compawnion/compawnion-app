import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function Pets() {
    const route = useRoute();
    const { pet } = route.params;

    return (
        <View style={styles.container}>
            <Image source={pet.image} style={styles.petImage} />
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petBreed}>Breed: {pet.breed}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    petImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginBottom: 20,
    },
    petName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    petBreed: {
        fontSize: 18,
        color: '#555',
    },
});
