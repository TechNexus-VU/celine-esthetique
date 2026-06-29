import {
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    query,
    orderBy,
  } from "firebase/firestore";
  
  import { db } from "@/services/firebase/firebaseConfig";
  
  const notificationsRef = collection(db, "notifications");
  
  export const addNotification = async (data) => {
    await addDoc(notificationsRef, {
      ...data,
      status: "sent",
      createdAt: serverTimestamp(),
    });
  };
  
  export const getNotifications = async () => {
    const q = query(notificationsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
  
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };