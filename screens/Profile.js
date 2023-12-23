import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  StyleSheet,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../constants";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { photos } from "../constants/data";
import { useUser } from "../components/UserContext";
import LoadingComponent from "../components/LoadingComponent";


const PhotosRoutes = () => (
  <View style={{ flex: 1 }}>
    <FlatList
      data={photos}
      numColumns={3}
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            aspectRatio: 1,
            margin: 3,
          }}
        >
          <Image
            key={index}
            source={item}
            style={{ width: "100%", height: "100%", borderRadius: 12 }}
          />
        </View>
      )}
    />

  </View>
);

const LikesRoutes = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: "blue",
    }}
  />
);


const renderScene = SceneMap({
  first: PhotosRoutes,
  second: LikesRoutes,
});


const Profile = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const { userData, setUserData } = useUser();

  const updateUserData = (newUserData) => {
    // Assuming setUserData is a function to update user data in your context
    setUserData(newUserData);
  };

  const handleProfileUpdate = async (newUserData) => {
    try {
      const response = await axios.post('https://d659-115-96-6-60.ngrok-free.app/update-profile/', newUserData);

      if (response.data.success) {
        updateUserData(response.data.updatedUserData);
        // Additional logic if needed
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const [routes] = useState([
    { key: "first", title: "online collection" },
    { key: "second", title: "offline collection" },
  ]);

  const iconSectionStyles = StyleSheet.create({
    container: {
      marginVertical: 20,
      alignItems: 'center',
     
      
    },
    text: {
      color: COLORS.black,
      ...FONTS.body4,
     
    },
    icon: {
      marginBottom: 5,
      padding:5,
      
    },
  }); 



  if (!userData) {
    // Handle the case where user data is undefined
    return <LoadingComponent />; // Show a loading spinner or a placeholder
  }

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.primary,
      }}
      style={{
        backgroundColor: COLORS.white,
        height: 44,
      }}
      renderLabel={({ focused, route }) => (
        <Text style={[{ color: focused ? COLORS.black : COLORS.gray }]}>
          {route.title}
        </Text>
      )}
    />
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
<ScrollView>
      <StatusBar backgroundColor={COLORS.gray} />
      <View style={{ width: "100%" }}>
        <Image
          source={images.cover}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
            marginTop: 10,
            marginLeft: 10
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={30}
            color={COLORS.black}
          />
        </TouchableOpacity>

      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={{ uri: userData.profileImage }}
          resizeMode="contain"
          style={{
            height: 170,
            width: 170,
            borderWidth: 2,
            borderColor: COLORS.primary,
            marginTop: -90,
            borderRadius: 999,
          }}
        />
<View style={styles.container}>
        <Text
          style={{
            ...FONTS.h1,
            color: COLORS.primary,
            marginVertical: 10,

          }}
        >
          {userData.name}
        </Text>
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.body2,
          }}
        >
          {userData.role}
        </Text>
        {/* Additional Details */}
        <View style={iconSectionStyles.container}>
          <View style={iconSectionStyles.icon}>
            <MaterialIcons name="attach-money" size={24} color={COLORS.black} />
          </View>
          <Text style={iconSectionStyles.text}>Salary: {userData.salary}</Text>

          <View style={iconSectionStyles.icon}>
            <MaterialIcons name="assignment" size={24} color={COLORS.black} />
          </View>
          <Text style={iconSectionStyles.text}>Target: {userData.target}</Text>

          <View style={iconSectionStyles.icon}>
            <MaterialIcons name="date-range" size={24} color={COLORS.black} />
          </View>
          <Text style={iconSectionStyles.text}>Working Days: {userData.workingDays}</Text>

          <View style={iconSectionStyles.icon}>
            <MaterialIcons name="event" size={24} color={COLORS.black} />
          </View>
          <Text style={iconSectionStyles.text}>Joining Date: {userData.joiningDate}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="location-on" size={24} color="black" />
          <Text
            style={{
              ...FONTS.body4,
              marginLeft: 4,
            }}
          >
            Forum Mall , Vadapalani , Chennai
          </Text>
        </View>
        
        </View>

        <View
          style={{
            paddingVertical: 15,
            flexDirection: "row",
            marginHorizontal: SIZES.padding,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
              }}
            >
              15000 Rs
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.primary,
              }}
            >
          
              Total collection
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
                padding: 2,
                marginHorizontal: SIZES.padding,
              }}
            >
              6700 Rs
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.primary,
                marginHorizontal: SIZES.padding,
              }}
            >
              Incentive
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              

            }}
          >
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              marginHorizontal: SIZES.padding * 2,
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.white,
              }}
              onPress={(handleProfileUpdate) => navigation.navigate('EditProfile')}
            >
              Edit Profile
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              marginHorizontal: SIZES.padding * 2,
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.white,
                
              }}
            >
              Share the app
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      {/* ... existing code */}
    </SafeAreaView>
    
  );
};

export default Profile;
const styles = StyleSheet.create({
container:{
padding:70,
borderColor: '#3498db',
margin:5,
alignItems:'center',
backgroundColor: 'lightyellow',
borderRadius:30
  }
})