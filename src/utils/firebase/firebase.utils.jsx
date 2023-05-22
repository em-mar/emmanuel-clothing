import {initializeApp} from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { getFirestore,doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyARN6QraOr533Db0iu2qqORZcMfiCVjVLQ",
    authDomain: "emmanuel-clothing-db.firebaseapp.com",
    projectId: "emmanuel-clothing-db",
    storageBucket: "emmanuel-clothing-db.appspot.com",
    messagingSenderId: "228821721393",
    appId: "1:228821721393:web:747161edb1c8b0e4c29010"
  };
  

    const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup =  () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc( db, 'users', userAuth.uid);
  
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
  };
