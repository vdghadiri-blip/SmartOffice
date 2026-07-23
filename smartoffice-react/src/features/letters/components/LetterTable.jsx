import {
    DataGrid
} from "@mui/x-data-grid";


function LetterTable({
    rows = [],
    loading = false
}) {


    const columns = [

        {
            field: "subject",
            headerName: "موضوع",
            flex: 1,
        },


        {
            field: "content",
            headerName: "متن",
            flex: 2,
        },


        {
            field: "fromUser",
            headerName: "فرستنده",
            flex: 1,
        },


        {
            field: "toUser",
            headerName: "گیرنده",
            flex: 1,
        },


        {
            field: "status",
            headerName: "وضعیت",
            flex: 1,
        },


        {
            field: "createdAt",
            headerName: "تاریخ",
            flex: 1.2,

            valueGetter: (value) =>
                value
                ? new Date(value).toLocaleDateString("fa-IR")
                : "",
        },

    ];



    return (

        <div
            style={{
                height: 500,
                width: "100%"
            }}
        >

            <DataGrid

                rows={rows}

                columns={columns}

                loading={loading}

                getRowId={(row)=>row.id}

                pageSizeOptions={[5,10,20]}

                initialState={{
                    pagination:{
                        paginationModel:{
                            pageSize:10,
                        }
                    }
                }}

            />

        </div>

    );

}


export default LetterTable;