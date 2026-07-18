import { useState } from "react";

import departmentService from "../services/departmentService";

import Table from "../components/Table/Table";
import Modal from "../components/Modal/Modal";
import UserForm from "../components/UserForm/UserForm";
import Button from "../components/Button/Button";

import styles from "./Users.module.css";

// اولین API واقعی با RTK Query
import { useGetUsersQuery } from "../features/users/api/usersApi";

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

  const { data: users = [], isLoading, error, refetch } = useGetUsersQuery();

  // فعلاً دپارتمان‌ها هنوز با روش قبلی هستند.
  // بعداً آن‌ها را هم به RTK Query منتقل می‌کنیم.
  const [departments, setDepartments] = useState([]);

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

  useState(() => {
    loadDepartments();
  });

  async function loadDepartments() {
    try {
      const data = await departmentService.getAll();

      setDepartments(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSave(formData) {
    try {
      alert("در مرحله بعد Create و Update نیز با RTK Query انجام می‌شود.");

      refetch();

      closeModal();
    } catch (error) {
      console.log(error);
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

      <Table columns={columns} data={users} onEdit={handleEdit} />

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
