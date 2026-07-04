/**
 * ---------------------------------------------------
 * UserForm.jsx
 *
 * مسئول:
 *  - مدیریت فرم کاربران
 *  - نمایش اطلاعات کاربر
 *  - آماده‌سازی ثبت و ویرایش
 *  - ارسال اطلاعات به Users.jsx
 * ---------------------------------------------------
 */

import { useEffect, useState } from "react";

import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";

import styles from "./UserForm.module.css";

function UserForm({
    user,
    departments,
    onSave
}) {

    /*******************************************************
     * State فرم
     *******************************************************/
    const [formData, setFormData] = useState({

        fullName: "",
        username: "",
        password: "",
        role: "",
        departmentId: ""

    });

    /*******************************************************
     * اگر کاربر برای ویرایش ارسال شد
     * فرم را پر کن
     * اگر کاربر جدید بود فرم را خالی کن
     *******************************************************/
    useEffect(() => {

        if (!user) {

            setFormData({

                fullName: "",
                username: "",
                password: "",
                role: "",
                departmentId: ""

            });

            return;

        }

        setFormData({

            fullName: user.fullName || "",
            username: user.username || "",
            password: "",
            role: user.role || "",
            departmentId: user.departmentId || ""

        });

    }, [user]);

    /*******************************************************
     * تغییر مقدار فیلدها
     *******************************************************/
    function handleChange(e) {

        const { name, value } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]: value

        }));

    }

    /*******************************************************
     * ثبت فرم
     *******************************************************/
    async function handleSubmit(e) {

        e.preventDefault();

        await onSave(formData);

    }

    return (

        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >

            <Input
                name="fullName"
                placeholder="نام کامل"
                value={formData.fullName}
                onChange={handleChange}
            />

            <Input
                name="username"
                placeholder="نام کاربری"
                value={formData.username}
                onChange={handleChange}
            />

            {!user && (

                <Input
                    type="password"
                    name="password"
                    placeholder="رمز عبور"
                    value={formData.password}
                    onChange={handleChange}
                />

            )}

            <Input
                name="role"
                placeholder="نقش"
                value={formData.role}
                onChange={handleChange}
            />

            <Select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
            >

                <option value="">
                    انتخاب دپارتمان
                </option>

                {departments.map(department => (

                    <option
                        key={department.id}
                        value={department.id}
                    >
                        {department.name}
                    </option>

                ))}

            </Select>

            <div className={styles.actions}>

                <Button type="submit">
                    ذخیره
                </Button>

            </div>

        </form>

    );

}

export default UserForm;