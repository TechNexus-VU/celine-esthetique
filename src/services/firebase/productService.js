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
  
  const productsRef = collection(db, "products");
  
  export const addProduct = async (productData) => {
    return await addDoc(productsRef, {
      ...productData,
      createdAt: serverTimestamp(),
    });
  };
  
  export const getProducts = async () => {
    const snapshot = await getDocs(productsRef);
  
    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
  };
  
  export const updateProduct = async (id, updatedData) => {
    const productDoc = doc(db, "products", id);
    return await updateDoc(productDoc, updatedData);
  };
  
  export const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    return await deleteDoc(productDoc);
  };