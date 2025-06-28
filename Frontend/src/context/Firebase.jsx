import { initializeApp } from "firebase/app";
import { useState, useEffect, createContext, useContext } from "react";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,

} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,

} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDzjyjUx_GJgAbw3bxFujQPPQZ7UyADomg",
  authDomain: "hackronyx.firebaseapp.com",
  databaseURL: "https://hackronyx-default-rtdb.firebaseio.com",
  projectId: "hackronyx",
  storageBucket: "hackronyx.firebasestorage.app",
  messagingSenderId: "885621265121",
  appId: "1:885621265121:web:0ad4cba810e48e729e1da0"
};


const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const FirebaseContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
export const useFirebase = () => useContext(FirebaseContext);



export const FirebaseProvider = (props) => {

  const [authUser, setAuthUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // 🔐 Auth
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signupWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };
  const loginUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }
  const logout = () => {
    return signOut(authUser.auth);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setAuthUser(user);
      setIsCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);



  // CREATE or REPLACE
  const putData = async (collectionName, docId, data) => {
    try {
      await setDoc(doc(firestore, collectionName, docId), data);
      return { success: true, message: "Document written successfully." };
    } catch (error) {
      console.error("Error writing document:", error);
      return { success: false, error: error.message };
    }
  };
  // READ
  const getData = async (collectionName, docId) => {
    try {
      const snapshot = await getDoc(doc(firestore, collectionName, docId));
      if (snapshot.exists()) {
        return { success: true, data: snapshot.data() };
      } else {
        return { success: false, error: "No document found at that ID." };
      }
    } catch (error) {
      console.error("Error reading document:", error);
      return { success: false, error: error.message };
    }
  };
  // UPDATE
  const updateData = async (collectionName, docId, newData) => {
    try {
      await updateDoc(doc(firestore, collectionName, docId), newData);
      return { success: true, message: "Document updated successfully." };
    } catch (error) {
      console.error("Error updating document:", error);
      return { success: false, error: error.message };
    }
  };
  // DELETE
  const deleteData = async (collectionName, docId) => {
    try {
      await deleteDoc(doc(firestore, collectionName, docId));
      return { success: true, message: "Document deleted successfully." };
    } catch (error) {
      console.error("Error deleting document:", error);
      return { success: false, error: error.message };
    }
  };




  const create_user = async (email,fullname) => {
    let collectionName = "users"; 
    let experience = "";
    let res = getData(collectionName,email);
    experience = res.data.experience;
    
    let data = {
        fullname:fullname,
        experience:experience,
    }
    try {
      await setDoc(doc(firestore, collectionName , email), data);
      return { success: true, message: "Document written successfully." };
    } catch (error) {
      console.error("Error writing document:", error);
      return { success: false, error: error.message };
    }
  };

  const update_user = async (email,fullname,experience) => {
    let collectionName = "users"; 
    let data = {
        fullname:fullname,
        experience:experience,
    }
    console.log(data);
    try {
      await setDoc(doc(firestore, collectionName , email), data);
      return { success: true, message: "user data updated successfully." };
    } catch (error) {
      console.error("error updating user data : ", error);
      return { success: false, error: error.message };
    }
  };




  return (
    <FirebaseContext.Provider
      value={{
        authUser,
        isCheckingAuth,
        signupWithGoogle,
        signupUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        logout,
        putData,
        getData,
        updateData,
        deleteData,
        create_user,
        update_user,

      }}
    >
      {props.children}
    </FirebaseContext.Provider>

  );
};
