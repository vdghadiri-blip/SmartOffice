import { apiSlice } from "../../../app/api/apiSlice";


export const departmentsApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        // دریافت لیست
        getDepartments: builder.query({

            query: () => "/Departments",

            providesTags: ["Departments"]

        }),



        // ساخت
        createDepartment: builder.mutation({

            query: (department) => ({

                url: "/Departments",

                method: "POST",

                body: department

            }),

            invalidatesTags: ["Departments"]

        }),




        // ویرایش
        updateDepartment: builder.mutation({

            query: ({ id, department }) => ({

                url: `/Departments/${id}`,

                method: "PUT",

                body: department

            }),

            invalidatesTags: ["Departments"]

        }),




        // حذف
        deleteDepartment: builder.mutation({

            query: (id) => ({

                url: `/Departments/${id}`,

                method: "DELETE"

            }),

            invalidatesTags: ["Departments"]

        })

    })

});



export const {

    useGetDepartmentsQuery,

    useCreateDepartmentMutation,

    useUpdateDepartmentMutation,

    useDeleteDepartmentMutation

} = departmentsApi;