import axios from "axios";


const api = axios.create({

    baseURL: "http://localhost:5070/api"

});



// قبل از هر درخواست
api.interceptors.request.use(

    config => {


        const token =
            localStorage.getItem("token");


        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        return config;

    }


);


export default api;

//تـــــــــــــــــــوضیح کـــــــــــــد

// خط اول
// import axios from "axios";
// یعنی چه؟

// کلمه import یعنی:

// این کتابخانه را وارد برنامه کن تا بتوانم از آن استفاده کنم.

// اینجا کتابخانه‌ای به نام axios را وارد کردیم.

// Axios کارش این است که از React به سرور درخواست بفرستد.

//     مثلاً

// React---------> API
// axios

// اگر Axios نباشد باید از fetch استفاده کنیم که کمی سخت‌تر است.

// خط دوم
// const api = axios.create({

//     اینجا یک شیء(Object) جدید از Axios ساخته‌ایم.

// مثل این است که بگویی

// از روی کارخانه Axios یک ماشین مخصوص پروژه من بساز.

// اگر مستقیماً از axios استفاده کنیم هر بار باید آدرس سرور را بنویسیم.

//         مثلاً

// axios.get("http://localhost:5070/api/users");

//     ولی وقتی create کنیم فقط یک بار تنظیم می‌کنیم.

// داخل create
// baseURL: "http://localhost:5070/api"

// یعنی:

//         آدرس اصلی همه درخواست‌ها این باشد.

// از این به بعد اگر بنویسی

// api.get("/users")

// در واقع Axios خودش تبدیل می‌کند به

// http://localhost:5070/api/users

//         یا

// api.post("/login")

// می‌شود

// http://localhost:5070/api/login

//         دیگر لازم نیست هر بار کل آدرس را بنویسی.

// این قسمت
// });

// فقط یعنی تنظیمات create تمام شد.

// حالا مهم‌ترین قسمت
// api.interceptors.request.use(

//     این قسمت را اکثر برنامه‌نویس‌های تازه‌کار نمی‌فهمند.

// اما خیلی ساده است.

//     کلمه

// interceptor

// یعنی

// رهگیر

// یا

// نگهبان

// فرض کن همه درخواست‌ها باید از یک در عبور کنند.

//     React

// |

//    |

// نگهبان(Interceptor)

// |

//    |

// Server

// هر درخواستی قبل از رفتن به سرور از اینجا رد می‌شود.

//     request
// request

// یعنی

// درخواست‌هایی که می‌خواهند ارسال شوند.

// Axios دو نوع interceptor دارد.

//     یکی

// request

// قبل از ارسال

// یکی

// response

// بعد از دریافت پاسخ

// use
//         .use(

//             یعنی

// از این رهگیر استفاده کن.

// این قسمت
// config => {

// اینجا یک تابع است.

// هر بار که درخواست ارسال می‌شود،

// Axios اطلاعات درخواست را داخل

//                 config

// قرار می‌دهد.

//                     مثلاً

//                 URL

//                 Method

//                 Headers

//                 Body

// همه داخل config هستند.

// مثل این

//                 config

//                 {

//                     url: "/users",

//                         method: "GET",

//                             headers: { },

//                     data: null

//                 }
// این قسمت
//                 const token =
//                     localStorage.getItem("token");

//                 یعنی

// از حافظه مرورگر

//                 localStorage

// توکنی که قبلاً ذخیره کرده‌ای را بخوان.

// مثلاً بعد از Login

// شاید این کار را کرده باشی

//                 localStorage.setItem("token", result.token);

// بعداً اینجا دوباره آن را برمی‌داریم.

// این قسمت
//                 if (token) {

//                     یعنی

// اگر Token وجود داشت.

// اگر Login نکرده باشی

//                     token

//                         =

//                         null

//                     می‌شود.

// پس Header اضافه نمی‌شود.

// این قسمت
//                     config.headers.Authorization =

//                         اینجا داریم Header جدید اضافه می‌کنیم.

// قبل از ارسال درخواست.

// در واقع داریم می‌گوییم

//                     Header

//                     Authorization

// را برابر فلان مقدار قرار بده.

// این قسمت
//                         `Bearer ${token}`;

// اینجا از Template String استفاده شده است.

// فرض کن Token این باشد

//                     123456789

// آن وقت نتیجه می‌شود

// Bearer 123456789

// در Header این شکلی ارسال می‌شود

//                     Authorization

// Bearer 123456789

// این همان چیزی است که ASP.NET Core انتظار دارد.

// وقتی در Web API نوشته‌ای

//                     [Authorize]

// دات‌نت این Header را می‌خواند.

// اگر Token معتبر باشد

// اجازه ورود می‌دهد.

// اگر معتبر نباشد

//                     401 Unauthorized

//                     برمی‌گرداند.

// این قسمت
//                 }

// پایان شرط.

// این قسمت
//                 return config;

// این یکی خیلی مهم است.

// بعد از اینکه Header را اضافه کردی،

// باید درخواست را دوباره به Axios برگردانی.

// اگر این را ننویسی

//                 return config;

// Axios اصلاً درخواست را ارسال نمی‌کند.

// پس این خط یعنی

// درخواست آماده است، ادامه بده و آن را به سرور بفرست.

// این قسمت
// );

// پایان تعریف Interceptor.

// آخرین خط
// export default api;

// یعنی

// این شیء api را در اختیار فایل‌های دیگر قرار بده.

// حالا هر جای پروژه می‌توانی بنویسی

// import api from "../services/api";

// و بعد

// api.get("/users");

// یا

// api.post("/auth/login", data);

// Bearer یعنی چه؟

// Bearer یک کلمه استاندارد در پروتکل HTTP است.

//     یعنی

// دارنده این توکن.

// یعنی سرور می‌فهمد

// من یک Bearer Token برایت فرستاده‌ام.

// مثل کارت ملی.

