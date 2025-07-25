import { Helmet } from "react-helmet-async";

import SortUnits from "src/sections/sequence/sortUnits";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Sequence: Units </title>
      </Helmet>

      <SortUnits />
    </>
  );
}
