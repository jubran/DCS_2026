import { Grid } from "@mui/material";
import useSWR from "swr";
import { useSettingsContext } from "src/components/settings";
import { _locations } from "src/_mock";
import { TabsCard } from "src/sections/views/dashboared/plantStatusView/Views/TabsCard";

const fetcher = ( url ) => fetch( url ).then( ( res ) => res.json() );

export default function PlantStatusPage ()
{
  const settings = useSettingsContext();

  const {
    data: unitData,
    error: unitError,
    isLoading: unitLoading,
  } = useSWR( "/api/api.php?action=getUnitStatus", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  } );

  const {
    data: ftpData,
    error: ftpError,
    isLoading: ftpLoading,
  } = useSWR( "/api/api.php?action=getCOTPStatus", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  } );

  const {
    data: fuData,
    error: fuError,
    isLoading: fuLoading,
  } = useSWR( "/api/api.php?action=getFUStatus", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  } );

  const {
    data: ft6Data,
    error: ft6Error,
    isLoading: ft6Loading,
  } = useSWR( "/api/api.php?action=getFT6Status", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  } );

  const {
    data: tanksData,
    error: tanksError,
    isLoading: tanksLoading,
  } = useSWR( "/api/api.php?action=getTankStatus", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  } );

  if ( unitLoading || ftpLoading || fuLoading || ft6Loading || tanksLoading )
    return <div>جاري تحميل البيانات...</div>;

  if ( unitError || ftpError || fuError || ft6Error || tanksError )
    return <div>حدث خطأ أثناء تحميل البيانات</div>;

  return (
    <Grid container spacing={ 3 }>
      <Grid item xs={ 12 }>
        <TabsCard
          title="الوضع الحالي للمحطة"
          units={ unitData }
          cotp={ ftpData }
          fus={ fuData }
          ft6={ ft6Data }
          tanks={ tanksData }
          root={ [ _locations ] }
          sx={ { height: "auto", bgcolor: settings.themeMode === "dark" ? "grey.800" : "grey.100" } }
        />
      </Grid>
    </Grid>
  );
}
