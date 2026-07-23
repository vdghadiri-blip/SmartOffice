import LetterTable from "../components/LetterTable";

import {
    useGetInboxLettersQuery
} from "../api/lettersApi";



function Inbox() {


    const {
        data = [],
        isLoading
    } = useGetInboxLettersQuery();



    return (

        <div>

            <h1>
                صندوق ورودی نامه‌ها
            </h1>


            <LetterTable

                rows={data}

                loading={isLoading}

            />


        </div>

    );

}


export default Inbox;