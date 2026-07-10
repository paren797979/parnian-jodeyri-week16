import { useEffect, useState } from "react";
import styles from "./CheckoutPage.module.css";
import { FaUser } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { getTourDuration } from "../../utils/tourDuration";
import { createOrderApi } from "../../services/https";
import { useRouter } from "next/router";

function CheckoutPage({ tourData, error, tourid }) {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [birthDateFocused, setBirthDateFocused] = useState(false);

  const [passengerInfo, setPassengerInfo] = useState({
    fullName: "",
    nationalCode: "",
    birthDate: "",
    gender: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPassengerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFinalSubmit = async () => {
    const { fullName, nationalCode, birthDate, gender } = passengerInfo;

    if (!fullName || !nationalCode || !birthDate || !gender) {
      alert("لطفاً تمامی فیلدهای مشخصات مسافر را پر کنید!");
      return;
    }

    if (!tourid) {
      alert("شناسه تور یافت نشد. لطفاً صفحه را دوباره بارگذاری کنید.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        tourId: tourid,
        fullName,
        nationalCode,
        birthDate,
        gender,
      };

      const response = await createOrderApi(payload);

      alert(response?.message || response?.data?.message || "خرید شما با موفقیت ثبت شد!");
      router.push("/profile/my-tours");
    } catch (err) {
      console.error("خطا در ثبت سفارش:", err);
      alert(err?.response?.data?.message || "خطایی در ثبت نهایی رخ داد.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error || !tourData) {
    return (
      <div className={styles.checkout_wrapper}>
        <p
          style={{
            textAlign: "center",
            color: "#e53e3e",
            padding: "40px",
            fontWeight: "bold",
          }}
        >
          {error || "سفری برای تسویه حساب یافت نشد."}
        </p>
      </div>
    );
  }

  const { startDate, endDate, title, price } = tourData || {};

  const formattedPrice = mounted
    ? Number(price || 0).toLocaleString("fa-IR")
    : "۰";

  const durationText =
    mounted && startDate && endDate
      ? getTourDuration(startDate, endDate)
      : "نامشخص";

  return (
    <section className={styles.checkout_section}>
       <div className={styles.checkout_wrapper}>
      <div className={styles.container}>
        <div className={styles.right_part}>
          <div className={styles.user_tourInfo}>
            <FaUser className={styles.user_icon} />
            <h2>مشخصات مسافر</h2>
          </div>

          <div className={styles.inputs}>
            <input
              type="text"
              name="fullName"
              placeholder="نام و نام خانوادگی"
              value={passengerInfo.fullName}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="nationalCode"
              placeholder="کد ملی"
              value={passengerInfo.nationalCode}
              onChange={handleInputChange}
            />

            <div className={styles.input_wrapper}>
              {!passengerInfo.birthDate && !birthDateFocused && (
                <div className={styles.fake_placeholder}>
                  <CiCalendarDate className={styles.placeholder_icon} />
                  <span>تاریخ</span>
                </div>
              )}

              <input
                type="text"
                name="birthDate"
                value={passengerInfo.birthDate}
                onChange={handleInputChange}
                onFocus={() => setBirthDateFocused(true)}
                onBlur={() => setBirthDateFocused(false)}
                className={styles.birth_input}
              />
            </div>

            <select
              name="gender"
              value={passengerInfo.gender}
              onChange={handleInputChange}
              className={styles.select_gender}
            >
              <option value="">جنسیت</option>
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </select>
          </div>
        </div>

        <div className={styles.left_part}>
          <div className={styles.tour_info}>
            <h3>{title || "بدون عنوان"}</h3>
            <span>{durationText}</span>
          </div>

          <div className={styles.final_price}>
            <p>قیمت نهایی</p>
            <span>{formattedPrice}<span>تومان</span></span>
          </div>

          <button
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
            className={styles.submit_btn}
          >
            {isSubmitting ? "در حال ثبت سفارش..." : "ثبت و خرید نهایی"}
          </button>
        </div>
      </div>
    </div>
    </section>
   
  );
}

export default CheckoutPage;
