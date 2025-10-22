import {
  Box,
  Card,
  CardHeader,
  Typography,
  Stack,
  Divider,
  Fade,
} from "@mui/material"; // استيراد Fade
import Scrollbar from "src/components/scrollbar";
import { useTabs } from "src/utils/useTabs";
import { ItemLocations } from "../SubViews/ItemLocations";
import { _locations } from "src/_mock";
import { Tabs } from "../SubViews/Tabs";
import { useMemo } from "react";
import { tr } from "date-fns/locale";
import { border, display } from "@mui/system";

// ... دالة prepareLocationData تبقى كما هي ...
const prepareLocationData = (tanks, cotp) => {
  // ... (منطق فصل البيانات يبقى كما هو) ...
  const normalizedTanks = tanks.map((t) => ({
    ...t,
    location: t.location ? t.location.trim() : "",
  }));

  const dieselTank = normalizedTanks.filter((t) =>
    ["TANK#6", "TANK#7", "TANK#8", "TANK#9", "TANK#11"].includes(t.location)
  );
  const crudeTank = normalizedTanks.filter((t) =>
    [
      "TANK#10",
      "TANK#12",
      "TANK#13",
      "TANK#14",
      "TANK#15",
      "TANK#16",
      "TANK#17",
      "TANK#18",
    ].includes(t.location)
  );

  const skid1_cotp = cotp.filter(
    (u) => u.location && u.location.trim().toLowerCase().includes("skid#1")
  );
  const skid2_cotp = cotp.filter(
    (u) => u.location && u.location.trim().toLowerCase().includes("skid#2")
  );

  return { dieselTank, crudeTank, skid1_cotp, skid2_cotp };
};
// ---------------------------------------------

export function TabsCard({
  title,
  subheader,
  units = [],
  cotp = [],
  fus = [],
  ft6 = [],
  tanks = [],
  sx,
  ...other
}) {
  const tabs = useTabs("units");
  const currentTabValue = tabs.value;

  const { dieselTank, crudeTank, skid1_cotp, skid2_cotp } = useMemo(() => {
    return prepareLocationData(tanks, cotp);
  }, [tanks, cotp]);

  const allLocationData = useMemo(
    () => ({
      units,
      fus,
      ft6,
      dieselTank,
      crudeTank,
      cotp_skid1: skid1_cotp,
      cotp_skid2: skid2_cotp,
      cotp,
    }),
    [units, fus, ft6, dieselTank, crudeTank, skid1_cotp, skid2_cotp, cotp]
  );

  const filteredData = _locations.name[currentTabValue] || [];
  const isCotpTab = currentTabValue === "fts_c";

  const renderItemLocations = (data) =>
    data.map((item, index) => (
      <ItemLocations
        key={index}
        item={item}
        allLocationData={allLocationData}
      />
    ));

  const commonContentSx = {
    transition: "all 7s fade-in-out",

    p: 2,
    gap: 1,
    minWidth: 360,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  };

  const renderMainContent = () => (
    <Fade in={!isCotpTab} timeout={600}>
      <Box sx={commonContentSx}>
        {filteredData.length > 0 ? (
          renderItemLocations(filteredData)
        ) : (
          <Typography variant="body2" color="text.secondary">
            لاتوجد بيانات في هذا القسم
          </Typography>
        )}
      </Box>
    </Fade>
  );

  const renderCotpSkidView = () => (
    <Fade in={isCotpTab} timeout={600}>
      <Stack spacing={3} sx={{ p: 2, minWidth: 360 }}>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            <Box component="span" fontWeight="bold" color="primary.main">
              SKID #1
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mr: 1, display: "block" }}
            >
              ({skid1_cotp.length} منقيات )
            </Typography>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              pt: 1,
              borderLeft: "4px solid",
              borderColor: "divider",
              pl: 1,
            }}
          >
            {renderItemLocations(skid1_cotp.map((u) => u.location))}
          </Box>
        </Box>
        <Divider />
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            <Box component="span" fontWeight="bold" color="primary.main">
              SKID #2
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mr: 1, display: "block" }}
            >
              ({skid2_cotp.length} منقيات )
            </Typography>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              pt: 1,
              borderLeft: "4px solid",
              borderColor: "divider",
              pl: 1,
            }}
          >
            {renderItemLocations(skid2_cotp.map((u) => u.location))}
          </Box>
        </Box>
      </Stack>
    </Fade>
  );

  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
      <Tabs value={tabs.value} onChange={tabs.onChange} />

    
        <Box sx={{ position: "relative", minHeight: "100%" }}>
          {currentTabValue !== "fts_c" && renderMainContent()}
          {currentTabValue === "fts_c" && renderCotpSkidView()}
        </Box>

    </Card>
  );
}
