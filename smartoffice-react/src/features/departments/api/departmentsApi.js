/************************************************
 *
 * departmentsApi.js
 *
 * تمام API های مربوط به دپارتمان‌ها
 *
 ************************************************/

import { apiSlice } from "../../../app/api/apiSlice";

export const departmentsApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        /********************************************
         *
         * دریافت لیست دپارتمان‌ها
         *
         ********************************************/
        getDepartments: builder.query({

            /*
             *
             * درخواست GET
             *
             * GET /Departments
             *
             */

            query: () => "/Departments",

            /*
             *
             * کش دپارتمان‌ها
             *
             */

            providesTags: ["Departments"],

        }),

    }),

});

/*
 *
 * RTK Query به صورت خودکار این Hook را می‌سازد.
 *
 * useGetDepartmentsQuery()
 *
 */

export const {

    useGetDepartmentsQuery,

} = departmentsApi;