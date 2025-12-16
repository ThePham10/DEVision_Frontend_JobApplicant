import Link from "next/link";

// Pre-generate particle positions to avoid Math.random() during render
const generateParticles = () => {
    return [...Array(20)].map((_, i) => ({
        id: i,
        left: (i * 5 + 2.5) % 100, // Deterministic spread
        top: ((i * 7) % 100),
        duration: 3 + (i % 5) * 0.5,
        delay: (i % 8) * 0.25,
    }));
};

const PARTICLES = generateParticles();

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center px-4 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {PARTICLES.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                        }}
                    />
                ))}
            </div>

            {/* 404 Text */}
            <div
                className="relative z-10"
            >
                <h1
                    className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 leading-none"
                    style={{
                        backgroundSize: "200% 200%",
                    }}
                >
                    404
                </h1>
            </div>

            {/* Glitch effect line */}
            <div
                className="relative z-10 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-8"
            />

            {/* Message */}
            <div
                className="relative z-10 text-center"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-gray-400 max-w-md mb-8">
                    The page you&apos;re looking for seems to have wandered off into the digital void.
                </p>
            </div>

            {/* Animated button */}
            <div>
                <Link
                    href="/"
                    className="relative z-10 group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2"
                >
                    <span>
                        ←
                    </span>
                    Back to Home
                </Link>
            </div>

            {/* Floating code snippets decoration */}
            <div
                className="absolute bottom-10 left-10 text-blue-500/20 font-mono text-sm hidden md:block"
            >
                <div>
                    {`<Error code={404} />`}
                </div>
            </div>

            <div
                className="absolute top-10 right-10 text-blue-500/20 font-mono text-sm hidden md:block"
            >
                <div>
                    {`// page not found`}
                </div>
            </div>
        </div>
    );
}