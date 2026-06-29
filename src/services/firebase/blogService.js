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
  
  const blogsRef = collection(db, "blogs");
  
  export const addBlog = async (blogData) => {
    return await addDoc(blogsRef, {
      ...blogData,
      createdAt: serverTimestamp(),
    });
  };
  
  export const getBlogs = async () => {
    const snapshot = await getDocs(blogsRef);
  
    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
  };
  
  export const updateBlog = async (id, updatedData) => {
    const blogDoc = doc(db, "blogs", id);
    return await updateDoc(blogDoc, updatedData);
  };
  
  export const deleteBlog = async (id) => {
    const blogDoc = doc(db, "blogs", id);
    return await deleteDoc(blogDoc);
  };