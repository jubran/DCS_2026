// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Box,
//   Typography,
//   Divider,
//   Checkbox,
//   FormControlLabel,
//   Grid,
// } from "@mui/material";
// import {
//   STATUS_MENU,
//   RATCHING_MENU,
//   TYPE_STATUS_MENU,
//   VALVE_STATUS_MENU,
//   TANK_TAGS_MENU,
// } from "../global";
// import dayjs from "dayjs";
// import { DatePicker, DateTimeField, TimePicker } from "@mui/x-date-pickers";

// const DynamicOperationForm = ({ selectedOperation, data }) => {
//   const [formData, setFormData] = useState({
//     location: data?.location || "",
//     eventDate: "",
//     eventTime: "",
//     eventText: "",
//     note: "",
//     selectStstusMenu: "",
//     selectedRatching: "",
//     tripReason: "",
//     foReason: "",
//     flameTime: "",
//     fsnlTime: "",
//     synchTime: "",
//     transformerAction: "",
//     IER: "",
//     linkToUnit: false,
//     typeStatus: "",
//     valveStatus: "",
//     tankTag: "",
//     typeStatus2: "",
//     valveStatus2: "",
//     tankTag2: "",
//     isDoubleOperation: false,
//   });

//   const operation = selectedOperation?.toLowerCase();
//   const isGT = data.location?.toUpperCase()?.startsWith("GT");

//   // ✅ قيم التاريخ والوقت مبدئيًا
//   const [dateValue, setDateValue] = useState(dayjs());
//   const [timeValue, setTimeValue] = useState(dayjs());

//   // ✅ تحديث التاريخ بصيغة صحيحة
//   const handleDateChange = (newValue) => {
//     if (!newValue || !dayjs(newValue).isValid()) return;
//     setDateValue(newValue);
//     setFormData((prev) => ({
//       ...prev,
//       eventDate: dayjs(newValue).format("YYYY-MM-DD"),
//     }));
//     console.log("Selected Date:", dayjs(newValue).format("YYYY-MM-DD"));
//   };

//   // ✅ تحديث الوقت بصيغة صحيحة
//   const handleTimeChange = (newValue) => {
//     if (!newValue || !dayjs(newValue).isValid()) return;
//     setTimeValue(newValue);
//     setFormData((prev) => ({
//       ...prev,
//       eventTime: dayjs(newValue).format("HH:mm"),
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value, checked, type } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const showRatching =
//     (isGT && ["stop", "trip", "change"].includes(operation)) ||
//     (operation === "transformer" && formData.linkToUnit);

//   const showTripReason =
//     isGT &&
//     ["trip", "change", "stop"].includes(operation) &&
//     formData.selectStstusMenu === "Shutdown";

//   const showFoSubReason = showTripReason && formData.tripReason === "FO";
//   const showIER = formData.transformerAction === "DE-ENERGIZE & EARTH";
//   const showUnitStatus = formData.linkToUnit;
//   const showDoubleOperation =
//     operation === "tank" && formData.isDoubleOperation;

//   useEffect(() => {
//     if (showRatching && !formData.selectedRatching) {
//       setFormData((prev) => ({
//         ...prev,
//         selectedRatching: "Ratching In Service",
//       }));
//     }
//   }, [showRatching]);

//   // ✅ الحقول الديناميكية
//   const operationFields = {
//     start: [
//       {
//         type: "text",
//         name: "location",
//         label: "Location",
//         width: "200px",
//         level: 1,
//       },
//       {
//         type: "date",
//         name: "eventDate",
//         label: "Event Date",
//         width: "200px",
//         level: 1,
//       },
//       {
//         type: "time",
//         name: "eventTime",
//         label: "Event Time",
//         width: "150px",
//         level: 1,
//       },
//       ...(isGT
//         ? [
//             {
//               type: "text",
//               name: "flameTime",
//               label: "Flame Time",
//               width: "150px",
//               level: 2,
//             },
//             {
//               type: "text",
//               name: "fsnlTime",
//               label: "FSNL Time",
//               width: "150px",
//               level: 2,
//             },
//             {
//               type: "text",
//               name: "synchTime",
//               label: "Synch Time",
//               width: "150px",
//               level: 2,
//             },
//           ]
//         : []),
//       {
//         type: "text",
//         name: "eventText",
//         label: "Event Text",
//         multiline: true,
//         level: 3,
//         width: "100%",
//       },
//       {
//         type: "select",
//         name: "selectStstusMenu",
//         label: "Status",
//         options: ["In Service"],
//         default: "In Service",
//         width: "200px",
//         level: 4,
//       },
//     ],

//     stop: [
//       {
//         type: "text",
//         name: "location",
//         label: "Location",
//         width: "200px",
//         level: 1,
//       },
//       {
//         type: "date",
//         name: "eventDate",
//         label: "Event Date",
//         width: "200px",
//         level: 1,
//       },
//       {
//         type: "time",
//         name: "eventTime",
//         label: "Event Time",
//         width: "150px",
//         level: 1,
//       },
//       {
//         type: "text",
//         name: "eventText",
//         label: "Event Text",
//         multiline: true,
//         level: 3,
//         width: "100%",
//       },
//       {
//         type: "select",
//         name: "selectStstusMenu",
//         label: "Status",
//         options: ["Stand By", "Shutdown"],
//         default: "Stand By",
//         width: "200px",
//         level: 4,
//       },
//       {
//         type: "text",
//         name: "sapOrder",
//         label: "SAP Order",
//         width: "200px",
//         level: 5,
//       },
//     ],

//     trip: [
//       {
//         type: "text",
//         name: "location",
//         label: "Location",
//         width: "200px",
//         level: 1,
//       },
//       {
//         type: "date",
//         name: "eventDate",
//         label: "Event Date",
//         width: "200px",
//         level: 1,
//       },
//       {
//         type: "time",
//         name: "eventTime",
//         label: "Event Time",
//         width: "150px",
//         level: 1,
//       },
//       {
//         type: "text",
//         name: "eventText",
//         label: "Event Text",
//         multiline: true,
//         level: 3,
//         width: "100%",
//       },
//       {
//         type: "select",
//         name: "selectStstusMenu",
//         label: "Status",
//         options: ["Stand By", "Shutdown"],
//         default: "Stand By",
//         width: "200px",
//         level: 4,
//       },
//       {
//         type: "text",
//         name: "sapOrder",
//         label: "SAP Order",
//         width: "200px",
//         level: 5,
//       },
//     ],

//     change: [
//       {
//         type: "text",
//         name: "location",
//         label: "Location",
//         width: "200px",
//         level: 1,
//       },
//       {
//         type: "date",
//         name: "eventDate",
//         label: "Event Date",
//         width: "200px",
//         level: 1,
//       },
//       {
//         type: "time",
//         name: "eventTime",
//         label: "Event Time",
//         width: "150px",
//         level: 1,
//       },
//       {
//         type: "text",
//         name: "eventText",
//         label: "Event Text",
//         multiline: true,
//         level: 3,
//         width: "100%",
//       },
//       {
//         type: "select",
//         name: "selectStstusMenu",
//         label: "Status",
//         options: ["Stand By", "Shutdown"],
//         default: "Stand By",
//         width: "200px",
//         level: 4,
//       },
//       {
//         type: "text",
//         name: "sapOrder",
//         label: "SAP Order",
//         width: "200px",
//         level: 5,
//       },
//     ],

//     bsde: [
//       {
//         type: "text",
//         name: "location",
//         label: "Location",
//         width: "200px",
//         level: 1,
//       },
//       {
//         type: "date",
//         name: "eventDate",
//         label: "Event Date",
//         width: "200px",
//         level: 1,
//       },
//       {
//         type: "time",
//         name: "eventTime",
//         label: "Event Time",
//         width: "150px",
//         level: 1,
//       },
//       {
//         type: "text",
//         name: "eventText",
//         label: "Event Text",
//         multiline: true,
//         level: 3,
//         width: "100%",
//       },
//       {
//         type: "select",
//         name: "operationType",
//         label: "Operation Type",
//         options: ["FSNL", "LOAD"],
//         width: "200px",
//         level: 4,
//       },
//       {
//         type: "select",
//         name: "unitStatus",
//         label: "Unit Status",
//         options: ["Shutdown", "In Service"],
//         width: "200px",
//         level: 4,
//       },
//       {
//         type: "text",
//         name: "sapOrder",
//         label: "SAP Order",
//         width: "200px",
//         level: 5,
//       },
//     ],
//   };

//   const fields = operationFields[operation] || [];

//   // ✅ تجميع الحقول حسب الـ level
//   const groupedFields = {
//     level1: fields.filter((field) => field.level === 1),
//     level2: fields.filter((field) => field.level === 2),
//     level3: fields.filter((field) => field.level === 3),
//     level4: fields.filter((field) => field.level === 4),
//     level5: fields.filter((field) => field.level === 5),
//   };

//   // ✅ عرض الحقول
//   const renderField = (field) => {
//     // ✅ الحقول النصية والتاريخ والوقت
//     if (["text", "date", "time"].includes(field.type)) {
//       return (
//         <Box
//           key={field.name}
//           sx={{ width: (field.level = 1 ? "100%" : "auto") }}
//         >
//           {field.type === "text" && (
//             <TextField
//               name={field.name}
//               label={field.label}
//               value={formData[field.name] || ""}
//               onChange={handleChange}
//               multiline={field.multiline}
//               rows={field.multiline ? 2 : 1}
//               sx={{ width: field.width || 180 }}
//             />
//           )}

//           {field.type === "date" && (
//             <DatePicker
//               label={field.label}
//               defaultValue={Date.now()}
//               onChange={handleDateChange}
//               format="yyyy-MM-dd"
//               sx={{ width: field.width || 180 }}
//             />
//           )}

//           {field.type === "time" && (
//             <DateTimeField
//               label={field.label}
//               // value={timeValue}
//               format="HH:mm"
//               onChange={handleTimeChange}
//               slotProps={{
//                 textField: {
//                   InputProps: { endAdornment: null },
//                   onClick: (e) => e.target.select(),
//                   onFocus: (e) => e.target.select(),
//                   onBlur: () => {
//                     if (!timeValue || !dayjs(timeValue).isValid()) {
//                       setTimeValue(null);
//                       setFormData((prev) => ({ ...prev, eventTime: "" }));
//                     }
//                   },
//                 },
//               }}
//               sx={{ width: field.width || 120 }}
//             />
//           )}
//         </Box>
//       );
//     }

//     // ✅ الحقول من نوع select
//     if (field.type === "select") {
//       return (
//         <FormControl key={field.name} sx={{ width: field.width || 200 }}>
//           <InputLabel>{field.label}</InputLabel>
//           <Select
//             name={field.name}
//             value={formData[field.name] || field.default || ""}
//             onChange={handleChange}
//             label={field.label}
//           >
//             {field.options.map((opt) => (
//               <MenuItem key={opt} value={opt}>
//                 {opt}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       );
//     }

//     // ✅ الحقول من نوع checkbox
//     if (field.type === "checkbox") {
//       return (
//         <FormControlLabel
//           key={field.name}
//           control={
//             <Checkbox
//               checked={formData[field.name] || false}
//               onChange={handleChange}
//               name={field.name}
//             />
//           }
//           label={field.label}
//         />
//       );
//     }

//     return null;
//   };

//   return (
//     <Box display="flex" flexDirection="column" gap={2}>
//       {!operation ? (
//         <Typography color="error">⚠️ اختر العملية لعرض الحقول</Typography>
//       ) : (
//         <>
//           {/* ✅ الصف الأول: Level 1 */}
//           {groupedFields.level1.length > 0 && (
//             <Box
//               display="flex"
//               flexDirection="row"
//               alignItems="center"
//               gap={2}
//               flexWrap="nowrap"
//               marginTop={2}
//               width="70%"
//             >
//               {groupedFields.level1.map(renderField)}
//             </Box>
//           )}

//           {/* ✅ الصف الثاني: Level 2 */}
//           {groupedFields.level2.length > 0 && (
//             <Box
//               display="flex"
//               flexDirection="row"
//               alignItems="center"
//               gap={2}
//               flexWrap="nowrap"
//               width="70%"
//             >
//               {groupedFields.level2.map(renderField)}
//             </Box>
//           )}

//           {/* ✅ الصف الثالث: Level 3 */}
//           {groupedFields.level3.length > 0 && (
//             <Box
//               display="flex"
//               flexDirection="row"
//               alignItems="flex-start"
//               gap={2}
//               flexWrap="wrap"
//               width="70%"
//             >
//               {groupedFields.level3.map(renderField)}
//             </Box>
//           )}

//           {/* ✅ الصف الرابع: Level 4 */}
//           {groupedFields.level4.length > 0 && (
//             <Box
//               display="flex"
//               flexDirection="row"
//               alignItems="center"
//               gap={2}
//               flexWrap="nowrap"
//               width="100%"
//             >
//               {/* ✅ الحقول الإضافية */}
//               {showRatching && (
//                 <FormControl fullWidth sx={{ width: "200px" }}>
//                   <InputLabel>Ratching Status</InputLabel>
//                   <Select
//                     name="selectedRatching"
//                     value={formData.selectedRatching || ""}
//                     onChange={handleChange}
//                     label="Ratching Status"
//                   >
//                     {RATCHING_MENU.map((r) => (
//                       <MenuItem key={r.value} value={r.label}>
//                         {r.label}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               )}
//               {groupedFields.level4.map(renderField)}
//               {showTripReason && (
//                 <>
//                   <Divider />
//                   <FormControl fullWidth sx={{ width: "200px" }}>
//                     <InputLabel>Trip Reason</InputLabel>
//                     <Select
//                       name="tripReason"
//                       value={formData.tripReason || ""}
//                       onChange={handleChange}
//                       label="Trip Reason"
//                     >
//                       {[
//                         "FO",
//                         "MO",
//                         "PO",
//                         "PE",
//                         "OMC",
//                         "Re-Start",
//                         "Re-Synch",
//                       ].map((reason) => (
//                         <MenuItem key={reason} value={reason}>
//                           {reason}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </>
//               )}

             
//             </Box>
//           )}

//           {/* ✅ الصف الخامس: Level 5 */}
//            {showFoSubReason && (
//                 <Box
//                   display="flex"
//                   flexDirection="row"
//                   alignItems="center"
//                   gap={2}
//                   flexWrap="nowrap"
//                   marginTop={2}
//                   width='100%'
//                 >
//                   <FormControl fullWidth sx={{ width: "200px" }}>
//                     <InputLabel>FO Sub-Reason</InputLabel>
//                     <Select
//                       name="foReason"
//                       value={formData.foReason || ""}
//                       onChange={handleChange}
//                       label="FO Sub-Reason"
//                     >
//                       {["U1", "U2", "U3", "SF"].map((reason) => (
//                         <MenuItem key={reason} value={reason}>
//                           {reason}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>

//                   {groupedFields.level5.map(renderField)}
//                 </Box>
//               )}
//         </>
//       )}
//     </Box>
//   );
// };

// export default DynamicOperationForm;
