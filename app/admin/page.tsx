import { DEVisionLogoButton, Ribbon } from "@/components/reusable-component";
import { LoginFormAdmin } from "@/components/login-form";

export default function Page() {
    return (
        <div className="relative flex flex-col min-h-screen items-center bg-[#f1f5f9]/30 px-4 py-10 sm:p-10 md:p-20 lg:p-30 gap-6 sm:gap-8">
            {/* Animated ribbon background */}
            <Ribbon words={["LOGIN", "*", "SIGN IN", "*", "ADMIN"]} />

            <div className="z-10">
                <DEVisionLogoButton />
            </div>

            <div className="z-10 bg-white rounded-lg shadow-md p-5 sm:p-7 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px]">
                <div className="flex justify-center font-[Inter] text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                    Login to DEVision - Admin
                </div>

                <LoginFormAdmin />

            </div>
        </div>
    );
}