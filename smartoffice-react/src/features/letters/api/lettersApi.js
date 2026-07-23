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
         * دریافت همه نامه‌ها
         ********************************************/
        getLetters: builder.query({

            query: () => "/Letters",

            providesTags: ["Letters"],

        }),



        /********************************************
         * صندوق ورودی
         *
         * GET /api/Letters/inbox
         ********************************************/
        getInboxLetters: builder.query({

            query: () => "/Letters/inbox",

            providesTags: ["Letters"],

        }),



        /********************************************
         * نامه‌های ارسالی
         *
         * GET /api/Letters/sent
         ********************************************/
        getSentLetters: builder.query({

            query: () => "/Letters/sent",

            providesTags: ["Letters"],

        }),



        /********************************************
         * تاریخچه نامه
         *
         * GET /api/Letters/history/{id}
         ********************************************/
        getLetterHistory: builder.query({

            query: (id) =>
                `/Letters/history/${id}`,

            providesTags: ["Letters"],

        }),



        /********************************************
         * خواندن نامه
         *
         * GET /api/Letters/read/{id}
         ********************************************/
        getLetter: builder.query({

            query: (id) =>
                `/Letters/read/${id}`,

            providesTags: ["Letters"],

        }),



        /********************************************
         * ارسال نامه
         *
         * POST /api/Letters/send
         ********************************************/
        sendLetter: builder.mutation({

            query: (letter) => ({

                url: "/Letters/send",

                method: "POST",

                body: letter,

            }),

            invalidatesTags: ["Letters"],

        }),


    }),


});


export const {

    useGetLettersQuery,

    useGetInboxLettersQuery,

    useGetSentLettersQuery,

    useGetLetterHistoryQuery,

    useGetLetterQuery,

    useSendLetterMutation,

} = lettersApi;