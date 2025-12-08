import { useEffect, useRef, useState, RefObject } from "react";

interface UseMainPageScrollReturn {
    currentSection: number;
    visibleCards: number;
    servicesRef: RefObject<HTMLDivElement | null>;
}

export function useMainPageScroll(): UseMainPageScrollReturn {
    const [currentSection, setCurrentSection] = useState(0);
    const [visibleCards, setVisibleCards] = useState(1);
    const isScrolling = useRef(false);
    const servicesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isScrolling.current) {
                e.preventDefault();
                return;
            }

            const direction = e.deltaY > 0 ? 1 : -1;

            // Section 1: Services - lock and reveal cards
            if (currentSection === 1) {
                e.preventDefault();
                isScrolling.current = true;

                if (direction > 0 && visibleCards < 3) {
                    setVisibleCards((prev) => prev + 1);
                } else if (direction < 0 && visibleCards > 1) {
                    setVisibleCards((prev) => prev - 1);
                } else if (direction > 0 && visibleCards === 3) {
                    setCurrentSection(2);
                    window.scrollTo({ top: servicesRef.current!.offsetTop + window.innerHeight, behavior: "smooth" });
                } else if (direction < 0 && visibleCards === 1) {
                    setCurrentSection(0);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }

                setTimeout(() => {
                    isScrolling.current = false;
                }, 600);
                return;
            }

            // Other sections - detect entry into services section
            if (currentSection === 0 && direction > 0) {
                e.preventDefault();
                isScrolling.current = true;
                setCurrentSection(1);
                setVisibleCards(1); // Changed from 0 to 1
                servicesRef.current?.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => {
                    isScrolling.current = false;
                }, 600);
            } else if (currentSection === 2 && direction < 0) {
                e.preventDefault();
                isScrolling.current = true;
                setCurrentSection(1);
                setVisibleCards(3);
                servicesRef.current?.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => {
                    isScrolling.current = false;
                }, 600);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [currentSection, visibleCards]);

    return { currentSection, visibleCards, servicesRef };
}