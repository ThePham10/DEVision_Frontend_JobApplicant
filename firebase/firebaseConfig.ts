import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBC5Vs5afWHwqjrA7DrLiC5uALPT0IdTBU",
    authDomain: "menupilot-94baa.firebaseapp.com",
    projectId: "menupilot-94baa",
    storageBucket: "menupilot-94baa.firebasestorage.app",
    messagingSenderId: "428488521025",
    appId: "1:428488521025:web:376de8b40bf4561cf39dc0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;