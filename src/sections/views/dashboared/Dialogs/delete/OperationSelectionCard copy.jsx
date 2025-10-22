// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   Typography,
//   Grid,
//   ToggleButton,
//   ToggleButtonGroup,
//   useTheme,
//   FormControlLabel,
//   Checkbox,
//   Icon,
// } from '@mui/material';

// // بيانات وهمية — عدل حسب حاجتك أو اجعلها prop
// const accountData = {
//   currentUnitId: 'GT16',
//   status: 'In Service',
//   employmentDate: 'Date',
//   employeeName: 'جبران حسن اليحيوي',
// };


// // مكون صف البيانات (DataRow)
// const DataRow = ({ icon, label, value }) => (
//   <Box display="flex" alignItems="center" width="100%">
//     {/* العمود 1: الأيقونة */}
//     {icon && (
//       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1, width: 60 }}>
//         <Icon icon={icon} style={{ fontSize: 24, color: '#3f51b5' }} />
//       </Box>
//     )}
//     {/* العمود 2: التسمية والقيمة */}
//     <Box sx={{ 
//       display: 'flex', 
//       flexDirection: 'column', 
//       justifyContent: 'center', 
//       p: 1, 
//       flex: 1,
//       textAlign: 'right',
//       borderBottom: '1px solid #eee'
//     }}>
//       <Typography variant="caption" color="text.secondary">
//         {label}
//       </Typography>
//       <Typography variant="body1" fontWeight="medium">
//         {value}
//       </Typography>
//     </Box>
//   </Box>
// );

// const ACTIONS = [
//   { key: 'تشغيل', label: 'تشغيل', colorRole: 'success' },
//   { key: 'إيقاف', label: 'إيقاف', colorRole: 'warning' },
//   { key: 'تحويل', label: 'تحويل', colorRole: 'error' },
// ];


// // مكون بطاقة اختيار العملية
// const OperationSelectionCard = ({ onActionSelect }) => {
//   const theme = useTheme();
  
//   // State لتخزين العملية المختارة
//   const [selectedAction, setSelectedAction] = useState(null);

//   // دالة لمعالجة التغيير في الـ Checkbox
//   const handleActionChange = (action) => {
//     const newAction = selectedAction === action ? null : action;
//     setSelectedAction(newAction);
//     // تمرير القيمة الجديدة إلى المكون الأب
//     onActionSelect(newAction);
//   };

//   // دالة مساعدة لتنسيق الأزرار
//   const getButtonStyles = (action) => {
//     let colorKey;
//     let mainColor;

//     // تعيين الألوان المطلوبة
//     if (action === 'تشغيل') {
//       colorKey = theme.palette.success.main;
//       mainColor = 'white';
//     } else if (action === 'إيقاف') {
//       colorKey = theme.palette.warning.main;
//       mainColor = 'black';
//     } else if (action === 'تحويل') {
//       colorKey = theme.palette.error.main;
//       mainColor = 'white';
//     }

//     const isChecked = selectedAction === action;
    
//     return {
//       flex: 1,
//       m: 0,
//       borderRadius: 1,
//       px: 2,
//       py: 1.5,
//       bgcolor: isChecked ? colorKey : theme.palette.background.paper,
//       border: isChecked ? `2px solid ${colorKey}` : `1px solid ${theme.palette.divider}`,
//       color: isChecked ? mainColor : theme.palette.text.primary,
//       transition: 'all 0.2s ease-in-out',
//       justifyContent: 'center',
//       cursor: 'pointer',
//       position: 'relative',
//       overflow: 'hidden',
      
//       // إخفاء Checkbox الافتراضي
//       '& .MuiCheckbox-root': {
//         position: 'absolute',
//         opacity: 0,
//         width: '100%',
//         height: '100%',
//         top: 0,
//         left: 0,
//         margin: 0,
//         cursor: 'pointer',
//       },
      
//       '& .MuiFormControlLabel-label': {
//         fontWeight: isChecked ? 'bold' : 'normal',
//         fontSize: '0.95rem',
//         textAlign: 'center',
//         width: '100%',
//         zIndex: 1,
//         position: 'relative'
//       },
      
//       '&:hover': {
//         bgcolor: isChecked ? colorKey : theme.palette.action.hover,
//         transform: 'translateY(-1px)',
//         boxShadow: 1
//       },
      
//       '&:active': {
//         transform: 'translateY(0)',
//       }
//     };
//   };

//   // بيانات الوحدة/الموظف
//   const accountData = {
//     currentUnitId: 'GT16',
//     status: 'In Service',
//     employmentDate: new Date().toLocaleDateString('ar-SA'),
//     employeeName: 'جبران حسن اليحيوي',
//   };

//   return (
//     <Grid item xs={12}>
//       <Card sx={{ 
//         p: 3, 
//         borderRadius: 2, 
//         boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//         border: `1px solid ${theme.palette.divider}`
//       }}>
//         {/* عنوان الوحدة */}
//         <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
//           الوحدة الحالية
//         </Typography>
//         <Typography variant="h4" fontWeight="bold" mb={3} color="primary">
//           {accountData.currentUnitId}
//         </Typography>

//         {/* تفاصيل البيانات */}
//         <Box mb={4}>
//           <DataRow 
//             icon="mdi:information" 
//             label="الحالة" 
//             value={accountData.status} 
//           />
//           <DataRow 
//             icon="mdi:calendar" 
//             label="التاريخ" 
//             value={accountData.employmentDate} 
//           />
//           <DataRow 
//             icon="mdi:account" 
//             label="الإسم" 
//             value={accountData.employeeName} 
//           />
//         </Box>

//         {/* أزرار التحكم */}
//         <Typography variant="subtitle2" color="text.secondary" mb={2}>
//           اختر نوع العملية:
//         </Typography>
        
//         <Box display="flex" gap={1.5} mb={3}>
//           {['تشغيل', 'إيقاف', 'تحويل'].map((action) => (
//             <FormControlLabel
//               key={action}
//               control={
//                 <Checkbox 
//                   checked={selectedAction === action}
//                   onChange={() => handleActionChange(action)}
//                   name={action}
//                 />
//               }
//               label={action}
//               sx={getButtonStyles(action)}
//             />
//           ))}
//         </Box>

        // {/* مؤشر الاختيار الحالي */}
        // {selectedAction && (
        //   <Box sx={{ 
        //     p: 1, 
        //     bgcolor: 'action.hover', 
        //     borderRadius: 1,
        //     textAlign: 'center'
        //   }}>
        //     <Typography variant="body2" color="primary">
        //       العملية المختارة: <strong>{selectedAction}</strong>
        //     </Typography>
        //   </Box>
        // )}
//       </Card>
//     </Grid>
//   );
// };

// export default OperationSelectionCard;
