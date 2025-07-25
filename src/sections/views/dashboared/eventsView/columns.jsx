import { GridActionsCellItem } from "@mui/x-data-grid";
import Iconify from "src/components/iconify";

export const columns = [
  {
    field: "date1",
    headerName: "التاريخ",
    headerAlign: "center",
    cellClassName: "dcs-data-theme-cell",
    filterable: false,
    disableColumnMenu: true,
    sortable: false,
    width: 100,
  },
  {
    field: "status1",
    headerName: "الحالة",
    headerAlign: "center",
    cellClassName: "dcs-data-theme-cell",
    width: 100,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      const color = {
        "In Service": "green",
        Shutdown: "red",
        "Stand By": "blue",
      }[params.value];
      return <div style={{ color }}>{params.value}</div>;
    },
  },
  {
    field: "action",
    headerName: "الوصف",
    headerAlign: "right",
    cellClassName: "dcs-data-theme-cell-left",
    width: 400,
    flex: 1,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
  },
  {
    field: "time1",
    headerName: "الوقت",
    headerAlign: "center",
    cellClassName: "dcs-data-theme-cell",
    width: 100,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
  },
  {
    field: "location",
    headerName: "الموقع",
    headerAlign: "center",
    cellClassName: "dcs-data-theme-cell",
    width: 130,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
  },
  {
    type: "actions",
    field: "actions",
    headerName: " ",
    align: "right",
    headerAlign: "right",
    width: 40,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    getActions: (params) => [
      <GridActionsCellItem
        showInMenu
        icon={<Iconify icon="solar:eye-bold" />}
        label="التفاصيل"
      />,
      <GridActionsCellItem
        showInMenu
        icon={<Iconify icon="solar:pen-bold" />}
        label="تحديث"
        onClick={() => console.log("Update:", params.row.id)}
      />,
      <GridActionsCellItem
        showInMenu
        icon={<Iconify icon="solar:trash-bin-trash-bold" />}
        label="حذف"
        sx={{ color: "error.main" }}
      />,
    ],
  },
];