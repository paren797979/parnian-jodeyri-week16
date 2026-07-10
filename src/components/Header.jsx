import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./Header.module.css";
import AuthModal from "./AuthModal";
import {
  FaUser,
  FaChevronDown,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";

const Header = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);

    router.push("/");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.rightSection}>
            <button
              className={styles.hamburgerBtn}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              type="button"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className={styles.logo}>
              <Link href="/" aria-label="Torino home">
                <Image
                  src="/torinoLogo.png"
                  alt="Torino Logo"
                  width={146}
                  height={48}
                  priority
                  className={styles.logoImage}
                />
              </Link>
            </div>

            <nav className={styles.nav}>
              <ul className={styles.navList}>
                <li><Link href="/">صفحه اصلی</Link></li>
                <li><Link href="/tours">خدمات گردشگری</Link></li>
                <li><Link href="/about">درباره ما</Link></li>
                <li><Link href="/contact">تماس با ما</Link></li>
              </ul>
            </nav>
          </div>

          <div className={styles.leftSection}>
            {!isLoggedIn ? (
              <button
                className={styles.loginBtn}
                onClick={() => setShowAuth(true)}
                type="button"
              >
                <FaUser className={styles.loginIcon} />
                <span>ورود | ثبت نام</span>
              </button>
            ) : (
              <div className={styles.userMenu} ref={dropdownRef}>
                <button
                  className={styles.userTrigger}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  type="button"
                >
                  <FaUser />
                  <span className={styles.userTriggerText}>{user?.mobile}</span>
                  <FaChevronDown />
                </button>

                {isDropdownOpen && (
                  <ul>
                    <li>
                      <Link href="/profile" onClick={() => setIsDropdownOpen(false)}>
                        <div className={styles.userPhoneNumber}>
                          <div><FaUser /></div>
                          <span>{user?.mobile}</span>
                        </div>
                      </Link>
                    </li>

                    <li>
                      <Link href="/profile" onClick={() => setIsDropdownOpen(false)}>
                        <div className={styles.userInfo}>
                          <div><FaUser /></div>
                          <span>اطلاعات حساب کاربری</span>
                        </div>
                      </Link>
                    </li>

                    <li onClick={handleLogout}>
                      <div className={styles.userLogout}>
                        <div><FaSignOutAlt /></div>
                        <span>خروج از حساب کاربری</span>
                      </div>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ""}`}>
          <ul className={styles.mobileNavList}>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link href="/" className={styles.activeMobileLink}>صفحه اصلی</Link>
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link href="/tours">خدمات گردشگری</Link>
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link href="/about">درباره ما</Link>
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link href="/contact">تماس با ما</Link>
            </li>
          </ul>
        </div>

        {isMenuOpen && (
          <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />
        )}
      </header>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => {
            const userData = localStorage.getItem("user");
            if (userData) setUser(JSON.parse(userData));
            setIsLoggedIn(true);
            setShowAuth(false);
          }}
        />
      )}
    </>
  );
};

export default Header;
