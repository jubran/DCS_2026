import { Helmet } from "react-helmet-async";

import Wcm from "src/sections/forms/wcm";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Forms: WCM Forms</title>
      </Helmet>

      <Wcm />
    </>
  );
}
