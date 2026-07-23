import { NavLink } from "react-router-dom";


function Letters() {


return (

<div>

<h1>
مدیریت نامه‌ها
</h1>


<div>

<NavLink to="/letters/inbox">

📥 صندوق ورودی

</NavLink>


<br/>


<NavLink to="/letters/sent">

📤 نامه‌های ارسالی

</NavLink>


<br/>


<NavLink to="/letters/send">

✉ ارسال نامه

</NavLink>


</div>


</div>

);


}


export default Letters;