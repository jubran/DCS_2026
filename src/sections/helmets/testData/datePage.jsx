import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import { RouterLink } from "src/routes/components";
import { paths } from "src/routes/paths";
import Iconify from "src/components/iconify";
import FusView from "../fus";
import GetEvents from "./getData/getEvents";

export default function ViewDate() {
  const settings = useSettingsContext();

  return (
    <>
      <Container
        maxWidth={settings.themeStretch ? false : "xl"}
        sx={{
          marginTop:'50px',
          flexGrow: 1,
          gap: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {" "}
        <CustomBreadcrumbs
          heading="الرئيسية"
          links={[{ name: "ملخص هذا اليوم" }]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.root}
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              إضافة حدث جديد
            </Button>
          }
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        />
        <FusView />
        <GetEvents />
      </Container>
    </>
  );
}
