import { useEffect, useState } from "react";
import Sidebar from "../../components/Templates/Profile/Sidebar";
import Transactions from "../../components/Templates/Profile/Transactions";
import { getTransactionsApi } from "../../services/https";
import styles from "../../styles/Profile.module.css";

export default function TransactionsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTransactionsApi();
        if (Array.isArray(res)) {
          setData(res);
        } else if (res && Array.isArray(res.data)) {
          setData(res.data);
        } else if (res && Array.isArray(res.transactions)) {
          setData(res.transactions);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("خطا در دریافت تراکنش‌ها:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.profile_container}>
      <Sidebar activeTab="transactions" />
      <main className={styles.profileContent || ""}>
        {loading ? (
          <p style={{ textAlign: "center", padding: "20px" }}>در حال دریافت اطلاعات...</p>
        ) : (
          <Transactions transactions={data} />
        )}
      </main>
    </div>
  );
}
