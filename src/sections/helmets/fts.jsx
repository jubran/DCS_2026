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
} from "@mui/material";
import { useState } from "react";
import { alpha } from "@mui/material/styles";


import { useSettingsContext } from "src/components/settings";

const SP_STATUSES = ["IN SERVICE", "STAND BY", "SHUTDOWN"];
const initialSystems = [
  {
    id: "crude-fts",
    name: "CRUDE FTS - SKID #1",
    sps: Array.from({ length: 5 }, (_, i) => ({
      id: `sp${i + 1}`,
      name: `SP#${i + 1}`,
      status: "STAND BY",
    })),
  },
  {
    id: "crude-fts-2",
    name: "CRUDE FTS - SKID #2",
    sps: Array.from({ length: 4 }, (_, i) => ({
      id: `sp${i + 1}`,
      name: `SP#${i + 1}`,
      status: "STAND BY",
    })),
  },
  {
    id: "29pps-fts",
    name: "29PPS FTS",
    sps: Array.from({ length: 6 }, (_, i) => ({
      id: `sp${i + 1}`,
      name: `SP#${i + 1}`,
      status: "STAND BY",
    })),
  },
  {
    id: "23pps-fts",
    name: "23PPS FTS",
    sps: Array.from({ length: 8 }, (_, i) => ({
      id: `sp${i + 1}`,
      name: `SP#${i + 1}`,
      status: "STAND BY",
    })),
  },
];


// ----------------------------------------------------------------------

export default function FtsView() {
  const settings = useSettingsContext();
 const [systems, setSystems] = useState(initialSystems);

  const handleChangeStatus = (systemId, spId, newStatus) => {
    setSystems((prev) =>
      prev.map((system) =>
        system.id === systemId
          ? {
              ...system,
              sps: system.sps.map((sp) =>
                sp.id === spId ? { ...sp, status: newStatus } : sp
              ),
            }
          : system
      )
    );
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Typography variant="h4"> FTS </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: "auto",
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
      {systems.map((system) => (
        <Card key={system.id} sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {system.name}
            </Typography>

            <Box sx={{ overflowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell  sx={{ width: "250px" }}>Filter</TableCell>
                    <TableCell  sx={{ width: "250px" }}>Status</TableCell>
                    <TableCell>Change Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {system.sps.map((sp) => (
                    <TableRow key={sp.id}>
                      <TableCell>{sp.name}</TableCell>
                      <TableCell>{sp.status}</TableCell>
                      <TableCell>
                        <Select
                          size="small"
                          value={sp.status}
                          onChange={(e) =>
                            handleChangeStatus(system.id, sp.id, e.target.value)
                          }
                        >
                          {SP_STATUSES.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>
      ))}
      </Box>
    </Container>
  );
}
