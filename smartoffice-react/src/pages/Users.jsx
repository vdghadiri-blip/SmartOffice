/**
 ************************************************
 *
 * Users.jsx
 *
 * مسئول:
 *
 *  - دریافت کاربران
 *  - دریافت دپارتمان‌ها
 *  - نمایش جدول
 *  - مدیریت Modal
 *
 ************************************************
 */

import { useEffect, useState } from "react";

import userService from "../services/userService";
import departmentService from "../services/departmentService";

import Table from "../components/Table/Table";
import Modal from "../components/Modal/Modal";
import UserForm from "../components/UserForm/UserForm";

import styles from "./Users.module.css";

function Users() {
  /**********************************************
   * State
   **********************************************/

  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [showModal, setShowModal] = useState(false);

  /**********************************************
   * ستون‌های جدول
   **********************************************/

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

  /**********************************************
   * بارگذاری اولیه صفحه
   **********************************************/

  useEffect(() => {
    loadUsers();
    loadDepartments();
  }, []);

  /**********************************************
   * دریافت کاربران
   **********************************************/

  async function loadUsers() {
    try {
      const data = await userService.getAll();

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  /**********************************************
   * دریافت دپارتمان‌ها
   **********************************************/

  async function loadDepartments() {
    try {
      const data = await departmentService.getAll();

      setDepartments(data);
    } catch (error) {
      console.log(error);
    }
  }

  /**********************************************
   * باز کردن فرم ویرایش
   **********************************************/

  function handleEdit(user) {
    setSelectedUser(user);

    setShowModal(true);
  }

  /**********************************************
   * بستن مودال
   **********************************************/

  function closeModal() {
    setShowModal(false);

    setSelectedUser(null);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>لیست کاربران</h1>

      <Table columns={columns} data={users} onEdit={handleEdit} />

      <Modal isOpen={showModal} title="ویرایش کاربر" onClose={closeModal}>
        <UserForm user={selectedUser} departments={departments} />
      </Modal>
    </div>
  );
}

export default Users;
