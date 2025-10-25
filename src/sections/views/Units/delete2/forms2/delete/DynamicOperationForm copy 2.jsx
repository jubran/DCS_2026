// import React, { useState, useEffect } from 'react';
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
//   FormControlLabel
// } from '@mui/material';
// import {
//   STATUS_MENU,
//   RATCHING_MENU,
//   TYPE_STATUS_MENU,
//   VALVE_STATUS_MENU,
//   TANK_TAGS_MENU
// } from '../global';
// import dayjs from 'dayjs';
// import { DatePicker, DateTimeField, TimePicker } from '@mui/x-date-pickers';

// const DynamicOperationForm = ({ selectedOperation, data }) => {
//   const [formData, setFormData] = useState({
//     location: data?.location || '',
//     eventDate: '',
//     eventTime: '',
//     eventText: '',
//     note: '',
//     selectStstusMenu: '',
//     selectedRatching: '',
//     tripReason: '',
//     foReason: '',
//     flameTime: '',
//     fsnlTime: '',
//     synchTime: '',
//     transformerAction: '',
//     IER: '',
//     linkToUnit: false,
//     typeStatus: '',
//     valveStatus: '',
//     tankTag: '',
//     typeStatus2: '',
//     valveStatus2: '',
//     tankTag2: '',
//     isDoubleOperation: false
//   });

//   const operation = selectedOperation?.toLowerCase();
//   const isGT = data.location?.toUpperCase()?.startsWith('GT');

//   // ✅ قيم التاريخ والوقت مبدئيًا
//   const [dateValue, setDateValue] = useState(dayjs());
//   const [timeValue, setTimeValue] = useState(dayjs());

//   // ✅ تحديث التاريخ بصيغة صحيحة
//   const handleDateChange = (newValue) => {
//     if (!newValue || !dayjs(newValue).isValid()) return;
//     setDateValue(newValue);
//     setFormData((prev) => ({
//       ...prev,
//       eventDate: dayjs(newValue).format('YYYY-MM-DD'),
//     }));
//     console.log('Selected Date:', dayjs(newValue).format('YYYY-MM-DD'));
//   };

//   // ✅ تحديث الوقت بصيغة صحيحة
//  const handleTimeChange = (newValue) => {
//     if (!newValue || !dayjs(newValue).isValid()) return;
//     setTimeValue(newValue);
//     setFormData((prev) => ({
//       ...prev,
//       eventTime: dayjs(newValue).format('HH:mm'),
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value, checked, type } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const showRatching =
//     (isGT && ['stop', 'trip', 'change'].includes(operation)) ||
//     (operation === 'transformer' && formData.linkToUnit);

//   const showTripReason =
//     isGT &&
//     ['trip', 'change', 'stop'].includes(operation) &&
//     formData.selectStstusMenu === 'Shutdown';

//   const showFoSubReason = showTripReason && formData.tripReason === 'FO';
//   const showIER = formData.transformerAction === 'DE-ENERGIZE & EARTH';
//   const showUnitStatus = formData.linkToUnit;
//   const showDoubleOperation = operation === 'tank' && formData.isDoubleOperation;

//   useEffect(() => {
//     if (showRatching && !formData.selectedRatching) {
//       setFormData((prev) => ({
//         ...prev,
//         selectedRatching: 'Ratching In Service',
//       }));
//     }
//   }, [showRatching]);

//   // ✅ الحقول الديناميكية
//   const operationFields = {
//     start: [
//       { type: 'text', name: 'location', label: 'Location' , width: '300px'},
//       { type: 'date', name: 'eventDate', label: 'Event Date' , width: '150px'},
//       { type: 'time', name: 'eventTime', label: 'Event Time', width: '150px' },
//       ...(isGT
//         ? [
//             { type: 'text', name: 'flameTime', label: 'Flame Time', width: '150px' },
//             { type: 'text', name: 'fsnlTime', label: 'FSNL Time', width: '150px' },
//             { type: 'text', name: 'synchTime', label: 'Synch Time', width: '150px' },
//           ]
//         : []),
//       { type: 'text', name: 'eventText', label: 'Event Text', multiline: true },
//       {
//         type: 'select',
//         name: 'selectStstusMenu',
//         label: 'Status',
//         options: ['In Service'],
//         default: 'In Service',
//         width: '150px'
//       },
//     ],

//     stop: [
//       { type: 'text', name: 'location', label: 'Location' , width: '150px'},
//       { type: 'date', name: 'eventDate', label: 'Event Date', width: '150px' },
//       { type: 'time', name: 'eventTime', label: 'Event Time' , width: '150px'},
//       { type: 'text', name: 'eventText', label: 'Event Text', multiline: true },
//       {
//         type: 'select',
//         name: 'selectStstusMenu',
//         label: 'Status',
//         options: ['Stand By', 'Shutdown'],
//         default: 'Stand By',
//         width: '150px'
//       },
//     ],

//     trip: [
//       { type: 'text', name: 'location', label: 'Location' },
//       { type: 'date', name: 'eventDate', label: 'Event Date' },
//       { type: 'time', name: 'eventTime', label: 'Event Time' },
//       { type: 'text', name: 'eventText', label: 'Event Text', multiline: true },
//       {
//         type: 'select',
//         name: 'selectStstusMenu',
//         label: 'Status',
//         options: ['Stand By', 'Shutdown'],
//         default: 'Stand By',
//       },
//     ],

//     change: [
//       { type: 'text', name: 'location', label: 'Location' },
//       { type: 'date', name: 'eventDate', label: 'Event Date' },
//       { type: 'time', name: 'eventTime', label: 'Event Time' },
//       { type: 'text', name: 'eventText', label: 'Event Text', multiline: true },
//       {
//         type: 'select',
//         name: 'selectStstusMenu',
//         label: 'Status',
//         options: ['Stand By', 'Shutdown'],
//         default: 'Stand By',
//       },
//     ],

//     bsde: [
//       { type: 'text', name: 'location', label: 'Location' },
//       { type: 'date', name: 'eventDate', label: 'Event Date' },
//       { type: 'time', name: 'eventTime', label: 'Event Time' },
//       { type: 'text', name: 'eventText', label: 'Event Text', multiline: true },
//       {
//         type: 'select',
//         name: 'operationType',
//         label: 'Operation Type',
//         options: ['FSNL', 'LOAD'],
//       },
//       {
//         type: 'select',
//         name: 'unitStatus',
//         label: 'Unit Status',
//         options: ['Shutdown', 'In Service'],
//       },
//     ],
//   };

//   const fields = operationFields[operation] || [];

//   // ✅ عرض الحقول
//   const renderField = (field) => {
//     switch (field.type) {
//       case 'text':
//         return (
//           <TextField
//             key={field.name}
//             name={field.name}
//             label={field.label}
//             value={formData[field.name] || ''}
//             onChange={handleChange}
//             // fullWidth
//             multiline={field.multiline}
//             rows={field.multiline ? 2 : 1}
//            sx={{
//             width: field.width
//            }}
//           />
//         );

//       case 'date':
//         return (
//           <DatePicker
//             key={field.name}
//             label={field.label}
//             defaultValue={Date.now()} // ✅ كائن dayjs دائمًا
//             onChange={handleDateChange}
//             format="yyyy-MM-dd"
//             slotProps={{ textField: { size: 'small' } }}
//              sx={{
//     width: field.width,
//   }}
//           />
//         );

//       case 'time':
//         return (
//  <DateTimeField
//   key={field.name}
//   label={field.label}
//   // value={timeValue ? dayjs(timeValue) : null}
//   onChange={handleTimeChange}
//   format="HH:mm"
//   slotProps={{
//     textField: {
//       size: 'small',
//       width: field.width,
//       InputProps: { endAdornment: null },
//       onClick: (e) => {
//         // تحديد النص عند النقر
//         e.target.select();
//       },
//       onFocus: (e) => {
//         // تحديد النص عند التركيز (بما في ذلك عند الانتقال بـ Tab)
//         e.target.select();
//       },
//       onBlur: () => {
//         if (!timeValue || !dayjs(timeValue).isValid()) {
//           setTimeValue(null);
//           setFormData((prev) => ({ ...prev, eventTime: '' }));
//         }
//       },
//     },
//   }}
//   sx={{
//     width: field.width,
//   }}
// />

//         );

//       case 'select':
//         return (
//           <FormControl key={field.name} fullWidth>
//             <InputLabel>{field.label}</InputLabel>
//             <Select
//               name={field.name}
//               value={formData[field.name] || field.default || ''}
//               onChange={handleChange}
//             >
//               {field.options.map((opt) => (
//                 <MenuItem key={opt} value={opt}>
//                   {opt}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         );

//       case 'checkbox':
//         return (
//           <FormControlLabel
//             key={field.name}
//             control={
//               <Checkbox
//                 checked={formData[field.name] || false}
//                 onChange={handleChange}
//                 name={field.name}
//               />
//             }
//             label={field.label}
//           />
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" gap={2}>
//       {!operation ? (
//         <Typography color="error">⚠️ اختر العملية لعرض الحقول</Typography>
//       ) : (
//         <>
//           {fields.map(renderField)}

//           {showRatching && (
//             <FormControl fullWidth>
//               <InputLabel>Ratching Status</InputLabel>
//               <Select
//                 name="selectedRatching"
//                 value={formData.selectedRatching || ''}
//                 onChange={handleChange}
//               >
//                 {RATCHING_MENU.map((r) => (
//                   <MenuItem key={r.value} value={r.label}>
//                     {r.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}

//           {showTripReason && (
//             <>
//               <Divider />
//               <Typography variant="subtitle2" color="error">
//                 Shutdown Details
//               </Typography>
//               <FormControl fullWidth>
//                 <InputLabel>Trip Reason</InputLabel>
//                 <Select
//                   name="tripReason"
//                   value={formData.tripReason || ''}
//                   onChange={handleChange}
//                 >
//                   {['FO', 'MO', 'PO', 'PE', 'OMC', 'Re-Start', 'Re-Synch'].map(
//                     (reason) => (
//                       <MenuItem key={reason} value={reason}>
//                         {reason}
//                       </MenuItem>
//                     )
//                   )}
//                 </Select>
//               </FormControl>
//             </>
//           )}

//           {showFoSubReason && (
//             <FormControl fullWidth>
//               <InputLabel>FO Sub-Reason</InputLabel>
//               <Select
//                 name="foReason"
//                 value={formData.foReason || ''}
//                 onChange={handleChange}
//               >
//                 {['U1', 'U2', 'U3', 'SF'].map((reason) => (
//                   <MenuItem key={reason} value={reason}>
//                     {reason}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}
//         </>
//       )}
//     </Box>
//   );
// };

// export default DynamicOperationForm;
