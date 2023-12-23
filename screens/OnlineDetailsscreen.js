import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Modal } from 'react-native';
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
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { COLORS } from '../constants';
import { FONTS } from '../constants';




export default function OnlineDetailsScreen({ navigation }) {
  const [name, setName] = useState('');
  const [nameOnParcel, setNameOnParcel] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [count, setCount] = useState('');
  //AMOUNT
  const [categoryAmount, setCategoryAmount] = useState({}); 
  const [visible, setVisible] = useState(false);
 //date of service
 const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
 const today = new Date();
 const startDate = getFormatedDate(
   today.setDate(today.getDate() + 1),
   "YYYY/MM/DD"
 );
 const [selectedStartDate, setSelectedStartDate] = useState("01/01/1990");
 const [startedDate, setStartedDate] = useState("12/12/2023");
 
 const handleChangeStartDate = (propDate) => {
  setStartedDate(propDate);
};
const handleOnPressStartDate = () => {
  setOpenStartDatePicker(!openStartDatePicker);
};

 


  //SELECT TYPE CATEGORY
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['HOMELESS-25', 'Egg & Milk', 'Birthday cake','Virtual Cake Cutting','Stray Dog','Grocery Kit','Chicken Biriyani', 'Child Education', 'Hospital Children', 'Blanket', 'Child Care Kit', 'Tree Planting','Gifts'];
  //navigate to preveiw screen
  

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
   //modal open
   
   const showModal = () => setVisible(true);
   const hideModal = () => setVisible(false);
   const [transactions, setTransactions] = useState([]);
   const containerStyle = { backgroundColor: 'skyblue', padding: 15 };

  const handleSave = () => {
    const data = {
      name,
      nameOnParcel,
      mobileNumber,
      selectedCategory,
      count,
      enteredAmount,
      startedDate,
    };
    //api to post 
   //handle Data
   axios.post('https://f02a-115-96-6-60.ngrok-free.app/handle_data/', JSON.stringify(data),
     {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
    .then(response => {
      console.log('Full Response from API:', data);
      if (response.status === 200) {
       console.log('donar data saved succesfully')
       
      } else {
        throw new Error('Network response was not ok');
      }return response; 
    })
      .then(responseData => {
        console.log('Response from API:', 'success');
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
    startedDate,
  });
}
function renderDatePicker() {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openStartDatePicker}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: COLORS.primary,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            padding: 35,
            width: "90%",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <DatePicker
            mode="calendar"
            minimumDate={startDate}
            selected={startedDate}
            onDateChanged={handleChangeStartDate}
            onSelectedChange={(date) => setSelectedStartDate(date)}
            options={{
              backgroundColor: COLORS.primary,
              textHeaderColor: "#469ab6",
              textDefaultColor: COLORS.white,
              selectedTextColor: COLORS.white,
              mainColor: "#469ab6",
              textSecondaryColor: COLORS.white,
              borderColor: "rgba(122,146,165,0.1)",
            }}
          />

          <TouchableOpacity onPress={handleOnPressStartDate}>
            <Text style={{ ...FONTS.body3, color: COLORS.white }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
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
 // Function to create Razorpay order
 const createRazorpayOrder = async () => {
  try {
    const response = await axios.post('https://f02a-115-96-6-60.ngrok-free.app/create_razorpay_order/', { amount: enteredAmount }, { headers: { 'Content-Type': 'application/json' } });
    console.log(response.data);
     // Assuming the response contains the order ID and other necessary details
    const orderDetails = response.data;
    return orderDetails; // Assuming the response contains the order ID
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return null;
  }
};
 // Function to generate payment link
 
const [enteredAmount, setEnteredAmount] = useState('');
const handleAmountChange = (category,enteredAmount) => {
  let categoryAmount;
  // Set specific amounts for each category
  switch (category) {
    case 'HOMELESS-25':
      categoryAmount = 25;
      break;
    case 'Chicken Biriyani':
      categoryAmount = 120;
      break;
    case 'Egg & Milk':
      categoryAmount = 30;
      break;
    case 'stray Dog':
      categoryAmount = 35;
      break;
    case 'Grocery Kit':
      categoryAmount = 65;
      break;
      case 'Chicken Biriyani':
      categoryAmount = 65;
      break;
      case 'Birthday cake':
      categoryAmount = 65;
      break;
      case 'Child Education':
      categoryAmount = 65;
      break;
      case 'Hospital Children':
      categoryAmount = 65;
      break;
      case 'Blanket':
      categoryAmount = 65;
      break;
      case 'Child care kit':
      categoryAmount = 65;
      break;
    default:
      categoryAmount = 0; // Set a default value if the category is not found
      break;
  }
// Calculate the total amount based on count
setEnteredAmount(String(categoryAmount));
setCategoryAmount((prevState) => ({
  ...prevState,
  [category]: categoryAmount,
}));
};
// Function to handle the "Create Order" button press
const handleCreateOrder = async () => {
  try {
    const orderDetails = await createRazorpayOrder();

    if (orderDetails) {
      const { orderId, /* other details */ } = orderDetails;
      const upiId = 'kaleeshkumar1125180@okaxis';
      const recipientName = 'Thaagam foundation';
      const merchantCode = 'MZpU0jiQXg4m4x';
      const referenceId = 'your_reference_id';
      const transactionNote = 'Transaction Note';
      const qrCodeData = `upi://pay?pa=${upiId}&pn=${recipientName}&mc=${merchantCode}&tid=${orderId}&tr=${referenceId}&tn=${transactionNote}&am=${enteredAmount}`;
      showModal();
        // Navigate to PaymentScreen and pass the necessary data
      navigation.navigate('Payment', {
        orderId,
        qrCodeData,
       
        
      });
      const newTransaction = {
        orderId: orderId,
        amount: enteredAmount,
        status: 'Pending',
      };

      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
      console.log('Payment Link:', qrCodeData);
    }   
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
  }
    // Navigate to PaymentScreen and pass the necessary data
    
};
  // Define your payment data
  const handlePayment = async () => {
    try {
      const response = await axios.post('https://f02a-115-96-6-60.ngrok-free.app/paymenthandler/', {
        razorpay_payment_id: 'PAYMENT_ID',
        razorpay_order_id: 'ORDER_ID',
        razorpay_signature: 'SIGNATURE',
      });

      console.log('Entered Amount:', enteredAmount);

      // Check the response to determine if payment was successful
      if (response.data === 'success') {
        // Payment was successful, navigate to success screen
        // You can use React Navigation or any navigation library you prefer
        console.log('Payment successful');
        navigation.navigate('PaymentSuccessScreen');
      } else {
        // Payment failed, navigate to failure screen
        console.log('Payment failed');
        navigation.navigate('paymentfailure');
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
   // Function to handle the "View Details" button press
   const handleViewDetails = (id) => {
    // Implement navigation to a details screen or modal
    console.log('View details for order:', id);
  };
  // Assuming you have the payment data ready
  const paymentData = {
    razorpay_payment_id: 'PAYMENT_ID',
    razorpay_order_id: 'ORDER_ID',
    razorpay_signature: 'SIGNATURE',
  };
  const orderId = "id"; // Replace with your actual order ID
  const upiId = "kaleeshkumar1125180@okaxis"; // Replace with your actual UPI ID
  const recipientName = "Thaagamfoundation"; // Replace with the recipient's name
  const merchantCode = "MZpU0jiQXg4m4x"; // Replace with your actual merchant code
  const referenceId = "your_reference_id"; // Replace with your actual reference ID
  const transactionNote = "Transaction Note";

  // Call the function with the payment data
    const qrCodeData =`upi://pay?pa=${upiId}&pn=${recipientName}&mc=${merchantCode}&tid=${orderId}&tr=${referenceId}&tn=${transactionNote}&am=${enteredAmount}`;
  //razor user qr code
  const options = {
    description: 'Sample Payment',
    image: 'https://example.com/your-image.png',
    currency: 'INR',
    key: 'rzp_test_2h8n68Dp5BnsgZ',
    amount: '2500', // Amount in paise (5000 paise = INR 50)
    name: 'Thaagam ',
    prefill: {
      email: 'kaleeshkumar.r@gmail.com',
      contact: '6383333101',
    },
    theme: { color: '#F37254' },
  };
 
  return (   
      <PaperProvider>
      <SafeAreaView>
      <AppHeader
    title={"Details"}
    headerBg={"#000000"}
    iconColor={"white"}
     back
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
          <Text style={styles.heading}>ONLINE DETAILS SCREEN</Text>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
            <Ionicons name="person" size={22} color={COLORS.primary} />
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
            <Ionicons name="pizza" size={22} color={COLORS.primary} />
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
            <Ionicons name="call" size={22} color={COLORS.primary} />
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
            <Ionicons name="list" size={24} color={COLORS.primary} />
              <Text style={styles.label}>Category:</Text>
              </View>
              <View style={styles.inputcategoryContainer}>
              <Picker
              selectedValue={selectedCategory}
              
              onValueChange={(itemValue) => {
                setSelectedCategory(itemValue);
                // Update amount when category changes
              }}
            >
                <Picker.Item label="Select a category" value="" color='blue'/>
                {categories.map((category, index) => (
                  <Picker.Item key={index} label={category} value={category} style={styles.inputcategoryContainerinside}/>
                ))}
              </Picker>
              </View>
            </View>

           <View style={styles.inputContainer}>
  <View style={styles.labelContainer}>
    <Ionicons name="calendar" size={24} color={COLORS.primary} />
    <Text style={styles.label}>Date of Service:</Text>
  </View>
  <View style={styles.inputFieldContainer}>
  <TouchableOpacity
              onPress={handleOnPressStartDate}
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <Text>{selectedStartDate}</Text>
            </TouchableOpacity>
  </View>
</View>

            <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
            <Ionicons name="stats-chart" size={24} color={COLORS.primary}/>
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
            {selectedCategory === 'Birthday cake' && (
            <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>

            <Ionicons name="pizza" size={24} color={COLORS.primary}/>
            
              <Text style={styles.label}>Cake Name</Text>
              </View>
              <View style={styles.inputFieldContainer}>
              {/* Render the input field only when the selected category is "Birthday cake" */}
             
                  <TextInput
                    style={styles.input}
                    value={count}
                    onChangeText={(text) => setCount(text)}
                    
                    placeholder="Enter Cake Name"
                  />
              
              </View>
            </View>
              )}
            <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
            <Ionicons name="cash" size={24} color={COLORS.primary} />
              <Text style={styles.label}>Amount:</Text>
              </View>
              <View style={styles.inputFieldContainer}>
              <TextInput
  style={styles.input}
  value={enteredAmount}
  onChangeText={(text) => setEnteredAmount(text)}
  keyboardType="numeric"
  placeholder="Enter amount"
/>
              </View>
            </View>
             
            <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
  <Text style={styles.uploadButtonText}>Upload Image</Text>
</TouchableOpacity>

          </View>
          <Button
        style={styles.paybutton}
        mode="contained"
        onPress={handleCreateOrder}
        labelStyle={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}
      >
         Make PAYMENT
      </Button>
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
          <Receipt data={{ name, nameOnParcel, mobileNumber, selectedCategory, startedDate: new Date(), count, enteredAmount }} />
          {/* ... (your existing code) */}
        </SafeAreaView>
        
      </View>
        </ScrollView>
        {renderDatePicker()}
      </PaperProvider>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f0f0f0',
    
  },
  labelContainer: {
    flex: 1,
    flexDirection:"row",
    
  },
  label: {
    fontSize: 16,  // Adjust font size
    marginRight: 15, 
    marginLeft:10, // Add some spacing between label and input
    fontWeight: 'bold',
    color:"black"

  },
  detailscontainer: {
    backgroundColor: 'skyblue',
    borderRadius: 13,
    elevation: 5,
    padding: 5,
    marginBottom: 20,
    
    
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    
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
  inputcategoryContainer:{
   
    flex: 2,
    borderColor: 'black',
    backgroundColor:'lightyellow',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputcategoryContainerinside:{
    marginBottom: 0,
    padding:5,
    fontSize: 13,
    fontWeight: 'bold',
    
  },
  input: {
    padding: 1,
    borderWidth: 1,
    fontSize:16,
    borderColor: 'black',
    borderRadius: 10,
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
    borderColor: 'black', // Change border color to green
    backgroundColor: 'gold',
    flex:1
  },
  paybutton: {
    borderWidth: 2,
   borderRadius:30,
    padding: 8,
    alignItems: 'center',
    justifyContent:'flex-end',
    marginRight: 5,
    borderColor: 'black', // Change border color to green
    backgroundColor: 'lightyellow',
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
  


