"use client";

import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { googleAuthService } from "@/services/googleAuthService";
import { useRouter } from "next/navigation";
import registerUserWithGoogleAccount from "./service/RegisterWithGoogleButtonService";
import { registerUserWithGoogleAccountData } from "@/components/register-form/types/types";

export const RegisterWithGoogleButton = () => {
    const {setUser} = useAuthStore();
    const router = useRouter();

    const handleRegisterWithGoogle = async () => {
            try {
                const idToken = await googleAuthService.signInWithGoogle();
                

                const data: registerUserWithGoogleAccountData = {
                    idToken: idToken
                }
                const response = await registerUserWithGoogleAccount(data);
                
                if (response.status === 201) {
                    console.log("Registration successful!");
                    setUser(response.data);
                    router.push("/dashboard");
                }
            } catch (error) {
                console.error("Google sign-in failed:", error);
            }
    
            console.log("Sign up with Google")
        };

    return (
        <button className="w-full bg-white border border-[#2463EB] rounded-md text-[#2463EB] py-2 px-4 mb-6 flex items-center justify-center hover:bg-gray-50"
                onClick={handleRegisterWithGoogle}>
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