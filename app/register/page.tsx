import { DEVisionLogoButton, Ribbon } from "@/components/reusable-component";
import { RegisterForm } from "@/components/register-form";
import { ContinueWithGoogleButton } from "@/components/ContinueWithGoogleButton";

/**
 * The register page component
 * The register page component use the register form component
 * It also use the continue with google button component for allow the applicant to register with google account
 */
export default function Page() {
    return (
        <div className="relative flex flex-col min-h-screen items-center bg-[#f1f5f9]/30 px-4 py-6 sm:p-10 gap-6 sm:gap-8 overflow-hidden">
            {/* Animated ribbon background */}
            <Ribbon words={["REGISTER", "*", "SIGN UP", "*", "JOIN US", "*", "CREATE ACCOUNT", "*", "GET STARTED"]} />
            
            {/* Logo button */}
            <div className="z-10">
                <DEVisionLogoButton />
            </div>

            {/* Register form */}
            <div className="z-10 bg-white rounded-lg shadow-md p-5 sm:p-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px]">
                {/* Title */}
                <div className="font-[Inter] text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
                    Create Your Account
                </div>

                {/* Subtitle */}
                <div className="font-[Inter] text-[#65758B] mb-4 text-sm sm:text-base">
                    Join DEVision to start your tech career journey
                </div>

                {/* Continue with Google button */}
                <ContinueWithGoogleButton/>

                {/* Divider */}
                <div className="flex items-center my-4 sm:my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Register form */}
                <RegisterForm/>
            </div>
        </div>
    )
}