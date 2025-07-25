// import { Button, Dialog, DialogContent } from "@mui/material";
// import { Stack } from "@mui/system";
// import { useReactToPrint } from "react-to-print";
// import {
//   DataGrid,
//   GridActionsCellItem,
//   gridClasses,
//   GridToolbarContainer,
// } from "@mui/x-data-grid";
// import { useCallback, useRef, useState } from "react";
// import EmptyContent from "src/components/empty-content/empty-content";
// import Iconify from "src/components/iconify";

// import { grey } from "@mui/material/colors";
// import EventPrint from "./EventPrint";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

// export default function ShowDataGrid({rows1 }) {
//     const data = rows1
//     const [ isPrinted, setIsPrintred ] = useState( false );
//     const printRef = useRef();
//     const [dateValue, setValue] = useState(dayjs(Date.now()));
//       const [ids, setDate] = useState(dayjs(Date.now()).format("YYYY-MM-DD"));
    
//     const handleOnBeforeGetContent = () =>
//         {
//           setIsPrintred( "false" );
//           setTimeout( () =>
//           {
//             handlePrint();
//           }, 100 );
//         };
//         const handlePrint = useReactToPrint( {
//           content: () => printRef.current,
//           onAfterPrint: () => setIsPrintred( false ),
//         } );
//   const getRowSpacing = useCallback((params) => {
//     return {
//       top: params.isFirstVisible ? 0 : 5,
//       bottom: params.isLastVisible ? 0 : 5,
//     };
//   }, []);

  
//   const columns = [
//     {
//       field: "date1",
//       headerName: "التاريخ",
//       headerAlign: "center",
//       cellClassName: "dcs-data-theme-cell",
//       filterable: false,
//       disableColumnMenu: true,
//       sortable: false,
//       Width: 70,
//     },
//     {
//       field: "status1",
//       headerName: "الحالة",
//       headerAlign: "center",
//       cellClassName: "dcs-data-theme-cell",
//       // flex: 1,
//       disableColumnMenu: true,
//       Width: 100,
//       hideable: false,
//       filterable: false,
//       sortable: false,
//       renderCell: (params) => {
//         if (params.value == "In Service")
//           return <div style={{ color: "green" }}>In Service</div>;
//         if (params.value == "Shutdown")
//           return <div style={{ color: "red" }}>Shutdown</div>;
//         if (params.value == "Stand By")
//           return <div style={{ color: "blue" }}>Stand By</div>;
//       },
//     },
//     {
//       field: "action",
//       headerName: "الوصف",
//       headerAlign: "right",
//       cellClassName: "dcs-data-theme-cell-left ",
//       width: 400,
//       flex: 1,
//       disableColumnMenu: true,
//       filterable: false,
//       sortable: false,
//     },
//     {
//       field: "time1",
//       headerName: "الوقت",
//       headerAlign: "center",
//       cellClassName: "dcs-data-theme-cell",
//       width: 100,
//       disableColumnMenu: true,
//       type: "singleSelect",
//       filterable: false,
//       sortable: false,
//     },
//     {
//       field: "location",
//       headerName: "الموقع",
//       headerAlign: "center",
//       cellClassName: "dcs-data-theme-cell",
//       width: 130,
//       disableColumnMenu: true,
//       filterable: false,
//       sortable: false,
//       editable: false,
//     },
//     {
//       type: "actions",
//       field: "actions",
//       headerName: " ",
//       align: "right",
//       headerAlign: "right",
//       width: 80,
//       sortable: false,
//       filterable: false,
//       disableColumnMenu: true,
//       getActions: (params) => [
//         <GridActionsCellItem
//           showInMenu
//           icon={<Iconify icon="solar:eye-bold" />}
//           label="التفاصيل"
//         />,
//         <GridActionsCellItem
//           showInMenu
//           icon={<Iconify icon="solar:pen-bold" />}
//           label="تحديث"
//           onClick={() => {
//             useAction(params.row.id);
//           }}
//         />,
//         <GridActionsCellItem
//           showInMenu
//           icon={<Iconify icon="solar:trash-bin-trash-bold" />}
//           label="حذف"
//           sx={{ color: "error.main" }}
//         />,
//       ],
//     },
//   ];

//   return (
//     <>
    
//     <DataGrid
//       autoHeight={true}
//       checkboxSelection
//       disableRowSelectionOnClick
//       rows={data}
//       columns={columns}
//       getRowSpacing={getRowSpacing}
//       pageSizeOptions={[5, 10, 25]}
//       initialState={{
//         pagination: {
//           paginationModel: { pageSize: 10 },
//         },
//       }}
//       slots={{
//         toolbar: () => (
//           <>
//             <GridToolbarContainer>
//               <Stack
//                 spacing={1}
//                 flexGrow={1}
//                 direction="row"
//                 alignItems="center"
//                 justifyContent="flex-end"
//               ><ShowData />
//                 <Button
//                   size="small"
//                   color="error"
//                   startIcon={<Iconify icon="gridicons:print" />}
//                   onClick={handleOnBeforeGetContent}
//                 >
//                   طباعة
//                 </Button>
//               </Stack>
//             </GridToolbarContainer>
//           </>
//         ),
//         noRowsOverlay: () => (
//           <EmptyContent title="لاتوجد أحداث لهذا اليوم حتى هذه اللحضة" />
//         ),
//         noResultsOverlay: () => (
//           <EmptyContent title="لم يتم العثور على أحداث" />
//         ),
//       }}
//       sx={{
//         "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
//           outline: "none !important",
//         },
//         "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within ": {
//           outline: "none !important",
//         },
//         "& .dcs-data-theme-cell": {
//           fontFamily: "Public Sans, sans-serif",
//           fontWeight: "bold",
//           color: "#1a3e72",
//           justifyContent: "center",
//         },
//         "& .dcs-data-theme-cell-left": {
//           fontFamily: "Public Sans, sans-serif",
//           fontWeight: "bold",
//           color: "#1a3e72",
//           justifyContent: "right",
//           textAlign: "right",
//           paddingLeft: "10px",
//           whiteSpace: "normal !important",
//         },
//         [`& .${gridClasses.row}`]: {
//           bgcolor: (theme) =>
//             theme.palette.mode === "light" ? grey[200] : grey[900],
//         },
//         textTransform: "Uppercase",
//       }}
//     />
//     <Dialog
//         disablePortal
//         fullWidth
//         maxWidth={ false }
//         open={isPrinted}
//         onClose={ () => setIsPrintred( false ) }
//         PaperProps={ {
//           sx: { maxWidth: "80%" },
//         } }
//       >
//         <DialogContent
//           sx={
//             {
//               // whiteSpace: 'nowrap',
//             }
//           }
//         >
//              <EventPrint rows1={data} isPrinted={isPrinted} printRef={printRef} />

//         </DialogContent>
//       </Dialog>
//     </>

    
//   );
//   function ShowData(){
//     const data = (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <Stack
//     sx={{
//       width: "20%",
//       padding: "10px",
//     }}
//     >
//     <DatePicker
//       label="التاريخ"
//       value={dateValue}
//       format="YYYY-MM-DD"
//       onChange={(newValue) => setDate(newValue.format("YYYY-MM-DD"))}
//       variant="subtitle"
//       slotProps={{ textField: { size: "small" } }}
//       sx={{
//         "& .MuiInputBase-input": {
//           fontSize: "16px",
//           fontWeight: "bold",
//         },
//       }}
//     />
//     </Stack>
//     </LocalizationProvider>
//     )
//     return <>{data}</>
//   }
// }
