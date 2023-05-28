import {initializeApp} from "firebase/app";
import { getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider,
        createUserWithEmailAndPassword } from "firebase/auth";
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

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account",
  });

  export const auth = getAuth();
  export const signInWithGooglePopup =  () => 
    signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () =>  
    signInWithRedirect(auth, googleProvider)

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc( db, 'users', userAuth.uid);
  
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
      const { displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message)
      }
    }

    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if (!email || !password) return;

     return await createUserWithEmailAndPassword(auth, email, password)

  }
