// import React, { useState } from 'react';
// import { TextField,
//   MenuItem, Select, FormControl, InputLabel

// } from '@mui/material';


// import DateTimeField from './DateTimeField';
// import { FormContainer } from '../FormContainer';

// const BsdeForm = () => {
//   const [formData, setFormData] = useState({
//     location: '', EventDate: '', EventTime: '', EventText: '', operationType: '', unitStatus: ''
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
//         <InputLabel>Operation Type</InputLabel>
//         <Select
//           name="operationType"
//           value={formData.operationType}
//           onChange={handleChange}
//           label="Operation Type"
//         >
//           {['FSNL', 'LOAD'].map((type) => (
//             <MenuItem key={type} value={type}>
//               {type}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Unit Status</InputLabel>
//         <Select
//           name="unitStatus"
//           value={formData.unitStatus}
//           onChange={handleChange}
//           label="Unit Status"
//         >
//           {['Shutdown', 'In Service'].map((status) => (
//             <MenuItem key={status} value={status}>
//               {status}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </FormContainer>
//   );
// };

// export default BsdeForm;