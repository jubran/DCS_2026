import { Helmet } from "react-helmet-async";

import SearchCars from "src/sections/search/searchCars";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Search: Operation Vehicle</title>
      </Helmet>

      <SearchCars />
    </>
  );
}
