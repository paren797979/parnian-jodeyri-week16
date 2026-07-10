import React from "react";
import styles from "./TourCard.module.css";
import Link from "next/link";

const formatPrice = (price) => {
  if (price === undefined || price === null || price === "") return "-";
  return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "-";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};

const TourCard = ({ tour }) => {
  if (!tour) return null;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={tour.image || "/images/default-tour.jpg"}
          alt={tour.title || "Tour"}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{tour.title}</h3>

        <div className={styles.details}>
          <p className={styles.route}>
            <span>{tour.origin?.name || "-"}</span> به{" "}
            <span>{tour.destination?.name || "-"}</span>
          </p>

          <p className={styles.date}>
            تاریخ: {formatDate(tour.startDate)}
          </p>
        </div>

        <div className={styles.footer}>
          <Link href={`/tours/${tour.id}`} className={styles.button}>
            رزرو
          </Link>

          <div className={styles.priceContainer}>
            <span className={styles.priceValue}>
              {formatPrice(tour.price)}
            </span>
            <span className={styles.currency}>تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
