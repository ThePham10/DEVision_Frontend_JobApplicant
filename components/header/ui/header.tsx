"use client";

import Button from "@/components/reusable-component/Button";
import SecondaryButton from "@/components/reusable-component/SecondaryButton";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import logoutUser from "../service/HeaderService";
import { DEVisionLogoButton } from "@/components/reusable-component/DEVisionLogoButton";
import { AvatarFrame } from "@/components/reusable-component/AvatarFrame";
import { PopUpBox } from "@/components/popUpBox/popUpBox";
import InfoCard from "@/components/reusable-component/InfoCard";
import { NotificationButton } from "@/components/reusable-component/NotificationButton";
import { Activity } from "react";
import { usePathname } from "next/navigation";
import { NavBar } from "@/components/reusable-component/NavBar";

export default function Header() {
    const router = useRouter();
    const { isAuthenticated, isAdmin, clearUser } = useAuthStore();
    const pathname = usePathname();

    const handleSignOut = async () => {
        try {
            const response = await logoutUser();
            if (response.status === 201) {
                console.log("Logout successful!");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            clearUser();
            router.push("/");
        }
    };

    

    return (
        <header>
            <div className="relative h-14 sm:h-16 md:h-18 flex flex-row gap-2 sm:gap-4 justify-between sm:justify-center border-b border-[#E1E7EF] font-[Inter] px-4 sm:px-6 md:px-8 lg:px-0">
                <div className="flex items-center justify-center lg:ml-[162px]">
                    <DEVisionLogoButton />
                </div>

                <Activity mode={(isAuthenticated) ? "visible" : "hidden"}>
                    <NavBar isAdmin={isAdmin} pathname={pathname} />
                </Activity>


                <div className="flex items-center justify-end gap-2 sm:gap-3 lg:flex-auto lg:mr-[162px]">
                    {!isAuthenticated && (
                        <>
                            <SecondaryButton text="Sign in" onClick={() => router.push("/login")} />
                            <Button text="Get Started" onClick={() => router.push("/register")} />
                        </>
                    )}

                    {isAuthenticated && !isAdmin && (
                        <>
                            <NotificationButton />
                            <PopUpBox
                                trigger={
                                    <AvatarFrame 
                                        size={50} 
                                        className="mr-2 cursor-pointer" 
                                    />
                                }
                                content={
                                    <div className="space-y-3">
                                        <InfoCard
                                            title="Dashboard"
                                            onClick={() => router.push("/dashboard")}
                                        />
                                        <InfoCard
                                            title="Account Setting"
                                            onClick={() => router.push("/account")}
                                        />
                                        <InfoCard
                                            title="Profile Management"
                                            onClick={() => router.push("/profile")}
                                        />
                                        <InfoCard
                                            title="Job Posts"
                                            onClick={() => router.push("/jobs")}
                                        />
                                        <InfoCard
                                            title="Log out"
                                            variant="danger"
                                            onClick={handleSignOut}
                                        />
                                    </div>
                                }
                            />
                        </>
                    )}

                    {isAuthenticated && isAdmin && (
                        <>
                            <PopUpBox
                                trigger={<AvatarFrame size={50} className="mr-2 cursor-pointer" />}
                                content={
                                    <div className="space-y-3">
                                        <InfoCard
                                            title="Log out"
                                            variant="danger"
                                            onClick={handleSignOut}
                                        />
                                    </div>
                                }
                            />
                        </>
                    )}
                </div>

            </div>
        </header>
    );
}