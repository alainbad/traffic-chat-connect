import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const DriverDelivery = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [idVerified, setIdVerified] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const otpFull = otp.join("").length === 6;

  const handleConfirm = () => {
    if (otpFull) {
      navigate("/driver");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col max-w-sm mx-auto"
      style={{ backgroundColor: "#0D1B2A", color: "#F0F4F8" }}
    >
      {/* Header */}
      <div
        className="px-6 pt-6 pb-4"
        style={{ backgroundColor: "#162535" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#1E3245" }}
          >
            <ArrowLeft size={18} style={{ color: "#F0F4F8" }} />
          </button>
          <div>
            <h1 className="text-base font-bold">3 min away · 0.4 km</h1>
            <p className="text-xs" style={{ color: "#2ECC71" }}>● En route</p>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div
        className="mx-6 my-4 rounded-2xl flex flex-col items-center justify-center"
        style={{ backgroundColor: "#162535", height: "180px" }}
      >
        <span className="text-4xl mb-2">🗺️</span>
        <p className="text-sm font-semibold" style={{ color: "#8899AA" }}>Navigation Map</p>
        <p className="text-xs mt-1" style={{ color: "#C9A84C" }}>Dubai Marina · 0.4 km</p>
      </div>

      {/* Destination */}
      <div
        className="mx-6 mb-4 p-4 rounded-xl flex items-center gap-3"
        style={{ backgroundColor: "#162535" }}
      >
        <span className="text-2xl">📍</span>
        <div>
          <p className="text-xs" style={{ color: "#8899AA" }}>Destination</p>
          <p className="font-bold text-sm">Villa 24, Dubai Marina</p>
          <p className="text-xs mt-0.5" style={{ color: "#8899AA" }}>
            Deliver AED 800 to Mohammed Al Rashid
          </p>
        </div>
      </div>

      {/* Verify ID */}
      <div className="px-6 mb-4">
        <Button
          onClick={() => setIdVerified(true)}
          className="w-full font-semibold py-5 rounded-xl border-2 transition-all"
          style={{
            backgroundColor: idVerified ? "#2ECC7122" : "transparent",
            borderColor: idVerified ? "#2ECC71" : "#1B3A5C",
            color: idVerified ? "#2ECC71" : "#F0F4F8",
          }}
        >
          {idVerified ? "✓ ID Verified" : "📷 Verify Customer ID"}
        </Button>
      </div>

      {/* OTP input */}
      <div
        className="mx-6 mb-4 p-4 rounded-2xl"
        style={{ backgroundColor: "#162535" }}
      >
        <p className="text-sm font-semibold mb-1" style={{ color: "#F0F4F8" }}>
          💰 Confirm Cash: Enter Customer OTP
        </p>
        <p className="text-xs mb-4" style={{ color: "#8899AA" }}>
          Ask the customer for their 6-digit delivery OTP
        </p>
        <div className="flex gap-2 justify-between mb-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { otpRefs.current[i] = el; }}
              type="tel"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(i, e)}
              className="w-11 h-12 text-center text-lg font-bold rounded-lg border-2 outline-none transition-all"
              style={{
                backgroundColor: "#1E3245",
                color: "#F0F4F8",
                borderColor: digit ? "#C9A84C" : "#1B3A5C",
              }}
            />
          ))}
        </div>
        <Button
          onClick={handleConfirm}
          disabled={!otpFull}
          className="w-full font-bold py-5 disabled:opacity-40"
          style={{ backgroundColor: "#C9A84C", color: "#0D1B2A" }}
        >
          Confirm Delivery
        </Button>
      </div>

      {/* Panic button */}
      <div className="px-6 pb-8 mt-auto">
        <Button
          variant="outline"
          className="w-full font-bold py-5 border-2 rounded-xl"
          style={{ borderColor: "#E74C3C", color: "#E74C3C", backgroundColor: "transparent" }}
        >
          🚨 Panic
        </Button>
      </div>
    </div>
  );
};

export default DriverDelivery;
