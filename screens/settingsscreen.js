import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import icons library
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsItem = ({ label, value, onToggle }) => (
  <View style={styles.settingItem}>
    <Text>{label}</Text>
    <Switch value={value} onValueChange={onToggle} />
  </View>
);

const SettingsScreen = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const [usePassword, setUsePassword] = useState(false);
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  

  const toggleNotification = () => setNotificationEnabled(!notificationEnabled);
  const toggleFingerprint = () => setFingerprintEnabled(!fingerprintEnabled);
  const toggleUsePassword = () => setUsePassword(!usePassword);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Function to handle theme change
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    // Perform any additional actions based on the selected theme
  };

  // Function to handle fingerprint authentication
  const handleFingerprintAuthentication = () => {
    // Implement fingerprint authentication logic
    // You may need to use a library or native modules for fingerprint authentication
  };

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <SettingsItem label="Enable Notifications" value={notificationEnabled} onToggle={toggleNotification} />
      <SettingsItem label="Enable Fingerprint" value={fingerprintEnabled} onToggle={toggleFingerprint} />

      {fingerprintEnabled && (
        <SettingsItem label="Use Password" value={usePassword} onToggle={toggleUsePassword} />
      )}

      <View style={styles.themeContainer}>
        <Text>Theme: {theme}</Text>
        <TouchableOpacity onPress={toggleTheme}>
          <FontAwesome name="adjust" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleThemeChange('light')}>
        <Text>Set Light Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleThemeChange('dark')}>
        <Text>Set Dark Theme</Text>
      </TouchableOpacity>

      {fingerprintEnabled && (
        <TouchableOpacity style={styles.button} onPress={handleFingerprintAuthentication}>
          <Text>Authenticate with Fingerprint</Text>
        </TouchableOpacity>
      
      )}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#5e69ee', 
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default SettingsScreen;
