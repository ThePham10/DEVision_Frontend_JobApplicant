import { SecondaryButton, DEVisionLogoButton, Ribbon } from "@/components/reusable-component";
import { LoginForm } from "@/components/login-form";
import { ContinueWithGoogleButton } from "@/components/ContinueWithGoogleButton";

export default function Page() {
    return (
        <div className="relative flex flex-col min-h-screen items-center bg-[#f1f5f9]/30 px-4 py-10 sm:p-10 md:p-20 lg:p-30 gap-6 sm:gap-8">
            {/* Animated ribbon background */}
            <Ribbon words={["LOGIN", "*", "SIGN IN", "*", "WELCOME BACK", "*", "ACCESS YOUR ACCOUNT", "*", "LET'S GO"]} />


            <div className="z-10">
                <DEVisionLogoButton />
            </div>

            <div className="z-10 bg-white rounded-lg shadow-md p-5 sm:p-7 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px]">
                <div className="flex justify-center font-[Inter] text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                    Login to DEVision
                </div>

                <LoginForm/>

                <div className="flex items-center my-4 sm:my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <ContinueWithGoogleButton/>

                <div className="flex flex-col justify-center items-center my-4 sm:my-6">
                    <div className="font-[Inter] text-[#65758B] mb-4 text-sm sm:text-base">
                        Do not have an account
                    </div>
                    <SecondaryButton text={"Sign up"} destination={"/register"} style={"w-full sm:w-81"}/>
                </div>

            </div>
        </div>
    );
}
