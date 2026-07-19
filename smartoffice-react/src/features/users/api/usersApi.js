/************************************************
 *
 * usersApi.js
 *
 * تمام API های مربوط به کاربران
 *
 ************************************************/

import { apiSlice } from "../../../app/api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        /********************************************
         * دریافت لیست کاربران
         ********************************************/
        getUsers: builder.query({

            query: () => "/Users",

            // این Query به تگ Users وابسته است.
            providesTags: ["Users"],

        }),

        /********************************************
         * ایجاد کاربر
         ********************************************/
        createUser: builder.mutation({

            query: (user) => ({

                url: "/Users",

                method: "POST",

                body: user,

            }),

            // بعد از ثبت، کش کاربران باطل می‌شود
            invalidatesTags: ["Users"],

        }),

        /********************************************
         * ویرایش کاربر
         ********************************************/
        updateUser: builder.mutation({

            query: ({ id, user }) => ({

                url: `/Users/${id}`,

                method: "PUT",

                body: user,

            }),

            invalidatesTags: ["Users"],

        }),

        /********************************************
         * حذف کاربر
         ********************************************/
        deleteUser: builder.mutation({

            query: (id) => ({

                url: `/Users/${id}`,

                method: "DELETE",

            }),

            invalidatesTags: ["Users"],

        }),

    }),

});

export const {

    useGetUsersQuery,

    useCreateUserMutation,

    useUpdateUserMutation,

    useDeleteUserMutation,

} = usersApi;