import {
    DataGrid
} from "@mui/x-data-grid";

import {
    Button
} from "@mui/material";

import {
    useNavigate
} from "react-router-dom";



function LetterTable({
    rows = [],
    loading = false
}) {


    const navigate = useNavigate();



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


        // ستون جدید
        {
            field: "action",
            headerName: "عملیات",
            width: 120,

            sortable: false,

            renderCell: (params) => (

                <Button

                    variant="contained"

                    size="small"

                    onClick={() =>
                        navigate(`/letters/${params.row.id}`)
                    }

                >
                    مشاهده

                </Button>

            )

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