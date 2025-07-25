import { Helmet } from "react-helmet-async";

import SortFTS from "src/sections/sequence/sortFts";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Sequence: Fuel TR plant</title>
      </Helmet>

      <SortFTS />
    </>
  );
}
