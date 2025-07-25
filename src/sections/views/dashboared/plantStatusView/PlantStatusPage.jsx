
import { Grid } from "@mui/material";
import { useSettingsContext } from "src/components/settings";
import { _JPP, _JPP2, _locations } from "src/_mock";
import {  TabsCard } from "src/sections/views/dashboared/plantStatusView/Views/TabsCard";


export default function PlantStatusPage() {
  const settings = useSettingsContext();
 const data =[_locations].map(item =>  (item))
  return (
   
      <Grid container spacing={3} sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap",}}>
        <Grid item xs={12} sm={12}>
          <TabsCard title="الوضع الحالي لمحطة" list={_JPP2} data={[_locations]} sx={{height:"300px" }}/>
        </Grid>
       
      </Grid>
   
  );
}