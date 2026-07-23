/************************************************
 *
 * rolesApi.js
 *
 * تمام API های مربوط به نقش‌ها
 *
 * RTK Query
 *
 ************************************************/

import { apiSlice } from "../../../app/api/apiSlice";

export const rolesApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        /********************************************
         *
         * دریافت لیست نقش‌ها
         *
         ********************************************/
        getRoles: builder.query({

            query: () => "/Roles",

            providesTags: ["Roles"]

        }),

        /********************************************
         *
         * ایجاد نقش
         *
         ********************************************/
        createRole: builder.mutation({

            query: (role) => ({

                url: "/Roles",

                method: "POST",

                body: role

            }),

            invalidatesTags: ["Roles"]

        }),

        /********************************************
         *
         * ویرایش نقش
         *
         ********************************************/
        updateRole: builder.mutation({

            query: ({ id, role }) => ({

                url: `/Roles/${id}`,

                method: "PUT",

                body: role

            }),

            invalidatesTags: ["Roles"]

        }),

        /********************************************
         *
         * حذف نقش
         *
         ********************************************/
        deleteRole: builder.mutation({

            query: (id) => ({

                url: `/Roles/${id}`,

                method: "DELETE"

            }),

            invalidatesTags: ["Roles"]

        })

    })

});

export const {

    useGetRolesQuery,

    useCreateRoleMutation,

    useUpdateRoleMutation,

    useDeleteRoleMutation

} = rolesApi;