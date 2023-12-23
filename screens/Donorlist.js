import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity , ActivityIndicator} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';


const DonorListScreen = () => {
  const fetchDonarList = async () => {
    try {
        const response = await axios.get('https://f02a-115-96-6-60.ngrok-free.app/donar_data/');
        setDonarDetails(response.data.donor_data);
    } catch (error) {
        console.error('Error fetching donor data:', error);
    } finally {
      setLoading(false);
    }
  };
  const [donar_data, setDonarDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch donor list data from the backend when the component mounts
    fetchDonarList();
  }, []);

  console.log('Type of donardetails:',typeof donar_data)
  console.log('DonorDetails:', donar_data) 
  useEffect(() => {
    fetchDonarList();
}, []);

const itemsPerPage = 5;
const [currentPage, setCurrentPage] = useState(1);
const totalPages = Math.ceil(donar_data.length / itemsPerPage);

const renderRowsForPage = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, donar_data.length);
  
  return donar_data.slice(startIndex, endIndex).map((donarDetail, index) => (
    <View key={index} style={styles.tableRow}>
      <Text style={styles.column}>{donarDetail.name}</Text>
      <Text style={styles.column}>{donarDetail.nameOnParcel}</Text>
      <Text style={styles.column}>{donarDetail.mobileNumber}</Text>
      <Text style={styles.column}>{donarDetail.selectedCategory}</Text>
      <Text style={styles.column}>{donarDetail.count}</Text>
      <Text style={styles.column}>{donarDetail.enteredAmount }</Text>
    </View>
  ));
};

const handleNextPage = () => {
  setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
};

const handlePrevPage = () => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
};

// Inside your render:
<View style={styles.tableContainer}>
  <View style={styles.tableHeader}>
    {/* Your header content */}
  </View>

  {renderRowsForPage()}

  <View style={styles.paginationContainer}>
    <TouchableOpacity
      style={styles.paginationButton}
      onPress={handlePrevPage}
      disabled={currentPage === 1}
    >
      <Text style={styles.paginationButtonText}>Previous</Text>
    </TouchableOpacity>
    <Text style={styles.currentPageText}>
      Page {currentPage} of {totalPages}
    </Text>
    <TouchableOpacity
      style={styles.paginationButton}
      onPress={handleNextPage}
      disabled={currentPage === totalPages}
    >
      <Text style={styles.paginationButtonText}>Next</Text>
    </TouchableOpacity>
  </View>
</View>

  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>Donor Details</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              // Implement logic to generate and download Excel
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Download Excel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement logic to generate and download PDF
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Download PDF</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />
      ) : (
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>Name</Text>
          <Text style={styles.columnHeader}>Parcel Name</Text>
          <Text style={styles.columnHeader}>Mobile</Text>
          <Text style={styles.columnHeader}>Category</Text>
          <Text style={styles.columnHeader}>Count</Text>
          <Text style={styles.columnHeader}>Amount</Text>
          <Text style={styles.columnHeader}>paymood</Text>
        </View>
        
        {donar_data.map((donarDetail, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.column}>{donarDetail.name}</Text>
            <Text style={styles.column}>{donarDetail.nameOnParcel}</Text>
            <Text style={styles.column}>{donarDetail.mobileNumber}</Text>
            <Text style={styles.column}>{donarDetail.selectedCategory}</Text>
            <Text style={styles.column}>{donarDetail.count}</Text>
            <Text style={styles.column}>{donarDetail.enteredAmount }</Text>
            <Text style={styles.column}>{donarDetail.paymentMethod }</Text>
          </View>
        ))}
      </View>
       )}
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  // Inside your styles:
tableContainer: {
  flex: 1,
  padding: 8,
  backgroundColor: '#fff',
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  marginBottom: 20,
},
tableHeader: {
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
  paddingBottom: 12,
  marginBottom: 15,
  backgroundColor: '#007bff',
},
columnHeader: {
  flex: 1,
  fontWeight: 'bold',
  fontSize: 11,
  color: '#fff',
  textAlign: 'center',
},
tableRow: {
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
  paddingBottom: 12,
  marginBottom: 12,
},
column: {
  flex: 1,
  fontSize: 14,
  textAlign: 'center',
  color: '#333',
},
paginationContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 16,
},
paginationButton: {
  backgroundColor: '#007bff',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 5,
},
paginationButtonText: {
  color: '#fff',
},
currentPageText: {
  fontSize: 14,
  color: '#333',
},
});
  


export default DonorListScreen;
