import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function Trustedveti(){
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/pcs/Backbutton.png')} style={styles.back}/>
          </TouchableOpacity>
          <Text style={styles.title}>Trusted{"\n"}Vets</Text>
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.Closebutton} onPress={() => setModalVisible(false)}>
               <Image source={require('../assets/pcs/Linec.png')}
                    style={styles.Closemed}/>
            </TouchableOpacity>

            <Text style={styles.Newvet}>Add New Vet </Text>
            <TextInput placeholder="" style={styles.input} />

            <Text style={styles.Newvet}>Add New Vet </Text>
            <TextInput placeholder="" style={styles.input} />
            

            <TouchableOpacity style={styles.addingButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.addButtonText}>Add Vet</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
          <TouchableOpacity style={styles.Addbutton} onPress={() => setModalVisible(true)}>
            <Image source={require('../assets/pcs/Plus.png')}
                style={styles.Addmed}/>
           </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#E9E9E9',
      alignItems: 'center',
    },
    back: {
      width: 70,
      height: 30,
      resizeMode: 'contain',
      top:10,
    },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 10,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#C35E26',
        marginTop: 20,
        right:30,
    },
    Addbutton:{
      top: 500,
      left: -5,
      padding: 15,
      borderRadius: 100,
    },
    Addmed: {
      width: 80,
      height: 40,
      borderRadius: 100,
    },

    //Modal//
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
    Closebutton:{
      padding: 15,
      borderRadius: 50,
      left: 70,
      top:-10,
    },
    Newvet: {
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
});