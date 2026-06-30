import { Routes, Route } from "react-router-dom";


import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Layout from "../layouts/Layout";
import PrivateRoute from "./PrivateRoute";
import Users from "../pages/Users";


function AppRoutes(){


return(

<Routes>


<Route 
path="/" 
element={<Login/>}
/>



<Route 
element={
<PrivateRoute>
<Layout/>
</PrivateRoute>
}
>


<Route 
path="/dashboard" 
element={<Dashboard/>}
/>

<Route 
path="/users"
element={<Users/>}
/>
</Route>



</Routes>

)


}


export default AppRoutes;