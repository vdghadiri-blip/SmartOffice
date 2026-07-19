import { useState } from "react";

import Table from "../components/Table/Table";
import Modal from "../components/Modal/Modal";
import Button from "../components/Button/Button";

import DepartmentForm from "../features/departments/components/DepartmentForm";

import {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "../features/departments/api/departmentsApi";

import styles from "./Departments.module.css";

function Departments() {
  const {
    data: departments = [],

    isLoading,

    error,
  } = useGetDepartmentsQuery();

  const [createDepartment] = useCreateDepartmentMutation();

  const [updateDepartment] = useUpdateDepartmentMutation();

  const [deleteDepartment] = useDeleteDepartmentMutation();

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const columns = [
    {
      field: "name",

      title: "نام دپارتمان",
    },
  ];

  async function handleSave(data) {
    try {
      if (selectedDepartment) {
        await updateDepartment({
          id: selectedDepartment.id,

          department: data,
        }).unwrap();
      } else {
        await createDepartment(data).unwrap();
      }

      closeModal();
    } catch (error) {
      console.log(error);

      alert("خطا در ذخیره دپارتمان");
    }
  }

  async function handleDelete(department) {
    if (!window.confirm(`حذف ${department.name} ؟`)) return;

    try {
      await deleteDepartment(department.id).unwrap();
    } catch (error) {
      console.log(error);

      alert("خطا در حذف دپارتمان");
    }
  }

  function handleEdit(department) {
    setSelectedDepartment(department);

    setShowModal(true);
  }

  function handleCreate() {
    setSelectedDepartment(null);

    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);

    setSelectedDepartment(null);
  }

  if (isLoading) return <h2>در حال دریافت دپارتمان‌ها...</h2>;

  if (error) return <h2>خطا در دریافت دپارتمان‌ها</h2>;

  return (
    <div className={styles.container}>
      <h1>مدیریت دپارتمان‌ها</h1>

      <Button onClick={handleCreate}>دپارتمان جدید</Button>

      <Table
        columns={columns}
        data={departments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={showModal}
        title={selectedDepartment ? "ویرایش دپارتمان" : "دپارتمان جدید"}
        onClose={closeModal}
      >
        <DepartmentForm department={selectedDepartment} onSave={handleSave} />
      </Modal>
    </div>
  );
}

export default Departments;
