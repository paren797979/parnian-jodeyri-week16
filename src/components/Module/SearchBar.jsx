import { useState } from "react";
import { useRouter } from "next/router";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { BiWorld } from "react-icons/bi";
import styles from "./SearchBar.module.css";
import {
  CITY_MAP,
  origin_cities,
  destination_cities,
  normalizeCityForRoute,
} from "../../utils/faMappings";

export default function SearchBar() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const originOptions = origin_cities.map((key) => ({
    label: CITY_MAP[key],
    value: normalizeCityForRoute(key),
  }));

  const destinationOptions = destination_cities.map((key) => ({
    label: CITY_MAP[key],
    value: normalizeCityForRoute(key),
  }));

  const handleSearch = () => {
    if (from && to && date) {
      router.push(`/filter/${from}/${to}/${date}`);
    } else {
      alert("لطفاً تمامی فیلدها را پر کنید!");
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        <span>تورینو</span> برگزارکننده بهترین تورهای داخلی و خارجی
      </p>

      <div className={styles.main_boxes}>
        <div className={styles.input_wrapper}>
          <FiMapPin className={styles.icon} />
          <select
            className={styles.select_input}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">مبدا</option>
            {originOptions.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        <span className={styles.divider}></span>

        <div className={styles.input_wrapper}>
          <BiWorld className={styles.icon} />
          <select
            className={styles.select_input}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="">مقصد</option>
            {destinationOptions.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        <span className={styles.divider}></span>

        <div className={styles.input_wrapper}>
          <FiCalendar className={styles.icon} />
          <input
            type={isFocused || date ? "date" : "text"}
            placeholder="تاریخ"
            value={date}
            className={date ? styles.hasValue : ""}
            onChange={(e) => setDate(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        <button className={styles.search_button} onClick={handleSearch}>
          جستجو
        </button>
      </div>
    </div>
  );
}
