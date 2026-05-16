import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignIn = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOtp = () => {
    if (phone.length >= 7) {
      setOtpSent(true);
    }
  };

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

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 6) {
      navigate("/home");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 max-w-sm mx-auto"
      style={{ backgroundColor: "#0D1B2A" }}
    >
      {/* Logo */}
      <h1 className="text-3xl font-black tracking-widest mb-2" style={{ color: "#C9A84C" }}>
        CASH DROP
      </h1>
      <p className="text-sm mb-8" style={{ color: "#8899AA" }}>
        Sign in to your account
      </p>

      {/* Card */}
      <div
        className="w-full rounded-2xl p-6 flex flex-col gap-5"
        style={{ backgroundColor: "#162535" }}
      >
        {/* Phone input */}
        <div>
          <label className="text-sm font-medium mb-2 block" style={{ color: "#8899AA" }}>
            Mobile Number
          </label>
          <div className="flex gap-2">
            <div
              className="flex items-center px-3 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#1B3A5C", color: "#F0F4F8", minWidth: "60px" }}
            >
              +971
            </div>
            <Input
              type="tel"
              placeholder="50 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 border-0 text-base"
              style={{ backgroundColor: "#1E3245", color: "#F0F4F8" }}
            />
          </div>
        </div>

        {/* Send OTP */}
        {!otpSent ? (
          <Button
            onClick={handleSendOtp}
            className="w-full font-bold py-5"
            style={{ backgroundColor: "#C9A84C", color: "#0D1B2A" }}
          >
            Send OTP
          </Button>
        ) : (
          <>
            {/* OTP inputs */}
            <div>
              <label className="text-sm font-medium mb-3 block" style={{ color: "#8899AA" }}>
                Enter 6-digit OTP
              </label>
              <div className="flex gap-2 justify-between">
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
            </div>
            <Button
              onClick={handleVerify}
              className="w-full font-bold py-5"
              style={{ backgroundColor: "#C9A84C", color: "#0D1B2A" }}
            >
              Verify & Sign In
            </Button>
          </>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: "#1B3A5C" }} />
          <span className="text-xs" style={{ color: "#8899AA" }}>or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#1B3A5C" }} />
        </div>

        {/* UAE Pass */}
        <Button
          variant="outline"
          className="w-full font-semibold py-5 border-2"
          style={{ borderColor: "#1B3A5C", color: "#F0F4F8", backgroundColor: "transparent" }}
          onClick={() => navigate("/home")}
        >
          🇦🇪 Sign in with UAE Pass
        </Button>
      </div>

      {/* Create account */}
      <p className="text-sm mt-6" style={{ color: "#8899AA" }}>
        New to Cash Drop?{" "}
        <span className="font-semibold cursor-pointer" style={{ color: "#C9A84C" }}>
          Create account
        </span>
      </p>
    </div>
  );
};

export default SignIn;
