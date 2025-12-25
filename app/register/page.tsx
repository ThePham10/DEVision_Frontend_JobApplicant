import {DEVisionLogoButton} from "@/components/reusable-component/DEVisionLogoButton";
import { RegisterForm } from "@/components/register-form/RegisterForm";
import { ContinueWithGoogleButton } from "@/components/ContinueWithGoogleButton/ContinueWithGoogleButton";
import { Ribbon } from "@/components/reusable-component/Ribbon";

export default function Page() {
    return (
        <div className="relative flex flex-col min-h-screen items-center bg-[#f1f5f9]/30 px-4 py-6 sm:p-10 gap-6 sm:gap-8 overflow-hidden">
            {/* Animated ribbon background */}
            <Ribbon words={["REGISTER", "*", "SIGN UP", "*", "JOIN US", "*", "CREATE ACCOUNT", "*", "GET STARTED"]} />
            
            {/* Content above ribbon */}
            <div className="z-10">
                <DEVisionLogoButton />
            </div>

            <div className="z-10 bg-white rounded-lg shadow-md p-5 sm:p-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px]">
                <div className="font-[Inter] text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
                    Create Your Account
                </div>
                <div className="font-[Inter] text-[#65758B] mb-4 text-sm sm:text-base">
                    Join DEVision to start your tech career journey
                </div>

                <ContinueWithGoogleButton/>

                <div className="flex items-center my-4 sm:my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <RegisterForm/>
            </div>
        </div>
    )
}