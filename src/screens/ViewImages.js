import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ViewImages = ({ navigation, route }) => {
  const { userId } = route.params; // User ID passed from HomeScreen
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Image viewing functionality will go here!{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ViewImages;
