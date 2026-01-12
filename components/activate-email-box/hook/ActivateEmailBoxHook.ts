import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { activateEmail } from "../service/ActivateEmailBoxService";

export const useActivateEmailBox = ({ params } : {params: Promise<{token: string}>}) => {
    const {token} = use(params);
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [countdown, setCountdown] = useState(5);
    const [message, setMessage] = useState("Verifying your email address...")
    const router = useRouter()
    
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await activateEmail(token);
                if (response.status === 200) {
                    setStatus("success");
                    setMessage("Your email has been successfully verified!");
                } else {
                    setStatus("error");
                    setMessage(response.data?.message || "Failed to verify email.");
                }
            } catch (error) {
                setStatus("error");
            }
        };
        verifyToken();
    }, [token]);

    // Countdown timer effect & Auto Redirect
    useEffect(() => {
        if (status === "success" && countdown > 0) {
            const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
            return () => clearInterval(timer);
        } else if (status === "success" && countdown === 0) {
            router.push("/login");
        }
    }, [status, countdown, router]);

    return {
        status,
        countdown,
        message,
    }
    
}