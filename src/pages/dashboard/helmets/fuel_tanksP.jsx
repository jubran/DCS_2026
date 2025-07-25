import { Helmet } from "react-helmet-async";

import FuelTanksView from "src/sections/helmets/fuel_tanks";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Fuel Tanks</title>
      </Helmet>

      <FuelTanksView />
    </>
  );
}
