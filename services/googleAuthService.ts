import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export const googleAuthService = {
    async signInWithGoogle(): Promise<string> {
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: "select_account" });
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Get the ID token
            const idToken = await user.getIdToken();

            return idToken;
        } catch (error) {
            console.error("Google sign-in error:", error);
            throw error;
        }
    },
};
