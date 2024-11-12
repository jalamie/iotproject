import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons';
import DropdownComponent from '../components/Dropdown';

export default function HomeScreen() {
  const auth = getAuth();
  const [selectedValue, setSelectedValue] = useState("select");

  const handleLogout = () => {
    signOut(auth);
    setSelectedValue("select"); // Reset dropdown to "Select Option" on logout
  };

  const handleDropdownChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <View style={styles.container}>
      {/* Power-off icon for logout */}
      <TouchableOpacity style={styles.logoutIcon} onPress={handleLogout}>
        <MaterialIcons name="power-settings-new" size={28} color="red" />
      </TouchableOpacity>

      {/* Custom Dropdown */}
      <View style={styles.dropdownContainer}>
        <DropdownComponent selectedValue={selectedValue} setSelectedValue={handleDropdownChange} />
      </View>

      {/* Display the selected state */}
      <Text style={styles.stateText}>
        {selectedValue === "1" && "You selected: State 1"}
        {selectedValue === "2" && "You selected: State 2"}
        {selectedValue === "3" && "You selected: State 3"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40, // Adjust for status bar
  },
  logoutIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: '40%',
  },
  stateText: {
    fontSize: 18,
    marginTop: 100,
    textAlign: 'center',
  },
});
