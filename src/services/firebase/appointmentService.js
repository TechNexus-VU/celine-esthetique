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
  
  const appointmentsRef = collection(db, "appointments");
  
  export const addAppointment = async (appointmentData) => {
    return await addDoc(appointmentsRef, {
      ...appointmentData,
      createdAt: serverTimestamp(),
    });
  };
  
  export const getAppointments = async () => {
    const snapshot = await getDocs(appointmentsRef);
  
    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
  };
  
  export const updateAppointment = async (id, updatedData) => {
    const appointmentDoc = doc(db, "appointments", id);
    return await updateDoc(appointmentDoc, updatedData);
  };
  
  export const deleteAppointment = async (id) => {
    const appointmentDoc = doc(db, "appointments", id);
    return await deleteDoc(appointmentDoc);
  };