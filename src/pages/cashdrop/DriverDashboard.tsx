import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, DollarSign, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [online, setOnline] = useState(true);

  return (
    <div
      className="min-h-screen flex flex-col max-w-sm mx-auto"
      style={{ backgroundColor: "#0D1B2A", color: "#F0F4F8" }}
    >
      {/* Header */}
      <div
        className="px-6 pt-8 pb-5"
        style={{ backgroundColor: "#162535" }}
      >
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-xs font-semibold tracking-widest" style={{ color: "#C9A84C" }}>
              CASH DROP DRIVER
            </p>
            <h2 className="text-lg font-bold mt-0.5">Ahmed Hassan · CD-0042</h2>
          </div>
          <button
            onClick={() => setOnline((o) => !o)}
            className="flex flex-col items-center gap-1"
          >
            <div
              className="w-14 h-7 rounded-full flex items-center px-1 transition-all"
              style={{ backgroundColor: online ? "#2ECC71" : "#1B3A5C" }}
            >
              <div
                className="w-5 h-5 rounded-full transition-all"
                style={{
                  backgroundColor: "#F0F4F8",
                  transform: online ? "translateX(28px)" : "translateX(0)",
                }}
              />
            </div>
            <span
              className="text-xs font-bold"
              style={{ color: online ? "#2ECC71" : "#8899AA" }}
            >
              {online ? "ONLINE" : "OFFLINE"}
            </span>
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: online ? "#2ECC71" : "#8899AA" }}
          />
          <span className="text-xs" style={{ color: online ? "#2ECC71" : "#8899AA" }}>
            {online ? "Available for deliveries" : "Not accepting orders"}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-5 grid grid-cols-3 gap-3">
        {[
          { label: "Deliveries", value: "12", icon: "📦" },
          { label: "Float left", value: "AED 4,650", icon: "💵" },
          { label: "Avg time", value: "22 min", icon: "⏱" },
        ].map(({ label, value, icon }) => (
          <div
            key={label}
            className="rounded-xl p-3 flex flex-col items-center gap-1 text-center"
            style={{ backgroundColor: "#162535" }}
          >
            <span className="text-xl">{icon}</span>
            <p className="text-sm font-black" style={{ color: "#C9A84C" }}>{value}</p>
            <p className="text-xs leading-tight" style={{ color: "#8899AA" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* New order card */}
      <div className="px-6 flex-1">
        <p className="text-sm font-semibold mb-3" style={{ color: "#8899AA" }}>New Order</p>
        <div
          className="rounded-2xl p-5 border-2"
          style={{ backgroundColor: "#162535", borderColor: "#C9A84C" }}
        >
          {/* Order header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xl font-black" style={{ color: "#C9A84C" }}>AED 800 → 1.2 km</p>
              <p className="text-sm mt-0.5" style={{ color: "#8899AA" }}>Villa 24, Dubai Marina</p>
            </div>
            <div
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: "#C9A84C22", color: "#C9A84C" }}
            >
              NEW
            </div>
          </div>

          {/* Fee */}
          <div
            className="flex items-center justify-between p-3 rounded-xl mb-4"
            style={{ backgroundColor: "#1E3245" }}
          >
            <span className="text-sm" style={{ color: "#8899AA" }}>Your earnings</span>
            <span className="font-bold text-sm" style={{ color: "#2ECC71" }}>AED 22.00</span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/driver/delivery")}
              className="flex-1 font-bold py-5 text-sm"
              style={{ backgroundColor: "#2ECC71", color: "#0D1B2A" }}
            >
              ✓ Accept Order
            </Button>
            <Button
              variant="outline"
              className="flex-1 font-bold py-5 text-sm border-2"
              style={{ borderColor: "#E74C3C", color: "#E74C3C", backgroundColor: "transparent" }}
            >
              ✗ Decline
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div
        className="flex justify-around items-center px-4 py-4 mt-6 border-t"
        style={{ backgroundColor: "#162535", borderColor: "#1B3A5C" }}
      >
        {[
          { icon: Package, label: "Orders", active: true, path: "/driver" },
          { icon: DollarSign, label: "Float", active: false, path: "/driver" },
          { icon: User, label: "Profile", active: false, path: "/driver" },
        ].map(({ icon: Icon, label, active, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-1"
          >
            <Icon size={22} style={{ color: active ? "#C9A84C" : "#8899AA" }} />
            <span className="text-xs" style={{ color: active ? "#C9A84C" : "#8899AA" }}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DriverDashboard;
