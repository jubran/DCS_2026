// import React, { useState } from "react";
// import {
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Box,
//   Typography,
//   Divider,
// } from "@mui/material";
// import DateTimeField from "./DateTimeField"; // مكون التاريخ والوقت المعاد استخدامه

// // أنواع الأحداث الممكنة
// const EVENT_TYPES = [
//   { value: "StartUp", label: "🚀 Start Up" },
//   { value: "Stop", label: "🛑 Stop" },
//   { value: "Trip", label: "💥 Trip" },
//   { value: "Change", label: "🔄 Change" },
// ];

// // الحالات العامة الممكنة
// const STATUS_MENU = [
//   { value: "In Service", label: "In Service" },
//   { value: "Stand By", label: "Stand By" },
//   { value: "Shutdown", label: "Shutdown" },
// ];

// export default function OperationEventForm() {
//   const [eventType, setEventType] = useState("StartUp");
//   const [formData, setFormData] = useState({
//     location: "",
//     EventDate: "",
//     EventTime: "",
//     EventText: "",
//     note: "",
//     selectStatusMenu: "",
//     flameTime: "",
//     synckTime: "",
//     changeFrom: "",
//     changeTo: "",
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // 🔍 منطق الشروط الديناميكية حسب نوع الحدث
//   const renderConditionalFields = () => {
//     switch (eventType) {
//       case "StartUp":
//         return (
//           <>
//             <DateTimeField
//               label="Flame Time"
//               type="time"
//               name="flameTime"
//               value={formData.flameTime}
//               onChange={handleChange}
//             />
//             <DateTimeField
//               label="Synck Time"
//               type="time"
//               name="synckTime"
//               value={formData.synckTime}
//               onChange={handleChange}
//             />
//             <FormControl fullWidth>
//               <InputLabel>Status</InputLabel>
//               <Select
//                 name="selectStatusMenu"
//                 value={formData.selectStatusMenu}
//                 onChange={handleChange}
//               >
//                 {STATUS_MENU.map((s) => (
//                   <MenuItem
//                     key={s.value}
//                     value={s.value}
//                     disabled={s.value !== "In Service"}
//                   >
//                     {s.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </>
//         );

//       case "Stop":
//         return (
//           <>
//             <FormControl fullWidth>
//               <InputLabel>Status</InputLabel>
//               <Select
//                 name="selectStatusMenu"
//                 value={formData.selectStatusMenu}
//                 onChange={handleChange}
//               >
//                 {STATUS_MENU.map((s) => (
//                   <MenuItem
//                     key={s.value}
//                     value={s.value}
//                     disabled={s.value !== "Shutdown"}
//                   >
//                     {s.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </>
//         );

//       case "Trip":
//         return (
//           <>
//             <TextField
//               label="Trip Cause"
//               name="EventText"
//               value={formData.EventText}
//               onChange={handleChange}
//               multiline
//               rows={2}
//               fullWidth
//             />
//             <FormControl fullWidth>
//               <InputLabel>Status</InputLabel>
//               <Select
//                 name="selectStatusMenu"
//                 value={formData.selectStatusMenu}
//                 onChange={handleChange}
//               >
//                 {STATUS_MENU.map((s) => (
//                   <MenuItem
//                     key={s.value}
//                     value={s.value}
//                     disabled={s.value !== "Shutdown"}
//                   >
//                     {s.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </>
//         );

//       case "Change":
//         return (
//           <>
//             <TextField
//               label="Change From"
//               name="changeFrom"
//               value={formData.changeFrom}
//               onChange={handleChange}
//               fullWidth
//             />
//             <TextField
//               label="Change To"
//               name="changeTo"
//               value={formData.changeTo}
//               onChange={handleChange}
//               fullWidth
//             />
//             <FormControl fullWidth>
//               <InputLabel>Status</InputLabel>
//               <Select
//                 name="selectStatusMenu"
//                 value={formData.selectStatusMenu}
//                 onChange={handleChange}
//               >
//                 {STATUS_MENU.map((s) => (
//                   <MenuItem key={s.value} value={s.value}>
//                     {s.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" gap={2}>
//       <Typography variant="h6" color="primary">
//         Unified Operation Event Form
//       </Typography>

//       <Divider sx={{ mb: 2 }} />

//       {/* اختيار نوع الحدث */}
//       <FormControl fullWidth>
//         <InputLabel>Event Type</InputLabel>
//         <Select
//           value={eventType}
//           onChange={(e) => setEventType(e.target.value)}
//         >
//           {EVENT_TYPES.map((ev) => (
//             <MenuItem key={ev.value} value={ev.value}>
//               {ev.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {/* الحقول العامة المشتركة */}
//       <TextField
//         label="Location"
//         name="location"
//         value={formData.location}
//         onChange={handleChange}
//         fullWidth
//       />
//       <DateTimeField
//         label="Event Date"
//         type="date"
//         name="EventDate"
//         value={formData.EventDate}
//         onChange={handleChange}
//       />
//       <DateTimeField
//         label="Event Time"
//         type="time"
//         name="EventTime"
//         value={formData.EventTime}
//         onChange={handleChange}
//       />

//       {/* الحقول الخاصة حسب نوع الحدث */}
//       {renderConditionalFields()}

//       {/* حقل الملاحظات */}
//       <TextField
//         label="Note"
//         name="note"
//         value={formData.note}
//         onChange={handleChange}
//         multiline
//         rows={2}
//         fullWidth
//       />
//     </Box>
//   );
// }
