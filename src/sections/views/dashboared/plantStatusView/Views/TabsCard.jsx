import { Box, Card, CardHeader, Typography } from "@mui/material";
import Scrollbar from "src/components/scrollbar";
import { useTabs } from "src/utils/useTabs";
import { ItemLocations } from "../SubViews/ItemLocations";
import { _locations } from "src/_mock";
import { Tabs } from "../SubViews/Tabs";

export function TabsCard({ title, subheader, root, units = [], cotp = [], fus = [], ft6 = [], tanks = [], sx, ...other }) {
  const tabs = useTabs("units");

  // Filter the data based on the selected tab
  const filteredData = _locations.name[tabs.value] || [];

  // تصفية الدبابات حسب الرقم الصحيح وإزالة الفراغات من النهاية
  const normalizedTanks = tanks.map((t) => ({
    ...t,
    location: t.location.trim(), // إزالة الفراغ من نهاية TANK#6
  }));

  const dieselTank = normalizedTanks.filter((t) =>
    ["TANK#6", "TANK#7", "TANK#8", "TANK#9", "TANK#11"].includes(t.location)
  );
  const crudeTank = normalizedTanks.filter((t) =>
    ["TANK#10", "TANK#12", "TANK#13", "TANK#14", "TANK#15", "TANK#16", "TANK#17", "TANK#18"].includes(t.location)
  );

  
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
      <Tabs value={tabs.value} onChange={tabs.onChange} />
      <Scrollbar sx={{ minHeight: 384 }}>
        <Box
          sx={{
            p: 2,
            gap: 1,
            minWidth: 360,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <ItemLocations
                key={index}
                item={item}
                units={units}
                fus={fus}
                ft6={ft6}
                cotp={cotp}
                crudeTank={crudeTank}
                dieselTank={dieselTank}
              />
            ))
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
