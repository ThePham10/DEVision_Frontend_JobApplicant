import {DEVisionLogoButton} from "@/components/reusable-component/DEVisionLogoButton";
import { Ribbon } from "@/components/reusable-component/ribbon/Ribbon";
import { LoginFormAdmin } from "@/components/login-form/LoginFormAdmin";

export default function Page() {
    return (
        <div className="relative flex flex-col min-h-screen items-center bg-[#f1f5f9]/30 p-30 gap-8">
            {/* Animated ribbon background */}
            <Ribbon words={["LOGIN", "*", "SIGN IN", "*", "ADMIN"]} />

            <div className="z-10">
                <DEVisionLogoButton />
            </div>

            <div className="z-10 bg-white rounded-lg shadow-md p-7 mx-150 min-w-[700px]">
                <div className="flex justify-center font-[Inter] text-3xl font-bold mb-4">
                    Login to DEVision - Admin
                </div>

                <LoginFormAdmin />

            </div>
        </div>
    );
}