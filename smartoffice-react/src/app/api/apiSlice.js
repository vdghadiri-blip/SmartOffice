/*************************************************
 *
 * apiSlice.js
 *
 * هسته اصلی RTK Query
 * تمام API های پروژه از این فایل ساخته می‌شوند.
 *
 *************************************************/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/*
    createApi
    =========

    این تابع قلب RTK Query است.

    تمام درخواست‌های API پروژه (Users, Letters, Dashboard و ...)
    از اینجا تعریف می‌شوند.

    یعنی به جای اینکه برای هر صفحه جداگانه useEffect و axios بنویسیم،
    همه APIها را در این سیستم ثبت می‌کنیم.
*/

export const apiSlice = createApi({

    /*
        reducerPath
        ===========

        نام بخشی از Redux Store که RTK Query اطلاعات خودش را
        داخل آن ذخیره می‌کند.

        بعداً Store ما تقریباً این شکلی خواهد شد:

        state
        ├── auth
        └── api

        "api" نام استانداردی است که تقریباً همه پروژه‌های حرفه‌ای
        از آن استفاده می‌کنند.
    */
    reducerPath: "api",

    /*
        baseQuery
        =========

        مشخص می‌کند درخواست‌های HTTP چگونه ارسال شوند.

        fetchBaseQuery نسخه ساده‌تر Axios است که خود RTK Query
        در اختیار ما قرار داده است.

        بعداً توکن JWT را هم اینجا اضافه می‌کنیم تا مانند axios
        به صورت خودکار همراه تمام درخواست‌ها ارسال شود.
    */
    baseQuery: fetchBaseQuery({

        /*
            baseUrl
            =======

            آدرس اصلی API پروژه.

            بنابراین اگر بعداً بنویسیم:

            query: () => "/Users"

            در واقع درخواست به این آدرس ارسال می‌شود:

            http://localhost:5070/api/Users
        */
        baseUrl: "http://localhost:5070/api",
    }),

    /*
        endpoints
        =========

        این قسمت محل تعریف تمام API های پروژه است.

        فعلاً خالی است.

        بعداً اینجا API های زیر را اضافه می‌کنیم:

        ✔ دریافت کاربران
        ✔ ایجاد کاربر
        ✔ ویرایش کاربر
        ✔ حذف کاربر
        ✔ Dashboard
        ✔ Departments
        ✔ Letters
        ...
    */
    endpoints: () => ({}),
});