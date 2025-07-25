import { Helmet } from "react-helmet-async";

import PrivateDiscution from "src/sections/helmets/private_discution";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Discutions</title>
      </Helmet>

      <PrivateDiscution />
    </>
  );
}
