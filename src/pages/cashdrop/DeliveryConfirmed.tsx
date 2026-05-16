import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DeliveryConfirmed = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between py-10 px-6 max-w-sm mx-auto"
      style={{ backgroundColor: "#0D1B2A", color: "#F0F4F8" }}
    >
      {/* Top section */}
      <div className="flex flex-col items-center gap-4 mt-6">
        {/* Animated checkmark */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center cd-scale-in"
          style={{ backgroundColor: "#2ECC7122", border: "3px solid #2ECC71" }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
              d="M10 24L20 34L38 14"
              stroke="#2ECC71"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="100"
              strokeDashoffset="0"
              style={{
                animation: "check-draw 0.6s ease-out 0.2s both",
              }}
            />
          </svg>
        </div>

        <h1 className="text-2xl font-black">Cash Delivered!</h1>
        <p className="text-sm text-center" style={{ color: "#8899AA" }}>
          Your cash has been successfully delivered.
        </p>
      </div>

      {/* Receipt card */}
      <div
        className="w-full rounded-2xl p-5"
        style={{ backgroundColor: "#162535" }}
      >
        <p className="text-sm font-semibold mb-4" style={{ color: "#8899AA" }}>Receipt</p>

        {[
          { label: "Amount delivered", value: "AED 800.00", highlight: true },
          { label: "Service fee", value: "AED 27.00", highlight: false },
          { label: "Delivery time", value: "22 minutes", highlight: false },
          { label: "Driver", value: "Ahmed Hassan", highlight: false },
        ].map(({ label, value, highlight }) => (
          <div key={label} className="flex justify-between py-2 border-b last:border-0" style={{ borderColor: "#1B3A5C" }}>
            <span className="text-sm" style={{ color: "#8899AA" }}>{label}</span>
            <span
              className="text-sm font-bold"
              style={{ color: highlight ? "#C9A84C" : "#F0F4F8" }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Rating */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium" style={{ color: "#8899AA" }}>Rate your experience</p>
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="text-3xl transition-transform active:scale-110"
              style={{ opacity: star <= rating ? 1 : 0.3 }}
            >
              ⭐
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-xs" style={{ color: "#2ECC71" }}>
            {rating === 5 ? "Excellent!" : rating >= 4 ? "Great!" : rating >= 3 ? "Good" : "Thanks for feedback"}
          </p>
        )}
      </div>

      {/* Done button */}
      <Button
        onClick={() => navigate("/home")}
        className="w-full font-bold text-base py-6"
        style={{ backgroundColor: "#C9A84C", color: "#0D1B2A" }}
      >
        Done
      </Button>
    </div>
  );
};

export default DeliveryConfirmed;
