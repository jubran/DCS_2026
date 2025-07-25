import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
// import Test from "../product/view/test";
import Test1 from "./test1";

export default function DatePic() {
  const [date, setDate] = useState(null);
  const [dateValue, setValue] = useState(dayjs(Date.now()));
  console.log(dateValue.format("YYYY-MM-DD"));
  console.log(date);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="التاريخ"
          value={dateValue}
          format="YYYY-MM-DD"
          onChange={(newValue) => setDate(newValue.format("YYYY-MM-DD"))}
          variant="subtitle"
          slotProps={{ textField: { size: "small" } }}
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "16px",
              fontWeight: "bold",
            },
          }}
        />
      </LocalizationProvider>
      ,<Test1 id={date} />
    </div>
  );
}
