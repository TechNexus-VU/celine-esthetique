import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
  } from "firebase/firestore";
  
  import { db } from "@/services/firebase/firebaseConfig";
  
  const availabilityRef = collection(db, "availability");
  
  export const addAvailability = async (availabilityData) => {
    return await addDoc(availabilityRef, {
      ...availabilityData,
      createdAt: serverTimestamp(),
    });
  };
  
  export const getAvailability = async () => {
    const snapshot = await getDocs(availabilityRef);
  
    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
  };
  
  export const updateAvailability = async (id, updatedData) => {
    const availabilityDoc = doc(db, "availability", id);
    return await updateDoc(availabilityDoc, updatedData);
  };
  
  export const deleteAvailability = async (id) => {
    const availabilityDoc = doc(db, "availability", id);
    return await deleteDoc(availabilityDoc);
  };