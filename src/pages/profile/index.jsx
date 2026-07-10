import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Templates/Profile/Sidebar";
import AccountInfo from "@/components/Templates/Profile/AccountInfo";
import PersonalInfo from "@/components/Templates/Profile/PersonalInfo";
import BankInfo from "@/components/Templates/Profile/BankInfo";
import styles from "../../styles/Profile.module.css";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    nationalCode: "",
    birthDate: "",
    gender: "",
    sheba: "",
    card: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("profile");

    if (data) {
      setFormData(JSON.parse(data));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(formData));
  };

  return (
    <div className={styles.profile_container}>
      <div className={styles.sidebar_wrapper}>
        <Sidebar />
      </div>

      <div className={styles.main_content}>
        <AccountInfo
          formData={formData}
          setFormData={setFormData}
          handleSave={handleSave}
        />

        <PersonalInfo
          formData={formData}
          setFormData={setFormData}
          handleSave={handleSave}
        />

        <BankInfo
          formData={formData}
          setFormData={setFormData}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
}
