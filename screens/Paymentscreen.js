import { Text, View, StyleSheet, TouchableOpacity, COLORS ,ScrollView, Image} from 'react-native'
import React from 'react'
import { Modal, Portal, Button, PaperProvider, Card,TextInput } from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import SvgQRCode from 'react-native-qrcode-svg';
import * as Svg from 'react-native-svg';
import AppHeader from '../components/Appheader';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState ,useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';





const Paymentscreen=({ route })=>
 {
  // State variables for user ID and transaction details
  const { orderId, qrCodeData } = route.params || {};
  const navigation = useNavigation();
  const [userId, setUserId] = useState('123456');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
 // Replace with actual user ID
  const [transactionDetails, setTransactionDetails] = useState({
    
    amount: '2000', // Amount in paise (5000 paise = INR 50)
    status: 'Pending', // You can update this based on the payment status
  });
  const [hasEnteredPage, setHasEnteredPage] = useState(false);
  

  //modal open
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const showModal1 = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [transactions, setTransactions] = useState([]);
  const containerStyle = { backgroundColor: 'white', padding: 15 ,borderRadius:18};
  
  /*
  const createRazorpayOrder = async () => {
    try {
      const response = await axios.post('https://api.razorpay.com/v1/orders', {
        amount: 100, // Amount in paise
        currency: 'INR',
        receipt: 'order_rcptid_11',
        payment_capture: '1',
        notes: {
          pa: 'user@example.com',
          pn: 'Recipient',
          mc: '123',
          tid: '456',
          tr: '789'
        }
      }, {
        auth: {
          username: 'rzp_test_2h8n68Dp5BnsgZ',
          password: 'RadEymMn08SuR4yGSXsvp4qJ'
        }
      });
  
      return response.data.id;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  };
  */
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
  const handleAmountChange = (text) => {
    setEnteredAmount(text);
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
    }}

  const handleShowcontainer = () => {
    showModal1();
     // Call handlePayment when the button is clicked
  };
  // Function to handle the "Show QR Code" button press
  const handleShowQRCode = () => {
    showModal();
     // Call handlePayment when the button is clicked
  };
  useEffect(() => {
    if (hasEnteredPage) {
      // If the user has already entered the page, do nothing
      return; 
    }
    // Show QR code automatically after 3 seconds
    setTimeout(() => {
      handleShowQRCode();
      setHasEnteredPage(true); // Set the flag to true after showing the QR code
    }, 3000);
  }, [hasEnteredPage]);

    // Function to handle the "Show QR Code" button press
    useEffect(() => {
      let timeoutId;
      if (visible) {
        // Auto-hide the modal after 3 seconds
        timeoutId = setTimeout(() => {
          hideModal();
          // Call your payment handler function here
         handlePayment();
        }, 20000);
        // Clear the timeout when the component is unmounted
        return () => clearTimeout(timeoutId);
      }
     
    }, [visible]);

    const [validityTime, setValidityTime] = useState(120); // Set initial validity time in seconds
    const [timerId, setTimerId] = useState(null);
  
    useEffect(() => {
      let intervalId;
  
      if (visible && validityTime > 0) {
        // Start the timer when the modal is visible and validity time is greater than 0
        intervalId = setInterval(() => {
          setValidityTime((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
        }, 2000);
      }
  
      return () => {
        // Clear the timer when the component unmounts or the modal is closed
        clearInterval(intervalId);
      };
    }, [visible, validityTime]);
  
    const formattedValidityTime = `${Math.floor(validityTime / 60)}:${validityTime % 60}`;
  
    


  // Define your payment data
  const handlePayment = async () => {
    try {
      const response = await axios.post('https://f02a-115-96-6-60.ngrok-free.app/paymenthandler/', {
        razorpay_payment_id: 'PAYMENT_ID',
        razorpay_order_id: 'orderId',
        razorpay_signature: 'SIGNATURE',
      });
  
      // Check the HTTP status code
      if (response.status === 200) {
        // Assuming your server responds with JSON data
        const responseData = response.data;
  
        console.log('Entered Amount:', enteredAmount);
  
        // Check the response status to determine if payment was successful
        if (responseData.status === 'success') {
          // Payment was successful, navigate to success screen
          console.log('Payment successful');
          navigation.navigate('PaymentSuccessScreen');
        } else {
          // Payment failed, navigate to failure screen
          console.log('Payment failed');
          navigation.navigate('paymentfailure');
        }
      } else {
        // Handle unexpected HTTP status code
        console.log('Unexpected HTTP status code:', response.status);
      }
    } catch (error) {
      // Handle network errors or unexpected errors
      console.error('Error handling payment:', error);
      // You might want to navigate to a failure screen or show an error message to the user
    }
  };
   // Function to handle the "View Details" button press
   const handleViewDetails = (id,transaction) => {
    setSelectedTransaction(transaction);
    // Implement navigation to a details screen or modal
    console.log('View details for order:', id);
  };
  // Assuming you have the payment data ready
  const paymentData = {
    razorpay_payment_id: 'PAYMENT_ID',
    razorpay_order_id: 'orderId',
    razorpay_signature: 'SIGNATURE',
  };

  // Replace with your actual order ID
  const upiId = "kaleeshkumar1125180@okaxis"; // Replace with your actual UPI ID
  const recipientName = "Thaagamfoundation"; // Replace with the recipient's name
  const merchantCode = "MZpU0jiQXg4m4x"; // Replace with your actual merchant code
  const referenceId = "your_reference_id"; // Replace with your actual reference ID
  const transactionNote = "Transaction Note";

  // Call the function with the payment data

  //razor user qr code
 


  return (
    <PaperProvider>
      <SafeAreaView>
        <AppHeader
          title={"Payment"}
          headerBg={"#000000"}
          iconColor={"white"}
          back onPress={() => navigation.goBack()}
          optionalBadge={5}
          
          right="more-vertical"
          rightFunction={() => console.log('right')}
          optionalIcon="bell"
          optionalFunc={() => console.log('optional')}
        />
      </SafeAreaView>
      <Portal style={styles.container}>
        <Modal visible={visible} onDismiss={hideModal} style={styles.modalContainer} contentContainerStyle={containerStyle}>
        <Text style={styles.upiIdText}>QR Code Valid for: {formattedValidityTime}</Text>
          <SafeAreaView style={styles.modalContent}>
          
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialIcons name="keyboard-arrow-left" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
              <MaterialIcons name="close" size={30} color="white" />
            </TouchableOpacity>
            <Image
              source={require('../assets/images/thaagam.png')} // Replace with your actual logo path
              style={styles.logo}
              resizeMode="contain"
            />
          </SafeAreaView>
          
          <SafeAreaView style={styles.QR}>
            {/* Display User ID */}
            {/* QR Code */}
            <View style={styles.qrCodeContainer}>
    <SvgQRCode value={qrCodeData} size={250} />
  </View>
            <Text style={styles.QRText}>Scan QR code with any UPI app to
    proceed with payment of {enteredAmount} </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.buttonText}>Download QR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.buttonText}>Share QR</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.upiIdText}>Razorpay UPI ID: {upiId}</Text>
          </SafeAreaView>
          <Text style={styles.upiIdText}>Waiting For Payment</Text>
        </Modal>
      </Portal>
     
      <TextInput
        style={styles.amountInput}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={enteredAmount}
        onChangeText={handleAmountChange}
      />

      <Button
        style={styles.button}
        mode="contained"
        onPress={handleCreateOrder}
        labelStyle={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}
      >
        CREATE PAY ORDER
      </Button>
      <Text style={styles.QRText}>User ID: {userId}</Text>
      <TouchableOpacity style={styles.btnGradContainer}>
        <LinearGradient
          colors={['#24C6DC', '#514A9D', '#24C6DC']}
          style={styles.btnGrad}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={styles.btnText}>Transaction Details</Text>
        </LinearGradient>
      </TouchableOpacity>
      

      <Button
        style={styles.Quikpaybutton}
        mode="contained"
        onPress={handleShowcontainer}
        labelStyle={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}
      >
        QUICK PAY
      </Button>

      <ScrollView>
        {/* Display only today's transactions */}
        
<View style={styles.transactionHistoryContainer}>
  {transactions.map((transaction, index) => (
    <Card key={index} style={styles.transactionCard}>
      <Card.Content>
        <View style={styles.transactionHeader}>
          <Ionicons name="ios-calendar" size={24} color="black" style={styles.icon} />
          <Text style={styles.transactionDate}>{transaction.date}</Text>
          <Ionicons name="ios-checkmark-circle" size={24} color="green" style={styles.icon} />
          {/* Use a suitable Ionicons icon for the transaction status */}
          <Text style={styles.transactionStatus}>{transaction.status}</Text>
        </View>
        <Text style={styles.cardText}>Order ID: {transaction.orderId}</Text>
        <Text style={styles.cardText}>Amount: ₹{transaction.amount}</Text>
        {/* Add more details or buttons as needed */}
        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() => setSelectedTransaction(transaction)}
        > 
          <Ionicons name="ios-information-circle" size={24} color="blue" style={styles.icon} />
          <Text style={styles.viewDetailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  ))}
       
      </View>
      <Modal
    visible={selectedTransaction !== null}
    onRequestClose={() => setSelectedTransaction(null)}
    onDismiss={hideModal}
    style={styles.modalContainer1}
    contentContainerStyle={containerStyle}
  >
    {/* Display details from selectedTransaction */}
    {selectedTransaction && (
        <View style={styles.modalContainer1}>
          <Text>Transaction ID: {selectedTransaction?.transactionId}</Text>
          <Text>Order ID: {selectedTransaction?.orderId}</Text>
          <Text>Date: {selectedTransaction?.date}</Text>
          <Text>Time: {selectedTransaction?.time}</Text>
          <Text>Source of Payment: {selectedTransaction?.source}</Text>
          {/* Add a button to close the detail view */}
          <TouchableOpacity onPress={() => setSelectedTransaction(null)} style={styles.downloadButton}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
  </Modal>
      </ScrollView>
   
    </PaperProvider>
  )
}

export default Paymentscreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  QR: {
    padding: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  icon: {
    marginRight: 8, // Adjust the margin as needed
  },
  QRText: {
    marginTop: 0,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  qrCodeContainer: {
    borderWidth: 3,
    borderColor: 'blue', // You can change this color as per your design
    borderRadius: 20, // You can adjust the border radius as needed
    overflow: 'hidden', // Ensure the border is not clipped
    marginTop: 20,
    padding:12, 
    marginBottom: 20// Adjust the spacing between the QR code and text
  },
  button: {
    margin: 5,
    marginLeft:80,
    marginRight:80,
    padding: 10,
    backgroundColor: '#5e69ee',
    borderRadius: 40,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'},
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  backButton: {
    position: "relative",
    left: 0,
    marginTop: 2,
    marginLeft: 10,
  },
  modalContent: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'black',
    padding: 30,
    borderRadius:15
  },
  amountInput: {
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 25,
    padding: 10,
  },
  btnGradContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
 
  btnGrad: {
    padding: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
    // boxShadow doesn't work in React Native, you can use elevation for shadow
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
  },
  transactionHistoryContainer: {
    padding: 16,
    backgroundColor:'lightyellow'
  },
  transactionCard: {
    marginBottom: 16,
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  transactionDate: {
    fontSize: 18,
    marginRight: 'auto', // Pushes the text to the leftmost side
  },
  transactionStatus: {
    fontSize: 18,
     // Pushes the text to the rightmost side
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsButtonText: {
    fontSize: 16,
    marginLeft: 8,
    color: 'blue',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  Quikpaybutton:{
    margin:10,
    backgroundColor:'blue',
    padding:5,
    marginLeft:90,
    marginRight:90,
    borderRadius: 25,
  },

  closeButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    padding: 5,
    backgroundColor: 'black',
    borderRadius: 25,
  },
  downloadButton: {
    backgroundColor: '#5e69ee',
    padding: 18,
    borderRadius: 15,
    marginVertical: 15,
    marginRight:8
  },
  shareButton: {
    backgroundColor: '#5e69ee',
    padding: 18,
    borderRadius: 18,
    marginVertical: 15,
    marginRight:5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  upiIdText: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  logo: {
    height: 40, // Adjust the height as needed
    width: '100%', // Make it take the full width
    marginBottom: 10, // Adjust margin as needed
  },
  modalContainer1: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    margin:50,
    height:300,
    marginBottom:50,
    alignItems:'center'
  },

});
  
  
