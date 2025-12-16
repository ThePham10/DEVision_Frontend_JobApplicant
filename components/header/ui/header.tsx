"use client";

import Button from "@/components/reusable-component/Button";
import SecondaryButton from "@/components/reusable-component/SecondaryButton";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import logoutUser from "../service/HeaderService";
import { DEVisionLogoButton } from "@/components/reusable-component/DEVisionLogoButton";

export default function Header() {
    const router = useRouter();
    const { isAuthenticated, clearUser } = useAuthStore();

    const handleSignOut = async () => {
        try {
            const response = await logoutUser();
            if (response.status === 201) {
                console.log("Logout successful!");
                clearUser();
                router.push("/");
            }

        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    
    return (
        <header>
            <div className="relative h-14 sm:h-16 md:h-18 flex flex-row gap-2 sm:gap-4 justify-between sm:justify-center border-b border-[#E1E7EF] font-[Inter] px-4 sm:px-6 md:px-8 lg:px-0">
                <div className="flex items-center justify-center lg:ml-[162px]">
                    <DEVisionLogoButton />
                </div>

                <div className="flex items-center justify-end gap-2 sm:gap-3 lg:flex-auto lg:mr-[162px]">
                    {isAuthenticated ? (
                        <Button text="Sign Out" onClick={handleSignOut} />
                    ) : (
                        <>
                            <SecondaryButton text="Sign in" onClick={() => router.push("/login")} />
                            <Button text="Get Started" onClick={() => router.push("/register")} />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}