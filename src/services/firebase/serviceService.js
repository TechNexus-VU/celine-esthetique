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
  
  const servicesRef = collection(db, "services");
  
  export const addService = async (serviceData) => {
    return await addDoc(servicesRef, {
      ...serviceData,
      createdAt: serverTimestamp(),
    });
  };
  
  export const getServices = async () => {
    const snapshot = await getDocs(servicesRef);
  
    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
  };
  
  export const updateService = async (id, updatedData) => {
    const serviceDoc = doc(db, "services", id);
    return await updateDoc(serviceDoc, updatedData);
  };
  
  export const deleteService = async (id) => {
    const serviceDoc = doc(db, "services", id);
    return await deleteDoc(serviceDoc);
  };