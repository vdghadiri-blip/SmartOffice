/**
 * useUsers
 *
 * مدیریت تمام عملیات مربوط به کاربران
 * (بارگذاری، نگهداری داده‌ها و توسعه‌های آینده)
 */

import { useEffect, useState } from "react";
import userService from "../services/userService";

function useUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    /**
     * دریافت لیست کاربران از سرور
     */
    async function loadUsers() {
        try {
            const res = await userService.getAll();

            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        users,
        loadUsers,
    };
}

export default useUsers;