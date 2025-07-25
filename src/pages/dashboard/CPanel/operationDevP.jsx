import { Helmet } from "react-helmet-async";

import OperationDevCP from "src/sections/CPanel/operationDev";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Administration: Operation Division</title>
      </Helmet>

      <OperationDevCP />
    </>
  );
}
