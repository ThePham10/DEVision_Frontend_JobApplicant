"use client";

import Button from "@/components/reusable-component/Button";
import SecondaryButton from "@/components/reusable-component/SecondaryButton";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import logoutUser from "../service/HeaderService";
import { DEVisionLogoButton } from "@/components/reusable-component/DEVisionLogoButton";
import { AvatarFrame } from "@/components/reusable-component/AvatarFrame";
import { PopUpBox } from "@/components/reusable-component/PopUpBox";
import InfoCard from "@/components/reusable-component/InfoCard";
import { NotificationButton } from "@/components/reusable-component/NotificationButton";

import { usePathname } from "next/navigation";
import { NavBar } from "@/components/reusable-component/NavBar";
import { Settings, Settings2, LogOut } from "lucide-react";

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
            <div className="relative h-14 sm:h-16 md:h-18 flex flex-row items-center gap-2 sm:gap-4 justify-between border-b border-[#E1E7EF] font-[Inter] px-4 sm:px-6 md:px-8 lg:px-0">
                {/* Logo - Left side */}
                <div className="flex items-center justify-center lg:ml-[162px]">
                    <DEVisionLogoButton />
                </div>

                {/* Desktop Navigation - Center (visible on lg+) */}
                {isAuthenticated && (
                    <div className="hidden lg:flex flex-1 justify-center">
                        <NavBar isAdmin={isAdmin} pathname={pathname} />
                    </div>
                )}

                {/* Right side - Actions */}
                <div className="flex items-center justify-end gap-2 sm:gap-3 lg:mr-[162px]">
                    {/* Mobile hamburger menu - Only for authenticated users on mobile */}
                    {isAuthenticated && (
                        <div className="lg:hidden">
                            <NavBar isAdmin={isAdmin} pathname={pathname} />
                        </div>
                    )}
                    
                    {!isAuthenticated && (
                        <>
                            <SecondaryButton text="Sign in" onClick={() => router.push("/login")} />
                            <span className="hidden sm:inline">
                                <Button text="Get Started" onClick={() => router.push("/register")} />
                            </span>
                        </>
                    )}

                    {isAuthenticated && !isAdmin && (
                        <>
                            <NotificationButton />
                            <PopUpBox
                                trigger={
                                    <AvatarFrame 
                                        size={40} 
                                        className="sm:w-[50px] sm:h-[50px] cursor-pointer" 
                                    />
                                }
                                content={
                                    <div className="space-y-3">
                                        <InfoCard
                                            title="Account Setting"
                                            onClick={() => router.push("/account")}
                                            Icon={Settings2}
                                        />
                                        <InfoCard
                                            title="Profile Management"
                                            onClick={() => router.push("/profile")}
                                            Icon={Settings}
                                        />
                                        <InfoCard
                                            title="Log out"
                                            variant="danger"
                                            onClick={handleSignOut}
                                            Icon={LogOut}
                                        />
                                    </div>
                                }
                            />
                        </>
                    )}

                    {isAuthenticated && isAdmin && (
                        <>
                            <PopUpBox
                                trigger={
                                    <AvatarFrame 
                                        size={40} 
                                        className="sm:w-[50px] sm:h-[50px] cursor-pointer" 
                                    />
                                }
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