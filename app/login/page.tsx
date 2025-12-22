import SecondaryButton from "@/components/reusable-component/SecondaryButton";
import {DEVisionLogoButton} from "@/components/reusable-component/DEVisionLogoButton";
import { LoginForm } from "@/components/login-form/LoginForm";
import { ContinueWithGoogleButton } from "@/components/ContinueWithGoogleButton/ContinueWithGoogleButton";
import { Ribbon } from "@/components/reusable-component/Ribbon";

export default function Page() {
    return (
        <div className="relative flex flex-col min-h-screen items-center bg-[#f1f5f9]/30 p-30 gap-8">
            {/* Animated ribbon background */}
            <Ribbon words={["LOGIN", "*", "SIGN IN", "*", "WELCOME BACK", "*", "ACCESS YOUR ACCOUNT", "*", "LET'S GO"]} />


            <div className="z-10">
                <DEVisionLogoButton />
            </div>

            <div className="z-10 bg-white rounded-lg shadow-md p-7 mx-150 min-w-[700px]">
                <div className="flex justify-center font-[Inter] text-3xl font-bold mb-4">
                    Login to DEVision
                </div>

                <LoginForm/>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <ContinueWithGoogleButton/>

                <div className="flex flex-col justify-center items-center my-6">
                    <div className="font-[Inter] text-[#65758B] mb-4">
                        Do not have an account
                    </div>
                    <SecondaryButton text={"Sign up"} destination={"/register"} style={"w-81"}/>
                </div>

            </div>
        </div>
    );
}
