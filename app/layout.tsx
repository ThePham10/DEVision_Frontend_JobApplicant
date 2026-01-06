import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { QueryProvider, DataInitializer, WebSocketProvider } from "@/providers";

// Load Inter font with all weights you need
const inter = Inter({ 
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "DEVision",
    description: "DEVision System for Job Applicant",
    icons: {
        icon: "/DEVision_JA_Logo.ico",
    },
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <QueryProvider>
                    <WebSocketProvider>
                        <DataInitializer>
                            {children}
                        </DataInitializer>
                    </WebSocketProvider>
                </QueryProvider>
            </body>
        </html>
    );
}