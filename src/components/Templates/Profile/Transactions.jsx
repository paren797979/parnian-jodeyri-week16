import styles from "./Transactions.module.css";

function Transactions({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className={styles.emptyBox}>
        <p>تراکنشی برای نمایش وجود ندارد.</p>
      </div>
    );
  }

  const formatPersianDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };

      const formatted = new Intl.DateTimeFormat("fa-IR", options).format(date);
      return formatted.replace(/،/g, " -").replace(/\//g, "/");
    } catch (e) {
      return "—";
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>تاریخ و ساعت</th>
            <th>مبلغ (تومان)</th>
            <th>نوع تراکنش</th>
            <th>شماره سفارش</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item, index) => {
            const displayAmount = item.amount || item.price || 0;
            const displayOrderNumber =
              item.orderNumber ||
              `سفارش ${item.id ? item.id.slice(0, 8) : Math.floor(10000000 + Math.random() * 90000000)}`;

            return (
              <tr key={item.id || index}>
                <td>{formatPersianDate(item.createdAt || item.date)}</td>
                <td>{Number(displayAmount).toLocaleString("fa-IR")}</td>
                <td>{item.type || "ثبت نام در تور گردشگری"}</td>
                <td>{displayOrderNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
