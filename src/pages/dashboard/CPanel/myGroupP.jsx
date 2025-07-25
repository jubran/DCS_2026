import { Helmet } from "react-helmet-async";

import MyGroupCP from "src/sections/CPanel/myGroup";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Administration: My Group</title>
      </Helmet>

      <MyGroupCP />
    </>
  );
}
