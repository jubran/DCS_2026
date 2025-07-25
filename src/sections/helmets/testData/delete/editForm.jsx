// import * as Yup from 'yup';
// import { useMemo } from 'react';
// import PropTypes from 'prop-types';


// import Box from '@mui/material/Box';
// import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import MenuItem from '@mui/material/MenuItem';
// import LoadingButton from '@mui/lab/LoadingButton';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import { Select, TextField } from '@mui/material';



// // ----------------------------------------------------------------------

// export default function UserQuickEditForm({ currentUser, open, onClose }) {
    
//   return (
//     <Dialog
//       fullWidth
//       maxWidth={false}
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: { maxWidth: 720 },
//       }}
//     >

//         <DialogTitle>Quick Update</DialogTitle>

//         <DialogContent>
//           <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
//             Account is waiting for confirmation
//           </Alert>

//           <Box
//             rowGap={3}
//             columnGap={2}
//             display="grid"
//             gridTemplateColumns={{
//               xs: 'repeat(1, 1fr)',
//               sm: 'repeat(2, 1fr)',
//             }}
//           >
//             <Select name="status" label="Status">
           
//                 <MenuItem >
                
//                 </MenuItem>
              
//             </Select>

//             <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

//             <TextField name="name" label="Full Name" value={currentUser.id}/>
//             <TextField name="email" label="Email Address" />
//             <TextField name="phoneNumber" label="Phone Number" />

         
//             <TextField name="state" label="State/Region" />
//             <TextField name="city" label="City" />
//             <TextField name="address" label="Address" />
//             <TextField name="zipCode" label="Zip/Code" />
//             <TextField name="company" label="Company" />
//             <TextField name="role" label="Role" />
//           </Box>
//         </DialogContent>

//         <DialogActions>
//           <Button variant="outlined" onClick={onClose}>
//             Cancel
//           </Button>

//           <LoadingButton type="submit" variant="contained">
//             Update
//           </LoadingButton>
//         </DialogActions>
     
//     </Dialog>
//   );
// }