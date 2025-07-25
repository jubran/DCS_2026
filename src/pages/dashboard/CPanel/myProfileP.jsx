import { Helmet } from "react-helmet-async";

import MyProfileCP from "src/sections/CPanel/myProfile";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Administration: My Profile</title>
      </Helmet>

      <MyProfileCP />
    </>
  );
}
