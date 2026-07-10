import { useState } from "react";
import styles from "./AccountInfo.module.css";
import { LuPencilLine, LuCheck, LuPlus } from "react-icons/lu";

function AccountInfo({ formData, setFormData, handleSave }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveClick = async () => {
    await handleSave();
    setIsEditing(false);
  };

  const handleCancel = () => setIsEditing(false);

  return (
    <div className={styles.account_Info}>
      <h3 className={styles.section_title}>اطلاعات حساب کاربری</h3>

      <div className={styles.blocks}>

        <div classname={styles.user_phone}>
            <span>شماره موبایل</span>
            <span classname={styles.number}>۰۹۲۲۴۵۲۱۱۲۵</span>
        </div>
        <div>
          {!isEditing ? (
            <div className={styles.row}>
              <div className={styles.rowContent}>
                <span className={styles.label}>ایمیل</span>
                <span className={styles.value}>{formData.email || "—"}</span>
              </div>

              <button
                type="button"
                className={styles.add_btn}
                onClick={() => setIsEditing(true)}
              >
                <LuPlus size={16} />
                <span>افزودن</span>
              </button>
            </div>
          ) : (
            <div className={styles.row}>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={styles.email_input}
                placeholder="آدرس ایمیل"
                dir="rtl"
              />

              <button
                type="button"
                className={styles.confirm_btn}
                onClick={handleSaveClick}
              >
              
                <span>تایید</span>
              </button>

              <button
                type="button"
                className={styles.cancel_btn}
                onClick={handleCancel}
              >
                انصراف
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
