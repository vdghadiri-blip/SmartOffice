import { useEffect, useState } from "react";

import userService from "../services/userService";
import departmentService from "../services/departmentService";

import Table from "../components/Table/Table";
import Modal from "../components/Modal/Modal";
import UserForm from "../components/UserForm/UserForm";
import Button from "../components/Button/Button";

import styles from "./Users.module.css";

function Users() {

    const [users, setUsers] = useState([]);
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

                const department =
                    departments.find(
                        d => d.id === row.departmentId
                    );

                return department
                    ? department.name
                    : "-";
            }
        }

    ];


    useEffect(() => {

        loadUsers();
        loadDepartments();

    }, []);


    async function loadUsers() {

        try {

            const data =
                await userService.getAll();

            setUsers(data);

        }
        catch (error) {

            console.log(error);

        }

    }


    async function loadDepartments() {

        try {

            const data =
                await departmentService.getAll();

            setDepartments(data);

        }
        catch (error) {

            console.log(error);

        }

    }


    async function handleSave(formData) {

        try {

            if (selectedUser) {

                await userService.update(
                    selectedUser.id,
                    formData
                );

            }
            else {

                await userService.create(formData);

            }

            await loadUsers();

            closeModal();

        }
catch (error) {

    console.log(error);

    alert(error.response?.data || error.message);

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


    return (

        <div className={styles.container}>

            <h1 className={styles.title}>
                لیست کاربران
            </h1>

            <Button
                onClick={handleCreate}
            >
                کاربر جدید
            </Button>

            <Table
                columns={columns}
                data={users}
                onEdit={handleEdit}
            />

            <Modal
                isOpen={showModal}
                title={
                    selectedUser
                        ? "ویرایش کاربر"
                        : "کاربر جدید"
                }
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