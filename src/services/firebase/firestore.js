import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import app from "@/services/firebase/firebaseConfig";

const db = getFirestore(app);

export const createUserProfile = async (uid, data) => {
  await setDoc(doc(db, "users", uid), data);
};
export const getUserProfile = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
};


export default db;