import { Box, Card, CardHeader, Typography } from "@mui/material";
import Scrollbar from "src/components/scrollbar";
import { useTabs } from "src/utils/useTabs";
import { ItemLocations } from "../SubViews/ItemLocations";
import { _locations } from "src/_mock";
import { Tabs } from "../SubViews/Tabs";

export function TabsCard({ title, subheader, list = [], data = [], sx, ...other }) {
  const tabs = useTabs("units");

  // Filter the data based on the selected tab
  const filteredData = _locations.name[tabs.value] || [];
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
      <Tabs value={tabs.value} onChange={tabs.onChange} />
      <Scrollbar sx={{ minHeight: 384 }}>
        <Box sx={{ p: 3, gap: 3, minWidth: 360, display: "flex", flexWrap: "wrap",justifyContent:"flex-start" }}>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => <ItemLocations key={index} item={item} />)
          ) : (
            <Typography variant="body2" color="text.secondary">
              لاتوجد بيانات في هذا القسم
            </Typography>
          )}
        </Box>
      </Scrollbar>
    </Card>
  );
}