import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { label: "Order placed", done: true },
  { label: "Driver assigned", done: true },
  { label: "En route", done: false, active: true },
  { label: "Delivered", done: false },
];

const LiveTracking = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds >= 3) {
      navigate("/confirmed");
    }
  }, [seconds, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col max-w-sm mx-auto"
      style={{ backgroundColor: "#0D1B2A", color: "#F0F4F8" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#162535" }}
        >
          <ArrowLeft size={18} style={{ color: "#F0F4F8" }} />
        </button>
        <div>
          <h1 className="text-lg font-bold">Arriving in 12 min</h1>
          <p className="text-xs" style={{ color: "#8899AA" }}>Live tracking active</p>
        </div>
      </div>

      {/* Map placeholder */}
      <div
        className="mx-6 my-4 rounded-2xl flex flex-col items-center justify-center"
        style={{ backgroundColor: "#162535", height: "200px" }}
      >
        <span className="text-5xl mb-2">📍</span>
        <p className="text-sm font-semibold" style={{ color: "#8899AA" }}>Live Map</p>
        <p className="text-xs mt-1" style={{ color: "#1B3A5C" }}>Dubai Marina · Villa 24</p>
      </div>

      {/* Progress steps */}
      <div className="px-6 mb-5">
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: "#162535" }}
        >
          <p className="text-sm font-semibold mb-4" style={{ color: "#8899AA" }}>Delivery Progress</p>
          <div className="flex items-start gap-0">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: step.done
                        ? "#2ECC71"
                        : step.active
                        ? "#C9A84C"
                        : "#1B3A5C",
                      color: step.done || step.active ? "#0D1B2A" : "#8899AA",
                    }}
                  >
                    {step.done ? "✓" : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="flex-1 h-0.5"
                      style={{
                        backgroundColor: step.done ? "#2ECC71" : "#1B3A5C",
                      }}
                    />
                  )}
                </div>
                <p
                  className="text-xs mt-1 text-center leading-tight"
                  style={{
                    color: step.active ? "#C9A84C" : step.done ? "#2ECC71" : "#8899AA",
                    fontSize: "10px",
                  }}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Driver card */}
      <div
        className="mx-6 mb-4 p-4 rounded-2xl flex items-center gap-4"
        style={{ backgroundColor: "#162535" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
          style={{ backgroundColor: "#1B3A5C" }}
        >
          🧑
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm">Ahmed Hassan</p>
          <p className="text-xs" style={{ color: "#8899AA" }}>⭐ 4.9 · CD-0042</p>
        </div>
        <Button
          onClick={() => {}}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ backgroundColor: "#1B3A5C", color: "#C9A84C" }}
        >
          <Phone size={14} />
          Call
        </Button>
      </div>

      {/* Order summary */}
      <div
        className="mx-6 mb-4 p-4 rounded-2xl"
        style={{ backgroundColor: "#162535" }}
      >
        <p className="text-sm font-semibold mb-3" style={{ color: "#8899AA" }}>Order Summary</p>
        <div className="flex justify-between mb-2">
          <span className="text-sm">Cash amount</span>
          <span className="font-bold text-sm" style={{ color: "#C9A84C" }}>AED 800.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm" style={{ color: "#8899AA" }}>Service fee</span>
          <span className="text-sm" style={{ color: "#8899AA" }}>AED 27.00</span>
        </div>
      </div>

      {/* Call driver button */}
      <div className="px-6 pb-8 mt-auto">
        <Button
          onClick={() => {}}
          className="w-full font-bold text-base py-6 rounded-xl"
          style={{ backgroundColor: "#162535", color: "#F0F4F8", border: "2px solid #1B3A5C" }}
        >
          📞 Call Driver
        </Button>
      </div>
    </div>
  );
};

export default LiveTracking;
