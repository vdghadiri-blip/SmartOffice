/************************************************
 *
 * صفحه جزئیات نامه
 *
 * وظایف:
 *
 * 1- دریافت اطلاعات یک نامه
 * 2- نمایش جزئیات نامه
 * 3- تغییر وضعیت نامه به خوانده شده
 *
 ************************************************/


import { useParams } from "react-router-dom";

import {
    useEffect
} from "react";


import {
    Card,
    CardContent,
    Typography,
    CircularProgress
} from "@mui/material";


// API های مربوط به نامه
import {
    useGetLetterQuery,
    useUpdateLetterStatusMutation
} from "../api/lettersApi";


import ForwardLetter from "../components/ForwardLetter";
function LetterDetails() {



    // دریافت شناسه نامه از آدرس
    // مثال:
    // /letters/665abc123

    const { id } = useParams();





    // دریافت اطلاعات نامه از سرور
    //
    // GET /api/Letters/read/{id}

    const {

        data: letter,

        isLoading

    } = useGetLetterQuery(id);







    // Mutation تغییر وضعیت نامه
    //
    // POST /api/Letters/status
    //
    // Unread  ---> Read

    const [

        updateStatus

    ] = useUpdateLetterStatusMutation();







    // بعد از دریافت موفق نامه
    // وضعیت آن را خوانده شده می‌کنیم

    useEffect(() => {



        if (letter && id) {



            updateStatus({


                // شناسه نامه

                letterId: id,



                // وضعیت جدید

                status: "Read",



                // توضیحات ثبت در تاریخچه

                description:
                    "نامه توسط کاربر مشاهده شد"


            });



        }



    }, [letter, id]);








    // نمایش حالت انتظار هنگام دریافت اطلاعات

    if (isLoading)

        return (

            <CircularProgress />

        );









    return (



        <Card>



            <CardContent>




                {/* موضوع نامه */}

                <Typography
                    variant="h5"
                    gutterBottom
                >

                    {letter?.subject}


                </Typography>







                {/* شماره نامه */}

                <Typography sx={{ mt: 2 }}>

                    شماره نامه:

                    {letter?.letterNumber}


                </Typography>


                {/* کامپوننت ارجاع نامه */}

                <ForwardLetter

                    letterId={id}

                />




                {/* شناسه فرستنده */}

                <Typography sx={{ mt: 2 }}>

                    فرستنده:

                    {letter?.senderUserId}


                </Typography>







                {/* شناسه گیرنده */}

                <Typography>

                    گیرنده:

                    {letter?.receiverUserId}


                </Typography>







                {/* تاریخ ایجاد نامه */}

                <Typography sx={{ mt: 2 }}>

                    تاریخ ارسال:


                    {
                        letter?.createdAt

                            ?

                            new Date(
                                letter.createdAt
                            ).toLocaleDateString("fa-IR")

                            :

                            ""

                    }


                </Typography>








                {/* متن نامه */}

                <Typography sx={{ mt: 3 }}>


                    متن نامه:


                </Typography>





                <Typography sx={{ mt: 1 }}>


                    {letter?.content}


                </Typography>






            </CardContent>



        </Card>


    );


}



export default LetterDetails;