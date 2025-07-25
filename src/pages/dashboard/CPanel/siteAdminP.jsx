import { Helmet } from "react-helmet-async";

import SiteAdminCP from "src/sections/CPanel/siteAdmin";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Administration: Site Control Panel</title>
      </Helmet>

      <SiteAdminCP />
    </>
  );
}
