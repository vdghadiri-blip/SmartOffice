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
         * دریافت لیست نامه‌ها
         ********************************************/
        getLetters: builder.query({

            query: () => "/Letters",

            providesTags: (result = []) => [
                "Letters",
                ...result.map(({ id }) => ({ type: "Letters", id })),
            ],

        }),

        /********************************************
         * دریافت یک نامه
         ********************************************/
        getLetter: builder.query({

            query: (id) => `/Letters/read/${id}`,

            providesTags: (result, error, id) => [{ type: "Letters", id }],

        }),

        /********************************************
         * دریافت نامه‌های ارسالی
         ********************************************/
        getSentLetters: builder.query({

            query: () => "/Letters/sent",

            providesTags: ["Letters"],

        }),

        /********************************************
         * دریافت صندوق ورودی
         ********************************************/
        getInboxLetters: builder.query({

            query: () => "/Letters/inbox",

            providesTags: ["Letters"],

        }),

        /********************************************
         * دریافت نامه‌های دپارتمان
         ********************************************/
        getDepartmentLetters: builder.query({

            query: (id) => `/Letters/department/${id}`,

            providesTags: (result, error, id) => [
                { type: "Letters", id: `DEPARTMENT_${id}` },
            ],

        }),

        /********************************************
         * دریافت تاریخچه نامه
         ********************************************/
        getLetterHistory: builder.query({

            query: (letterId) => `/Letters/history/${letterId}`,

            providesTags: (result, error, letterId) => [
                { type: "Letters", id: `HISTORY_${letterId}` },
            ],

        }),

        /********************************************
         * ارسال نامه
         ********************************************/
        sendLetter: builder.mutation({

            query: (request) => ({

                url: "/Letters/send",

                method: "POST",

                body: request,

            }),

            invalidatesTags: ["Letters", "Dashboard"],

        }),

        /********************************************
         * ارجاع نامه
         ********************************************/
        forwardLetter: builder.mutation({

            query: (request) => ({

                url: "/Letters/forward",

                method: "POST",

                body: request,

            }),

            invalidatesTags: ["Letters"],

        }),

        /********************************************
         * ایجاد نامه
         ********************************************/
        createLetter: builder.mutation({

            query: (letter) => ({

                url: "/Letters",

                method: "POST",

                body: letter,

            }),

            invalidatesTags: ["Letters", "Dashboard"],

        }),

        /********************************************
         * به‌روزرسانی وضعیت نامه
         ********************************************/
        updateLetterStatus: builder.mutation({

            query: (request) => ({

                url: "/Letters/status",

                method: "POST",

                body: request,

            }),

            invalidatesTags: ["Letters"],

        }),

    }),

});

export const {

    useGetLettersQuery,

    useGetLetterQuery,

    useGetSentLettersQuery,

    useGetInboxLettersQuery,

    useGetDepartmentLettersQuery,

    useGetLetterHistoryQuery,

    useSendLetterMutation,

    useForwardLetterMutation,

    useCreateLetterMutation,

    useUpdateLetterStatusMutation,

} = lettersApi;
