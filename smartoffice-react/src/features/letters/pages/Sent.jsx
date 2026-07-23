import LetterTable from "../components/LetterTable";

import {
useGetSentLettersQuery
} from "../api/lettersApi";


function Sent(){


const {
data=[],
isLoading
}=useGetSentLettersQuery();



return (

<div>

<h1>
نامه‌های ارسالی
</h1>


<LetterTable

rows={data}

loading={isLoading}

/>


</div>

);


}


export default Sent;