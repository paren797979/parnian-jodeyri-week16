import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.css"; 
import { FaUser } from "react-icons/fa";
import { FaSuitcaseRolling, FaArrowRightArrowLeft } from "react-icons/fa6";


export default function Sidebar({ activeTab }) {
  const router = useRouter();

  const handleLogout = () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.userInfo}>
        <FaUser/>
        <span className={styles.userName}>پروفایل من</span>
      </div>

      <nav className={styles.menu}>
        <Link href="/profile/my-tours" >
          <FaArrowRightArrowLeft/>
          <span> تورهای من</span>
        </Link>

         <Link 
          href="/profile/transactions" 
        >
          <FaSuitcaseRolling/>
          <span>تراکنش ها</span>
        </Link>

       
      </nav>
    </div>
  );
}
