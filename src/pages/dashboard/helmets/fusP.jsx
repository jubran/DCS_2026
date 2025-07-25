import { Helmet } from "react-helmet-async";
import FusView from "src/sections/helmets/fus";


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: FUS</title>
      </Helmet>

      <FusView />
    </>
  );
}
