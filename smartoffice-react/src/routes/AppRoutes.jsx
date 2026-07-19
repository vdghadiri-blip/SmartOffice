import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import Layout from "../layouts/Layout";
import PrivateRoute from "./PrivateRoute";

import Users from "../pages/Users";
import Departments from "../pages/Departments";

function AppRoutes() {
  return (
    <Routes>
      {/* 
                مسیر پیش فرض

                وقتی کاربر وارد:
                /
                می‌شود

                به داشبورد منتقل می‌شود
            */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 
                صفحه ورود

                این صفحه Layout ندارد
                چون هنوز کاربر لاگین نکرده
            */}
      <Route path="/login" element={<Login />} />

      {/* 
                تمام صفحات داخل این Route:

                ✔ نیاز به لاگین دارند
                ✔ Layout مشترک دارند
                ✔ Sidebar و Header دارند
            */}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {/* داشبورد */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* کاربران */}
        <Route path="/users" element={<Users />} />

        {/* دپارتمان‌ها */}
        <Route path="/departments" element={<Departments />} />
      </Route>

      {/* 
                اگر آدرس اشتباه وارد شد

                مثلا:
                /abc

                برگرد به داشبورد
            */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
