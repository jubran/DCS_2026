import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import { Box, Container, Typography, Avatar } from "@mui/material";
import { useSettingsContext } from "src/components/settings";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// العنصر القابل للسحب
function DraggableFTS({ id, index, color }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  return (
    <Avatar
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      variant="rounded"
      sx={{
        background: color,
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
      #{index + 1}: {id}
    </Avatar>
  );
}

export default function SortFTS() {
  const settings = useSettingsContext();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [crudeSkid1, setCrudeSkid1] = useState(["SP1", "SP2", "SP3", "SP4", "SP5"]);
  const [crudeSkid2, setCrudeSkid2] = useState(["SP1", "SP2", "SP3", "SP4"]);
  const [diesel29PPS, setDiesel29PPS] = useState(["SP1", "SP2", "SP3", "SP4", "SP5", "SP6"]);

  const handleDragEnd = (event, items, setItems) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  const renderFTS = (title, items, setItems, color) => (
    <Box sx={{ mt: 4, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(event) => handleDragEnd(event, items, setItems)}
      >
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          <Box sx={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", gap: 1 }}>
            {items.map((id, index) => (
              <DraggableFTS key={id} id={id} index={index} color={color} />
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
        {renderFTS(
          "Crude - Skid#1",
          crudeSkid1,
          setCrudeSkid1,
          "linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #d97706 70%, #b45309 100%)"
        )}
        {renderFTS(
          "Crude - Skid#2",
          crudeSkid2,
          setCrudeSkid2,
          "linear-gradient(135deg, #60a5fa 0%, #3b82f6 30%, #2563eb 70%, #1d4ed8 100%)"
        )}
        {renderFTS(
          "Diesel - 29PPS",
          diesel29PPS,
          setDiesel29PPS,
          "linear-gradient(135deg, #34d399 0%, #10b981 30%, #059669 70%, #047857 100%)"
        )}
      </Box>
    </Container>
  );
}
