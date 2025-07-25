import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { useSettingsContext } from "src/components/settings";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { display } from "@mui/system";

// العنصر القابل للسحب
function DraggableFTS({ id ,index}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

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
      <Typography variant="body2" fontWeight="bold">
        #{index + 1}: {id}
      </Typography>
    </Paper>
  );
}

export default function SortFTS() {
  const settings = useSettingsContext();

  const sensors = useSensors(useSensor(PointerSensor));

  const [crudeSkid1, setCrudeSkid1] = useState(["SP1", "SP2", "SP3", "SP4", "SP5"]);
  const [crudeSkid2, setCrudeSkid2] = useState(["SP1", "SP2", "SP3", "SP4"]);
  const [diesel29PPS, setDiesel29PPS] = useState(["SP1", "SP2", "SP3", "SP4", "SP5", "SP6"]);

  const handleDragEnd = (event, items, setItems) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  const renderFTS = (title, items, setItems) => (
    <Box sx={{ mt: 3,display:"flex" ,flexDirection:"column",alignItems:"flex-end"}}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(event) => handleDragEnd(event, items, setItems)}
        style={{display:"flex", flexDirection:"row"}}
      >
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          <Box sx={{ display: "flex", overflowX: "auto", flexDirection: "row-reverse" }}>
           {items.map((id, index) => (
  <DraggableFTS key={id} id={id} index={index} />
))}
          </Box>
        </SortableContext>
      </DndContext>
    </Box>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Typography variant="h4" gutterBottom>
        Sequence FTS
      </Typography>

      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {/* Crude Skids */}
        {renderFTS("Crude - Skid#1", crudeSkid1, setCrudeSkid1)}
        {renderFTS("Crude - Skid#2", crudeSkid2, setCrudeSkid2)}

        {/* Diesel */}
        {renderFTS("Diesel - 29PPS", diesel29PPS, setDiesel29PPS)}
      </Box>
    </Container>
  );
}
