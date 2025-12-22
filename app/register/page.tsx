import {DEVisionLogoButton} from "@/components/reusable-component/DEVisionLogoButton";
import { RegisterForm } from "@/components/register-form/RegisterForm";
import { ContinueWithGoogleButton } from "@/components/ContinueWithGoogleButton/ContinueWithGoogleButton";
import { Ribbon } from "@/components/reusable-component/Ribbon";

export default function Page() {
    return (
        <div className="relative flex flex-col min-h-screen items-center bg-[#f1f5f9]/30 p-10 gap-8 overflow-hidden">
            {/* Animated ribbon background */}
            <Ribbon words={["REGISTER", "*", "SIGN UP", "*", "JOIN US", "*", "CREATE ACCOUNT", "*", "GET STARTED"]} />
            
            {/* Content above ribbon */}
            <div className="z-10">
                <DEVisionLogoButton />
            </div>

            <div className="z-10 bg-white rounded-lg shadow-md p-8 mx-150 min-w-[700px]">
                <div className="font-[Inter] text-3xl font-bold mb-4">
                    Create Your Account
                </div>
                <div className="font-[Inter] text-[#65758B] mb-4">
                    Join DEVision to start your tech career journey
                </div>

                <ContinueWithGoogleButton/>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <RegisterForm/>
            </div>
        </div>
    )
}