import { useEffect, useState } from "react";
import { getMyToursApi } from "../../services/https";
import Sidebar from "../../components/Templates/Profile/Sidebar";
import MyTours from "../../components/Templates/Profile/MyTours";
import styles from "../../styles/Profile.module.css";

function MyToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyTours = async () => {
      try {
        const data = await getMyToursApi();
        setTours(Array.isArray(data) ? data : data?.tours || []);
      } catch (err) {
        console.error("خطا در دریافت تورهای من:", err);
        setError("خطا در دریافت تورهای شما");
      } finally {
        setLoading(false);
      }
    };

    fetchMyTours();
  }, []);

  return (
    <div className={styles.profile_container}>
      <Sidebar />

      <main className={styles.profileContent}>
        {loading && <p>در حال بارگذاری...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && <MyTours tours={tours} />}
      </main>
    </div>
  );
}

export default MyToursPage;
