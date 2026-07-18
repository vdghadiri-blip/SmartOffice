// ========================================================
// Store اصلی برنامه
// ========================================================

// ساخت Store استاندارد Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Reducer مربوط به احراز هویت
import authReducer from "../../features/auth/slice/authSlice";

// API مرکزی RTK Query
import { apiSlice } from "../api/apiSlice";

export const store = configureStore({

    reducer: {

        // State مربوط به احراز هویت
        auth: authReducer,

        /*
        =======================================================
        reducer مربوط به RTK Query

        reducerPath داخل apiSlice برابر "api" است.

        بنابراین نتیجه State این شکلی می‌شود:

        state = {
            auth: { ... },
            api: { ... }
        }

        این قسمت کش درخواست‌ها، Loading،
        Error و Data را مدیریت می‌کند.
        =======================================================
        */
        [apiSlice.reducerPath]: apiSlice.reducer,

    },

    /*
    =======================================================
    Middleware مخصوص RTK Query

    اگر این قسمت را اضافه نکنیم:

    ❌ Cache کار نمی‌کند.
    ❌ Refetch انجام نمی‌شود.
    ❌ Loading مدیریت نمی‌شود.
    ❌ Invalidate Tagها کار نمی‌کنند.

    بنابراین Middleware قلب RTK Query است.
    =======================================================
    */

    middleware: (getDefaultMiddleware) =>

        getDefaultMiddleware().concat(apiSlice.middleware),

});