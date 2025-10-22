// import React from 'react';
// import { Box, Card, Typography, Button, Grid, FormControlLabel, Checkbox } from '@mui/material';
// // FormControlLabel and Checkbox are no longer needed for the button area

// const FinancialSummaryCard = () => {
//   const accountData = {
//     currentBalance: 'GT16',
//     orderTotal: 'In Sevice',
//     earning: 'Date',
//     refunded: 'جبران حسن اليحيوي',
//   };

// const DataRow = ({ label, value }) => (
//   <Box display="flex"  py={1} >
//     {/* Added mr={2} to create spacing after the label */}
//     <Typography 
//       color="text.secondary" 
//       mr={2} // Margin-right of 2 units (approx. 16px)
//     >
//       {label}
//     </Typography>
//     
//     {/* Ensured right alignment for the Arabic text value */}
//     <Typography 
//       fontWeight="bold" 
//       sx={{ textAlign: "right" }}
//     >
//       {value}
//     </Typography>
//   </Box>
// );

//   return (
//     <Grid item xs={12} >
//       <Card sx={{ p: 3, borderRadius: 2, boxShadow: 'none' }}>
//         <Typography variant="caption" color="text.secondary">
//           الوحدة الحالية
//         </Typography>

//         <Typography variant="h4" fontWeight="bold" mb={3}>
//           {accountData.currentBalance}
//         </Typography>
//         <Box mb={4} >
//           <DataRow label="التاريخ" value={accountData.orderTotal} />
//           <DataRow label="الرقم الوظيفي" value={accountData.earning} />
//           <DataRow label="الإسم" value={accountData.refunded} />
//         </Box>

//         <Box display="flex" gap={2}>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 color="warning"
//                 sx={{
//                   '& .MuiSvgIcon-root': { fontSize: 28 },
//                   bgcolor: 'warning.main',
//                   color: 'white',
//                   borderRadius: 1,
//                   '&:hover': { bgcolor: 'warning.dark' },
//                 }}
//               />
//             }
//             label="تشغيل"
//             sx={{
//               flex: 1,
//               m: 0,
//               borderRadius: 1,
//               px: 2,
//               py: 1,
//               bgcolor: '#fff3e0', // لون خفيف يشبه زر التحذير
//               border: '1px solid #ffb300',
//               display:'inline-flex',
//                    alignItems: 'center',
//               gap: 1,
//             }}
//           />

//  <FormControlLabel
//             control={
//               <Checkbox
//                 color="warning"
//                 sx={{
//                   '& .MuiSvgIcon-root': { fontSize: 28 },
//                   bgcolor: 'warning.main',
//                   color: 'white',
//                   borderRadius: 1,
//                   '&:hover': { bgcolor: 'warning.dark' },
//                 }}
//               />
//             }
//             label="إيقاف"
//             sx={{
//               flex: 1,
//               m: 0,
//               borderRadius: 1,
//               px: 2,
//               py: 1,
//               bgcolor: '#fff3e0', // لون خفيف يشبه زر التحذير
//               border: '1px solid #ffb300',
//                display:'inline-flex',
//                    alignItems: 'center',
//               gap: 1,
//             }}
//           />
//            <FormControlLabel
//             control={
//               <Checkbox
//                 color="warning"
//                 sx={{
//                   display: 'flex',
//                   '& .MuiSvgIcon-root': { fontSize: 28 },
//                   bgcolor: 'warning.main',
//                   color: 'white',
//                   borderRadius: 1,
//                   '&:hover': { bgcolor: 'warning.dark' },
//                 }}
//               />
//             }
//             label="تحويل"
//             sx={{
//                 display:'inline-flex',
//                    alignItems: 'center',
//               gap: 1,
//               flex: 1,
//               m: 0,
//               borderRadius: 1,
//               px: 2,
//               py: 1,
//               bgcolor: '#fff3e0', // لون خفيف يشبه زر التحذير
//               border: '1px solid #ffb300',
//            
//             }}
//           />          
//          
//         </Box>
//       </Card>
//     </Grid>
//   );
// };

// export default FinancialSummaryCard;


// والصفحة الاساسية هي

// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Box,
//   Button,
//   Card,
//   CardActionArea,
//   Typography,
// } from '@mui/material';
// import { LoadingButton } from "@mui/lab";
// import { Icon } from "@iconify/react"; // <-- New Iconify Import
// import FinancialSummaryCard from './cardBase';

// // Array defining the card data.
// // The 'icon' property now uses Iconify icon names (e.g., 'mdi:play')
// const operationCards = [
//   { name: 'Start', icon: 'mdi:play', color: '#4CAF50', hoverColor: '#66BB6A' },       // Green - Material Design Icons
//   { name: 'Stop', icon: 'mdi:stop', color: '#F44336', hoverColor: '#E57373' },         // Red - Material Design Icons
//   { name: 'Trip', icon: 'material-symbols:directions-bus', color: '#2196F3', hoverColor: '#64B5F6' }, // Blue - Material Symbols
//   { name: 'Note', icon: 'mdi:note-plus', color: '#FFC107', hoverColor: '#FFD54F' },     // Amber - Material Design Icons
// ];

// const DataRow = ({ icon, label, value }) => (
//     <>
//         {/* Column 1: Icon */}
//         <Box sx={{ 
//             display: 'flex', 
//             alignItems: 'center', 
//             justifyContent: 'center', 
//             p: 1 
//         }}>
//             <Icon icon={icon} style={{ fontSize: 24, color: '#3f51b5' }} />
//         </Box>
//         
//         {/* Column 2: Label and Value */}
//         <Box sx={{ 
//             display: 'flex', 
//             flexDirection: 'column', 
//             justifyContent: 'center', 
//             p: 1, 
//             textAlign: 'right', // Align text to the right for Arabic context
//             borderBottom: '1px solid #eee'
//         }}>
//             <Typography variant="caption" color="text.secondary">
//                 {label}
//             </Typography>
//             <Typography variant="body1" fontWeight="medium">
//                 {value}
//             </Typography>
//         </Box>
//     </>
// );
// export default function OperationDialogForm({ data, open, onClose }) {
//     
//   const handleOperationClick = (operationName) => {
//     console.log(`Operation clicked: ${operationName}`);
//     // Add your logic here
//   };
//      const currentTime = new Date().toLocaleString('ar-EG', {
//     dateStyle: 'medium',
//     timeStyle: 'short',
//   });
//   return (
//     <Dialog
//       fullWidth
//       maxWidth={false}
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: { maxWidth: 720 },
//       }}
//     >
//       <DialogTitle>الرجاء اختيار نوع العملية</DialogTitle>

//       <DialogContent>
//         <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
//           العملية قيد التطوير حالياً
//           <br />
//           {data.location}
//         </Alert>

//       
// <FinancialSummaryCard />
//      
//       </DialogContent>

//       <DialogActions>
//         <Button variant="outlined" onClick={onClose}>
//           Cancel
//         </Button>

//         <LoadingButton type="submit" variant="contained" disabled> 
//           Update
//         </LoadingButton>
//       </DialogActions>
//     </Dialog>
//   );
// }