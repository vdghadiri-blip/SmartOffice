/************************************************
 *
 * کامپوننت ارجاع نامه (Forward)
 *
 * وظایف:
 *
 * 1- دریافت لیست کاربران
 * 2- انتخاب کاربر مقصد
 * 3- دریافت توضیحات ارجاع
 * 4- ارسال درخواست Forward
 *
 ************************************************/


import {
    useState
} from "react";


import {
    Card,
    CardContent,
    TextField,
    Button,
    Autocomplete
} from "@mui/material";



import {
    useForwardLetterMutation
} from "../api/lettersApi";



import {
    useGetUsersQuery
} from "../../users/api/usersApi";







function ForwardLetter({ letterId }) {



    // دریافت کاربران سیستم

    const {

        data: users = []

    } = useGetUsersQuery();







    // کاربر انتخاب شده

    const [

        selectedUser,

        setSelectedUser

    ] = useState(null);







    // توضیحات ارجاع

    const [

        description,

        setDescription

    ] = useState("");







    // API Forward

    const [

        forwardLetter,

        {

            isLoading

        }

    ] = useForwardLetterMutation();







    // ارسال نامه

    const handleSubmit = async () => {



        if (!selectedUser)

        {

            alert("لطفاً گیرنده را انتخاب کنید");

            return;

        }





        await forwardLetter({


            // شناسه نامه

            letterId,



            // نام کاربری مقصد

            receiverUsername:
                selectedUser.username,



            // توضیحات

            description


        });




        alert("نامه با موفقیت ارجاع شد");



        setSelectedUser(null);

        setDescription("");

    };








    return (


        <Card sx={{ mt: 3 }}>


            <CardContent>



                {/* انتخاب کاربر مقصد */}

                <Autocomplete


                    options={users}



                    getOptionLabel={(user)=>

                        user.username || ""

                    }



                    value={selectedUser}



                    onChange={(event,newValue)=>{

                        setSelectedUser(newValue);

                    }}



                    renderInput={(params)=>(


                        <TextField

                            {...params}

                            label="انتخاب گیرنده"

                        />


                    )}



                />









                {/* توضیحات ارجاع */}

                <TextField


                    fullWidth


                    multiline


                    rows={3}


                    sx={{ mt:2 }}


                    label="توضیحات ارجاع"


                    value={description}


                    onChange={(e)=>

                        setDescription(
                            e.target.value
                        )

                    }


                />









                {/* دکمه ارسال */}

                <Button


                    sx={{ mt:2 }}


                    variant="contained"


                    disabled={isLoading}



                    onClick={handleSubmit}


                >


                    {

                    isLoading

                    ?

                    "در حال ارسال..."

                    :

                    "ارجاع نامه"

                    }



                </Button>





            </CardContent>


        </Card>


    );


}



export default ForwardLetter;