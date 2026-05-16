import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const slides = [
  {
    icon: "🚀",
    title: "Request any amount",
    description: "AED 100 to AED 5,000 delivered straight to you",
  },
  {
    icon: "⚡",
    title: "Delivered in under 30 minutes",
    description: "Our drivers are always nearby, ready to serve you",
  },
  {
    icon: "🔒",
    title: "Bank-grade security. OTP verified.",
    description: "Your identity and cash are fully protected every step",
  },
];

const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate("/signin");
    }
  };

  const handleBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const slide = slides[current];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between py-12 px-6 max-w-sm mx-auto"
      style={{ backgroundColor: "#0D1B2A" }}
    >
      {/* Progress dots */}
      <div className="flex gap-2 mt-4">
        {slides.map((_, i) => (
          <div
            key={i}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === current ? "#C9A84C" : "#1B3A5C",
              width: i === current ? "24px" : "8px",
            }}
          />
        ))}
      </div>

      {/* Slide content */}
      <div className="flex flex-col items-center text-center gap-6 flex-1 justify-center">
        <div className="text-7xl">{slide.icon}</div>
        <h2 className="text-2xl font-bold" style={{ color: "#F0F4F8" }}>
          {slide.title}
        </h2>
        <p className="text-base leading-relaxed" style={{ color: "#8899AA" }}>
          {slide.description}
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="w-full flex flex-col gap-3">
        <Button
          onClick={handleNext}
          className="w-full font-bold text-base py-6"
          style={{ backgroundColor: "#C9A84C", color: "#0D1B2A" }}
        >
          {current === slides.length - 1 ? "Get Started →" : "Next →"}
        </Button>
        {current > 0 && (
          <Button
            variant="ghost"
            onClick={handleBack}
            className="w-full"
            style={{ color: "#8899AA" }}
          >
            ← Back
          </Button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
