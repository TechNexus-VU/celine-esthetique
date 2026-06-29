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
  
  const reviewsRef = collection(db, "reviews");
  
  export const addReview = async (reviewData) => {
    return await addDoc(reviewsRef, {
      ...reviewData,
      createdAt: serverTimestamp(),
    });
  };
  
  export const getReviews = async () => {
    const snapshot = await getDocs(reviewsRef);
  
    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
  };
  
  export const updateReview = async (id, updatedData) => {
    const reviewDoc = doc(db, "reviews", id);
    return await updateDoc(reviewDoc, updatedData);
  };
  
  export const deleteReview = async (id) => {
    const reviewDoc = doc(db, "reviews", id);
    return await deleteDoc(reviewDoc);
  };