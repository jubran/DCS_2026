import { Dialog, DialogContent } from "@mui/material";
import EventPrint from "../../../helmets/testData/EventPrint";


export default function EventPrintDialog({ isPrinted, setIsPrinted, data, printRef }) {
  return (
    <Dialog
      disablePortal
      fullWidth
      maxWidth={false}
      open={isPrinted}
      onClose={() => setIsPrinted(false)}
      PaperProps={{ sx: { maxWidth: "80%" } }}
    >
      <DialogContent>
        <EventPrint rows1={data} isPrinted={isPrinted} printRef={printRef} />
      </DialogContent>
    </Dialog>
  );
}