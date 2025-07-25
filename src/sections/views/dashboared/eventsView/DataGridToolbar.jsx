import { Button, Stack } from "@mui/material";
import Iconify from "src/components/iconify";
import ShowData from "./ShowData";

export default function DataGridToolbar({ dateValue, setDateValue, setDate, handleOnBeforeGetContent }) {
  return (
    <Stack direction="row" padding={'10px 20px 10px 20px'} alignItems="center" justifyContent="space-between">
      <ShowData dateValue={dateValue} setDateValue={setDateValue} setDate={setDate} />
      <Button
        size="small"
        color="error"
        startIcon={<Iconify icon="gridicons:print" />}
        onClick={handleOnBeforeGetContent}
      >
        طباعة
      </Button>
    </Stack>
  );
}