import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Compawnionsched(){
    const navigation = useNavigation();

    const handleHomep = () =>{
        navigation.navigate('Homepage')
    };

    const handleMedical = () =>{
        navigation.navigate('Medicalsched')
    };

    const handleContactSupport = () => {
        Alert.alert('Contact Support', 'You can reach out to barkcodecompawnion@gmail.com ');
    };

    return(
    <View style ={styles.container}>
        <Text style={styles.title}>
            Compawnions{"\n"}Schedules
        </Text>
        <TouchableOpacity onPress={handleContactSupport}>
        <Text style={styles.contactSupport}>Contact Support</Text>
      </TouchableOpacity>
        <View style={styles.footer}>                
                <TouchableOpacity style={styles.footerButton} onPress={handleMedical}>
                <Image source={require('../assets/pcs/Medical.png')}
                style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={handleHomep}>
                <Image source={require('../assets/pcs/Home.png')}
                style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                <Image source={require('../assets/pcs/Calendarb.png')}
                style={styles.icon}/>
                </TouchableOpacity>
            </View>
    </View>
    );
}
const styles= StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E9E9E9',
    },
    title:{
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'flex-start',
        top: 50,
        marginLeft: 50,
        color: '#C35E26',
        position: 'absolute',
        zIndex: 1,
    },
    //Footer//
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
    contactSupport: {
        fontSize: 12,
        color: '#C35E26',
        textDecorationLine: 'underline',
        top: 670,
        left: 140,
    },
    icon: {
        width: 70,
        height: 30,
    },
})