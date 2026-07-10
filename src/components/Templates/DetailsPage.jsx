import { useState, useEffect } from "react";
import styles from "./DetailsPage.module.css";
import { getTourDuration } from "@/utils/tourDuration";
import { MdDateRange } from "react-icons/md";
import { FaBus, FaUser, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { addToBasketApi } from "@/services/https";

function DetailsPage(props) {
  const router = useRouter();
  const tourid = props?.id || props?._id || props?.tourid || router.query?.tourid;

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tourData, setTourData] = useState(props || {});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (props && Object.keys(props).length > 0) {
      setTourData(props);
    }
  }, [props]);

  const {
    startDate,
    endDate,
    title,
    fleetVehicle,
    price,
    capacity,
    image,
    options,
    insurance,
  } = tourData || {};

  const formatPrice = (value) => {
    if (!value) return "۰";
    if (!mounted) return String(value);
    return Number(value).toLocaleString("fa-IR");
  };

  const formatDate = (date) => {
    if (!mounted || !date) return "-";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "-";
    return parsedDate.toLocaleDateString("fa-IR");
  };

  const handleReserve = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      router.push("/");
      return;
    }

    if (!tourid) {
      alert("مشخصات تور به درستی یافت نشد.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await addToBasketApi(tourid);

      alert(response?.data?.message || "تور با موفقیت برای خرید انتخاب شد.");
      router.push(`/checkout/${tourid}`);
    } catch (error) {
      console.error("خطا در رزرو تور:", error);

      if (error.response?.status === 401) {
        alert("نشست کاربری شما منقضی شده است. لطفاً دوباره وارد شوید.");
        router.push("/");
      } else {
        alert(error.response?.data?.message || "خطایی در رزرو تور رخ داد.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!title) {
    return (
      <div className={styles.tour_container}>
        <p className={styles.loading_text}>در حال بارگذاری اطلاعات تور...</p>
      </div>
    );
  }

  return (
    <div className={styles.tour_container}>
      <div className={styles.container}>
        <div className={styles.top_section}>
          <div className={styles.tour_img}>
            <img src={image || "/images/default-tour.jpg"} alt={title} />
          </div>

          <div className={styles.tour_main_info}>
            <div className={styles.title_row}>
              <h1>{title}</h1>
              <span className={styles.duration}>
                {mounted && startDate && endDate
                  ? getTourDuration(startDate, endDate)
                  : "..."}
              </span>
            </div>

            <div className={styles.features_list}>
              {Array.isArray(options) && options.length > 0 ? (
                options.map((item, index) => (
                  <div className={styles.feature_item} key={`${item}-${index}`}>
                    <FaCheckCircle />
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <div className={styles.feature_item}>
                  <FaCheckCircle />
                  <span>امکاناتی ثبت نشده است</span>
                </div>
              )}
            </div>

            <div className={styles.booking_row}>
              <div className={styles.price_box}>
                <span className={styles.amount}>{formatPrice(price)}</span>
                <span className={styles.currency}>تومان</span>
              </div>

              <button
                type="button"
                className={styles.buy_btn}
                onClick={handleReserve}
                disabled={isSubmitting}
              >
                {isSubmitting ? "در حال رزرو..." : "رزرو و خرید"}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.details_grid}>
          <div className={styles.detail_box}>
            <div className={styles.detail_icon}>
              <MdDateRange />
            </div>
            <div className={styles.detail_text}>
              <p>تاریخ رفت</p>
              <span>{formatDate(startDate)}</span>
            </div>
          </div>

          <div className={styles.detail_box}>
            <div className={styles.detail_icon}>
              <MdDateRange />
            </div>
            <div className={styles.detail_text}>
              <p>تاریخ برگشت</p>
              <span>{formatDate(endDate)}</span>
            </div>
          </div>

          <div className={styles.detail_box}>
            <div className={styles.detail_icon}>
              <FaBus />
            </div>
            <div className={styles.detail_text}>
              <p>حمل و نقل</p>
              <span>{fleetVehicle || "-"}</span>
            </div>
          </div>

          <div className={styles.detail_box}>
            <div className={styles.detail_icon}>
              <FaUser />
            </div>
            <div className={styles.detail_text}>
              <p>ظرفیت</p>
              <span>{capacity ? `${capacity} نفر` : "-"}</span>
            </div>
          </div>

          <div className={styles.detail_box}>
            <div className={styles.detail_icon}>
              <FaUser />
            </div>
            <div className={styles.detail_text}>
              <p>صندلی خالی</p>
              <span>{tourData?.availableSeats ?? "-"}</span>
            </div>
          </div>

          <div className={styles.detail_box}>
            <div className={styles.detail_icon}>
              <FaShieldAlt />
            </div>
            <div className={styles.detail_text}>
              <p>بیمه</p>
              <span>{insurance ? "دارد" : "ندارد"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
