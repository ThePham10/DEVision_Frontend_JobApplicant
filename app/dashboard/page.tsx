"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import SecondaryButton from "@/components/secondaryButton";
import { useRouter } from "next/navigation";
import { googleAuthService } from "@/services/googleAuthService";
import Header from "@/components/header/ui/header";

export default function page() {
    return (
        <>
            <Header />

            <div className="flex flex-col min-h-screen items-center bg-[#f1f5f9]/30 p-10 gap-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p>Welcome to your dashboard!</p>
        </div>
        </>
    )
}