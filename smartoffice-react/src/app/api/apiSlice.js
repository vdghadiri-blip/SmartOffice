/************************************************
 *
 * apiSlice.js
 *
 * هسته اصلی RTK Query
 *
 ************************************************/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({

    // محل ذخیره اطلاعات RTK Query داخل Redux
    reducerPath: "api",

    baseQuery: fetchBaseQuery({

        // آدرس اصلی API
        baseUrl: "http://localhost:5070/api",

        /*
        قبل از ارسال هر درخواست اجرا می‌شود.

        دقیقاً شبیه Interceptor در Axios.

        اینجا Token را از LocalStorage می‌خوانیم
        و داخل Header قرار می‌دهیم.
        */
        prepareHeaders: (headers) => {

            const token = localStorage.getItem("token");

            if (token) {

                headers.set(
                    "Authorization",
                    `Bearer ${token}`
                );

            }

            return headers;

        },

    }),

    // فعلاً خالی
    endpoints: () => ({}),

});