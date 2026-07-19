/************************************************
 *
 * dashboardApi.js
 *
 * تمام API های مربوط به داشبورد
 *
 ************************************************/

import { apiSlice } from "../../../app/api/apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        /********************************************
         * دریافت آمار داشبورد
         ********************************************/
        getDashboardStats: builder.query({

            query: () => "/Dashboard/stats",

            providesTags: ["Dashboard"],

        }),

        /********************************************
         * دریافت آخرین نامه‌ها
         ********************************************/
        getRecentLetters: builder.query({

            query: () => "/Dashboard/recentletters",

            providesTags: [{ type: "Letters", id: "RECENT" }],

        }),

    }),

});

export const {

    useGetDashboardStatsQuery,

    useGetRecentLettersQuery,

} = dashboardApi;
