import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Fetch user data from Firebase
export const fetchUserData = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // If user data exists, return it
      return docSnap.data();
    } else {
      // If no data found, create a new user entry with defaults
      const defaultData = { favorites: [], selectedLanguage: "English" };
      await setDoc(docRef, defaultData);
      console.log("New user data initialized in Firebase");
      return defaultData; // Return the newly created default data
    }
  } catch (error) {
    console.error("Error fetching or initializing user data: ", error);
    throw error;
  }
};

// Save favorites to Firebase
export const saveFavorites = async (userId, favorites) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, { favorites });
    console.log("Favorites updated successfully");
  } catch (error) {
    console.error("Error updating favorites: ", error);
    throw error;
  }
};

// Save selected language to Firebase
export const saveSelectedLanguage = async (userId, language) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, { selectedLanguage: language });
    console.log("Selected language updated successfully");
  } catch (error) {
    console.error("Error updating selected language: ", error);
    throw error;
  }
};
