"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PopUpBox } from "@/components/reusable-component/PopUpBox";

type NotificationProps = {
    id: string;
    title: string;
    description: string;
    time: string;
};

const NotificationButtonContent = ({ notifications }: { notifications: NotificationProps[] }) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-slate-900">Notifications</div>
                <span className="text-xs text-slate-500">{notifications.length} new</span>
            </div>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {notifications.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 hover:bg-slate-50 transition-colors">

                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                            <span className="text-xs text-slate-600 leading-5">{item.description}</span>
                            <span className="text-[11px] text-slate-400 mt-1">{item.time}</span>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                View all notifications
            </button>
        </div>
    );
}

export const NotificationButton = () => {

    const notifications: NotificationProps[] = [
        {
            id: "1",
            title: "New applicant",
            description: "The applied for Frontend Engineer.",
            time: "2m ago",
        },
        {
            id: "2",
            title: "Interview scheduled",
            description: "Backend Engineer interview with Hoang confirmed for Friday.",
            time: "1h ago",
        },
        {
            id: "3",
            title: "Reminder",
            description: "Update the job post closing dates.",
            time: "Today",
        },
    ];
    
    const trigger = (
        <motion.button
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <div>
                <Image src="/notification.png" width={30} height={30} alt="Notification icon" />
            </div>

        </motion.button>
    );

    return <PopUpBox trigger={trigger} content={<NotificationButtonContent notifications={notifications} />} />;
};