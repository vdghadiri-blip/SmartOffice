import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Departments from "../pages/Departments";
import Roles from "../pages/Roles";

import Letters from "../features/letters/pages/Letters";
import Inbox from "../features/letters/pages/Inbox";
import Sent from "../features/letters/pages/Sent";
import SendLetter from "../features/letters/pages/SendLetter";
import LetterDetails from "../features/letters/pages/LetterDetails";

import Layout from "../layouts/Layout";
import PrivateRoute from "./PrivateRoute";


function AppRoutes() {


return (

<Routes>


{/* صفحه ورود */}

<Route

path="/login"

element={<Login />}

/>



{/* صفحات اصلی */}

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



{/* نامه ها */}

<Route

path="/letters"

element={<Letters />}

/>



<Route

path="/letters/inbox"

element={<Inbox />}

/>



<Route

path="/letters/sent"

element={<Sent />}

/>



<Route

path="/letters/send"

element={<SendLetter />}

/>



<Route

path="/letters/:id"

element={<LetterDetails />}

/>


</Route>




{/* مسیر پیش فرض */}

<Route

path="/"

element={<Navigate to="/dashboard" replace />}

/>




{/* مسیر اشتباه */}

<Route

path="*"

element={<Navigate to="/dashboard" replace />}

/>


</Routes>

);

}


export default AppRoutes;