import {
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
  } from "firebase/firestore";
  
  import { db } from "@/services/firebase/firebaseConfig";
  
  const usersRef = collection(db, "users");
  
  export const getUsers = async () => {
    const q = query(usersRef, orderBy("createdAt", "desc"));
  
    const snapshot = await getDocs(q);
  
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };
  
  export const updateUser = async (id, data) => {
    await updateDoc(doc(db, "users", id), data);
  };
  
  export const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };