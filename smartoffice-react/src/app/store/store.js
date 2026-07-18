
// تابع configureStore برای ساخت Store استاندارد Redux Toolkit

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/slice/authSlice";


// در حال حاضر Reducer نداریم.
// فعلاً یک Store خالی می‌سازیم تا به پروژه متصل شود.
// در مرحله بعد authSlice را به این قسمت اضافه می‌کنیم.
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

