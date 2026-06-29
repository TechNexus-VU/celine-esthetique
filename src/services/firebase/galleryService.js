import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    orderBy,
    query,
  } from "firebase/firestore";
  
  import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
  } from "firebase/storage";
  
  import { db, storage } from "@/services/firebase/firebaseConfig";
  
  const galleryRef = collection(db, "gallery");
  
  export const uploadGalleryImage = async (imageFile) => {
    const imageRef = ref(
      storage,
      `gallery/${Date.now()}-${imageFile.name}`
    );
  
    await uploadBytes(imageRef, imageFile);
    const imageURL = await getDownloadURL(imageRef);
  
    return {
      imageURL,
      imagePath: imageRef.fullPath,
    };
  };
  
  export const addGalleryItem = async (data) => {
    await addDoc(galleryRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
  };
  
  export const getGalleryItems = async () => {
    const q = query(galleryRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
  
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };
  
  export const updateGalleryItem = async (id, data) => {
    const itemRef = doc(db, "gallery", id);
    await updateDoc(itemRef, data);
  };
  
  export const deleteGalleryItem = async (id, imagePath) => {
    await deleteDoc(doc(db, "gallery", id));
  
    if (imagePath) {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
    }
  };