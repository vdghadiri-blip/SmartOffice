import { useState } from "react";

import Table from "../components/Table/Table";
import Modal from "../components/Modal/Modal";
import Button from "../components/Button/Button";

import RoleForm from "../features/roles/components/RoleForm";

import {

    useGetRolesQuery,

    useCreateRoleMutation,

    useUpdateRoleMutation,

    useDeleteRoleMutation

} from "../features/roles/api/rolesApi";

import styles from "./Roles.module.css";

function Roles() {

    const {

        data: roles = [],

        isLoading,

        error

    } = useGetRolesQuery();

    const [createRole] = useCreateRoleMutation();

    const [updateRole] = useUpdateRoleMutation();

    const [deleteRole] = useDeleteRoleMutation();

    const [selectedRole, setSelectedRole] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const columns = [

        {

            field: "name",

            title: "نام نقش"

        }

    ];

    async function handleSave(data) {

        try {

            if (selectedRole) {

                await updateRole({

                    id: selectedRole.id,

                    role: data

                }).unwrap();

            }
            else {

                await createRole(data).unwrap();

            }

            closeModal();

        }
        catch {

            alert("خطا در ذخیره");

        }

    }

    async function handleDelete(role) {

        if (!window.confirm(`حذف ${role.name} ؟`))
            return;

        await deleteRole(role.id);

    }

    function handleEdit(role) {

        setSelectedRole(role);

        setShowModal(true);

    }

    function handleCreate() {

        setSelectedRole(null);

        setShowModal(true);

    }

    function closeModal() {

        setSelectedRole(null);

        setShowModal(false);

    }

    if (isLoading)
        return <h2>در حال دریافت نقش‌ها...</h2>;

    if (error)
        return <h2>خطا در دریافت نقش‌ها</h2>;

    return (

        <div className={styles.container}>

            <h1>

                مدیریت نقش‌ها

            </h1>

            <Button onClick={handleCreate}>

                نقش جدید

            </Button>

            <Table

                columns={columns}

                data={roles}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />

            <Modal

                isOpen={showModal}

                title={
                    selectedRole
                        ?
                        "ویرایش نقش"
                        :
                        "نقش جدید"
                }

                onClose={closeModal}

            >

                <RoleForm

                    role={selectedRole}

                    onSave={handleSave}

                />

            </Modal>

        </div>

    );

}

export default Roles;