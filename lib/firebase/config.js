import { POST } from "@upgradableweb/client";
import { initializeApp, } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPnOM2Ioij_N7FtzWnG6jXjsyfitL8y2Q",
  authDomain: "mvpcircle-7ccad.firebaseapp.com",
  projectId: "mvpcircle-7ccad",
  storageBucket: "mvpcircle-7ccad.appspot.com",
  messagingSenderId: "648865767207",
  appId: "1:648865767207:web:b1ad9e7fbef96931645302"
};



export const signInWithGoogle = async () => {

  initializeApp(firebaseConfig)
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  try {

    const { user } = await signInWithPopup(auth, provider)
    const token = btoa(btoa(user.email))
    const data = await POST('/acc/login', { token })
    return data

  } catch (error) {
    alert(error.message)
  }

};