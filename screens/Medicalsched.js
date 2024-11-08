import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function Medicalsched(){
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleHomep = () =>{
        navigation.navigate('Homepage')
    };
    const handleCompawns = () =>{
        navigation.navigate('Compawnionsched')
    };
    const handleAdd = () =>{
        navigation.navigate('Addschedule')
    };
    const handletrustvet = () => {
      console.log("Navigating to Trustedvets screen");
      setModalVisible(false);
      navigation.navigate('Trustedveti');
    };

    return(
    <View style ={styles.container}>
        <Text style={[styles.title, { fontFamily: 'Poppins-Regular' }]}>
            Medical{"\n"}Schedules
        </Text>

    <TouchableOpacity style={styles.Addbutton} onPress={() => setModalVisible(true)}>
            <Image source={require('../assets/pcs/Plus.png')}
                style={styles.Addmed}/>
    </TouchableOpacity>
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.Closebutton} onPress={() => setModalVisible(false)}>
               <Image source={require('../assets/pcs/Linec.png')}
                    style={styles.Closemed}/>
            </TouchableOpacity>
            <Text style={styles.titlesched}>Add New Schedule</Text>
            <Text style={styles.schedtitle}>Schedule Title </Text>
            <TextInput placeholder="" style={styles.input} />
            
            <Text style={styles.schedi}>Date </Text>
            <View style={styles.pickerContainer}>
              <Picker>
                <Picker.Item label="" value="date" />
              </Picker>
            </View>

            <Text style={styles.schedi}>Time </Text>
            <View style={styles.pickerContainer}>
              <Picker>
                <Picker.Item label="" value="time" />
              </Picker>
            </View>

            <Text style={styles.schedi}>Vet clinic </Text>
            <View style={styles.pickerContainer}>
              <Picker>
                <Picker.Item label="" value="clinic" />
              </Picker>
            </View>

            <Text style={styles.schedi}>Pet </Text>
            <View style={styles.pickerContainer}>
              <Picker>
                <Picker.Item label="" value="pet" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.addingButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.addButtonText}>Add Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handletrustvet}>
              <Text style={styles.editText}>Edit trusted Veterinarian Clinics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        <View style={styles.footer}>                
                <TouchableOpacity style={styles.footerButton}>
                <Image source={require('../assets/pcs/Medicalb.png')}
                style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={handleHomep}>
                <Image source={require('../assets/pcs/Home.png')}
                style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={handleCompawns}>
                <Image source={require('../assets/pcs/Calendar.png')}
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
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'flex-start',
        top: 50,
        marginLeft: 50,
        color: '#C35E26',
        position: 'absolute',
        zIndex: 1,
    },
    Addbutton:{
        top: 650,
        left: 131,
        padding: 15,
        borderRadius: 40,
    },
    Addmed: {
        width: 80,
        height: 40,
    },

    //Addschedule//
    Closebutton:{
      padding: 15,
      borderRadius: 50,
      left: 70,
      top:-10,
    },
    Closemed: {
      width: 200,
      height: 10,
    },
    schedtitle:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#45362F',
        marginBottom: 10,
        marginLeft:10,
    },
    schedi:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#45362F',
        marginBottom: 10,
        marginLeft:10,
    },
    openButton: {
        backgroundColor: '#D27D2D',
        padding: 15,
        borderRadius: 20,
    },
      openButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
      modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
      modalContainer: {
        width: '100%',
        height: 750,
        backgroundColor: '#E9E9E9',
        borderRadius: 40,
        padding: 20,
        alignItems: 'flex-start',
        top: 110,
    },
      titlesched: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#D27D2D',
        marginBottom: 30,
    },
      input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 30,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        width: '100%',
    },
      pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 30,
        marginBottom: 10,
        padding: 1,
        width: '100%',
    },
      addingButton: {
        backgroundColor: '#D27D2D',
        padding: 15,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignItems: 'center',
        width: 270,
        height: 40,
        left: 50,
    },
      addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize:18,
    },
      editText: {
        color: '#D27D2D',
        textAlign: 'center',
        marginTop: 10,
        textDecorationLine: 'underline',
    },

    //Footers//
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
})