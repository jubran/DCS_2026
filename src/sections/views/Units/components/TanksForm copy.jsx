// import React, { useState } from 'react';
// import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// import { Checkbox, FormControlLabel, Divider, Typography } from '@mui/material';

// import { TYPE_STATUS_MENU, VALVE_STATUS_MENU, TANK_TAGS_MENU } from '.';
// import { DateTimeField } from '@mui/x-date-pickers';
// import { FormContainer } from './FormContainer';

// const TanksForm = () => {
//   const [formData, setFormData] = useState({
//     location: '', EventDate: '', EventTime: '', TypeStatus: '', ValveStatus: '', TankTag: '',
//     isDoubleOperation: false, TypeStatus2: '', ValveStatus2: '', TankTag2: '',
//   });

//   const handleChange = (e) => {
//     const { name, value, checked, type } = e.target;
//     let newFormData = {
//         ...formData,
//         [name]: type === 'checkbox' ? checked : value,
//     };

//     if (name === 'location') {
//         newFormData.TypeStatus = '';
//         newFormData.TypeStatus2 = '';
//         newFormData.TankTag = '';
//         newFormData.TankTag2 = '';
//     }
//     if (name === 'TypeStatus') {
//         newFormData.TankTag = '';
//     }
//     if (name === 'TypeStatus2') {
//         newFormData.TankTag2 = '';
//     }

//     setFormData(newFormData);
//   };

//   const getFilteredTypeStatus = (location) => {
//     const loc = location.toUpperCase().trim();
//     let allowedTypes = [];

//     if (loc.includes('TANK#6') || loc.includes('TANK#8')) {
//         allowedTypes = ['FILLING', 'FEEDING', 'RETUERN', 'MAINTENANCE'];
//     } else if (loc.includes('TANK#7')) {
//         allowedTypes = ['FILLING', 'FEEDING', 'MAINTENANCE'];
//     } else if (loc.includes('TANK#9') || loc.includes('TANK#11')) {
//         allowedTypes = ['FILLING', 'SERVICE', 'RETUERN', 'MAINTENANCE'];
//     } else if (loc.includes('TANK#10') || loc.includes('TANK#12') || loc.includes('TANK#13')) {
//         allowedTypes = ['MAINTENANCE', 'FILLING', 'FEEDING', 'RETUERN'];
//     } else if (loc.includes('TANK#15') || loc.includes('TANK#16')) {
//         allowedTypes = ['MAINTENANCE', 'FILLING', 'SERVICE', 'RETUERN'];
//     } else if (loc.includes('TANK#14') || loc.includes('TANK#17') || loc.includes('TANK#18')) {
//         allowedTypes = ['MAINTENANCE', 'FILLING', 'SERVICE'];
//     } else {
//         return TYPE_STATUS_MENU;
//     }

//     return TYPE_STATUS_MENU.filter(menuItem => allowedTypes.includes(menuItem.value));
//   };

 
//   const getOperationText = (typeStatus, location, tankTag, valveStatus) => {
//     switch (typeStatus) {
//       case 'FEEDING': return `Location: ${location} | VALVE TO | Tank: ${tankTag} | Status: ${valveStatus}`;
//       case 'RETUERN': return `Location: ${location} | VALVE FROM | Tank: ${tankTag} | Status: ${valveStatus}`;
//       case 'FILLING': return `Location: ${location} | VALVE BY | Tank: ${tankTag} | Status: ${valveStatus}`;
//       case 'SERVICE': return `Location: ${location} | VALVE TO | Tank: ${tankTag} | Status: ${valveStatus}`;
//       case 'MAINTENANCE': return `Location: UNDER MAINTENANCE`;
//       default: return '';
//     }
//   };

//   const operationData = `${getOperationText(formData.TypeStatus, formData.location, formData.TankTag, formData.ValveStatus)}${formData.isDoubleOperation ? `\n-- Double Operation --\n${getOperationText(formData.TypeStatus2, formData.location, formData.TankTag2, formData.ValveStatus2)}` : ''}`;

//   const loc = formData.location.toUpperCase().trim();
//   const isTank678 = ['TANK#6', 'TANK#7', 'TANK#8'].some(t => loc.includes(t));
//   const isTank911 = ['TANK#9', 'TANK#11'].some(t => loc.includes(t));
//   const isTank101213 = ['TANK#10', 'TANK#12', 'TANK#13'].some(t => loc.includes(t));
//   const isTank141516 = ['TANK#14', 'TANK#15', 'TANK#16'].some(t => loc.includes(t));
//   const isTank161718 = ['TANK#16', 'TANK#17', 'TANK#18'].some(t => loc.includes(t));


//   const getFilteredTankTags = (typeStatus) => {
//     if (!typeStatus) return TANK_TAGS_MENU;

//     let allowedTags = [];
//     if (isTank678) {
//       if (typeStatus === 'FILLING') allowedTags = ['FUS'];
//       if (['FEEDING', 'RETUERN'].includes(typeStatus)) allowedTags = ['29 PPS'];
//     } else if (isTank911) {
//       if (typeStatus === 'FILLING') allowedTags = ['29 PPS'];
//       if (typeStatus === 'RETUERN') allowedTags = ['DIESEL GTS'];
//     } else if (isTank101213) {
//       if (typeStatus === 'FILLING') allowedTags = ['FUS'];
//       if (['FEEDING', 'RETUERN'].includes(typeStatus)) allowedTags = ['COTP'];
//     } else if (isTank141516) {
//       if (typeStatus === 'FILLING') allowedTags = ['COTP'];
//       if (typeStatus === 'SERVICE') allowedTags = ['GT#19'];
//       if (typeStatus === 'RETUERN') allowedTags = ['GT#19', 'CRUDE GTS'];
//     } else if (isTank161718) {
//       if (typeStatus === 'FILLING') allowedTags = ['COTP'];
//       if (typeStatus === 'SERVICE') allowedTags = ['GT#26'];
//       if (typeStatus === 'RETUERN') allowedTags = ['GT#26', 'CRUDE GTS'];
//     }

//     if (allowedTags.length > 0) {
//       return TANK_TAGS_MENU.filter(tag => allowedTags.includes(tag.value));
//     }

//     return TANK_TAGS_MENU; 
//   };

//   const filteredTypeStatus1 = getFilteredTypeStatus(formData.location);
//   const filteredTankTags1 = getFilteredTankTags(formData.TypeStatus);

//   const filteredTypeStatus2 = getFilteredTypeStatus(formData.location);
//   const filteredTankTags2 = getFilteredTankTags(formData.TypeStatus2);


//   return (
//     <FormContainer>
//       <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
//       <DateTimeField label="Event Date (YYYY-MM-DD)" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
//       <DateTimeField label="Event Time (HH:mm)" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />

//       <FormControl fullWidth>
//         <InputLabel>Operation Type (1)</InputLabel>
//         <Select
//           name="TypeStatus"
//           value={formData.TypeStatus}
//           onChange={handleChange}
//           label="Operation Type (1)"
//           disabled={formData.location.trim() === ''}
//         >
//           {filteredTypeStatus1.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth disabled={formData.TypeStatus === 'MAINTENANCE' || formData.TypeStatus === ''}>
//         <InputLabel>Valve Status (1)</InputLabel>
//         <Select
//           name="ValveStatus"
//           value={formData.ValveStatus}
//           onChange={handleChange}
//           label="Valve Status (1)"
//         >
//           {VALVE_STATUS_MENU.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth disabled={formData.TypeStatus === 'MAINTENANCE' || formData.TypeStatus === ''}>
//         <InputLabel>Tank Tag (1)</InputLabel>
//         <Select
//           name="TankTag"
//           value={formData.TankTag}
//           onChange={handleChange}
//           label="Tank Tag (1)"
//         >
//           {filteredTankTags1.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControlLabel
//         control={<Checkbox checked={formData.isDoubleOperation} onChange={handleChange} name="isDoubleOperation" />}
//         label="Is there another operation?"
//       />

//       {formData.isDoubleOperation && (
//         <React.Fragment>
//           <Divider sx={{ my: 1 }} />
//           <Typography variant="subtitle1" color="primary">Double Operation</Typography>

//           <FormControl fullWidth>
//             <InputLabel>Operation Type (2)</InputLabel>
//             <Select
//               name="TypeStatus2"
//               value={formData.TypeStatus2}
//               onChange={handleChange}
//               label="Operation Type (2)"
//               disabled={formData.location.trim() === ''}
//             >
//               {filteredTypeStatus2.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth disabled={formData.TypeStatus2 === 'MAINTENANCE' || formData.TypeStatus2 === ''}>
//             <InputLabel>Valve Status (2)</InputLabel>
//             <Select
//               name="ValveStatus2"
//               value={formData.ValveStatus2}
//               onChange={handleChange}
//               label="Valve Status (2)"
//             >
//               {VALVE_STATUS_MENU.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth disabled={formData.TypeStatus2 === 'MAINTENANCE' || formData.TypeStatus2 === ''}>
//             <InputLabel>Tank Tag (2)</InputLabel>
//             <Select
//               name="TankTag2"
//               value={formData.TankTag2}
//               onChange={handleChange}
//               label="Tank Tag (2)"
//             >
//               {filteredTankTags2.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </React.Fragment>
//       )}

//       <TextField
//         label="Operation Data (Fuel Summary)"
//         name="OperationData"
//         value={operationData}
//         multiline
//         rows={4}
//         fullWidth
//         disabled 
//       />
//     </FormContainer>
//   );
// };

// export default TanksForm;