import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "#0D1B2A" }}
    >
      <div className="flex flex-col items-center gap-4">
        <h1
          className="text-5xl font-black tracking-widest cd-pulse-gold"
          style={{ color: "#C9A84C" }}
        >
          CASH DROP
        </h1>
        <div className="flex gap-1 mt-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1 rounded-full"
              style={{
                backgroundColor: "#C9A84C",
                width: i === 1 ? "24px" : "8px",
                opacity: 0.8,
                animation: `shimmer 1.5s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>
        <p className="text-lg mt-2 tracking-wide" style={{ color: "#8899AA" }}>
          Cash. At your door.
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
