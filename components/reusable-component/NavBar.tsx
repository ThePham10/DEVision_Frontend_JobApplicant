import Link from "next/link"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"

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

    const handleTabClick = (tab: Tab) => {
        router.push(tab.path);
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
        {title: 'Job Applicantion', path: '/job-applicantion'}
    ]
    
    return (
        <nav className="flex items-center gap-1 p-2">
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
    )
}