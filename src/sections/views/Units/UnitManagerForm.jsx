import { useLocation } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import { useSettingsContext } from "src/components/settings";
import AppForms from "./AppForms";


export default function UnitManagerForm() {
  const settings = useSettingsContext();
  const location = useLocation();
  const { selectedOperation, location: unitLocation } = location.state || {};

  console.log('Location state:', location.state);

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Units Status
      </Typography>

      {selectedOperation && unitLocation ? (
        <Box>
          <AppForms operationData={location} operationType={selectedOperation} />
        </Box>
      ) : (
        <Box>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            ⚠️ لم يتم تمرير بيانات العملية أو الموقع.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

