import styles from "./Anvantages.module.css";

export default function Advantages() {
  return (
    <section className={styles.advantagesSection}>
      <div className={styles.container}>
        <div className={styles.positives}>
          <img src="/positive.png" alt="بصرفه ترین قیمت" className={styles.icon} />
          <div className={styles.textBox}>
            <h3>بصرفه ترین قیمت</h3>
            <p>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</p>
          </div>
        </div>

        <div className={styles.positives}>
          <img src="/positive3.png" alt="پشتیبانی" className={styles.icon} />
          <div className={styles.textBox}>
            <h3>پشتیبانی</h3>
            <p>پشتیبانی و همراهی ۲۴ ساعته در تمامی مراحل سفر شما.</p>
          </div>
        </div>

        <div className={styles.positives}>
          <img src="/positive2.png" alt="رضایت کاربران" className={styles.icon} />
          <div className={styles.textBox}>
            <h3>رضایت کاربران</h3>
            <p>رضایت بیش از ۱۰ هزار کاربر از خدمات تورینو.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
