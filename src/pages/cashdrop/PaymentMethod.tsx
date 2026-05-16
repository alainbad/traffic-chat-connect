import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const methods = [
  { id: "uaefts", label: "Bank Transfer (UAEFTS)", icon: "🏦" },
  { id: "mastercard", label: "Mastercard ••••4242", icon: "💳", default: true },
  { id: "applepay", label: "Apple Pay", icon: "🍎" },
  { id: "googlepay", label: "Google Pay", icon: "G" },
];

const PaymentMethod = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("mastercard");

  return (
    <div
      className="min-h-screen flex flex-col max-w-sm mx-auto"
      style={{ backgroundColor: "#0D1B2A", color: "#F0F4F8" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#162535" }}
        >
          <ArrowLeft size={18} style={{ color: "#F0F4F8" }} />
        </button>
        <h1 className="text-lg font-bold">Payment Method</h1>
      </div>

      {/* Methods list */}
      <div className="px-6 flex flex-col gap-3 flex-1">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            className="flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left"
            style={{
              backgroundColor: "#162535",
              borderColor: selected === m.id ? "#C9A84C" : "transparent",
            }}
          >
            <span className="text-2xl w-8 text-center">{m.icon}</span>
            <span className="flex-1 font-semibold text-sm">{m.label}</span>
            {selected === m.id && (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#C9A84C" }}
              >
                <Check size={14} style={{ color: "#0D1B2A" }} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Confirm */}
      <div className="px-6 pb-8 pt-4">
        <Button
          onClick={() => navigate(-1)}
          className="w-full font-bold text-base py-6"
          style={{ backgroundColor: "#C9A84C", color: "#0D1B2A" }}
        >
          Confirm Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;
