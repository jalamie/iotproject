import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import authStyles from '../styles/AuthStyles';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const handleAuthentication = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={authStyles.container}>
      {/* App Logo */}
      <Image 
        source={require('../../assets/ica-invisible-guardians-logo.jpg')}
        style={authStyles.image}
      />
      
      {/* Header Text */}
      <Text style={authStyles.headerText}>Sign In</Text>
      
      {/* Input Fields */}
      <TextInput
        style={authStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={authStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Sign In Button */}
      <TouchableOpacity style={authStyles.button} onPress={handleAuthentication}>
        <Text style={authStyles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
