import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

const RequestCash = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const preselected = searchParams.get("amount");
    if (preselected) setAmount(preselected);
  }, [searchParams]);

  const handleKey = (key: string) => {
    if (key === "⌫") {
      setAmount((prev) => prev.slice(0, -1));
    } else if (key === "") {
      return;
    } else {
      const next = amount + key;
      if (parseInt(next) <= 5000) {
        setAmount(next);
      }
    }
  };

  const numAmount = parseInt(amount) || 0;
  const fee = numAmount > 0 ? Math.round(numAmount * 0.034) : 0;
  const isValid = numAmount >= 100 && numAmount <= 5000;

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
        <h1 className="text-lg font-bold">Request Cash</h1>
      </div>

      {/* Amount display */}
      <div className="flex flex-col items-center py-8 px-6">
        <p className="text-sm mb-2" style={{ color: "#8899AA" }}>Enter amount</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold" style={{ color: "#8899AA" }}>AED</span>
          <span
            className="text-6xl font-black tracking-tight"
            style={{ color: amount ? "#C9A84C" : "#1B3A5C" }}
          >
            {amount || "0"}
          </span>
        </div>
        {fee > 0 && (
          <p className="text-sm mt-2" style={{ color: "#8899AA" }}>
            Fee: AED {fee}
          </p>
        )}
        {numAmount > 0 && numAmount < 100 && (
          <p className="text-xs mt-1" style={{ color: "#E74C3C" }}>Minimum AED 100</p>
        )}
        {numAmount > 5000 && (
          <p className="text-xs mt-1" style={{ color: "#E74C3C" }}>Maximum AED 5,000</p>
        )}
      </div>

      {/* Address & Payment rows */}
      <div className="px-6 flex flex-col gap-3 mb-5">
        <div
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{ backgroundColor: "#162535" }}
        >
          <MapPin size={18} style={{ color: "#C9A84C" }} />
          <div className="flex-1">
            <p className="text-xs" style={{ color: "#8899AA" }}>Delivery address</p>
            <p className="text-sm font-semibold">Villa 24, Dubai Marina</p>
          </div>
          <span className="text-xs" style={{ color: "#C9A84C" }}>Change</span>
        </div>
        <div
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{ backgroundColor: "#162535" }}
        >
          <CreditCard size={18} style={{ color: "#C9A84C" }} />
          <div className="flex-1">
            <p className="text-xs" style={{ color: "#8899AA" }}>Payment method</p>
            <p className="text-sm font-semibold">Mastercard ••••4242</p>
          </div>
          <span className="text-xs" style={{ color: "#C9A84C" }}>Change →</span>
        </div>
      </div>

      {/* Keypad */}
      <div className="px-6 grid grid-cols-3 gap-2 mb-5">
        {KEYS.map((key, i) => (
          <button
            key={i}
            onClick={() => handleKey(key)}
            disabled={key === ""}
            className="h-14 rounded-xl text-xl font-bold transition-all active:scale-95 disabled:opacity-0"
            style={{ backgroundColor: key === "⌫" ? "#1E3245" : "#162535", color: "#F0F4F8" }}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Confirm button */}
      <div className="px-6 pb-8">
        <Button
          onClick={() => navigate("/tracking")}
          disabled={!isValid}
          className="w-full font-bold text-base py-6 disabled:opacity-40"
          style={{ backgroundColor: "#C9A84C", color: "#0D1B2A" }}
        >
          Confirm & Request
        </Button>
      </div>
    </div>
  );
};

export default RequestCash;
