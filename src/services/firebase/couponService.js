import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    query,
    orderBy,
  } from "firebase/firestore";
  
  import { db } from "@/services/firebase/firebaseConfig";
  
  const couponRef = collection(db, "coupons");
  
  export const addCoupon = async (data) => {
    await addDoc(couponRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
  };
  
  export const getCoupons = async () => {
    const q = query(couponRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
  
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };
  
  export const updateCoupon = async (id, data) => {
    await updateDoc(doc(db, "coupons", id), data);
  };
  
  export const deleteCoupon = async (id) => {
    await deleteDoc(doc(db, "coupons", id));
  };