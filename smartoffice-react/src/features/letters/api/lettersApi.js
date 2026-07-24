/************************************************
 *
 * lettersApi.js
 *
 * تمام API های مربوط به نامه‌ها
 *
 ************************************************/


import { apiSlice } from "../../../app/api/apiSlice";



export const lettersApi = apiSlice.injectEndpoints({


    endpoints: (builder) => ({



        /********************************************
         *
         * دریافت تمام نامه‌ها
         *
         * GET /api/Letters
         *
         ********************************************/
        getLetters: builder.query({

            query: () => "/Letters",

            providesTags: ["Letters"],

        }),





        /********************************************
         *
         * دریافت صندوق ورودی کاربر
         *
         * GET /api/Letters/inbox
         *
         ********************************************/
        getInboxLetters: builder.query({

            query: () => "/Letters/inbox",

            providesTags: ["Letters"],

        }),





        /********************************************
         *
         * دریافت نامه‌های ارسال شده
         *
         * GET /api/Letters/sent
         *
         ********************************************/
        getSentLetters: builder.query({

            query: () => "/Letters/sent",

            providesTags: ["Letters"],

        }),





        /********************************************
         *
         * دریافت تاریخچه گردش نامه
         *
         * GET /api/Letters/history/{id}
         *
         ********************************************/
        getLetterHistory: builder.query({

            query: (id) =>
                `/Letters/history/${id}`,

            providesTags: ["Letters"],

        }),





        /********************************************
         *
         * دریافت جزئیات یک نامه
         *
         * GET /api/Letters/read/{id}
         *
         ********************************************/
        getLetter: builder.query({

            query: (id) =>
                `/Letters/read/${id}`,

            providesTags: ["Letters"],

        }),





        /********************************************
         *
         * ارسال نامه جدید
         *
         * POST /api/Letters/send
         *
         ********************************************/
        sendLetter: builder.mutation({

            query: (letter) => ({

                url: "/Letters/send",

                method: "POST",

                body: letter,

            }),


            invalidatesTags: ["Letters"],

        }),





        /********************************************
         *
         * تغییر وضعیت نامه
         *
         * مثال:
         *
         * Unread  ---> Read
         *
         * POST /api/Letters/status
         *
         ********************************************/
        updateLetterStatus: builder.mutation({

            query: (data) => ({

                url: "/Letters/status",

                method: "POST",

                body: data,

            }),


            invalidatesTags: ["Letters"],

        }),





        /********************************************
         *
         * ارجاع (Forward) نامه
         *
         * ارسال یک نامه موجود
         * به کاربر دیگر
         *
         * POST /api/Letters/forward
         *
         ********************************************/
        forwardLetter: builder.mutation({

            query: (data) => ({

                url: "/Letters/forward",

                method: "POST",

                body: data,

            }),


            invalidatesTags: ["Letters"],

        }),



    }),



});





/************************************************
 *
 * خروجی Hook های مربوط به API نامه‌ها
 *
 ************************************************/


export const {


    // دریافت همه نامه‌ها

    useGetLettersQuery,



    // دریافت صندوق ورودی

    useGetInboxLettersQuery,



    // دریافت نامه‌های ارسال شده

    useGetSentLettersQuery,



    // دریافت تاریخچه نامه

    useGetLetterHistoryQuery,



    // دریافت جزئیات نامه

    useGetLetterQuery,



    // ارسال نامه جدید

    useSendLetterMutation,



    // تغییر وضعیت نامه

    useUpdateLetterStatusMutation,



    // ارجاع (Forward) نامه

    useForwardLetterMutation,


} = lettersApi;