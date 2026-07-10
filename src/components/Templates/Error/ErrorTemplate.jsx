import Link from "next/link";
import styles from "./Error.module.css";

function ErrorTemplate({ title, subTitle, image, buttonText }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={image} alt="error illustration" className={styles.errorImg} />
      </div>
      
      <div className={styles.contentSection}>
        <h2 className={styles.title}>{title}</h2>
        {subTitle ? (
          <p className={styles.subTitle}>{subTitle}</p>
        ) : (
          <Link href="/" className={styles.backBtn}>
            {buttonText || "بازگشت به صفحه اصلی"}
          </Link>
        )}
      </div>
    </div>
  );
}

export default ErrorTemplate;
