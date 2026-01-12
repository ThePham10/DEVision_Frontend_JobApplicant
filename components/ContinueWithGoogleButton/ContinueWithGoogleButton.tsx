"use client";

import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { googleAuthService } from "@/services/googleAuthService";
import { useRouter } from "next/navigation";
import authUserWithGoogleAccount from "./service/ContinueWithGoogleButtonService";
import { authUserWithGoogleAccountData } from "./type/types";

export const ContinueWithGoogleButton = () => {
    const { setUser } = useAuthStore();
    const router = useRouter();

    // Handle Google authentication button click
    const handleAuthWithGoogle = async () => {
        try {
            // Sign in with Google and get ID token
            const idToken = await googleAuthService.signInWithGoogle();
            
            // Use the ID token to authenticate/register with backend
            const data: authUserWithGoogleAccountData = {
                idToken: idToken
            }
            const response = await authUserWithGoogleAccount(data);
            
            // Update user state upon successful authentication
            if (response.status === 201) {
                console.log("Authentication successful!");
                setUser({
                    id: response.data.user.id,
                    email: response.data.user.email,
                    name: response.data.user.name,
                    role: response.data.user.role,
                    country: response.data.user.country,
                    emailVerified: response.data.user.emailVerified,
                    isPremium: response.data.user.isPremium
                });
                router.push("/jobs");
            }
        } catch (error) {
            console.error("Google sign-in failed:", error);
        }

        console.log("Sign up with Google")
    };

    return (
        <button className="w-full bg-white border border-[#2463EB] rounded-md text-[#2463EB] py-2 px-4 mb-6 flex items-center justify-center hover:bg-gray-50"
                onClick={handleAuthWithGoogle}>
            <div className={"flex my-1"}>
                <Image src="/google_logo.svg" 
                        alt="Google logo" 
                        width={20}
                        height={20}
                        className="w-5 h-5 mr-2"/>
                Continue with Google
            </div>
        </button>
    )
}