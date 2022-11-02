import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {
    addDoc, collection, getDocs, getFirestore,
    query, where
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCC8xpj1u9lK0Q6z3zxbQ9CGdmhIutLKVA",
  authDomain: "fir-crud-51f2b.firebaseapp.com",
  projectId: "fir-crud-51f2b",
  storageBucket: "fir-crud-51f2b.appspot.com",
  messagingSenderId: "988347115189",
  appId: "1:988347115189:web:04b0897421dd6cfb0f80fc",
  measurementId: "G-FZ1QDRNFGK"
};
const googleProvider = new GoogleAuthProvider();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    console.log(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (res)=>{
            console.log(res);
        }
      );
    } catch (err) {
      console.error(err.message);
      return err;
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      console.log(err.message);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset link sent!");
    } catch (err) {
      console.error(err);
      console.log(err.message);
    }
  };

  const logout = () => {
    signOut(auth);
  };


  export {
    app,
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};
