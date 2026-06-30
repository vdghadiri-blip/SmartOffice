/**
 ************************************************
 *
 * userService.js
 *
 * مسئول ارتباط با API کاربران
 *
 ************************************************
 */

import api from "../api/axios";

const userService = {
    /**********************************************
     * دریافت همه کاربران
     **********************************************/
    async getAll() {
        const res = await api.get("/Users");
        return res.data;
    },

    /**********************************************
     * دریافت یک کاربر
     **********************************************/
    async getById(id) {
        const res = await api.get(`/Users/${id}`);
        return res.data;
    },

    /**********************************************
     * ایجاد کاربر جدید
     **********************************************/
    async create(data) {
        const res = await api.post("/Users", data);
        return res.data;
    },

    /**********************************************
     * ویرایش کاربر
     **********************************************/
    async update(id, data) {
        const res = await api.put(`/Users/${id}`, data);
        return res.data;
    },

    /**********************************************
     * حذف کاربر
     **********************************************/
    async remove(id) {
        const res = await api.delete(`/Users/${id}`);
        return res.data;
    },
};

export default userService;