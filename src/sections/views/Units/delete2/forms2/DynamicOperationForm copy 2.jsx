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
//   FormHelperText,
//   Button,
// } from "@mui/material";
// import {
//   RATCHING_MENU,
//   STATUS_MENU,
//   TYPE_STATUS_MENU,
//   VALVE_STATUS_MENU,
//   TANK_TAGS_MENU,
// } from "../global";
// import dayjs from "dayjs";
// import { DatePicker, TimePicker } from "@mui/x-date-pickers";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import { width } from "@mui/system";

// dayjs.extend(customParseFormat);

// const INPUT_DATE_FORMAT = "DD-MM-YYYY";
// const DB_DATE_FORMAT = "YYYY-MM-DD";
// const TIME_FORMAT = "HH:mm";

// const DynamicOperationForm = ({ selectedOperation, data }) => {
//   const operation = selectedOperation?.toLowerCase();
//   const isGT = data.location?.toUpperCase()?.startsWith("GT");

//   // ✅ حالة الأخطاء
//   const [validationErrors, setValidationErrors] = useState({});

//   // ✅ التهيئة الصحيحة للتاريخ والوقت
//   const [dateValue, setDateValue] = useState(null);
//   const [timeValue, setTimeValue] = useState(null);

//   // console.log("date converter:", dateValue.toString());
//   // ✅ حالة بيانات النموذج
//   const [formData, setFormData] = useState({
//     location: data?.location || "",
//     eventDate: "",
//     eventTime: "",
//     eventText: "",
//     note: "",
//     selectStstusMenu: data.operation === "trip" ? "Shutdown" : "",
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

//   // ✅ تهيئة التاريخ والوقت عند تحميل المكون
//   useEffect(() => {
//     // التحليل التلقائي - يعمل إذا كان تنسيق data.dayDate معروفاً لـ dayjs
//     const initialDate = data.dayDate ? dayjs(data.dayDate) : dayjs();
//     const initialTime = data.dayTime
//       ? dayjs(data.dayTime, TIME_FORMAT)
//       : dayjs();

//     // التحقق من الصحة
//     const finalDate = initialDate.isValid() ? initialDate : dayjs();
//     const finalTime = initialTime.isValid() ? initialTime : dayjs();
//     const finalTimeState = finalTime.toDate();
//     const finalDateState = dayjs(data.dayDate).toDate();

//     // تحديث الحالة
//     setDateValue(finalDateState);
//     setTimeValue(finalTimeState);

//     setFormData((prev) => ({
//       ...prev,
//       eventDate: finalDate.format(DB_DATE_FORMAT),
//       eventTime: finalTime.format(TIME_FORMAT),
//     }));
//   }, [data.dayDate, data.dayTime]);
//   // --- دوال تحديث الحالة ---
// const handleDateChange = (newValue) => {
//   let finalValue;

//   // تحقق من نوع القيمة
//   if (dayjs.isDayjs(newValue)) {
//     finalValue = newValue;
//   } else if (newValue instanceof Date) {
//     finalValue = dayjs(newValue);
//   } else {
//     finalValue = dayjs(); // fallback
//   }

//   const dateObj = finalValue.toDate();

//   setDateValue(dateObj);

//   setFormData((prev) => ({
//     ...prev,
//     eventDate: finalValue.format(DB_DATE_FORMAT), // YYYY-MM-DD
//   }));

//   setValidationErrors((prev) => ({ ...prev, eventDate: undefined }));
// };

// const handleTimeChange = (newValue) => {
//   let validValue;

//   if (dayjs.isDayjs(newValue)) {
//     validValue = newValue;
//   } else if (newValue instanceof Date) {
//     validValue = dayjs(newValue);
//   } else {
//     validValue = dayjs(); // fallback
//   }

//   const timeObj = validValue.toDate();

//   setTimeValue(timeObj);

//   setFormData((prev) => ({
//     ...prev,
//     eventTime: validValue.format(TIME_FORMAT), // HH:mm
//   }));

//   setValidationErrors((prev) => ({ ...prev, eventTime: undefined }));

//   console.log("✅ finalTime:", timeObj.toString());
// };


//   const handleChange = (e) => {
//     const { name, value, checked, type } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
//   };
//   // --- نهاية دوال تحديث الحالة ---

//   // ✅ منطق العرض الشرطي
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

//   // ✅ تعيين القيمة المبدئية لـ Ratching
//   useEffect(() => {
//     if (showRatching && !formData.selectedRatching) {
//       setFormData((prev) => ({
//         ...prev,
//         selectedRatching: "Ratching In Service",
//       }));
//     }
//   }, [showRatching, formData.selectedRatching]);

//   // --- دوال التحقق والإرسال ---
//   const validateForm = () => {
//     const errors = {};
//     const currentFields = operationFields[operation] || [];
//     let isValid = true;

//     // 1. التحقق من الحقول المحددة في operationFields
//     currentFields.forEach((field) => {
//       if (
//         field.required &&
//         field.type !== "checkbox" &&
//         !formData[field.name]
//       ) {
//         errors[field.name] = `${field.label} مطلوب.`;
//         isValid = false;
//       }
//     });

//     // 2. التحقق من الحقول الشرطية المطلوبة
//     if (showRatching && !formData.selectedRatching) {
//       errors.selectedRatching = "حالة Ratching مطلوبة.";
//       isValid = false;
//     }
//     if (showTripReason && !formData.tripReason) {
//       errors.tripReason = "سبب Trip مطلوب.";
//       isValid = false;
//     }
//     if (showFoSubReason && !formData.foReason) {
//       errors.foReason = "سبب FO الفرعي مطلوب.";
//       isValid = false;
//     }

//     setValidationErrors(errors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       console.log("Form Data is Valid:", formData);
//       alert("تم إرسال النموذج بنجاح!");
//     } else {
//       console.log("Validation Failed. Errors:", validationErrors);
//     }
//   };
//   // --- نهاية دوال التحقق والإرسال ---
//   // console.log(dateValue)
//   // ✅ الحقول الديناميكية
//   const operationFields = {
//     start: [
//       {
//         type: "text",
//         name: "location",
//         label: "Location",
//         width: "200px",
//         level: 1,
//         required: true,
//       },
//       {
//         type: "date",
//         name: "eventDate",
//         label: "Event Date",
//         width: "200px",
//         level: 1,
//         required: true,
//       },
//       {
//         type: "time",
//         name: "eventTime",
//         label: "Event Time",
//         width: "150px",
//         level: 1,
//         required: true,
//       },
//       ...(isGT
//         ? [
//             {
//               type: "text",
//               name: "flameTime",
//               label: "Flame Time",
//               width: "150px",
//               level: 2,
//               required: true,
//             },
//             {
//               type: "text",
//               name: "fsnlTime",
//               label: "FSNL Time",
//               width: "150px",
//               level: 2,
//               required: true,
//             },
//             {
//               type: "text",
//               name: "synchTime",
//               label: "Synch Time",
//               width: "150px",
//               level: 2,
//               required: true,
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
//         required: true,
//       },
//       {
//         type: "select",
//         name: "selectStstusMenu",
//         label: "Status",
//         options: ["In Service"],
//         default: "In Service",
//         width: "200px",
//         level: 4,
//         required: true,
//       },
//     ],
//     stop: [
//       {
//         type: "text",
//         name: "location",
//         label: "Location",
//         width: "200px",
//         level: 1,
//         required: true,
//       },
//       {
//         type: "date",
//         name: "eventDate",
//         label: "Event Date",
//         width: "200px",
//         level: 1,
//         required: true,
//       },
//       {
//         type: "time",
//         name: "eventTime",
//         label: "Event Time",
//         width: "150px",
//         level: 1,
//         required: true,
//       },
//       {
//         type: "text",
//         name: "eventText",
//         label: "Event Text",
//         multiline: true,
//         level: 3,
//         width: "100%",
//         required: true,
//       },
//       {
//         type: "select",
//         name: "selectStstusMenu",
//         label: "Status",
//         options: ["Stand By", "Shutdown"],
//         default: "Stand By",
//         width: "200px",
//         level: 4,
//         required: true,
//       },
//       {
//         type: "text",
//         name: "sapOrder",
//         label: "SAP Order",
//         width: "200px",
//         level: 5,
//         required: true,
//       },
//     ],
//     trip: [
//       {
//         type: "text",
//         name: "location",
//         label: "Location",
//         width: "200px",
//         level: 1,
//         required: true,
//       },
//       {
//         type: "date",
//         name: "eventDate",
//         label: "Event Date",
//         width: "200px",
//         level: 1,
//         required: true,
//       },
//       {
//         type: "time",
//         name: "eventTime",
//         label: "Event Time",
//         width: "150px",
//         level: 1,
//         required: true,
//       },
//       {
//         type: "text",
//         name: "eventText",
//         label: "Event Text",
//         multiline: true,
//         level: 3,
//         width: "100%",
//         required: true,
//       },
//       {
//         type: "select",
//         name: "selectStstusMenu",
//         label: "Status",
//         options: ["Shutdown", "Stand By"],
//         default: "",
//         width: "200px",
//         level: 4,
//         required: true,
//       },
//       {
//         type: "text",
//         name: "sapOrder",
//         label: "SAP Order",
//         width: "200px",
//         level: 5,
//         required: true,
//       },
//     ],
//     change: [
//       {
//         type: "text",
//         name: "location",
//         label: "Location",
//         width: "200px",
//         level: 1,
//         required: true,
//       },
//       {
//         type: "date",
//         name: "eventDate",
//         label: "Event Date",
//         width: "200px",
//         level: 1,
//         required: true,
//       },
//       {
//         type: "time",
//         name: "eventTime",
//         label: "Event Time",
//         width: "150px",
//         level: 1,
//         required: true,
//       },
//       {
//         type: "text",
//         name: "eventText",
//         label: "Event Text",
//         multiline: true,
//         level: 3,
//         width: "100%",
//         required: true,
//       },
//       {
//         type: "select",
//         name: "selectStstusMenu",
//         label: "Status",
//         options: ["Stand By", "Shutdown"],
//         default: "Stand By",
//         width: "200px",
//         level: 4,
//         required: true,
//       },
//       {
//         type: "text",
//         name: "sapOrder",
//         label: "SAP Order",
//         width: "200px",
//         level: 5,
//         required: true,
//       },
//     ],
//     bsde: [
//       {
//         type: "text",
//         name: "location",
//         label: "Location",
//         width: "200px",
//         level: 1,
//         required: true,
//       },
//       {
//         type: "date",
//         name: "eventDate",
//         label: "Event Date",
//         width: "200px",
//         level: 1,
//         required: true,
//       },
//       {
//         type: "time",
//         name: "eventTime",
//         label: "Event Time",
//         width: "150px",
//         level: 1,
//         required: true,
//       },
//       {
//         type: "text",
//         name: "eventText",
//         label: "Event Text",
//         multiline: true,
//         level: 3,
//         width: "100%",
//         required: true,
//       },
//       {
//         type: "select",
//         name: "operationType",
//         label: "Operation Type",
//         options: ["FSNL", "LOAD"],
//         width: "200px",
//         level: 4,
//         required: true,
//       },
//       {
//         type: "select",
//         name: "unitStatus",
//         label: "Unit Status",
//         options: ["Shutdown", "In Service"],
//         width: "200px",
//         level: 4,
//         required: true,
//       },
//       {
//         type: "text",
//         name: "sapOrder",
//         label: "SAP Order",
//         width: "200px",
//         level: 5,
//         required: true,
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
//   console.log("timeValue " + timeValue);
//   // ✅ عرض الحقول
//   const renderField = (field) => {
//     const fieldHasError = !!validationErrors[field.name];
//     const helperText = fieldHasError
//       ? validationErrors[field.name]
//       : field.helperText;

//     if (["text", "date", "time"].includes(field.type)) {
//       return (
//         <Box
//           key={field.name}
//           sx={{ width: field.level === 1 ? "100%" : "auto" }}
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
//               required={field.required || false}
//               error={fieldHasError}
//               helperText={helperText || ""}
//             />
//           )}

//           {field.type === "date" && (
//             <DatePicker
//               label={field.label}
//               value={dateValue}
//               onChange={handleDateChange}
//               format={"yyyy-MM-dd"}
//               sx={{ width: field.width || 180 }}
//               slotProps={{
//                 textField: {
                 
//                   required: field.required || false,
//                   error: fieldHasError,
//                   helperText: helperText || "",
//                 },
//               }}
//             />
//           )}

//           {field.type === "time" && (
//           <TimePicker
//   label={field.label}
//   value={timeValue}
//   onChange={handleTimeChange}
//   format="HH:mm"
//   sx={{ width: field.width || 120 }}
//   slotProps={{
//     textField: {
//       sx: {
//         '& input': {
//           letterSpacing: '2px', // ✅ تباعد بين الأرقام
//           textAlign: 'center',  // ✅ توسيط
//           fontVariantNumeric: 'tabular-nums'

//         },
//       },
//       InputProps: { endAdornment: null },
//       required: field.required || false,
//       error: fieldHasError,
//       helperText: helperText || "",
//     },
//   }}
// />

//           )}
//         </Box>
//       );
//     }

//     if (field.type === "select") {
//       const selectHasError = !!validationErrors[field.name];
//       return (
//         <FormControl
//           key={field.name}
//           sx={{ width: field.width || 200 }}
//           required={field.required || false}
//           error={selectHasError}
//         >
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
//           {selectHasError && (
//             <FormHelperText>{validationErrors[field.name]}</FormHelperText>
//           )}
//         </FormControl>
//       );
//     }

//     if (field.type === "checkbox") {
//       const checkboxName = field.name;
//       const checkboxHasError = !!validationErrors[checkboxName];

//       return (
//         <FormControlLabel
//           key={checkboxName}
//           control={
//             <Checkbox
//               checked={formData[checkboxName] || false}
//               onChange={handleChange}
//               name={checkboxName}
//             />
//           }
//           label={field.label}
//         />
//       );
//     }

//     return null;
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       display="flex"
//       flexDirection="column"
//       gap={2}
//     >
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

//           {/* ✅ الصف الرابع: Level 4 (مع الحقول الشرطية) */}
//           {groupedFields.level4.length > 0 && (
//             <Box
//               display="flex"
//               flexDirection="row"
//               alignItems="center"
//               gap={2}
//               flexWrap="nowrap"
//               width="100%"
//             >
//               {showRatching && (
//                 <FormControl
//                   sx={{ width: "200px" }}
//                   required
//                   error={!!validationErrors.selectedRatching}
//                 >
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
//                   {!!validationErrors.selectedRatching && (
//                     <FormHelperText>
//                       {validationErrors.selectedRatching}
//                     </FormHelperText>
//                   )}
//                 </FormControl>
//               )}
//               {groupedFields.level4.map(renderField)}
//               {showTripReason && (
//                 <>
//                   <Divider orientation="vertical" flexItem />
//                   <FormControl
//                     sx={{ width: "200px" }}
//                     required
//                     error={!!validationErrors.tripReason}
//                   >
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
//                     {!!validationErrors.tripReason && (
//                       <FormHelperText>
//                         {validationErrors.tripReason}
//                       </FormHelperText>
//                     )}
//                   </FormControl>
//                 </>
//               )}
//             </Box>
//           )}

//           {/* ✅ الصف الخامس: Level 5 */}
//           {groupedFields.level5.length > 0 && (
//             <Box
//               display="flex"
//               flexDirection="row"
//               alignItems="center"
//               gap={2}
//               flexWrap="nowrap"
//               marginTop={2}
//               width="100%"
//             >
//               {showFoSubReason && (
//                 <FormControl
//                   sx={{ width: "200px" }}
//                   required
//                   error={!!validationErrors.foReason}
//                 >
//                   <InputLabel>FO Sub-Reason</InputLabel>
//                   <Select
//                     name="foReason"
//                     value={formData.foReason || ""}
//                     onChange={handleChange}
//                     label="FO Sub-Reason"
//                   >
//                     {["U1", "U2", "U3", "SF"].map((reason) => (
//                       <MenuItem key={reason} value={reason}>
//                         {reason}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                   {!!validationErrors.foReason && (
//                     <FormHelperText>{validationErrors.foReason}</FormHelperText>
//                   )}
//                 </FormControl>
//               )}
//               {groupedFields.level5.map(renderField)}
//             </Box>
//           )}

//           {/* ✅ زر الإرسال */}
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             sx={{ mt: 3, width: "200px" }}
//           >
//             إرسال العملية
//           </Button>
//         </>
//       )}
//     </Box>
//   );
// };

// export default DynamicOperationForm;
