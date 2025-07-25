import { Helmet } from "react-helmet-async";

import SearchOperating from "src/sections/search/searchOperating";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Search: Operating </title>
      </Helmet>

      <SearchOperating />
    </>
  );
}
