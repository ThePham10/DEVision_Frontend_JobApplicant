"use client";

import Footer from "@/components/footer/ui/footer";
import Header from "@/components/header/ui/header";
import ServiceCard from "@/components/serviceCard/ui/serviceCard";
import Button from "@/components/button";
import SecondaryButton from "@/components/secondaryButton";
import {useRouter} from "next/navigation";


export default function Page() {
    const router = useRouter();

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center my-30 font-[Inter] gap-4 ">
                <div className="text-5xl font-bold">
                    Find Your Dream Tech Job
                </div>

                <div className="h-12 w-200 items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-[#65758b] text-2xl text-center leading-7">
                    DEVision connects Computer Science professionals with their ideal career opportunities. Discover roles that match your skills and aspirations.
                </div>

                <div className="flex mt-7 gap-4 font-[Inter]">
                    <Button text={"Start Your Journey"} onClick={() => router.push("/register")}/>
                    <SecondaryButton text={"Browse Jobs"} onClick={() => console.log("Hello world")}/>
                </div>
            </div>

            <div className="bg-[#f1f5f9]/50 font-[Inter] py-10">
                <div className="flex items-center justify-center text-4xl font-bold mt-16 mb-10">
                    Why choose DEVision?
                </div>

                <div className="flex justify-center gap-8 mb-15">
                    <ServiceCard title={"Smart Job Search"}
                                 description={"Advanced search filters to find jobs matching your\n" +
                                     "skills, location, and salary expectations."}
                                 icon={""}></ServiceCard>
                    <ServiceCard title={"Profile Management"}
                                 description={"Create a comprehensive profile showcasing your\n" +
                                     "education, experience, and technical skills."}
                                 icon={""}></ServiceCard>
                    <ServiceCard title={"Premium Features"}
                                 description={"Get real-time notifications for new jobs matching\n" +
                                     "your criteria with our premium subscription."}
                                 icon={""}></ServiceCard>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center my-30 font-[Inter] gap-4">
                <div className="text-[40px] font-bold">
                    Ready to Take the Next Step?
                </div>

                <div className="h-12 w-200 items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-[#65758b] text-[25px] text-center leading-7">
                    Join thousands of tech professionals who have found their perfect role through
                    DEVision.
                </div>

                <Button text={"Create Your Account"} onClick={() => router.push("/register")}/>
            </div>
            <Footer />
        </div>
    );
}