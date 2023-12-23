import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Portal, Button, Dialog, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import AppHeader from '../components/Appheader'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import Receipt from './Receipt';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { DateTimePicker } from '@react-native-community/datetimepicker';
import { COLORS } from '../constants';



export default function Cashcollection({ navigation }) {
  const [name, setName] = useState('');
  const [nameOnParcel, setNameOnParcel] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [count, setCount] = useState('');
  //AMOUNT
  const [enteredAmount, setAmount] = useState('');
  const [visible, setVisible] = useState(false);
 //date of service
 const [selectedDate, setSelectedDate] = useState(new Date());
 const [showDatePicker, setShowDatePicker] = useState(false);

  //SELECT TYPE CATEGORY
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['HOMELESS-25', 'EGG&MILK', 'CHICKEN BIRIYANI', 'VEG BIRIYANI', 'ORPHANAGE', 'BLANKETS', 'DOGFOOD', 'TREE PLANTING'];

  const [selectedmallname, setSelectedmallname] = useState('');
  const mall = ['vr mall', 'foroum', 'phoenix', 'EA_Mall', 'Sky', 'BLANKETS', 'DOGFOOD', 'TREE PLANTING'];

  const [location, setLocation] = useState('');
  const [paymentConfirmation, setPaymentConfirmation] = useState(null);

  const handleLocationChange = (text) => {
    setLocation(text);
  };


  
  //navigate to preveiw screen
  

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleSave = () => {
    const data = {
      name,
      nameOnParcel,
      mobileNumber,
      selectedCategory,
      count,
      enteredAmount,
      selectedDate,
    };
    //api to post 
   //handle Data
   axios.post('https://f02a-115-96-6-60.ngrok-free.app/handle_data_cash/', JSON.stringify(data),
     {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
       
    })
    .then(response => {
      console.log('Full Response from API:', response);
      if (response.status === 200) {
       console.log('donar data saved succesfully')
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }return response; 
    })
      .then(responseData => {
        console.log('Response from API:', responseData);
        showDialog();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    showDialog();
    
  }
//previw function
const handlePreview = () => {
  console.log('selectedCategory:', selectedCategory);
  navigation.navigate('Preview', {
    name,
    nameOnParcel,
    mobileNumber,
    selectedCategory,
    count,
    enteredAmount,
    selectedDate,
  });
}

const handleImageUpload = async () => {
  try {
    // Check if permission is granted for accessing the camera roll
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access camera roll was denied');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3], // Adjust aspect ratio if needed
      quality: 1, // Adjust image quality
    });

    if (!result.cancelled) {
      // The URI of the selected image
      const selectedImageUri = result.uri;
      console.log('Selected Image URI:', selectedImageUri);

      // Perform actions with the selected image URI
      // For example, you can set it in the state or use it as needed
      // setImageUri(selectedImageUri);
    }
  } catch (error) {
    console.error('Error selecting image:', error);
  }
};


  return (   
      <PaperProvider>
      <SafeAreaView>
      <AppHeader
    title={"Details"}
    headerBg={"#000000"}
    iconColor={"white"}
    menu //or back
    optionalBadge={7}
    navigation={navigation} 
    right="more-vertical"
    optionalIcon="bell"
    rightFunction={() => console.log('right')}
    
    optionalFunc={() => console.log('optional')}
/>
      </SafeAreaView>
      <ScrollView>
      <View style={styles.detailscontainer}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.heading}>CASH COLLECTION ENTRY</Text>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
            <Ionicons name="person" size={22} color="black" />
              <Text style={styles.label}>Name:</Text>
              
              </View>
              <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={text => setName(text)}
                placeholder="Enter Donar name"
              />
                </View>
            </View>
            <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
            <Ionicons name="person" size={22} color="black" />
              <Text style={styles.label}>Name On Parcel:</Text>
              </View>
              <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.input}
                value={nameOnParcel}
                onChangeText={text => setNameOnParcel(text)}
                placeholder="Enter name on parcel"
              />
              </View>
            </View>
            <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
            <Ionicons name="call" size={22} color="black" />
              <Text style={styles.label}>Mobile Number:</Text>
              </View>
              <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.input}
                value={mobileNumber}
                onChangeText={text => setMobileNumber(text)}
                keyboardType="phone-pad"
                placeholder="Enter mobile number"
              />
              </View>
            </View>
            <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
            <Ionicons name="list" size={24} color="black" />
              <Text style={styles.label}>Category:</Text>
              </View>
              <View style={styles.inputFieldContainer}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                <Picker.Item label="Select a category" value="" />
                {categories.map((category, index) => (
                  <Picker.Item key={index} label={category} value={category} />
                ))}
              </Picker>
              </View>
            </View>

           <View style={styles.inputContainer}>
  <View style={styles.labelContainer}>
    <Ionicons name="calendar" size={24} color="black" />
    <Text style={styles.label}>Date of Service:</Text>
  </View>
  <View style={styles.inputFieldContainer}>
    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
      <Text style={styles.input}>{selectedDate.toLocaleDateString()}</Text>
    </TouchableOpacity>
  </View>
</View>
{showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              if (event.type === 'set') {
                setSelectedDate(date);
              }
              setShowDatePicker(false);
            }}
          />
        )}
            <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
            <Ionicons name="stats-chart" size={24} color="black" />
              <Text style={styles.label}>Count:</Text>
              </View>
              <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.input}
                value={count}
                onChangeText={text => setCount(text)}
                keyboardType="numeric"
                placeholder="Enter count"
              />
              </View>
            </View>
            <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
            <Ionicons name="cash" size={24} color="black" />
              <Text style={styles.label}>Amount:</Text>
              </View>
              <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.input}
                value={enteredAmount}
                onChangeText={text => setAmount(text)}
                keyboardType="numeric"
                placeholder="Enter amount"
              />
              </View>
            </View>
            <TouchableOpacity
                onPress={handleImageUpload}
                style={styles.uploadButton}
              >
                <Text style={styles.uploadButtonText}>Upload Image</Text>
              </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                  <Ionicons
                    name="location"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.label}>Mall Name:</Text>
                </View>
                <View style={styles.inputFieldContainer}>
              <Picker
                selectedValue={selectedmallname}
                onValueChange={(itemValue) => setSelectedmallname(itemValue)}
              >
                <Picker.Item label="Select a category" value="" />
                {categories.map((category, index) => (
                  <Picker.Item key={index} label={category} value={category} />
                ))}
              </Picker>
              </View>
              </View>
          
          <View style={styles.btncontainer}>
          <TouchableOpacity onPress={handlePreview} style={styles.previewButton}>
            <Text style={styles.previewButtonText}>Preview</Text>
          </TouchableOpacity>
           <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            </View>

          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Actions>
                <Text style={styles.alert}>Details Saved</Text>
                <Button onPress={hideDialog}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          
        </SafeAreaView>
        </View>
        <View style={styles.detailscontainer}>
        <SafeAreaView style={styles.container}>
          {/* ... (your existing code) */}
          <Receipt data={{ name, nameOnParcel, mobileNumber, selectedCategory, selectedDate, count, enteredAmount }} />
          {/* ... (your existing code) */}
        </SafeAreaView>
      </View>
      
      
        </ScrollView>
        
      </PaperProvider>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f0f0f0',
  },
  labelContainer: {
    flex: 1,
    flexDirection:"row"
  },
  label: {
    fontSize: 16,  // Adjust font size
    marginRight: 15, 
    marginLeft:10, // Add some spacing between label and input
    fontWeight: 'bold',
    color:"black"
  },
  detailscontainer: 
  {
    backgroundColor: 'skyblue',
    borderRadius: 13,
    elevation: 5,
    padding: 5,
    marginBottom: 20, 
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
    backgroundColor:'lightyellow'
  },
  formContainer: {
    marginBottom: 20,
   
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold',
   
  },
  input: {
    padding: 1,
    borderWidth: 2,
    fontSize:16,
    borderColor: '#888',
    borderRadius:8,
    color: 'blue',
    elevation: 5,
    backgroundColor: '#fff',
    elevation: 15,
  },
  inputFieldContainer: {
    flex: 2,
  },
  btncontainer:{
    padding:2,
    flexDirection:'row',
    marginTop: 10,

  },
  saveButton: {
    borderWidth: 2,
    flex:1,
    marginLeft:5,
   borderRadius:20,
    padding: 13,
    width:100,
    alignItems: 'center',
    borderColor: 'black', // Change border color to green
    backgroundColor: '#27ae60',
  },
 
  saveButtonText: {
    fontWeight: 'bold',
    color: 'black',
  },
  alert:{
    fontWeight:'bold',
    fontSize:20,
    textAlign:'justify',
    justifyContent:'flex-start',
    padding:15,
    flex:1
  },
  previewButton: {
    borderWidth: 2,
   borderRadius:20,
    padding: 13,
    alignItems: 'center',
    justifyContent:'flex-end',
    marginRight: 5,
    borderColor: '#3498db', // Change border color to green
    backgroundColor: 'yellow',
    flex:1
  },
  previewButtonText: {
    fontWeight: 'bold',
    color: 'black',
  },
  uploadButton: {
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#3498db',
    backgroundColor: '#2980b9',
    marginTop: 20,
  },
  uploadButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  paymentConfirmationContainer: {
    padding: 20,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    marginBottom: 20,
  },
  confirmationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.success,
    marginBottom: 10,
  },
  
});

