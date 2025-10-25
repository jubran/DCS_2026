// import React, { useState } from 'react';
// import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import DateTimeField from './DateTimeField';
// import { FormContainer } from '../FormContainer';
// import { STATUS_MENU, RATCHING_MENU } from '../global';



// const StopForm = () => {
//   const [formData, setFormData] = useState({
//     location: '', EventDate: '', EventTime: '', EventText: '',
//     selectedRatching: '', selectStstusMenu: 'Stand By', note: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <FormContainer>
//       <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
//       <DateTimeField label="Event Date (YYYY-MM-DD)" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
//       <DateTimeField label="Event Time (HH:mm)" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />
//       <TextField label="Event Text" name="EventText" value={formData.EventText} onChange={handleChange} multiline rows={2} fullWidth />

//       <FormControl fullWidth>
//         <InputLabel>Ratching Status</InputLabel>
//         <Select
//           name="selectedRatching"
//           value={formData.selectedRatching}
//           onChange={handleChange}
//           label="Ratching Status"
//         >
//           {RATCHING_MENU.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Status</InputLabel>
//         <Select
//           name="selectStstusMenu"
//           value={formData.selectStstusMenu}
//           onChange={handleChange}
//           label="Status"
//           disabled 
//         >
//           {STATUS_MENU.map((option) => (
//             <MenuItem key={option.value} value={option.value} disabled={option.value !== 'Stand By'}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <TextField label="Note" name="note" value={formData.note} onChange={handleChange} multiline rows={2} fullWidth />
//     </FormContainer>
//   );
// };

// export default StopForm;