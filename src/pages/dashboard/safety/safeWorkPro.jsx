import { Helmet } from "react-helmet-async";

import SafeWorkPro from "src/sections/safety/safeWorkPro";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Safety: Safe Work Pro</title>
      </Helmet>

      <SafeWorkPro />
    </>
  );
}
