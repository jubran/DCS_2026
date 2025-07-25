import React, { useCallback } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

import Iconify from "src/components/iconify";
import { useSettingsContext } from "src/components/settings";

// ----------------------------------------------------------------------

export default function HomeView1() {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: false,
      sortable: false,
    },
    {
      type: "actions",
      field: "actions",
      headerName: " ",
      align: "right",
      headerAlign: "right",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          onClick={() => handleEditRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => {
            handleEditRow(params.row.id);
          }}
          sx={{ color: "error.main" }}
        />,
      ],
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  const settings = useSettingsContext();
  const router = useRouter();
  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.product.edit(id));
    },
    [router],
  );
  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Typography variant="h4"> home </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          // bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <DataGrid
          checkboxSelection
          disableRowSelectionOnClick
          rows={rows}
          columns={columns}
          // loading={rows}
          getRowHeight={() => "auto"}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </Box>
    </Container>
  );
}
