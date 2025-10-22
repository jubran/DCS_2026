// import React, { useState } from "react";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   useSortable,
//   horizontalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { Box, Container, Typography, Avatar } from "@mui/material";
// import { alpha } from "@mui/material/styles";
// import { useSettingsContext } from "src/components/settings";

// const ALL_UNITS = [
//   { id: 1, name: "GT16" },
//   { id: 2, name: "GT19" },
//   { id: 3, name: "GT20" },
//   { id: 4, name: "GT21" },
//   { id: 5, name: "GT22" },
//   { id: 6, name: "GT23" },
//   { id: 7, name: "GT24" },
//   { id: 8, name: "GT25" },
//   { id: 9, name: "GT26" },
//   { id: 10, name: "GT27" },
//   { id: 11, name: "GT28" },
//   { id: 12, name: "GT29" },
//   { id: 13, name: "GT30" },
// ];

// const CPS2_IDS = [4, 10, 11, 13]; // GT21, GT27, GT28, GT30

// export default function SortUnits() {
//   const settings = useSettingsContext();

//   const [cps2Units, setCps2Units] = useState(
//     ALL_UNITS.filter((u) => CPS2_IDS.includes(u.id))
//   );
//   const [cps1Units, setCps1Units] = useState(
//     ALL_UNITS.filter((u) => !CPS2_IDS.includes(u.id))
//   );

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), // تأخير بسيط قبل السحب
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   );

//   // ---------------------- عنصر قابل للسحب ----------------------
//   function DraggableItem({ unit }) {
//     const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
//       useSortable({ id: unit.id });

//     const style = {
//       transform: CSS.Transform.toString(transform),
//       transition: transition || "transform 0.2s ease",
//       zIndex: isDragging ? 999 : "auto",
//     };

//     return (
//       <Avatar
//         ref={setNodeRef}
//         variant="rounded"
//         {...attributes}
//         {...listeners}
//         sx={{
//           ...style,
//           minWidth: 80,
//           p: 1.6,
//           height: 56,
//           color: "white",
//           bgcolor: "#1976d2",
//           fontWeight: 600,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           borderRadius: 1.5,
//           cursor: isDragging ? "grabbing" : "grab",
//           userSelect: "none",
//           boxShadow: isDragging
//             ? "0 8px 20px rgba(0,0,0,0.25)"
//             : "0 4px 12px rgba(0,0,0,0.15)",
//           "&:hover": {
//             boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
//           },
//         }}
//       >
//         {unit.name}
//       </Avatar>
//     );
//   }

//   // ---------------------- عند انتهاء السحب ----------------------
//   const handleDragEnd = (event, list, setList) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     const oldIndex = list.findIndex((item) => item.id === active.id);
//     const newIndex = list.findIndex((item) => item.id === over.id);
//     setList(arrayMove(list, oldIndex, newIndex));
//   };

//   // ---------------------- قائمة قابلة للسحب ----------------------
//   const renderSortableGroup = (title, list, setList) => (
//     <Box
//       sx={{
//         mt: 4,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-end",
//       }}
//     >
//       <Typography variant="h6" gutterBottom>
//         {title}
//       </Typography>

//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={(e) => handleDragEnd(e, list, setList)}
//       >
//         <SortableContext
//           items={list.map((i) => i.id)}
//           strategy={horizontalListSortingStrategy}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row-reverse",
//               justifyContent: "flex-end",
//               flexWrap: "wrap",
//               gap: 1,
//               alignItems: "center",
//             }}
//           >
//             {list.map((unit) => (
//               <DraggableItem key={unit.id} unit={unit} />
//             ))}
//           </Box>
//         </SortableContext>
//       </DndContext>
//     </Box>
//   );

//   const allUnits = [...cps1Units, ...cps2Units];

//   return (
//     <Container maxWidth={settings.themeStretch ? false : "xl"}>
//       <Typography variant="h4" gutterBottom>
//         Sequence CPS Units
//       </Typography>

//       <Box
//         sx={{
//           mt: 3,
//           p: 3,
//           borderRadius: 2,
//           bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
//           border: (theme) => `dashed 1px ${theme.palette.divider}`,
//         }}
//       >
//         {renderSortableGroup("CPS-1 Units", cps1Units, setCps1Units)}
//         {renderSortableGroup("CPS-2 Units", cps2Units, setCps2Units)}

//         <Box sx={{ mt: 6 }}>
//           <Typography variant="h6" gutterBottom>
//             ALL CPS Units
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row-reverse",
//               flexWrap: "wrap",
//               gap: 1,
//               justifyContent: "flex-end",
//             }}
//           >
//             {allUnits.map((unit) => (
//               <Avatar
//                 key={unit.id}
//                 variant="rounded"
//                 sx={{
//                   minWidth: 80,
//                   p: 1.6,
//                   height: 56,
//                   color: "white",
//                   bgcolor: "#607d8b",
//                   fontWeight: 500,
//                 }}
//               >
//                 {unit.name}
//               </Avatar>
//             ))}
//           </Box>
//         </Box>
//       </Box>
//     </Container>
//   );
// }
