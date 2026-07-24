import { useState } from "react";

import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";

import { useGetUsersQuery } from "../../users/api/usersApi";
import { useGetDepartmentsQuery } from "../../departments/api/departmentsApi";
import { useSendLetterMutation } from "../api/lettersApi";

import styles from "./SendLetter.module.css";

function SendLetter() {

    const { data: users = [] } = useGetUsersQuery();

    const { data: departments = [] } = useGetDepartmentsQuery();

    const [sendLetter, { isLoading }] = useSendLetterMutation();

    const [form, setForm] = useState({

        subject: "",

        content: "",

        receiverUsername: "",

        departmentId: "",

        attachment: null

    });

    function changeHandler(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function submitHandler(e) {

        e.preventDefault();

        try {

            await sendLetter(form).unwrap();

            alert("نامه با موفقیت ارسال شد.");

            setForm({

                subject: "",

                content: "",

                receiverUsername: "",

                departmentId: "",

                attachment: null

            });

        }

        catch {

            alert("خطا در ارسال نامه");

        }

    }

    return (

        <div className={styles.container}>

            <div className={styles.card}>

                <h2>ارسال نامه</h2>

                <form onSubmit={submitHandler}>

                    <label>موضوع</label>

                    <Input
                        name="subject"
                        value={form.subject}
                        onChange={changeHandler}
                    />

                    <label>گیرنده</label>

                    <Select

                        name="receiverUsername"

                        value={form.receiverUsername}

                        onChange={changeHandler}

                    >

                        <option value="">انتخاب کنید</option>

                        {

                            users.map(user => (

                                <option

                                    key={user.id}

                                    value={user.username}

                                >

                                    {user.fullName}

                                </option>

                            ))

                        }

                    </Select>

                    <label>دپارتمان</label>

                    <Select

                        name="departmentId"

                        value={form.departmentId}

                        onChange={changeHandler}

                    >

                        <option value="">انتخاب کنید</option>

                        {

                            departments.map(dep => (

                                <option

                                    key={dep.id}

                                    value={dep.id}

                                >

                                    {dep.name}

                                </option>

                            ))

                        }

                    </Select>

                    <label>متن نامه</label>

                    <textarea

                        rows="8"

                        name="content"

                        value={form.content}

                        onChange={changeHandler}

                        className={styles.textarea}

                    />

                    <button

                        disabled={isLoading}

                        className={styles.button}

                    >

                        {isLoading ? "درحال ارسال..." : "ارسال نامه"}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default SendLetter;