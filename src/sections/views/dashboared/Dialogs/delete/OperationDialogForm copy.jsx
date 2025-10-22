// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Grid,
//   Button,
//   Typography,
//   Box,
//   Icon,
// } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// import OperationSelectionCard from './OperationSelectionCard'; // تأكد من المسار الصحيح

// export default function OperationDialogForm({ data, open, onClose }) {
//   const [selectedOperation, setSelectedOperation] = useState(null);

//   const handleActionSelect = (action) => {
//     setSelectedOperation(action);
//   };

//   const handleUpdate = () => {
//     // منطق الإرسال الفعلي
//     console.log(`Update button clicked for operation: ${selectedOperation}`);
//     // هنا تضع منطق إرسال البيانات (API call)
//     onClose(); // إغلاق النافذة بعد الإرسال
//   };

//   return (
//     <Dialog 
//       fullWidth 
//       maxWidth={false} 
//       open={open} 
//       onClose={onClose}
//       PaperProps={{ 
//         sx: { 
//           maxWidth: 720,
//           borderRadius: 2
//         },
//       }}
//     >
    //   <DialogTitle sx={{ 
    //     textAlign: 'center',
    //     bgcolor: 'primary.main',
    //     color: 'white'
    //   }}>
    //     الرجاء اختيار نوع العملية
    //   </DialogTitle>
      
//       <DialogContent sx={{ p: 3 }}>
//         <Alert 
//           variant="outlined" 
//           severity="info" 
//           sx={{ mb: 3 }}
//           icon={<Icon icon="mdi:information" />}
//         >
//           العملية قيد التطوير حالياً
//           <br />
//           {data?.location && `الموقع: ${data.location}`}
//         </Alert>

//         {/* مكون اختيار العملية */}
//         <Grid container spacing={2}>
//           <OperationSelectionCard onActionSelect={handleActionSelect} />
//         </Grid>
//       </DialogContent>
      
//       <DialogActions sx={{ p: 2, gap: 1 }}>
//         <Button 
//           variant="outlined" 
//           onClick={onClose}
//           startIcon={<Icon icon="mdi:close" />}
//         >
//           إلغاء
//         </Button>
        
//         <LoadingButton 
//           type="submit" 
//           variant="contained" 
//           onClick={handleUpdate} 
//           disabled={!selectedOperation}
//           loading={false} // يمكنك التحكم في حالة التحميل هنا
//           startIcon={<Icon icon="mdi:check" />}
//         >
//           تحديث
//         </LoadingButton>
//       </DialogActions>
//     </Dialog>
//   );
// }
