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
  
  const staffRef = collection(db, "staff");
  
  export const addStaff = async (staffData) => {
    return await addDoc(staffRef, {
      ...staffData,
      createdAt: serverTimestamp(),
    });
  };
  
  export const getStaff = async () => {
    const snapshot = await getDocs(staffRef);
  
    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
  };
  
  export const updateStaff = async (id, updatedData) => {
    const staffDoc = doc(db, "staff", id);
    return await updateDoc(staffDoc, updatedData);
  };
  
  export const deleteStaff = async (id) => {
    const staffDoc = doc(db, "staff", id);
    return await deleteDoc(staffDoc);
  };