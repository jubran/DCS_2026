import { alpha } from "@mui/material/styles";
import { useSettingsContext } from "src/components/settings";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { Box, Paper, Typography, Container } from "@mui/material";

// ---------------------- وحدات GT ----------------------
const ALL_UNITS = [
  { id: 1, name: "GT16" },
  { id: 2, name: "GT19" },
  { id: 3, name: "GT20" },
  { id: 4, name: "GT21" },
  { id: 5, name: "GT22" },
  { id: 6, name: "GT23" },
  { id: 7, name: "GT24" },
  { id: 8, name: "GT25" },
  { id: 9, name: "GT26" },
  { id: 10, name: "GT27" },
  { id: 11, name: "GT28" },
  { id: 12, name: "GT29" },
  { id: 13, name: "GT30" }
];

// CPS-2 IDs
const CPS2_IDS = [4, 10, 11, 13]; // GT21, GT27, GT28, GT30

export default function SortUnits() {
  const settings = useSettingsContext();

  const [cps2Units, setCps2Units] = useState(
    ALL_UNITS.filter((u) => CPS2_IDS.includes(u.id))
  );
  const [cps1Units, setCps1Units] = useState(
    ALL_UNITS.filter((u) => !CPS2_IDS.includes(u.id))
  );
  const [allUnits, setAllUnits] = useState([...cps1Units, ...cps2Units]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // عنصر قابل للسحب
  function DraggableItem({ unit }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: unit.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      minWidth: 80,
      padding: 16,
      margin: 8,
      background: "#fff",
      textAlign: "center",
      borderRadius: 4,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      cursor: "grab"
    };

    return (
      <Paper ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {unit.name}
      </Paper>
    );
  }

  const handleDragEnd = (event, list, setList, listName) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = list.findIndex((item) => item.id === active.id);
    const newIndex = list.findIndex((item) => item.id === over.id);

    const newList = arrayMove(list, oldIndex, newIndex);
    setList(newList);

    // إذا تغيّر cps1 أو cps2 نعيد بناء ALL
    if (listName === "cps1") {
      setAllUnits([...newList, ...cps2Units]);
    } else if (listName === "cps2") {
      setAllUnits([...cps1Units, ...newList]);
    }
  };

  // مكون لعرض قائمة قابلة للسحب
  const renderSortableGroup = (title, list, setList, listName) => (
    <Box sx={{ mt: 4 ,  display: "flex", flexDirection:"column",
          alignItems:"flex-end",}}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(e) => handleDragEnd(e, list, setList, listName)}
      >
        <SortableContext items={list.map((i) => i.id)} strategy={horizontalListSortingStrategy}>
          <Box sx={{ display: "flex", overflowX: "auto" ,justifyContent:"flex-end",flexDirection:"row-reverse"}}>
            {list.map((unit) => (
              <DraggableItem key={unit.id} unit={unit} />
            ))}
          </Box>
        </SortableContext>
      </DndContext>
    </Box>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Typography variant="h4" gutterBottom>
        Sequence CPS Units
      </Typography>

      <Box
        sx={{
        
          mt: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`
        }}
      >
        {renderSortableGroup("CPS-1", cps1Units, setCps1Units, "cps1")}
        {renderSortableGroup("CPS-2", cps2Units, setCps2Units, "cps2")}
        {renderSortableGroup("ALL-CPS", allUnits, () => {}, "all")}
      </Box>
    </Container>
  );
}
