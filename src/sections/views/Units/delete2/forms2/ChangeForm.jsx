// import React, { useState } from 'react';
// import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import DateTimeField from './DateTimeField';
// import { FormContainer } from '../FormContainer';
// import { Divider, Typography } from '@mui/material';
// import { STATUS_MENU, RATCHING_MENU } from '../global';


// const ChangeForm = () => {
//   const [formData, setFormData] = useState({
//     location: '', EventDate: '', EventTime: '', EventText: '',
//     selectStstusMenu: '', 
//     selectedRatching: 'Ratching In Service', 
//     tripReason: '',
//     foReason: '',
//   });

//   const handleChange = (e) => {
//     const { name, value, checked, type } = e.target;
//     let newFormData = { ...formData, [name]: type === 'checkbox' ? checked : value };

//     if (name === 'selectStstusMenu') {
      
//       if (value === 'Shutdown' || value === 'Stand By') {
//         newFormData.selectedRatching = 'Ratching In Service';
//       } 
      
//       else if (value === 'In Service') {
//         newFormData.selectedRatching = '';
//       }

//       if (value !== 'Shutdown') {
//         newFormData.tripReason = '';
//         newFormData.foReason = '';
//       }
//     }
    
//     if (name === 'tripReason' && value !== 'FO') {
//       newFormData.foReason = '';
//     }

//     setFormData(newFormData);
//   };

//   const showRatching = formData.selectStstusMenu === 'Stand By' || formData.selectStstusMenu === 'Shutdown';
  
//   const showShutdownFields = formData.selectStstusMenu === 'Shutdown';
  
//   const showFoSubReason = showShutdownFields && formData.tripReason === 'FO';
//   return (
//     <FormContainer>
//       <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
//       <DateTimeField label="Event Date (YYYY-MM-DD)" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
//       <DateTimeField label="Event Time (HH:mm)" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />
//       <TextField label="Event Text" name="EventText" value={formData.EventText} onChange={handleChange} multiline rows={2} fullWidth />

//       <FormControl fullWidth>
//         <InputLabel>Status</InputLabel>
//         <Select
//           name="selectStstusMenu"
//           value={formData.selectStstusMenu}
//           onChange={handleChange}
//           label="Status"
//         >
//           {STATUS_MENU.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
      
//       {showRatching && (
//         <FormControl fullWidth>
//           <InputLabel>Ratching Status</InputLabel>
//           <Select
//             name="selectedRatching"
//             value={formData.selectedRatching}
//             onChange={handleChange}
//             label="Ratching Status"
            
//           >
//             {RATCHING_MENU.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       )}

//       {showShutdownFields && (
//         <React.Fragment>
//             <Divider sx={{ my: 0.5 }} />
//             <Typography variant="subtitle2" color="error">Shutdown Details</Typography>

//             <FormControl fullWidth>
//               <InputLabel>Trip Reason</InputLabel>
//               <Select
//                 name="tripReason"
//                 value={formData.tripReason}
//                 onChange={handleChange}
//                 label="Trip Reason"
//               >
//                 {['FO', 'MO', 'PO', 'PE', 'OMC','Re-Start','Re-Synck'].map((reason) => (
//                   <MenuItem key={reason} value={reason}>
//                     {reason}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {showFoSubReason && (
//               <FormControl fullWidth>
//                 <InputLabel>FO Sub-Reason</InputLabel>
//                 <Select
//                   name="foReason"
//                   value={formData.foReason}
//                   onChange={handleChange}
//                   label="FO Sub-Reason"
//                 >
//                   {['U1', 'U2', 'U3', 'SF'].map((reason) => (
//                     <MenuItem key={reason} value={reason}>
//                       {reason}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             )}
//             <Divider sx={{ my: 0.5 }} />
//         </React.Fragment>
//       )}
      
//         <TextField
//         label="Summary Data"
//         name="Summary"
//         value={`Location: ${formData.location} | Status: ${formData.selectStstusMenu}${showRatching ? ` | Ratching: ${formData.selectedRatching}` : ''}${showShutdownFields ? ` | Trip Reason: ${formData.tripReason || 'N/A'}${showFoSubReason ? ` (Sub: ${formData.foReason || 'N/A'})` : ''}` : ''}`}
//         multiline
//         rows={3}
//         fullWidth
//         disabled
//       />

//     </FormContainer>
//   );
// };

// export default ChangeForm;