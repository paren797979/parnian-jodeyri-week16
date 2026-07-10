import TourCard from "../Module/TourCard";
import styles from "./TourCards.module.css";

function TourCards({ data = [] }) {
  return (
    <div className={styles.container}>
      <h2>همه تور ها</h2>

      <div className={styles.toursSection}>
        {data && data.length > 0 ? (
          <div className={styles.toursGrid}>
            {data.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className={styles.noData}>
            <p>در حال حاضر توری برای نمایش وجود ندارد.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TourCards;
