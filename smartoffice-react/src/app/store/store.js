/*************************************************
 *
 * store.js
 *
 * ساخت Redux Store پروژه
 *
 *************************************************/

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../../features/auth/slice/authSlice";

import { apiSlice } from "../api/apiSlice";

export const store = configureStore({

    reducer: {

        /*
            اطلاعات احراز هویت
        */
        auth: authReducer,

        /*
            اطلاعات RTK Query

            reducerPath برابر "api" است،
            بنابراین این خط معادل زیر است:

            api: apiSlice.reducer
        */
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    /*
        Middleware

        RTK Query برای Cache، Loading،
        Error و Refresh خودکار از Middleware
        استفاده می‌کند.

        اگر این قسمت نباشد،
        RTK Query درست کار نخواهد کرد.
    */
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});