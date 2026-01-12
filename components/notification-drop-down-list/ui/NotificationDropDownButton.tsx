"use client";
import { motion, AnimatePresence } from "motion/react";
import { Bell } from "lucide-react";
import { NotificationCard } from "./NotificationCard";
import useNotificationDropDownButton from "../hook/NotificationDropDownButtonHook";

/**
 * Notification drop down button component
 * Notification drop down button <- notification drop down hook <- notification drop down service
 */
export const NotificationDropDownButton = () => {
    const {
        isOpen, 
        popupRef, loaderRef, buttonRef,
        wsStatus,
        hasMore,
        displayedNotifications,
        unreadCount,
        setIsOpen, 
        handleMarkAllAsRead,
        handleMarkAsRead,
        getNotificationIcon,
        getNotificationBg,
        getRelativeTime,
    } = useNotificationDropDownButton();

    return (
        <div className="relative">
            {/* Trigger Button */}
            <motion.button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <Bell className="w-5 h-5 text-slate-600" />
                {unreadCount > 0 && (
                    <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full shadow-sm"
                    >
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </motion.span>
                )}
            </motion.button>

            {/* Popup Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={popupRef}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-2">
                                <span className="text-base font-semibold text-slate-900">Notifications</span>
                                {unreadCount > 0 && (
                                    <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                                        {unreadCount} new
                                    </span>
                                )}
                                {/* WebSocket Status Indicator */}
                                <span 
                                    className={`w-2 h-2 rounded-full ${
                                        wsStatus === 'connected' ? 'bg-green-500' :
                                        wsStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                                        'bg-red-500'
                                    }`}
                                    title={`WebSocket: ${wsStatus}`}
                                />
                            </div>
                            {unreadCount > 0 && (
                                <button 
                                    onClick={handleMarkAllAsRead}
                                    className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                                >
                                    Mark all read
                                </button>
                            )}
                        </div>

                        {/* Notification List */}
                        <div 
                            className="max-h-80 overflow-y-auto"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'transparent transparent',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.scrollbarColor = '#cbd5e1 transparent';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.scrollbarColor = 'transparent transparent';
                            }}
                        >
                            {displayedNotifications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 px-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                                        <Bell className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600">No notifications</span>
                                    <span className="text-xs text-slate-400 mt-1">You&apos;re all caught up!</span>
                                </div>
                            ) : (
                                <div>
                                    {displayedNotifications.map((item) => (
                                        <NotificationCard
                                            key={item.id}
                                            notification={item}
                                            markAsRead={handleMarkAsRead}
                                            getNotificationBg={getNotificationBg}
                                            getNotificationIcon={getNotificationIcon}
                                            getRelativeTime={getRelativeTime}
                                        />
                                    ))}
                                    {hasMore && (
                                        <div ref={loaderRef} className="py-2 text-center text-xs text-slate-400">Loading...</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};