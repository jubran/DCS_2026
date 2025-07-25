import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import { useState } from "react";
import { useSettingsContext } from "src/components/settings";


const UNITS = ["GT16", ...Array.from({ length: 12 }, (_, i) => `GT${19 + i}`)];

const MAIN_STATUS = ["IN SERVICE", "STANDBY", "SHUTDOWN"];
const SHUTDOWN_TYPES = ["MO", "PO", "FO"];
const MO_REASONS = [
  "TURBINE WASHING",
  "COMPRESSOR / TURBINE WASHING",
  "OTHER",
];

// ----------------------------------------------------------------------

export default function UnitsView() {
  const settings = useSettingsContext();
 const [units, setUnits] = useState(
    UNITS.map((unit) => ({
      id: unit,
      mainStatus: "STANDBY",
      shutdownType: "",
      moReason: "",
    }))
  );

  const handleChange = (unitId, field, value) => {
    setUnits((prev) =>
      prev.map((u) =>
        u.id === unitId ? { ...u, [field]: value } : u
      )
    );
  };

  // هل نحتاج عرض عمود Shutdown Type؟
  const showShutdownType = units.some((u) => u.mainStatus === "SHUTDOWN");

  // هل نحتاج عرض عمود MO Reason؟
  const showMOReason = units.some(
    (u) => u.mainStatus === "SHUTDOWN" && u.shutdownType === "MO"
  );


  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}>


      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 100 }}>Unit</TableCell>
                <TableCell>Main Status</TableCell>
                {showShutdownType && <TableCell>Shutdown Type</TableCell>}
                {showMOReason && <TableCell>MO Reason</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {units.map((unit) => {
                const isShutdown = unit.mainStatus === "SHUTDOWN";
                const isMO = isShutdown && unit.shutdownType === "MO";

                return (
                  <TableRow key={unit.id}>
                    <TableCell>{unit.id}</TableCell>

                    {/* Main Status */}
                    <TableCell>
                      <Select
                        value={unit.mainStatus}
                        onChange={(e) =>
                          handleChange(unit.id, "mainStatus", e.target.value)
                        }
                        size="small"
                        fullWidth
                      >
                        {MAIN_STATUS.map((s) => (
                          <MenuItem key={s} value={s}>
                            {s}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>

                    {/* Shutdown Type (optional column) */}
                    {showShutdownType && (
                      <TableCell>
                        {isShutdown ? (
                          <Select
                            value={unit.shutdownType}
                            onChange={(e) =>
                              handleChange(unit.id, "shutdownType", e.target.value)
                            }
                            size="small"
                            fullWidth
                          >
                            {SHUTDOWN_TYPES.map((s) => (
                              <MenuItem key={s} value={s}>
                                {s}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    )}

                    {/* MO Reason (optional column) */}
                    {showMOReason && (
                      <TableCell>
                        {isMO ? (
                          <Select
                            value={unit.moReason}
                            onChange={(e) =>
                              handleChange(unit.id, "moReason", e.target.value)
                            }
                            size="small"
                            fullWidth
                          >
                            {MO_REASONS.map((r) => (
                              <MenuItem key={r} value={r}>
                                {r}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
        </Box>
    </Container>
  );
}
