import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { Audio } from "expo-av";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebaseConfig"; // Import Firestore instance

const AudioPlayer = ({ userId }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState("");

  // Real-time listener for audio URL changes
  useEffect(() => {
    const userDocRef = doc(db, "users", userId); // Reference to the user's document

    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        if (userData.audio_url) {
          console.log("Audio URL updated:", userData.audio_url);
          setAudioUrl(userData.audio_url); // Update the audio URL in state
          stopAudio(); // Stop the current audio when URL changes
        } else {
          setError("Audio URL not found in Firestore document.");
        }
      } else {
        setError("User document does not exist.");
      }
    });

    // Cleanup listener on component unmount
    return () => {
      unsubscribe();
    };
  }, [userId]);

  const playAudio = async () => {
    try {
      if (!audioUrl) {
        setError("Audio URL not available.");
        return;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl }, // Use the updated URL
        { shouldPlay: true }
      );
      setSound(sound);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isPlaying && status.didJustFinish) {
          setIsPlaying(false); // Reset play state when playback finishes
        }
      });
    } catch (err) {
      console.error("Error playing audio:", err);
      setError("Failed to play audio.");
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync(); // Unload the sound
      setSound(null);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync(); // Unload the sound on component unmount
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title={isPlaying ? "Stop Audio" : "Play Audio"}
        onPress={isPlaying ? stopAudio : playAudio}
        disabled={!audioUrl} // Disable button until URL is available
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default AudioPlayer;
