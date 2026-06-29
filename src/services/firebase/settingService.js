import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
  } from "firebase/firestore";
  
  import { db } from "@/services/firebase/firebaseConfig";
  
  const settingsRef = doc(db, "settings", "salon");
  
  export const getSettings = async () => {
    const snapshot = await getDoc(settingsRef);
  
    if (snapshot.exists()) {
      return snapshot.data();
    }
  
    return null;
  };
  
  export const saveSettings = async (data) => {
    await setDoc(
      settingsRef,
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  };