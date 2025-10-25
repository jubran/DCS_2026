// import React, { useEffect, useState } from 'react';
// import {
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Box,
//   Typography,
//   Divider
// } from '@mui/material';
// import DateTimeField from './DateTimeField';
// import { STATUS_MENU, RATCHING_MENU } from '../global';

// /**
//  * نموذج ديناميكي يعتمد على selectedOperation.name و data.location
//  */

// const DynamicForm = ({ selectedOperation, data }) => {
//   const [formData, setFormData] = useState({
//     location: data?.location || '',
//     eventDate: '',
//     eventTime: '',
//     eventText: '',
//     selectedRatching: '',
//     selectStstusMenu: '',
//     tripReason: '',
//     foReason: '',
//     note: '',
//     flameTime: '',
//     synckTime: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let newData = { ...formData, [name]: value };

//     // 🔹 منطق ديناميكي مثل النماذج الأصلية
//     if (name === 'selectStstusMenu') {
//       // إعادة ضبط بعض القيم حسب الحالة
//       if (value !== 'Shutdown') {
//         newData.tripReason = '';
//         newData.foReason = '';
//       }
//       if (value === 'Shutdown' || value === 'Stand By') {
//         newData.selectedRatching = 'Ratching In Service';
//       }
//     }

//     if (name === 'tripReason' && value !== 'FO') {
//       newData.foReason = '';
//     }

//     setFormData(newData);
//   };

//   const operation = selectedOperation?.toLowerCase();

//   // 🔹 تعريف الحقول لكل عملية
//   const operationFields = {
//     bsde: [
//       { type: 'text', name: 'location', label: 'Location' },
//       { type: 'date', name: 'eventDate', label: 'Event Date' },
//       { type: 'time', name: 'eventTime', label: 'Event Time' },
//       { type: 'text', name: 'eventText', label: 'Event Text', multiline: true },
//       {
//         type: 'select',
//         name: 'operationType',
//         label: 'Operation Type',
//         options: ['FSNL', 'LOAD']
//       },
//       {
//         type: 'select',
//         name: 'unitStatus',
//         label: 'Unit Status',
//         options: ['Shutdown', 'In Service']
//       }
//     ],

//     start: [
//       { type: 'text', name: 'location', label: 'Location' },
//       { type: 'date', name: 'eventDate', label: 'Event Date' },
//       { type: 'time', name: 'eventTime', label: 'Event Time' },
//       { type: 'text', name: 'flameOn', label: 'Flame R.P.M' },
//       { type: 'text', name: 'synchTime', label: 'Synch Time' },
//       { type: 'text', name: 'eventText', label: 'Event Text', multiline: true },
//       {
//         type: 'select',
//         name: 'selectStstusMenu',
//         label: 'Status',
//        options: ['In Service'],
//         default: 'In Service'
//       },
//       { type: 'text', name: 'note', label: 'Note', multiline: true }
//     ],

//     stop: [
//       { type: 'text', name: 'location', label: 'Location' },
//       { type: 'date', name: 'eventDate', label: 'Event Date' },
//       { type: 'time', name: 'eventTime', label: 'Event Time' },
//       { type: 'text', name: 'eventText', label: 'Event Text', multiline: true },
//       {
//         type: 'select',
//         name: 'selectStstusMenu',
//         label: 'Status',
//        options: ['Stand By', 'Shutdown'],
//     default: 'Stand By'
//       },
//       { type: 'text', name: 'note', label: 'Note', multiline: true }
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
//          options: ['Stand By','Shutdown'],
//         default: 'Stand By'
//       }
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
//          options: ['Stand By', 'Shutdown'],
//         default: 'Stand By'
//       }

//     ]
//   };

//   const fields = operationFields[operation] || [];

//   // 🔹 المنطق الشرطي للعرض
//   const showTripReason =
//     (operation === 'trip' || operation === 'change' || operation === 'stop') &&
//     formData.selectStstusMenu === 'Shutdown';

//   const showFoSubReason = showTripReason && formData.tripReason === 'FO';
//   const showRatching =
//     operation === 'change' ||
//     operation === 'stop' ||
//     operation === 'trip';
// useEffect(() => {
//   if (showRatching && !formData.selectedRatching) {
//     setFormData((prev) => ({
//       ...prev,
//       selectedRatching: 'Ratching In Service',
//     }));
//   }
// }, [showRatching]);
//   return (
//     <Box display="flex" flexDirection="column" gap={2}>
//       {!operation ? (
//         <Typography color="error">⚠️ اختر العملية لعرض الحقول</Typography>
//       ) : (
//         <>
//           {fields.map((field) => {
//             if (field.type === 'text') {
//               return (
//                 <TextField
//                   key={field.name}
//                   name={field.name}
//                   label={field.label}
//                   value={formData[field.name] || ''}
//                   onChange={handleChange}
//                   fullWidth
//                   multiline={field.multiline}
//                   rows={field.multiline ? 2 : 1}
//                 />
//               );
//             }

//             if (field.type === 'date' || field.type === 'time') {
//               return (
//                 <DateTimeField
//                   key={field.name}
//                   label={field.label}
//                   type={field.type}
//                   name={field.name}
//                   value={formData[field.name] || ''}
//                   onChange={handleChange}
//                 />
//               );
//             }

//             if (field.type === 'select') {
//               return (
//                 <FormControl key={field.name} fullWidth>
//                   <InputLabel>{field.label}</InputLabel>
//                   <Select
//                     name={field.name}
//                     value={formData[field.name] || field.default || ''}
//                     onChange={handleChange}
//                     //  disabled={field.disabled || false} 
//                   >
//                     {field.options.map((opt) => (
//                       <MenuItem key={opt} value={opt}>
//                         {opt}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               );
//             }

//             return null;
//           })}

//           {/* 🔹 الحقول الشرطية */}
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
//                 <InputLabel>Sup-Shutdown</InputLabel>
//                 <Select
//                   name="tripReason"
//                   value={formData.tripReason || ''}
//                   onChange={handleChange}
//                 >
//                   {['FO', 'MO', 'PO', 'PE', 'OMC', 'Re-Start', 'Re-Synch','Declard Stand By'].map(
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

// export default DynamicForm;
