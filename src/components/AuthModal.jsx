import { useRef, useState } from "react";
import { toast } from "react-toastify";
import styles from "./Auth.module.css";
import { sendOtp, checkOtp } from "../services/https";

export default function AuthModal({ onClose, onSuccess }) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  const handleBackToMobileStep = () => {
    setStep(1);
    setOtp(["", "", "", "", "", ""]);
  };

  const handleSendOtp = async () => {
    try {
      if (!/^09\d{9}$/.test(mobile)) {
        toast.warning("شماره موبایل معتبر نیست");
        return;
      }

      setLoading(true);
      const res = await sendOtp(mobile);

      toast.success(res?.message || "کد تایید ارسال شد");

      if (res?.code) {
        toast.info(`کد تست: ${res.code}`, {
          autoClose: 5000,
        });
      }

      setStep(2);
    } catch (err) {
      toast.error(err?.response?.data?.message || "خطا در ارسال کد");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      const code = otp.join("").trim();

      if (code.length !== 6) {
        toast.warning("کد باید ۶ رقم باشد");
        return;
      }

      setLoading(true);
      const res = await checkOtp(mobile, code);

      const userData = res?.user || { mobile };

      localStorage.setItem("user", JSON.stringify(userData));

      if (res?.accessToken) {
        localStorage.setItem("accessToken", res.accessToken);
      }

      if (res?.refreshToken) {
        localStorage.setItem("refreshToken", res.refreshToken);
      }

      toast.success("ورود با موفقیت انجام شد");

      if (onSuccess) onSuccess(userData);
      if (onClose) onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "خطا در تایید کد");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      {step === 1 ? (
        <div className={styles.modal}>
          <button className={styles.closeModal} onClick={onClose}>
            ×
          </button>

          <h3>ورود به تورینو</h3>
          <p>شماره موبایل خود را وارد کنید</p>

          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="09123456789"
            maxLength={11}
          />

          <button onClick={handleSendOtp} disabled={loading}>
            {loading ? "در حال ارسال..." : "ارسال کد تایید"}
          </button>
        </div>
      ) : (
        <div className={styles.message_modal}>
          <button
            className={styles.closeModal}
            onClick={handleBackToMobileStep}
          >
            ←
          </button>

          <h3>کد تایید را وارد کنید</h3>
          <p>کد ارسال شده به شماره {mobile} را وارد کنید</p>

          <div className={styles.otpContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <button onClick={handleVerify} disabled={loading}>
            {loading ? "در حال تایید..." : "تایید و ورود"}
          </button>
        </div>
      )}
    </div>
  );
}
