/**
 ************************************************
 *
 * departmentService.js
 *
 * مسئول ارتباط با API دپارتمان‌ها
 *
 ************************************************
 */

import api from "../api/axios";

const departmentService = {
    /**********************************************
     * دریافت همه دپارتمان‌ها
     **********************************************/
    async getAll() {
        const res = await api.get("/Departments");
        return res.data;
    },
};

export default departmentService;