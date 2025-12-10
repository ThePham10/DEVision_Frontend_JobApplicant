import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export interface AuthUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    idToken: string;
}

export const googleAuthService = {
    async signInWithGoogle(): Promise<AuthUser> {
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: "select_account" });
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Get the ID token
            const idToken = await user.getIdToken();

            const authUser = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                idToken: idToken,
            };

            return authUser;
        } catch (error) {
            console.error("Google sign-in error:", error);
            throw error;
        }
    },

    async signOut(): Promise<void> {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Sign out error:", error);
            throw error;
        }
    },
};
