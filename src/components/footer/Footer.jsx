import Link from "next/link"
import styles from "./Footer.module.css"

function Footer() {
  return (
   <div className={styles.container}>
    <div className={styles.border}>
      <div className={styles.right_part}>
      <div className={styles.first_part}>
      <h3>تورینو</h3>
      <ul>
        <li>درباره ما</li>
        <li>تماس با ما</li>
        <li>چرا تورینو</li>
        <li>بیمه مسافرتی</li>
       
      </ul>
    </div>
    <div className={styles.second_part}>
      <h3>خدمات مشتریان</h3>
      <ul>
        <li>پشتیبانی آنلاین</li>
        <li>راهنمای خرید</li>
        <li>راهنمای استرداد</li>
        <li>پرسش و پاسخ</li>
      </ul>
    </div>
      </div>

      <div className={styles.left_part}>
        <div className={styles.top_part}>
          <img src="/torinoLogo.png"/>
          <div className={styles.supporting_number}>
            <span>تلفن پشتیبانی :  </span>
            <span>021-8574</span>
          </div>
        </div>
        <div className={styles.bottom_part}>
       <img src="/footer1.png" alt="footer logo" />
       <img src="/footer2.png" alt="footer logo" />
       <img src="/footer3.jpg" alt="footer logo" />
       <img src="/footer4.png" alt="footer logo" />
       <img src="/footer5.png" alt="footer logo" />
          
        </div>
      </div>
    </div>
   <section className={styles.footer_final__part}>
    <p>کلیه حقوق این وب سایت متعلق به تورینو میباشد.</p>
   </section>
   </div>
  )
}

export default Footer