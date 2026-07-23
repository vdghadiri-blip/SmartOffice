import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Departments from "../pages/Departments";
import Roles from "../pages/Roles";

import Layout from "../layouts/Layout";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* مسیر پیش فرض */}
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      {/* صفحه ورود */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* صفحات محافظت شده */}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/users"
          element={<Users />}
        />

        <Route
          path="/roles"
          element={<Roles />}
        />

        <Route
          path="/departments"
          element={<Departments />}
        />
      </Route>

      {/* مسیرهای نامعتبر */}
      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;