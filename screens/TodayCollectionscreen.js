
import { View, Text, StyleSheet ,Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card, Avatar, IconButton } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'native-base';


const { width } = Dimensions.get('window');
const TodayCollectionscreen = () => {
 const [todayCollection, setTodayCollection] = useState();

 const TodayCollectionCard = ({ todayCollection, onlineCollectionAmount, offlineCollectionAmount, collectionDuration }) => {
  return (
    <Card style={styles.todayCollectionCard}>
      <Card.Content>
        <Card.Title
          title="Today Collection"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => navigation.navigate('TodayCollection')} />}
        />
        <Text style={styles.todayCollectionTitle}>Today's Collection:</Text>
        <Text style={styles.todayCollectionAmount}>₹{todayCollection}</Text>

        {/* Additional Content */}
        <View style={styles.additionalContent}>
          <Text style={styles.contentLabel}>Online Collection:</Text>
          <Text style={styles.contentText}>₹{onlineCollectionAmount}</Text>

          <Text style={styles.contentLabel}>Offline Collection:</Text>
          <Text style={styles.contentText}>₹{offlineCollectionAmount}</Text>

          <Text style={styles.contentLabel}>Collection Duration:</Text>
          <Text style={styles.contentText}>{collectionDuration}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

  useEffect(() => {
    // Fetch Today Collection
    fetch('https://d659-115-96-6-60.ngrok-free.app/today_collection/', {
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
  // Mock data for hourly collection with time labels
  const hourlyCollectionData = [
    { time: '12AM', value: 10 },
    { time: '1AM', value: 20 },
    { time: '2AM', value: 15 },
    { time: '3AM', value: 25 },
    { time: '4:00 AM', value: 30 },
    { time: '5:00 AM', value: 18 },
    { time: '6:00 AM', value: 22 },
    { time: '7:00 AM', value: 28 },
    { time: '8:00 AM', value: 35 },
    { time: '9:00 AM', value: 40 },
    { time: '10:00 AM', value: 45 },
    { time: '11:00 AM', value: 50 },
  ];

  // Calculate total collection for today
  const totalCollection = hourlyCollectionData.reduce((acc, { value }) => acc + value, 0);

  
  // Extract labels and data for LineChart
  const chartData = {
    labels: hourlyCollectionData.map(({ time }) => time),
    datasets: [
      {
        data: hourlyCollectionData.map(({ value }) => value),
      },
    ],
  };

  return (
    <ScrollView>
    <View style={styles.container}>
        <TodayCollectionCard 
  todayCollection={50}
  onlineCollectionAmount={20}
  offlineCollectionAmount={30}
  collectionDuration={8}
/>
      {/* Hourly Collection Line Chart */}
      <Card style={styles.todayCollectionCard} >
        <Card.Content>
          <Card.Title
            title="Today Collection"
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}
          />
          <Text style={styles.todayCollectionTitle}>Today's Collection:</Text>
          <Text style={styles.todayCollectionAmount}>₹{todayCollection}</Text>
          {/* Add additional content here */}
        </Card.Content>
      </Card>
      
      <View style={styles.chartContainer}>
    
        <Text style={styles.chartTitle}>Hourly Collection</Text>
        <LineChart
          data={chartData}
          width={400} // Increase the width
          height={300} // Increase the height
          yAxisLabel="₹"
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
              paddingHorizontal: 10,
              
            },
            propsForDots: {
              r: '7',
              strokeWidth: '5',
              stroke: 'gold',
            },
          }}
        />
      </View>
 
      {/* Today's Total Collection Data Card */}
      <View style={styles.dataCard}>
        <Text style={styles.cardTitle}>Today's Collection </Text>
        <Text style={styles.totalCollection}>₹ {totalCollection}</Text>
      </View>
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalCollection: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  lottie: {
    width: width * 0.9,
    alignItems: 'center',
    marginLeft: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20
  },
 
  todayCollectionCard: {
    margin: 10,
    padding: 15,
    backgroundColor: '#4CAF50', // Change this color to your desired background color
    borderRadius: 10,
    elevation: 5,
  },
  todayCollectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // White text color
    marginBottom: 5,
  },
  todayCollectionAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // White text color
    marginBottom: 15,
  },
  additionalContent: {
    borderTopWidth: 1,
    borderColor: 'white', // White border color
    paddingTop: 10,
  },
  contentLabel: {
    fontSize: 14,
    color: 'white', // White text color
    marginBottom: 5,
  },
  contentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // White text color
    marginBottom: 10,
  },
});

export default TodayCollectionscreen;