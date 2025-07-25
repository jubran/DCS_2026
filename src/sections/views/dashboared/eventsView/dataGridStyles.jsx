import { grey } from "@mui/material/colors";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { minHeight, textAlign } from "@mui/system";
import { gridClasses } from "@mui/x-data-grid";

export const dataGridStyles = {
  "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
  "&.MuiDataGrid-root .MuiDataGrid-virtualScroller":{
    minHeight:"250px !important",
    display: "flex",
    alignProperty: "center !important",
  },
  "& .dcs-data-theme-cell": {
    fontFamily: "Public Sans, sans-serif",
    fontWeight: "bold",
    color: "#1a3e72",
    justifyContent: "center",
  },
  "& .dcs-data-theme-cell-left": {
    fontFamily: "Public Sans, sans-serif",
    fontWeight: "bold",
    color: "#1a3e72",
    justifyContent: "right",
    textAlign: "right",
    paddingLeft: "10px",
    whiteSpace: "normal !important",
    minHeight: "200px",
  },
  [`& .${gridClasses.row}`]: {
    bgcolor: (theme) => (theme.palette.mode === "light" ? grey[200] : grey[900]),
  },
  textTransform: "uppercase",
};