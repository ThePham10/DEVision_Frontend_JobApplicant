"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { useRouter } from "next/navigation"
import { useState, useEffect, Activity } from "react"
import { Menu, X } from "lucide-react"

type Tab = {
    title: string;
    path: string;
}

interface NavBarProps {
    isAdmin: boolean;
    pathname: string;
}

export const NavBar = ({isAdmin, pathname}: NavBarProps) => {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMobileMenuOpen(false);
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const handleTabClick = (tab: Tab) => {
        router.push(tab.path);
        setIsMobileMenuOpen(false);
    };

    const tabs = isAdmin ? [
        {title: 'Job Applicant', path: '/admin/applicant'},
        {title: 'Company', path: '/admin/company'},
        {title: 'Job Post', path: '/admin/jobs'},
        {title: 'Skill', path: '/admin/skill'},
        {title: 'Job Category', path: '/admin/job-category'},
    ] : [
        {title: 'Home', path: '/'},
        {title: 'Jobs', path: '/jobs'},
        {title: 'Job Application', path: '/my-applications'}
    ]
    
    return (
        <>
            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex items-center gap-1 p-2">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.path;
                    
                    return (
                        <Link
                            key={tab.path}
                            href={tab.path}
                            onClick={() => handleTabClick(tab)}
                            className={`
                                relative px-4 py-2 cursor-pointer rounded-lg
                                text-sm font-medium transition-colors duration-200
                                ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}
                            `}
                        >
                            {tab.title}
                            
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-blue-100 rounded-lg -z-10"
                                    transition={{
                                        type: 'spring',
                                        stiffness: 500,
                                        damping: 30
                                    }}
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Mobile Menu Button - Visible on mobile/tablet only */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
            >
                {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                ) : (
                    <Menu className="w-5 h-5" />
                )}
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                <Activity mode={isMobileMenuOpen ? "visible" : "hidden"}>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden fixed inset-0 bg-black/50 z-40"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        
                        {/* Mobile Menu Panel */}
                        <motion.nav
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="lg:hidden fixed top-0 right-0 bottom-0 w-72 max-w-[80vw] bg-white shadow-xl z-50 flex flex-col"
                        >
                            {/* Menu Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <span className="text-lg font-semibold text-gray-900 font-[Inter]">Menu</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            {/* Menu Items */}
                            <div className="flex-1 overflow-y-auto py-4">
                                {tabs.map((tab, index) => {
                                    const isActive = pathname === tab.path;
                                    
                                    return (
                                        <motion.div
                                            key={tab.path}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={tab.path}
                                                onClick={() => handleTabClick(tab)}
                                                className={`
                                                    block px-6 py-3 mx-2 rounded-lg
                                                    text-base font-medium transition-all duration-200
                                                    ${isActive 
                                                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                                    }
                                                `}
                                            >
                                                {tab.title}
                                            </Link>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.nav>
                    </Activity>
            </AnimatePresence>
        </>
    )
}