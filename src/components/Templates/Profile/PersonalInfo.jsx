import { useState } from "react";
import styles from "./PersonalInfo.module.css";
import { LuPencilLine, LuCheck } from "react-icons/lu";

function PersonalInfo({ formData, setFormData, handleSave }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveClick = () => {
    handleSave();
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>اطلاعات شخصی</p>
      </div>

      <div className={isEditing ? styles.form_grid : styles.info_grid}>
        <div className={styles.input_group}>
          {isEditing ? (
            <input
              placeholder="نام و نام خانوداگی"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          ) : (
            <div className={styles.labels}>
              <label>نام و نام خانوادگی</label>
              <span>{formData.fullName}</span>
            </div>
          )}
        </div>

        <div className={styles.input_group}>
          {isEditing ? (
            <input
              placeholder="کد ملی"
              value={formData.nationalCode}
              onChange={(e) =>
                setFormData({ ...formData, nationalCode: e.target.value })
              }
            />
          ) : (
            <div className={styles.labels}>
              <label>کد ملی</label>
              <span>{formData.nationalCode}</span>
            </div>
          )}
        </div>

        <div className={styles.input_group}>
          {isEditing ? (
            <input
              placeholder="تاریخ تولد"
              value={formData.birthDate}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
            />
          ) : (
            <div className={styles.labels}>
              <label>تاریخ تولد</label>
              <span>{formData.birthDate}</span>
            </div>
          )}
        </div>

        <div className={styles.input_group}>
          {isEditing ? (
            <input
              placeholder="جنسیت"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
          ) : (
            <div className={styles.labels}>
              <label>جنسیت</label>
              <span>{formData.gender}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {!isEditing ? (
          <div className={styles.edit_btn} onClick={() => setIsEditing(true)}>
            <LuPencilLine />
            <p>ویرایش اطلاعات</p>
          </div>
        ) : (
          <>
            <div className={styles.edit_button} onClick={handleSaveClick}>
              <p>تایید</p>
            </div>

            <div className={styles.cancel_btn} onClick={handleCancelClick}>
              <p>انصراف</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PersonalInfo;
