// React
import { useEffect } from "react";

// Packages
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

// Firebase
import { auth } from "@/services/firebase/firebaseConfig.js";
import { getUserProfile } from "@/services/firebase/firestore";

// Redux
import { setUser, clearUser } from "@/redux/slices/authSlice";

const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const profile = await getUserProfile(currentUser.uid);

          dispatch(
            setUser({
              user: {
                uid: currentUser.uid,
                email: currentUser.email,
              },
              role: profile?.role || "user",
            })
          );
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        console.error("Auth listener error:", error);
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuthListener;