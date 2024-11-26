import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import languagePack from "../utils/languagePack.json";
import { saveLanguageToFirebase } from "../utils/firebaseUtils";

const LanguageSelector = ({ route }) => {
  const { userId } = route.params; // Get the user ID passed from HomeScreen
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleSelectLanguage = (language) => {
    Alert.alert(
      "Change Language",
      `Are you sure you want to change the app language to ${language.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            setSelectedLanguage(language.name);
            await saveLanguageToFirebase(userId, language.name); // Save language to Firebase
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Currently Selected Language: {selectedLanguage}</Text>
      <FlatList
        data={languagePack}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => handleSelectLanguage(item)}
          >
            <Text style={styles.language}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  language: {
    fontSize: 16,
  },
});

export default LanguageSelector;
