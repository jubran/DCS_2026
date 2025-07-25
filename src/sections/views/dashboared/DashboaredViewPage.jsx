
import React from 'react';
import Container from "@mui/material/Container";
import { useSettingsContext } from "src/components/settings";
import EventsViewPage from "./eventsView/index";
import PlantStatusPage from "./plantStatusView/PlantStatusPage";


export default function DashboaredViewPage() {
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
     
        <PlantStatusPage />
        <EventsViewPage />
      </Container>
    </>
  );
}
