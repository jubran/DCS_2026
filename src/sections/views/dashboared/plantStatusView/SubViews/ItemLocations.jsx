import { Icon } from "@iconify/react";
import { Box, Avatar, Typography, Stack, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { secondaryFont } from "src/theme/typography";

export function ItemLocations({ item, sx, units = [], fus = [], cotp = [], ft6 = [], dieselTank = [] , crudeTank = [], ...other }) {
  const [getData, setData] = useState(null);
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

useEffect(() => {
  if (!item) return;

  const trimmedItem = item.trim();

  let matchedUnit = null;

  if (trimmedItem.startsWith("FUS#")) {
    const itemNumber = trimmedItem.replace(/[^0-9]/g, "");
    matchedUnit = fus.find(
      (u) =>
        u.location === `FUS#${itemNumber}` ||
        u.location === `FUS#${itemNumber}(A)` ||
        u.location === `FUS#${itemNumber}(B)`
    );
  } else if (trimmedItem.startsWith("SP#")) {
    const itemNumber = trimmedItem.replace(/[^0-9]/g, "");
    matchedUnit = ft6.find((u) => {
      const ftMatch = u.location.match(/SP#(\d+)/);
      return ftMatch && ftMatch[1] === itemNumber;
    });
  } else if (trimmedItem.startsWith("TANK#")) {
    matchedUnit =
      dieselTank.find((u) => u.location.trim() === trimmedItem) ||
      crudeTank.find((u) => u.location.trim() === trimmedItem);
  } else {
    // fallback for general units or cotp
    matchedUnit =
      units.find((u) => u.location === trimmedItem) ||
      cotp.find((u) => u.location === trimmedItem);
  }

  setData(matchedUnit || null);
}, [item, units, fus, cotp, ft6, dieselTank, crudeTank]);

  const getShadowColor = (status) => {
    switch (status) {
      case "In Service":
        return "rgba(0, 255, 0, 0.5)";
      case "Stand By":
        return "rgba(255, 165, 0, 0.5)";
      case "Shutdown":
        return "rgba(255, 0, 0, 0.5)";
      default:
        return "rgba(128, 128, 128, 0.3)";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "In Service":
        return "material-symbols:check-circle";
      case "Stand By":
        return "material-symbols:pause-circle";
      default:
        return "mdi:help-circle";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Service":
        return "green";
      case "Stand By":
        return "orange";
      default:
        return "red";
    }
  };

  return (
    <Box
      sx={[
        {
          gap: 2,
          display: "flex",
          alignItems: "center",
          padding: "6px",
          alignItems: "stretch",
          border: hover
            ? `2px dashed ${getData?.status1 === "In Service" ? "green" : "orange"}`
            : "2px solid transparent",
          borderRadius: 1,
          transition: "border 0.3s ease",
          ...sx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...other}
    >
      <Avatar
        variant="rounded"
        sx={{
          p: 1,
          width: 48,
          height: 48,
          bgcolor: getStatusColor(getData?.status1),
          color: "white",
        }}
      >
        <Icon
          icon={getStatusIcon(getData?.status1)}
          color="white"
          width="28"
          height="28"
        />
      </Avatar>

      <div>
        <Box
          sx={{
            mb: 1,
            gap: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              px: 1,
              boxShadow: `0 0 90px 30px ${getShadowColor(getData?.status1)}`,
              borderRadius: "4px",
            }}
          >
            <Typography variant="subtitle2" noWrap fontFamily={secondaryFont}>
              {item}
            </Typography>
          </Box>

          <Tooltip
            title={
              getData?.status1 === "In Service"
                ? "إيقاف الوحدة"
                : "تشغيل أو تحويل الوحدة"
            }
            PopperProps={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 10],
                  },
                },
              ],
            }}
            sx={{
              "& .MuiTooltip-tooltip": {
                backgroundColor: "orange",
                color: "white",
                borderRadius: "4px",
                padding: "8px",
              },
            }}
          >
            <Typography sx={{ display: "flex" }}>
              <Icon
                icon={
                  getData?.status1 === "In Service"
                    ? "ph:plugs-connected-fill"
                    : "fluent:plug-connected-add-20-filled"
                }
                fontSize="30px"
                color={getData?.status1 === "In Service" ? "orange" : "green"}
              />
            </Typography>
          </Tooltip>
        </Box>

        <Stack
          divider={
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                bgcolor: "text.disabled",
              }}
            />
          }
          sx={{
            gap: 1,
            flexDirection: "row",
            alignItems: "center",
            typography: "caption",
          }}
        >
          <Box sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
            <Typography variant="uppercase" color="text.secondary">
              {getData?.status1 || "No Data"}
            </Typography>
          </Box>
        </Stack>
      </div>
    </Box>
  );
}
