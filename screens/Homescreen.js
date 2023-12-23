import { View, Text, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Avatar, IconButton , List} from 'react-native-paper';
import { useState,  } from 'react';
import Carousel from 'react-native-snap-carousel';
import 'react-native-gesture-handler';
import Appheader from '../components/Appheader';
import { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
import { useUser } from "../components/UserContext";
import notification from './notification';



const { width } = Dimensions.get('window');



function Homescreen({ navigation }) {

  const [todayCollection, setTodayCollection] = useState();
  const [thisMonthCollection, setThisMonthCollection] = useState(null);
  const [apiError, setApiError] = useState(null);
//api section
useEffect(() => {
  // Fetch Today Collection
  fetch('https://f02a-115-96-6-60.ngrok-free.app/today_collection/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  }) // Replace with your Django backend URL and endpoint
    .then(response => response.json())
    .then(data => {
      console.log('Today Collection:', data.TodayCollection);
      const todayCollectionData = data.TodayCollection;
      setTodayCollection(todayCollectionData);
      setApiError(null); // Reset API error state on success
    })
    .catch(error => {
      console.error('Error:', error);
      setApiError(error.message); // Set API error state on failure 
    });
}, []);

const categories = [
  { id: 1, categoryType: 'type1', /* other category data */ },
  { id: 2, categoryType: 'type2', /* other category data */ },
  // Add more categories as needed
];

// Fetch ThisMonthCollection
useEffect(() => {
fetch('https://f02a-115-96-6-60.ngrok-free.app/ThisMonthCollection/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({}),
}) // Replace with your Django backend URL and endpoint
  .then(response => response.json())
  .then(data => {
    console.log('ThisMonthCollection:', data.ThisMonthCollection);
    const ThisMonthCollectionData = data.ThisMonthCollection;
    setThisMonthCollection(ThisMonthCollectionData);
    setApiError(null); // Reset API error state on success
  })
  .catch(error => {
    console.error('Error:', error);
    setApiError(error.message); // Set API error state on failure 
  });
}, []);


 // const [loginTime, setLoginTime] = useState(null);


  // Assuming this is your login function
/*const handleLogin = () => {
  // Perform login logic
  setLoginTime(new Date());
  // Additional logic after login
};

const calculateLoginDuration = () => {
  if (loginTime) {
    const currentTime = new Date();
    const duration = currentTime - loginTime; // This will give the duration in milliseconds

    // Convert the duration to a more user-friendly format (e.g., hours, minutes, seconds)
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);

    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  } else {
    return 'Not logged in yet';
  }
};
const loginDuration = calculateLoginDuration();*/


  const rmDetails = {
    name: 'John Doe',
    location: 'City XYZ',
    joiningDate: '01/01/2022',
    workingDays: 20,
    collection: '$10,000',
    salary: '$5,000',
    incentive: '$500',
    target: '$15,000',
  };

  NetInfo.fetch().then(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });
 /* 
 // Fetch category data
 useEffect(() => {
    fetch('https://f02a-115-96-6-60.ngrok-free.app/categories/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error:', error));
 }, []);
 */

  const carouselItems = [
    {
      image: 'https://www.thaagam.org/donate/assets/images/cause/d_b_cake.jpg',
      id: 1,
      style: styles.carouselItem1, // Add a style property for the first item
    },
    {
      image: 'https://www.thaagam.org/donate/assets/images/cause/d_egg_milk.jpg',
      id: 2,
      style: styles.carouselItem2,
    },
    {
      image: 'https://www.thaagam.org/donate/assets/images/cause/d_christ.jpg',
      id: 3,
      style: styles.carouselItem3,
    },
    {
      image: 'https://www.thaagam.org/donate/assets/images/cause/d_orp.jpg',
      id: 4,
      style: styles.carouselItem4,
    },
    // Add more items as needed
  ];


  const _renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Card.Cover source={{ uri: item.image }} style={styles.carouselItem4} />
      </View>

    );
  }
  const renderCategory = ({ item }) => {
    let cardStyle;
    switch (item.categoryType) {
      case 'type1':
        cardStyle = styles.categoryCardType1;
        break;
      case 'type2':
        cardStyle = styles.categoryCardType2;
        break;
      // Add more cases for different category types

      default:
        cardStyle = styles.categoryCardDefault;
        break;
    }

    const CarouselCardItem = ({ item, index }) => {
      return (
        <View style={styles.container} key={index}>
          <Image
            source={{ uri: item.imgUrl }}
            style={styles.image}
          />
          <Text style={styles.header}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>
      )
    }


    return (
      <Card style={[styles.card, cardStyle]}>
        {/* Rest of your card content... */}
      </Card>
    );
  };
  

  const { userData, setUserData } = useUser();
  const IDCard = () => {
    return (
      <Card style={styles.idCard} onPress={() => navigation.navigate('Profile')}>
  <Card.Content style={styles.idCardContent}>
    {/* Add an Avatar.Image component for the profile picture */}
    <View style={styles.avatarContainer}>
    <Avatar.Image
        source={{ uri: userData.profileImage }}
        size={80}  // Adjust the size as needed 
        style={styles.avatar}
      />
      <List.Icon
        icon="pencil" // You can replace this with the name of your edit icon
        color="#5e69ee" // Adjust the color as needed
        onPress={() => console.log('Edit icon pressed')} // Handle the edit icon press event
      />
      </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>Welcome, {userData.name}!</Text>
      <Text style={styles.detail}>Mall Location: {userData.mallLocation}</Text>
     {/* <Text style={styles.loginDuration}>{`Logged in for: ${loginDuration}`}</Text>*/}
      {/* Other details... */}
    </View>
  </Card.Content>
</Card>
    );
  };

  return (
    <SafeAreaView >
   

      <Appheader
        title={"HOME"}
        headerBg={"#000000"}
        iconColor={"white"}
        navigation={navigation}
        menu // or back
        optionalBadge={5}
        right="bell"
        onRightPress={() => {

          navigation.navigate('notification');
        }}
        optionalIcon="bell" // Add this prop to enable the bell icon
        optionalFunc={() => console.log('optional')}
      />
      <ScrollView style={styles.ScrollView}>
        {/* Render the ID card component */}
        <IDCard rmDetails={rmDetails} />

        {/*collection */}

        <View style={styles.container1}>
          <View style={styles.card}>
            <Card style={styles.todayCollectionCard} onPress={() => navigation.navigate('TodayCollection')}>
              <Card.Content>
                <Card.Title style={styles.cardTitle}

                  left={(props) => <Avatar.Icon style={styles.todayCollectionicon} {...props} icon="wallet" size={32} />}
                  right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}
                />
                <Text style={styles.todayCollectionTitle}>Today's Collection:</Text>
                <Text style={styles.todayCollectionAmount}>₹{todayCollection}</Text>
                {/* Add additional content here */}
              </Card.Content>
            </Card>
            <Card style={styles.Card2} onPress={() => navigation.navigate('ThisMonthCollection')}>
              <Card.Content >
                <Card.Title style={styles.cardTitle}
                 
                  left={(props) => <Avatar.Icon style={styles.todayCollectionicon}{...props} icon="card" size={32} />}
                  right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
                />
                <Text style={styles.thismonthCollectionTitle}>ThisMonth Collection:</Text>
                <Text style={styles.todayCollectionAmount}>₹{thisMonthCollection}</Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        <View style={styles.carouselcontainer} >
          <Carousel
            layout={'default'}
            data={carouselItems}
            sliderWidth={400}
            itemWidth={300}
            renderItem={_renderItem}
            autoplay={true}  // Enable autoplay
            autoplayInterval={4000}
            loop={true} // Set the autoplay interval in milliseconds (e.g., 3000ms or 3 seconds)
          />
        </View>
        {/* Conditionally render Lottie animation based on API call success */}

        {apiError ? (
          <View style={styles.lottie}>
            <LottieView source={require('../assets/animations/su1.json')} autoPlay loop />
          </View>
        ) : (
          <View style={styles.lottie}>
            <LottieView source={require('../assets/animations/animation1.json')} autoPlay loop />
          </View>
        )}

      
      </ScrollView>
      {/* Render Categories */}

      <View style={styles.categoryContainer}>
        {categories && categories.map((category) => (
          <View key={category.id}>
            {renderCategory({ item: category })}
          </View>
        ))}
      </View>

    </SafeAreaView>

  )

}
export default Homescreen;
const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    padding: 2,
    backgroundColor: '#fff',
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtmain: {
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: 'center',
    padding: 1,
    marginLeft: 50,
    marginTop: 0,
  },
  lineStyle: {
    flexDirection: 'row',
    marginTop: 1,
    alignItems: 'center'
  },
  Card1: {
    alignItems: 'left',
    padding: 1,
    fontsize: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "gold",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    elevation: 22,
  },

  carouselItem: {
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,

  },
  carouselcontainer: {

    margin: 5,
    backgroundColor: 'black',

  },

  cardImage: {
    height: 200,
    borderRadius: 8,
  },
  cardTitle: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginBottom: 1,
    flex: 1,



    fontSize: 50,
    fontWeight: 'bold',

  },

  cardPrice: {
    fontSize: 16,
    color: 'black',
  },
  categoryCard: {
    marginVertical: 10,
  },
  lottie: {
    width: width * 0.9,
    height: width,
    alignItems: 'center',
    marginLeft: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20

  },
  lottietxt:
  {
    marginBottom: 20,

  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  totalCollection: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    flex: 5,
    flexDirection: 'column',
    paddingHorizontal: 155
  },
  // Define different styles for each carousel item
  carouselItem1: {
    backgroundColor: 'lightblue',
  },
  carouselItem2: {
    backgroundColor: 'lightgreen',
  },
  carouselItem3: {
    backgroundColor: 'lightcoral',
  },
  carouselItem4: {
    backgroundColor: 'lightsalmon',
  },
  categoryCardType1: {
    backgroundColor: 'lightblue',
    // Add specific styles for type1 if needed
  },
  categoryCardType2: {
    backgroundColor: 'lightgreen',
    // Add specific styles for type2 if needed
  },
  // Add more category types as needed

  categoryCardDefault: {
    backgroundColor: 'lightgrey',
    // Default styles for other category types
  },
  body: {
    backgroundColor: 'orange'
  },
  ScrollView: {
    backgroundColor: 'skyblue',

  },
  idCard: {
    borderRadius: 30,
    margin: 18,
    padding: 12,
    backgroundColor: 'lightgreen',
    elevation: 15,
  },
  idCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#fff', // Add a border color that matches your background
    borderRadius: 40, // Half of the size to create a circular shape
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20, // Adjust the margin as needed
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
  },
  card: {
    borderRadius: 10,


    padding: 2,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    elevation: 22,
  },
  Card2: {


    margin: 5,
    fontsize: 10,
    borderRadius: 18,
    elevation: 5,
    width: 200,
    flexDirection: 'row',
    backgroundColor: 'yellow',
  },
  todayCollectionCard: {
    padding: 2,
    margin: 5,
    fontsize: 10,
    borderRadius: 18,
    elevation: 5,
    width: 200,
    flexDirection: 'row',
    backgroundColor: 'yellow',
  },
  todayCollectionicon: {
    padding: 5,
    size: 5,
    backgroundColor: '#000',
  },
  todayCollectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    flexDirection: 'row',
  },
  thismonthCollectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 3,
    flex:1
   
  },
  
  todayCollectionAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  textContainer: {
    backgroundColor: 'lightyellow',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 185,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  loginDuration: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
});

