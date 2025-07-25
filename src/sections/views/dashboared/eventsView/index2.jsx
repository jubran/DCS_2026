
// import Card from "@mui/material/Card";
// import ShowDataGrid from "./ShowDataGrid";
// import { CardHeader } from "@mui/material";
// import { DataGridToolbar } from "./DataGridToolbar";
// import { useState } from "react";
// import dayjs from "dayjs";
// import { _rows } from "src/_mock";
// import useSWR from "swr";

// export const fetcher = async (...args) =>
//   fetch(...args).then((res) => res.json());

// export default function EventsViewPage() {
//   const [dateValue, setDateValue] = useState(dayjs(Date.now()));
//   const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()).format("YYYY-MM-DD"));
//   const [ dateFormatted, setDateFormatted] = useState(dateValue.format("YYYY-MM-DD"))
//   const date = dateValue.format("YYYY-MM-DD")
//   const {
//     data,
//     isLoading,
//     isError: error,
//   } = useSWR(`/api/api.php?dateQuery=${date}`, fetcher,
//     { revalidateOnFocus: false, revalidateOnReconnect: false }
//   );

//   // if (error) {
//   //   return <p>Failed to fetch</p>;
//   // }

//   // if (isLoading) {
//   //   return <p>Loading...</p>;
//   // }
//   // const { data, error } = useSWR(`/api/api.php?dateQuery=${date}`, fetcher);
//   if (error) {
//     return <p> {error.message}</p>;
//   }
//   if (!data) {
//     return <p>Loodings</p>;
//   }
//   const handleOnBeforeGetContent = () => {
//     // Implement your print logic here
//     console.log("Printing...");
//   };

//   const renderInput = (
//     <Card
//       sx={{
//         flexGrow: { md: 1 },
//         display: { md: "flex" },
//         flexDirection: { md: "column" },
//       }}
//     >
//       <CardHeader title="ملخص هذا اليوم" />
//       <DataGridToolbar
//         dateValue={dateValue}
//         setDateValue={setDateValue}
//         setDate={setSelectedDate}
//         handleOnBeforeGetContent={handleOnBeforeGetContent}
//       />
//       <ShowDataGrid  rows1={data} />
//     </Card>
//   );
//   return <>{renderInput}</>;
// }