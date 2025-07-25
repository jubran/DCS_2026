import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useRef, useState } from "react";
import EmptyContent from "src/components/empty-content/empty-content";
import EventPrintDialog from "./EventPrintDialog";
import { dataGridStyles } from "./dataGridStyles";
import { columns } from "./columns";

export default function ShowDataGrid({ rows1 }) {
  const [isPrinted, setIsPrinted] = useState(false);
  const printRef = useRef();

  const getRowSpacing = useCallback((params) => ({
    top: params.isFirstVisible ? 0 : 5,
    bottom: params.isLastVisible ? 0 : 5,
  }), []);

  return (
    <>
      <DataGrid
        autoHeight
        minheight="200px"
        checkboxSelection
        disableRowSelectionOnClick
        rows={rows1}
        columns={columns}
        getRowSpacing={getRowSpacing}
        pageSizeOptions={[5, 8 , 10, 25]}
        initialState={{ pagination: { paginationModel: { pageSize: 8 } } }}
        slots={{
          noRowsOverlay: () => <EmptyContent  title="لاتوجد أحداث" />,
          noResultsOverlay: () => <EmptyContent title="لم يتم العثور على أحداث" />,
        }}
        sx={dataGridStyles}
      />
      <EventPrintDialog isPrinted={isPrinted} setIsPrinted={setIsPrinted} data={rows1} printRef={printRef} />
    </>
  );
}