import { useState } from "react";
import styles from "./BankInfo.module.css";
import { LuPencilLine } from "react-icons/lu";

function BankInfo({ formData, setFormData, handleSave }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveClick = () => {
    handleSave();
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>اطلاعات حساب بانکی</p>

        {!isEditing && (
          <div className={styles.edit_btn} onClick={() => setIsEditing(true)}>
            <LuPencilLine />
            <p>ویرایش اطلاعات</p>
          </div>
        )}
      </div>

      <div className={styles.bank_fields}>
        <div className={styles.input_group}>
          <label>شماره شبا</label>
          {isEditing ? (
            <input
              value={formData.sheba}
              onChange={(e) =>
                setFormData({ ...formData, sheba: e.target.value })
              }
            />
          ) : (
            <span>{formData.sheba}</span>
          )}
        </div>

        <div className={styles.input_group}>
          <label>شماره کارت</label>
          {isEditing ? (
            <input
              value={formData.card}
              onChange={(e) =>
                setFormData({ ...formData, card: e.target.value })
              }
            />
          ) : (
            <span>{formData.card}</span>
          )}
        </div>
      </div>

      {isEditing && (
        <>
          <div className={styles.divider} />
          <div className={styles.actions}>
            <button className={styles.confirm_btn} onClick={handleSaveClick}>
              تایید
            </button>
            <button
              className={styles.cancel_btn}
              onClick={() => setIsEditing(false)}
            >
              انصراف
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default BankInfo;
