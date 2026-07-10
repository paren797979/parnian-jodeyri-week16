import React from "react";
import styles from "./MyTours.module.css";

import {
  getPersianCity,
  toPersianDate,
  getPersianVehicle,
  getTourStatus,
  toPersianNumber,
} from "../../../utils/faMappings";

import { FaPlane, FaBus, FaShip, FaTrain, FaRegSun } from "react-icons/fa";

function MyTours({ tours }) {
  if (!tours || tours.length === 0) {
    return (
      <div className={styles.emptyBox}>
        <p>هنوز هیچ توری خریداری نکرده‌اید.</p>
      </div>
    );
  }

  return (
    <div className={styles.myTours}>
      {tours.map((tour, index) => (
        <TourCard key={tour.id || tour._id || index} tour={tour} />
      ))}
    </div>
  );
}

function TourCard({ tour }) {
  const title = tour.title || tour.tourTitle || "تور اقلیم کردستان";

  const origin = getPersianCity(tour.origin?.name || tour.origin || "tehran");
  const destination = getPersianCity(
    tour.destination?.name || tour.destination || "sulaymaniyah"
  );

  const rawStartDate = tour.startDate || tour.start_date || tour.date?.start;
  const rawEndDate = tour.endDate || tour.end_date || tour.date?.end;

  const startDate = toPersianDate(rawStartDate);
  const endDate = toPersianDate(rawEndDate);

  const price = tour.price || tour.paidAmount || tour.amount || 18000000;


  const rawTourNumber = tour.tourNumber || tour.orderNumber || "";
  const hasValidNumber = rawTourNumber && !/[a-zA-Z]/.test(rawTourNumber);
  const displayTourNumber = hasValidNumber ? rawTourNumber : "۱۰۲۰۹۵۴۰۴"; 

  const vehicle = getPersianVehicle(
    tour.vehicle || tour.fleetVehicle || tour.travelType || "plane"
  );

  const status = getTourStatus(rawStartDate, rawEndDate);

  const statusClass =
    status === "به اتمام رسیده"
      ? styles.finished
      : status === "در حال برگزاری"
      ? styles.running
      : styles.pending;

  return (
    
    <div className={styles.card}>
      <span className={`${styles.status} ${statusClass}`}>{status}</span>

      <div className={styles.topSection}>
        <div className={styles.tourTitle}>
          <FaRegSun />
          <h3>{title}</h3>
        </div>

        <div className={styles.vehicle}>
          {getVehicleIcon(vehicle)}
          <span>سفر با {vehicle}</span>
        </div>
      </div>

      <div className={styles.routeSection}>
        <p>
          <strong>
            {origin} به {destination}
          </strong>
          <span> . </span>
          {startDate}
        </p>

        <p>
          <strong>تاریخ برگشت</strong>
          <span> . </span>
          {endDate}
        </p>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.infoItem}>
          <span>شماره تور</span>
          <strong>{toPersianNumber(String(displayTourNumber))}</strong>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.infoItem}>
          <span>مبلغ پرداخت شده</span>
          <strong>
            {Number(price).toLocaleString("fa-IR")}
            <small> تومان</small>
          </strong>
        </div>
      </div>
    </div>
  );
}

function getVehicleIcon(vehicleFa) {
  const v = String(vehicleFa);
  if (v.includes("هواپیما")) return <FaPlane />;
  if (v.includes("اتوبوس")) return <FaBus />;
  if (v.includes("کشتی")) return <FaShip />;
  if (v.includes("قطار")) return <FaTrain />;
  return <FaPlane />;
}

export default MyTours;
