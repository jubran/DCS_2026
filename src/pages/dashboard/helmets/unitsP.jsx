import { Helmet } from "react-helmet-async";

import UnitsView from "src/sections/helmets/units";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Units</title>
      </Helmet>

      <UnitsView />
    </>
  );
}
