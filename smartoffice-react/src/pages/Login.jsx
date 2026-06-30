import { useState } from "react";

import api from "../api/axios";

import styles from "./Login.module.css";



function Login(){


const [username,setUsername]=useState("");

const [password,setPassword]=useState("");




const handleLogin = async()=>{


try{


const response = await api.post("/Auth/login",{

username,
password

});



const data=response.data;



localStorage.setItem("token",data.token);

localStorage.setItem("username",data.username);

localStorage.setItem("role",data.role);



window.location.href="/dashboard";



}
catch(error){


alert("نام کاربری یا رمز اشتباه است");


}



}



return(


<div className={styles.container}>


<div className={styles.box}>


<h1 className={styles.title}>

Smart Office Login

</h1>



<input

className={styles.input}

placeholder="نام کاربری"

value={username}

onChange={(e)=>setUsername(e.target.value)}

/>



<input

className={styles.input}

placeholder="رمز عبور"

type="password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>



<button

className={styles.button}

onClick={handleLogin}

>

ورود

</button>



</div>


</div>


)


}


export default Login;