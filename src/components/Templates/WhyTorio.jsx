import { useState } from "react";
import styles from "./WhyTorino.module.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const whyTorinoData = [
  {
    id: 1,
    title: "پشتیبانی 24 ساعته",
    text: "اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و تاریخی را خریداری کنید.",
    image: "/1.jpg",
  },
  {
    id: 2,
    title: "تورهای متنوع",
    text: "اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و تاریخی را خریداری کنید.",
    image: "/2.jpg",
  },
  {
    id: 3,
    title: "قیمت مناسب",
    text: "اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و تاریخی را خریداری کنید.",
    image: "/3.jpg",
  },
  {
    id: 4,
    title: "رزرو آسان",
    text: "اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و تاریخی را خریداری کنید.",
    image: "/4.jpg",
  },
];

export default function WhyTorino() {
  const [activeIndex, setActiveIndex] = useState(0);

  const getCardStyle = (index) => {
    const diff = (index - activeIndex + whyTorinoData.length) % whyTorinoData.length;

    return {
      zIndex: whyTorinoData.length - diff,
    };
  };

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <div>؟</div>
        <h2>
          چرا <span>تورینو</span>؟
        </h2>
      </div>

      <div className={styles.content}>
        <div className={styles.carouselContainer}>
          <div className={styles.imageBox}>
            {whyTorinoData.map((item, index) => {
              const diff =
                (index - activeIndex + whyTorinoData.length) %
                whyTorinoData.length;

              return (
                <img
                  key={item.id}
                  className={styles.image}
                  src={item.image}
                  alt={item.title}
                  style={getCardStyle(index)}
                  data-diff={diff}
                />
              );
            })}
          </div>

          <div className={styles.controlsWrapper}>
            <button
              className={styles.arrowBtn}
              onClick={() =>
                setActiveIndex(
                  (prev) =>
                    (prev - 1 + whyTorinoData.length) % whyTorinoData.length
                )
              }
            >
              <FaArrowLeft />
            </button>

            <div className={styles.counter}>
              {activeIndex + 1} / {whyTorinoData.length}
            </div>

            <button
              className={styles.arrowBtn}
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % whyTorinoData.length)
              }
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        <div className={styles.textBox}>
          <h3 className={styles.cardTitle}>
            {whyTorinoData[activeIndex].title}
          </h3>
          <p className={styles.cardText}>
            {whyTorinoData[activeIndex].text}
          </p>
        </div>
      </div>
    </section>
  );
}
