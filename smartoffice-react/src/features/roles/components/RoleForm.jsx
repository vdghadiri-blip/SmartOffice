/************************************************
 *
 * RoleForm.jsx
 *
 * مسئول:
 *
 * ✔ ایجاد نقش
 * ✔ ویرایش نقش
 *
 ************************************************/

import { useEffect, useState } from "react";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import styles from "./RoleForm.module.css";

function RoleForm({ role, onSave }) {

    const [name, setName] = useState("");

    useEffect(() => {

        if (role) {

            setName(role.name || "");

        }
        else {

            setName("");

        }

    }, [role]);

    function handleSubmit(e) {

        e.preventDefault();

        onSave({

            name

        });

    }

    return (

        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >

            <Input

                placeholder="نام نقش"

                value={name}

                onChange={(e) => setName(e.target.value)}

            />

            <Button type="submit">

                ذخیره

            </Button>

        </form>

    );

}

export default RoleForm;