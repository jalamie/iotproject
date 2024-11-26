import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Save selected language
export const saveLanguageToFirebase = async (userId, language) => {
  try {
    await setDoc(doc(db, "users", userId), { selectedLanguage: language }, { merge: true });
    console.log("Language saved successfully");
  } catch (error) {
    console.error("Error saving language: ", error);
  }
};
