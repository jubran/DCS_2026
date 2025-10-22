import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, sortableKeyboardCoordinates, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Container, Typography, Avatar, Paper } from "@mui/material";
import { useSettingsContext } from "src/components/settings";

const ALL_UNITS = [
  { id: 1, name: "GT16" }, { id: 2, name: "GT19" }, { id: 3, name: "GT20" },
  { id: 4, name: "GT21" }, { id: 5, name: "GT22" }, { id: 6, name: "GT23" },
  { id: 7, name: "GT24" }, { id: 8, name: "GT25" }, { id: 9, name: "GT26" },
  { id: 10, name: "GT27" }, { id: 11, name: "GT28" }, { id: 12, name: "GT29" },
  { id: 13, name: "GT30" }
];

const CPS2_IDS = [4, 10, 11, 13];

export default function SortUnits() {
  const settings = useSettingsContext();
  const [allUnits, setAllUnits] = useState(ALL_UNITS);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const getCpsColor = (unit) => 
    CPS2_IDS.includes(unit.id) 
      ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #d97706 70%, #b45309 100%)"
      : "linear-gradient(135deg, #34d399 0%, #10b981 30%, #059669 70%, #047857 100%)";

  const DraggableItem = ({ unit }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: unit.id });
    
    return (
      <Avatar
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        variant="rounded"
        sx={{
          background: getCpsColor(unit),
          color: "#fff",
          width: 80,
          height: 56,
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          transform: CSS.Transform.toString(transform),
          transition,
          cursor: "grab",
          "&:hover": {
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            filter: "brightness(1.1)",
          },
        }}
      >
        {unit.name}
      </Avatar>
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = allUnits.findIndex((i) => i.id === active.id);
    const newIndex = allUnits.findIndex((i) => i.id === over.id);
    setAllUnits(arrayMove(allUnits, oldIndex, newIndex));
  };

  const cps1Units = allUnits.filter((u) => !CPS2_IDS.includes(u.id));
  const cps2Units = allUnits.filter((u) => CPS2_IDS.includes(u.id));

  const UnitBox = ({ units, title, draggable = false }) => (
    <Box sx={{ mt: 4, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", gap: 1 }}>
        {units.map((unit) => (
          draggable ? 
            <DraggableItem key={unit.id} unit={unit} /> :
            <Avatar
              key={unit.id}
              variant="rounded"
              sx={{
                background: getCpsColor(unit),
                color: "#fff",
                width: 80,
                height: 56,
                fontWeight: 500,
                borderRadius: 2,
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              {unit.name}
            </Avatar>
        ))}
      </Box>
    </Box>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Typography variant="h4" gutterBottom>Sequence CPS Units</Typography>

      <Box sx={{
        mt: 3,
        p: 2,
        borderRadius: 2,
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}>
        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <Typography variant="h6" gutterBottom>ALL-CPS</Typography>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={allUnits.map((i) => i.id)} strategy={horizontalListSortingStrategy}>
              <Box sx={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", gap: 1 }}>
                {allUnits.map((unit) => (
                  <DraggableItem key={unit.id} unit={unit} />
                ))}
              </Box>
            </SortableContext>
          </DndContext>
        </Box>
 <Paper sx={{ my: 10,bgcolor: 'divider',display:"flex",flexDirection:"column",justifyContent:"flex-end",paddingRight:"20px",paddingBottom:5}} >
        <UnitBox units={cps1Units} title="CPS-1" />
        <UnitBox units={cps2Units} title="CPS-2" />
        </Paper>
      </Box>
    </Container>
  );
}