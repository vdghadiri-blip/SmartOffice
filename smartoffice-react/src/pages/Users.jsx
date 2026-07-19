import {  useState } from "react";
import { useGetDepartmentsQuery } from "../features/departments/api/departmentsApi";
import Table from "../components/Table/Table";
import Modal from "../components/Modal/Modal";
import UserForm from "../components/UserForm/UserForm";
import Button from "../components/Button/Button";

import styles from "./Users.module.css";

// اولین API واقعی با RTK Query
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../features/users/api/usersApi";
function Users() {
  /************************************************
   *
   * دریافت کاربران
   *
   * دیگر useEffect و loadUsers نداریم.
   *
   * RTK Query خودش:
   *
   * ✔ درخواست می‌فرستد
   * ✔ Loading را مدیریت می‌کند
   * ✔ Error را مدیریت می‌کند
   * ✔ Cache نگه می‌دارد
   *
   ************************************************/

const { data: users = [], isLoading, error } = useGetUsersQuery();  // هوک ثبت کاربر
  const [createUser] = useCreateUserMutation();

  // هوک ویرایش کاربر
  const [updateUser] = useUpdateUserMutation();
  // فعلاً دپارتمان‌ها هنوز با روش قبلی هستند.
  // بعداً آن‌ها را هم به RTK Query منتقل می‌کنیم.

  // هوک حذف کاربر
  const [deleteUser] = useDeleteUserMutation();

const { data: departments = [] } = useGetDepartmentsQuery();
  const [selectedUser, setSelectedUser] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const columns = [
    {
      field: "username",
      title: "نام کاربری",
    },

    {
      field: "fullName",
      title: "نام",
    },

    {
      field: "role",
      title: "نقش",
    },

    {
      field: "departmentId",
      title: "دپارتمان",

      render: (row) => {
        const department = departments.find((d) => d.id === row.departmentId);

        return department ? department.name : "-";
      },
    },
  ];

  /************************************************
   *
   * فعلاً فقط دپارتمان‌ها با روش قدیمی دریافت می‌شوند.
   *
   * در مرحله بعد آن‌ها را هم به RTK Query منتقل می‌کنیم.
   *
   ************************************************/

  
  /************************************************
   *
   * ثبت یا ویرایش کاربر
   *
   ************************************************/
  async function handleSave(formData) {
    try {
      // اگر کاربری انتخاب شده باشد یعنی در حال ویرایش هستیم
      if (selectedUser) {
        await updateUser({
          id: selectedUser.id,
          user: formData,
        }).unwrap();
      }
      // در غیر این صورت کاربر جدید ایجاد می‌کنیم
      else {
        await createUser(formData).unwrap();
      }

      // بستن پنجره
      closeModal();
    } catch (error) {
      console.log(error);

      alert(error?.data || "خطا در ذخیره کاربر");
    }
  }

  /************************************************
   *
   * حذف کاربر
   *
   ************************************************/
  async function handleDelete(user) {
    // گرفتن تأیید از کاربر
    if (!window.confirm(`آیا از حذف ${user.fullName} مطمئن هستید؟`)) return;

    try {
      // ارسال درخواست حذف
      await deleteUser(user.id).unwrap();
    } catch (error) {
      console.log(error);

      alert("خطا در حذف کاربر");
    }
  }

  function handleEdit(user) {
    setSelectedUser(user);

    setShowModal(true);
  }

  function handleCreate() {
    setSelectedUser(null);

    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);

    setSelectedUser(null);
  }

  /************************************************
   *
   * Loading
   *
   ************************************************/

  if (isLoading) return <h2>در حال دریافت کاربران...</h2>;

  /************************************************
   *
   * Error
   *
   ************************************************/

  if (error) return <h2>خطا در دریافت کاربران</h2>;


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>لیست کاربران</h1>

      <Button onClick={handleCreate}>کاربر جدید</Button>

      <Table
        columns={columns}
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={showModal}
        title={selectedUser ? "ویرایش کاربر" : "کاربر جدید"}
        onClose={closeModal}
      >
        <UserForm
          user={selectedUser}
          departments={departments}
          onSave={handleSave}
        />
      </Modal>
    </div>
  );
}

export default Users;
 
