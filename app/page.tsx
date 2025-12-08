"use client";

import Footer from "@/components/footer/ui/footer";
import Header from "@/components/header/ui/header";
import ServiceCard from "@/components/serviceCard/ui/serviceCard";
import Button from "@/components/button";
import SecondaryButton from "@/components/secondaryButton";
import { useRouter } from "next/navigation";
import { motion, useInView } from "motion/react";
import { useMainPageScroll } from "@/hooks/useMainPageScroll";
import { FaSearch, FaUsers, FaDollarSign } from "react-icons/fa";
import { useRef } from "react";

type DoodleIconData = {
    position: string;
    color: string;
    size: string;
    path: string;
    rotate?: string;
    fill?: boolean;
};

const doodleIcons: DoodleIconData[] = [
    { position: "top-[10%] left-[5%]", color: "text-blue-200", rotate: "rotate-12", size: "w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40", path: "M9.4 16.6L4.8 12l4.6-4.6M14.6 16.6l4.6-4.6-4.6-4.6" },
    { position: "top-[15%] right-[10%]", color: "text-purple-200", size: "w-8 h-8 sm:w-12 sm:h-12 lg:w-15 lg:h-15", path: "M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0", fill: false },
    { position: "top-[30%] left-[15%]", color: "text-indigo-200", rotate: "-rotate-6", size: "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20", path: "M8 3v3a2 2 0 01-2 2H3m0 0v4m0-4h3a2 2 0 012 2v3M8 21v-3a2 2 0 00-2-2H3m0 0v-4m0 4h3a2 2 0 002-2v-3" },
    { position: "top-[25%] right-[20%]", color: "text-blue-200", rotate: "rotate-6", size: "w-16 h-16 sm:w-20 sm:h-20 lg:w-30 lg:h-30", path: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { position: "bottom-[30%] left-[8%]", color: "text-yellow-200", rotate: "rotate-12", size: "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10", path: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", fill: true },
    { position: "bottom-[25%] right-[8%]", color: "text-green-200", rotate: "-rotate-12", size: "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20", path: "M12 5a9 3 0 1 0 0 .01M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M21 5v14c0 1.66-4 3-9 3s-9-1.34-9-3V5" },
    { position: "top-[60%] left-[25%]", color: "text-gray-200", rotate: "-rotate-20", size: "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20", path: "M4 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M12 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M20 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0", fill: true },
    { position: "bottom-[40%] right-[25%]", color: "text-amber-200", rotate: "rotate-6", size: "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20", path: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", fill: true },
    { position: "top-[20%] left-[30%]", color: "text-red-200", rotate: "rotate-12", size: "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20", path: "M12 6v6l4 2", fill: false },
    { position: "top-[15%] right-[30%]", color: "text-teal-200", rotate: "-rotate-6", size: "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20", path: "M5 13l4 4L19 7", fill: false },
    { position: "top-[50%] right-[5%]", color: "text-pink-200", rotate: "rotate-12", size: "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10", path: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.977 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.95-.69l1.52-4.674z", fill: true },
    { position: "top-[10%] left-[45%]", color: "text-lime-200", rotate: "-rotate-12", size: "w-14 h-14 sm:w-20 sm:h-20 lg:w-25 lg:h-25", path: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", fill: false },
    { position: "bottom-[20%] left-[60%]", color: "text-cyan-200", rotate: "rotate-6", size: "w-8 h-8 sm:w-12 sm:h-12 lg:w-15 lg:h-15", path: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3", fill: false },
    { position: "top-[5%] right-[15%]", color: "text-violet-200", rotate: "-rotate-6", size: "w-8 h-8 sm:w-12 sm:h-12 lg:w-15 lg:h-15", path: "M12 6v6l4 2", fill: false },
    { position: "bottom-[20%] left-[35%]", color: "text-rose-200", rotate: "rotate-12", size: "w-14 h-14 sm:w-20 sm:h-20 lg:w-25 lg:h-25", path: "M5 13l4 4L19 7", fill: false },
];

const DoodleIcon = ({ icon, index, isInView }: { icon: DoodleIconData; index: number; isInView: boolean }) => (
    <div className={`absolute ${icon.position} ${icon.color} ${icon.rotate ?? ""} hidden sm:block`}>
        <motion.svg
            className={icon.size}
            fill={icon.fill ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
        >
            <motion.path
                d={icon.path}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{
                    pathLength: { duration: 2, ease: "easeInOut", delay: index * 0.1 },
                    opacity: { duration: 0.3, delay: index * 0.1 },
                }}
            />
        </motion.svg>
    </div>
);

const DoodleIconsSection = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    return (
        <div ref={ref} className="relative">
            <div className="absolute inset-0 pointer-events-none">
                {doodleIcons.map((icon, i) => (
                    <DoodleIcon key={i} icon={icon} index={i} isInView={isInView} />
                ))}
            </div>
            {children}
        </div>
    );
};

export default function Page() {
    const router = useRouter();
    const { visibleCards, servicesRef } = useMainPageScroll();

    const services = [
        { title: "Smart Job Search", description: "Advanced search filters to find jobs matching your skills, location, and salary expectations.", icon: FaSearch, colSpan: 1 },
        { title: "Profile Management", description: "Create a comprehensive profile showcasing your education, experience, and technical skills.", icon: FaUsers, colSpan: 1 },
        { title: "Premium Features", description: "Get real-time notifications for new jobs matching your criteria with our premium subscription.", icon: FaDollarSign, colSpan: 2 },
    ];

    return (
        <div className="overflow-y-auto">
            <Header />

            {/* First section */}
            <DoodleIconsSection>
                <div className="flex flex-col items-center justify-center font-[Inter] gap-4 min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden">
                    {/* Content */}
                    <div className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                        Find Your Dream Tech Job
                    </div>
                    <div className="relative z-10 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl items-center justify-center font-normal text-[#65758b] text-base sm:text-lg md:text-xl lg:text-2xl text-center leading-6 sm:leading-7">
                        DEVision connects Computer Science professionals with their ideal career opportunities.
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row mt-4 sm:mt-7 gap-3 sm:gap-4 font-[Inter] w-full sm:w-auto px-4 sm:px-0">
                        <Button text={"Start Your Journey"} onClick={() => router.push("/register")} />
                        <SecondaryButton text={"Browse Jobs"} onClick={() => console.log("Hello world")} />
                    </div>
                </div>
            </DoodleIconsSection>

            {/* Services - scroll-controlled cards */}
            <div ref={servicesRef} className="min-h-screen bg-[#f1f5f9]/50 font-[Inter] flex py-6 sm:py-10 flex-col items-center overflow-hidden">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-bold self-start px-4 sm:px-5 lg:px-10 lg:py-10 shrink-0">
                    Why choose DEVision?
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 lg:p-10 items-start">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className={`w-full ${service.colSpan === 2 ? 'md:col-span-2' : ''}`}
                            initial={{ opacity: 0, y: 60, scale: 0.9 }}
                            animate={{
                                opacity: visibleCards > index ? 1 : 0,
                                y: visibleCards > index ? 0 : 60,
                                scale: visibleCards > index ? 1 : 0.9,
                            }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <ServiceCard
                                title={service.title}
                                description={service.description}
                                Icon={service.icon}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Third section */}
            <DoodleIconsSection>
                <div className="min-h-screen flex flex-col overflow-hidden">
                    <div className="flex-1 flex flex-col items-center justify-center font-[Inter] gap-4 px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-bold text-center">
                            Ready to Take the Next Step?
                        </div>
                        <div className="text-[#65758b] text-base sm:text-lg md:text-xl lg:text-[25px] text-center max-w-xs sm:max-w-md md:max-w-2xl">
                            Join thousands of tech professionals who have found their perfect role through DEVision.
                        </div>
                        <Button text={"Create Your Account"} onClick={() => router.push("/register")} />
                    </div>
                    <Footer />
                </div>
            </DoodleIconsSection>
        </div>
    );
}