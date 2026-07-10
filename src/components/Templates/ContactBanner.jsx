import styles from "./ContactBanner.module.css";
import { FiPhone } from "react-icons/fi";

function ContactBanner() {
  return (
    <div className={styles.container}>
      <div className={styles.phone_shopping}>
        <div className={styles.titles}>
          <p>خرید تلفنی از <span className={styles.text1}>تورینو</span></p>
          <span className={styles.text2}>به هرکجا که میخواهید!</span>
        </div>
        <img src="/cartoonimg.png" alt="cartoon" className={styles.cartoonImg} />
      </div>
      
      <div className={styles.more_info}>
        <div className={styles.phone_number}>
          <span>۰۲۱-۱۸۴۰</span>
          <FiPhone />
        </div>
        <button>اطلاعات بیشتر</button>
      </div>
    </div>
  );
}

export default ContactBanner;
