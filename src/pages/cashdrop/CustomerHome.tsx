import { useNavigate } from "react-router-dom";
import { Bell, Home, Clock, User } from "lucide-react";

const quickAmounts = [200, 500, 800, 1000];

const recentDeliveries = [
  { id: 1, amount: 800, time: "Today 2:30 PM", status: "Delivered" },
  { id: 2, amount: 500, time: "Yesterday", status: "Delivered" },
];

const CustomerHome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col max-w-sm mx-auto"
      style={{ backgroundColor: "#0D1B2A", color: "#F0F4F8" }}
    >
      {/* Status bar */}
      <div className="flex justify-between items-center px-6 pt-4 pb-1 text-xs" style={{ color: "#8899AA" }}>
        <span className="font-semibold">9:41</span>
        <div className="flex gap-1 items-center">
          <span>▂▄▆</span>
          <span>WiFi</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <p className="text-sm" style={{ color: "#8899AA" }}>Good evening 👋</p>
          <h2 className="text-lg font-bold" style={{ color: "#F0F4F8" }}>Mohammed Al Rashid</h2>
        </div>
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center relative"
          style={{ backgroundColor: "#162535" }}
        >
          <Bell size={20} style={{ color: "#C9A84C" }} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: "#E74C3C" }}
          />
        </button>
      </div>

      {/* Hero card */}
      <div className="px-6 mb-5">
        <button
          onClick={() => navigate("/request")}
          className="w-full rounded-2xl p-5 text-left border-2 transition-all active:scale-95"
          style={{ backgroundColor: "#162535", borderColor: "#C9A84C" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">💵</span>
            <span
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{ backgroundColor: "#C9A84C22", color: "#C9A84C" }}
            >
              INSTANT
            </span>
          </div>
          <h3 className="text-xl font-bold mb-1" style={{ color: "#F0F4F8" }}>Request Cash</h3>
          <p className="text-sm" style={{ color: "#8899AA" }}>Up to AED 5,000 at your door</p>
          <div
            className="mt-4 w-full py-2 rounded-xl text-center text-sm font-bold"
            style={{ backgroundColor: "#C9A84C", color: "#0D1B2A" }}
          >
            Request Now →
          </div>
        </button>
      </div>

      {/* Quick amounts */}
      <div className="px-6 mb-6">
        <p className="text-sm font-medium mb-3" style={{ color: "#8899AA" }}>Quick Request</p>
        <div className="grid grid-cols-4 gap-2">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => navigate(`/request?amount=${amt}`)}
              className="py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
              style={{ backgroundColor: "#1B3A5C", color: "#C9A84C" }}
            >
              {amt}
            </button>
          ))}
        </div>
        <p className="text-xs text-center mt-1" style={{ color: "#8899AA" }}>AED</p>
      </div>

      {/* Recent deliveries */}
      <div className="px-6 flex-1">
        <p className="text-sm font-medium mb-3" style={{ color: "#8899AA" }}>Recent Deliveries</p>
        <div className="flex flex-col gap-3">
          {recentDeliveries.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between p-4 rounded-xl"
              style={{ backgroundColor: "#162535" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-base"
                  style={{ backgroundColor: "#1E3245" }}
                >
                  💵
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#F0F4F8" }}>
                    AED {d.amount}
                  </p>
                  <p className="text-xs" style={{ color: "#8899AA" }}>{d.time}</p>
                </div>
              </div>
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{ backgroundColor: "#2ECC7122", color: "#2ECC71" }}
              >
                {d.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div
        className="flex justify-around items-center px-4 py-4 mt-6 border-t"
        style={{ backgroundColor: "#162535", borderColor: "#1B3A5C" }}
      >
        {[
          { icon: Home, label: "Home", active: true, path: "/home" },
          { icon: Clock, label: "History", active: false, path: "/home" },
          { icon: User, label: "Profile", active: false, path: "/home" },
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

export default CustomerHome;
