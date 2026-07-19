/**
 ************************************************
 *
 * DepartmentForm.jsx
 *
 * مسئول:
 *
 * - ایجاد دپارتمان
 * - ویرایش دپارتمان
 * - مدیریت اطلاعات فرم
 *
 ************************************************
 */

import { useEffect, useState } from "react";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import styles from "./DepartmentForm.module.css";

function DepartmentForm({ department, onSave }) {
  /************************************************
   *
   * اطلاعات فرم
   *
   * فعلاً فقط Name داریم
   *
   * در آینده می‌توانیم اضافه کنیم:
   *
   * Code
   * ManagerId
   * Description
   * IsActive
   *
   ************************************************/

  const [formData, setFormData] = useState({
    name: "",
  });

  /************************************************
   *
   * اگر ویرایش بود
   * اطلاعات قبلی را داخل فرم قرار بده
   *
   ************************************************/

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || "",
      });
    } else {
      setFormData({
        name: "",
      });
    }
  }, [department]);

  /************************************************
   *
   * تغییر Input
   *
   ************************************************/

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  }

  /************************************************
   *
   * ارسال فرم
   *
   ************************************************/

  async function handleSubmit(e) {
    e.preventDefault();

    await onSave(formData);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        name="name"
        placeholder="نام دپارتمان"
        value={formData.name}
        onChange={handleChange}
      />

      <Button type="submit">ذخیره</Button>
    </form>
  );
}

export default DepartmentForm;
