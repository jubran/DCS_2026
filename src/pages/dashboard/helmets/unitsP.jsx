import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Helmet } from "react-helmet-async";
import { useSettingsContext } from "src/components/settings";

import UnitsView from "src/sections/helmets/units";
import UnitManagerForm from "src/sections/views/Units/UnitManagerForm";

// ----------------------------------------------------------------------

export default function UnitManager() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Units</title>
      </Helmet>
      <UnitManagerForm />
      {/* <UnitsView /> */}
    </>
  );
}

