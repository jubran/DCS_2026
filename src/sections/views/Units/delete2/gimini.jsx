// // import React, { useState } from 'react';
// // import {
// //   Container, Grid, Card, CardContent, Typography, TextField,
// //   MenuItem, Select, FormControl, InputLabel, Checkbox, FormControlLabel,
// //   Button, Box, Divider
// // } from '@mui/material';
// // import { styled } from '@mui/material/styles';

// // ----------------------------------------------------------------------
// // مكونات مساعدة
// // ----------------------------------------------------------------------

// // const CardStyled = styled(Card)(({ theme }) => ({
// //   minHeight: 400,
// //   transition: '0.3s',
// //   '&:hover': {
// //     boxShadow: theme.shadows[10],
// //   },
// //   borderRadius: theme.shape.borderRadius * 2,
// //   backgroundColor: theme.palette.background.paper,
// // }));

// // const FormContainer = styled(Box)({
// //   display: 'flex',
// //   flexDirection: 'column',
// //   gap: '16px',
// //   paddingTop: '16px',
// // });

// // // قائمة حالات الوحدة
// // const STATUS_MENU = [
// //   { value: 'In Service', label: 'In Service' },
// //   { value: 'Stand By', label: 'Stand By' },
// //   { value: 'Shutdown', label: 'Shutdown' },
// // ];

// // // قائمة حالات Ratching
// // const RATCHING_MENU = [
// //   { value: 'Ratching In Service', label: 'Ratching In Service' },
// //   { value: 'Ratching Not Working', label: 'Ratching Not Working' },
// // ];

// // // قائمة أنواع عمليات الخزانات
// // const TYPE_STATUS_MENU = [
// //   { value: 'SERVICE', label: 'SERVICE' },
// //   { value: 'FEEDING', label: 'FEEDING' },
// //   { value: 'FILLING', label: 'FILLING' },
// //   { value: 'RETUERN', label: 'RETUERN' },
// //   { value: 'MAINTENANCE', label: 'MAINTENANCE' },
// // ];

// // // قائمة حالة الصمام
// // const VALVE_STATUS_MENU = [
// //   { value: 'OPEN', label: 'OPEN' },
// //   { value: 'CLOSE', label: 'CLOSE' },
// // ];

// // // قائمة أسماء الخزانات
// // const TANK_TAGS_MENU = [
// //   { value: 'GT#19', label: 'GT#19' },
// //   { value: 'GT#26', label: 'GT#26' },
// //   { value: 'FUS', label: 'FUS' },
// //   { value: '29 PPS', label: '29 PPS' },
// //   { value: 'COTP', label: 'COTP' },
// //   { value: 'CRUDE GTS', label: 'CRUDE GTS' },
// //   { value: 'DIESEL GTS', label: 'DIESEL GTS' },
// // ];

// // ----------------------------------------------------------------------
// // نماذج React (Forms)
// // ----------------------------------------------------------------------

// /**
//  * دالة مشتركة لحقول التاريخ والوقت
//  * @param {string} label - تسمية الحقل
//  * @param {string} type - نوع الإدخال ('date' أو 'time')
//  */
// // const DateTimeField = ({ label, type, value, onChange }) => (
// //   <TextField
// //     label={label}
// //     type={type}
// //     value={value}
// //     onChange={onChange}
// //     InputLabelProps={{ shrink: true }}
// //     fullWidth
// //   />
// // );

// /**
//  * نموذج البدء (StartUpForm)
//  */
// // const StartUpForm = () => {
// //   const [formData, setFormData] = useState({
// //     location: '', EventDate: '', EventTime: '', flameTime: '', synckTime: '',
// //     EventText: '', selectStstusMenu: 'In Service', note: ''
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   return (
// //     <FormContainer>
// //       <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
// //       <DateTimeField label="Event Date (YYYY-MM-DD)" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
// //       <DateTimeField label="Event Time (HH:mm)" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />
// //       <TextField label="Flame Time" name="flameTime" value={formData.flameTime} onChange={handleChange} fullWidth />
// //       <TextField label="Synck Time" name="synckTime" value={formData.synckTime} onChange={handleChange} fullWidth />
// //       <TextField label="Event Text" name="EventText" value={formData.EventText} onChange={handleChange} multiline rows={2} fullWidth />

// //       <FormControl fullWidth>
// //         <InputLabel>Status</InputLabel>
// //         <Select
// //           name="selectStstusMenu"
// //           value={formData.selectStstusMenu}
// //           onChange={handleChange}
// //           label="Status"
// //           disabled // يجب أن يكون In Service ومُعطل
// //         >
// //           {STATUS_MENU.map((option) => (
// //             <MenuItem key={option.value} value={option.value} disabled={option.value !== 'In Service'}>
// //               {option.label}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>

// //       <TextField label="Note" name="note" value={formData.note} onChange={handleChange} multiline rows={2} fullWidth />
// //     </FormContainer>
// //   );
// // };

// // ----------------------------------------------------------------------

// /**
//  * نموذج الإيقاف (StopForm)
//  */
// // const StopForm = () => {
// //   const [formData, setFormData] = useState({
// //     location: '', EventDate: '', EventTime: '', EventText: '',
// //     selectedRatching: '', selectStstusMenu: 'Stand By', note: ''
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   return (
// //     <FormContainer>
// //       <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
// //       <DateTimeField label="Event Date (YYYY-MM-DD)" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
// //       <DateTimeField label="Event Time (HH:mm)" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />
// //       <TextField label="Event Text" name="EventText" value={formData.EventText} onChange={handleChange} multiline rows={2} fullWidth />

// //       <FormControl fullWidth>
// //         <InputLabel>Ratching Status</InputLabel>
// //         <Select
// //           name="selectedRatching"
// //           value={formData.selectedRatching}
// //           onChange={handleChange}
// //           label="Ratching Status"
// //         >
// //           {RATCHING_MENU.map((option) => (
// //             <MenuItem key={option.value} value={option.value}>
// //               {option.label}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>

// //       <FormControl fullWidth>
// //         <InputLabel>Status</InputLabel>
// //         <Select
// //           name="selectStstusMenu"
// //           value={formData.selectStstusMenu}
// //           onChange={handleChange}
// //           label="Status"
// //           disabled // يجب أن يكون Stand By ومُعطل
// //         >
// //           {STATUS_MENU.map((option) => (
// //             <MenuItem key={option.value} value={option.value} disabled={option.value !== 'Stand By'}>
// //               {option.label}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>

// //       <TextField label="Note" name="note" value={formData.note} onChange={handleChange} multiline rows={2} fullWidth />
// //     </FormContainer>
// //   );
// // };

// // ----------------------------------------------------------------------

// /**
//  * نموذج التعثر (TripForm)
//  */
// // const TripForm = () => {
// //   const [formData, setFormData] = useState({
// //     location: '', EventDate: '', EventTime: '', EventText: '',
// //    selectedRatching: 'Ratching In Service', selectStstusMenu: 'Shutdown', tripReason: '', foReason: ''
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const isShutdown = formData.selectStstusMenu === 'Shutdown';
// //   const isFO = formData.tripReason === 'FO';

// //   return (
// //     <FormContainer>
// //       <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
// //       <DateTimeField label="Event Date (YYYY-MM-DD)" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
// //       <DateTimeField label="Event Time (HH:mm)" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />
// //       <TextField label="Event Text" name="EventText" value={formData.EventText} onChange={handleChange} multiline rows={2} fullWidth />

// //       <FormControl fullWidth>
// //         <InputLabel>Ratching Status</InputLabel>
// //         <Select
// //           name="selectedRatching"
// //           value={formData.selectedRatching}
// //           onChange={handleChange}
// //           label="Ratching Status"
// //         >
// //           {RATCHING_MENU.map((option) => (
// //             <MenuItem key={option.value} value={option.value}>
// //               {option.label}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>

// //       <FormControl fullWidth>
// //         <InputLabel>Status</InputLabel>
// //         <Select
// //           name="selectStstusMenu"
// //           value={formData.selectStstusMenu}
// //           onChange={handleChange}
// //           label="Status"
// //           // disabled // يجب أن يكون Shutdown ومُعطل
// //         >
// //           {STATUS_MENU.map((option) => (
// //             <MenuItem key={option.value} value={option.value} disabled={option.value !== 'Shutdown'}>
// //               {option.label}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>

// //       {isShutdown && (
// //         <FormControl fullWidth>
// //           <InputLabel>Trip Reason</InputLabel>
// //           <Select
// //             name="tripReason"
// //             value={formData.tripReason}
// //             onChange={handleChange}
// //             label="Trip Reason"
// //           >
// //             {['FO', 'MO', 'PO', 'PE', 'OMC','Re-Start','Re-Synck'].map((reason) => (
// //               <MenuItem key={reason} value={reason}>
// //                 {reason}
// //               </MenuItem>
// //             ))}
// //           </Select>
// //         </FormControl>
// //       )}

// //       {isFO && isShutdown && (
// //         <FormControl fullWidth>
// //           <InputLabel>FO Sub-Reason</InputLabel>
// //           <Select
// //             name="foReason"
// //             value={formData.foReason}
// //             onChange={handleChange}
// //             label="FO Sub-Reason"
// //           >
// //             {['U1', 'U2', 'U3', 'SF'].map((reason) => (
// //               <MenuItem key={reason} value={reason}>
// //                 {reason}
// //               </MenuItem>
// //             ))}
// //           </Select>
// //         </FormControl>
// //       )}
// //     </FormContainer>
// //   );
// // };

// // ----------------------------------------------------------------------

// /**
//  * نموذج التغيير (ChangeForm)
//  */
// // const ChangeForm = () => {
// //   const [formData, setFormData] = useState({
// //     location: '', EventDate: '', EventTime: '', EventText: '',
// //     selectStstusMenu: '', 
// //     // Initial default value for Ratching
// //     selectedRatching: 'Ratching In Service', 
// //     // الحقول الجديدة للإيقاف (Shutdown)
// //     tripReason: '',
// //     foReason: '',
// //   });

// //   const handleChange = (e) => {
// //     const { name, value, checked, type } = e.target;
// //     let newFormData = { ...formData, [name]: type === 'checkbox' ? checked : value };

// //     // --- NEW LOGIC FOR STATUS CHANGE ---
// //     if (name === 'selectStstusMenu') {
      
// //       // 1. If 'Shutdown' or 'Stand By' is selected, set default Ratching
// //       if (value === 'Shutdown' || value === 'Stand By') {
// //         newFormData.selectedRatching = 'Ratching In Service';
// //       } 
      
// //       // 2. If 'In Service' is selected, clear Ratching
// //       else if (value === 'In Service') {
// //         newFormData.selectedRatching = '';
// //       }

// //       // 3. Clear Shutdown fields if status is not 'Shutdown'
// //       if (value !== 'Shutdown') {
// //         newFormData.tripReason = '';
// //         newFormData.foReason = '';
// //       }
// //     }
    
// //     // Original logic for clearing FO sub-reason (remains the same)
// //     if (name === 'tripReason' && value !== 'FO') {
// //       newFormData.foReason = '';
// //     }

// //     setFormData(newFormData);
// //   };

// //   // ✅ New Logic: show Ratching only for 'Shutdown' OR 'Stand By'
// //   const showRatching = formData.selectStstusMenu === 'Stand By' || formData.selectStstusMenu === 'Shutdown';
  
// //   // إظهار حقول الإيقاف فقط إذا كانت الحالة Shutdown
// //   const showShutdownFields = formData.selectStstusMenu === 'Shutdown';
  
// //   // إظهار سبب FO الفرعي فقط إذا كانت الحالة Shutdown والسبب هو FO
// //   const showFoSubReason = showShutdownFields && formData.tripReason === 'FO';
// //   return (
// //     <FormContainer>
// //       <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
// //       <DateTimeField label="Event Date (YYYY-MM-DD)" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
// //       <DateTimeField label="Event Time (HH:mm)" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />
// //       <TextField label="Event Text" name="EventText" value={formData.EventText} onChange={handleChange} multiline rows={2} fullWidth />

// //       <FormControl fullWidth>
// //         <InputLabel>Status</InputLabel>
// //         <Select
// //           name="selectStstusMenu"
// //           value={formData.selectStstusMenu}
// //           onChange={handleChange}
// //           label="Status"
// //         >
// //           {STATUS_MENU.map((option) => (
// //             <MenuItem key={option.value} value={option.value}>
// //               {option.label}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>
      
// //       {/* حقول Ratching - تظهر فقط في حالة Stand By & Shutdown */}
// //       {showRatching && (
// //         <FormControl fullWidth>
// //           <InputLabel>Ratching Status</InputLabel>
// //           <Select
// //             name="selectedRatching"
// //             value={formData.selectedRatching}
// //             onChange={handleChange}
// //             label="Ratching Status"
            
// //           >
// //             {RATCHING_MENU.map((option) => (
// //               <MenuItem key={option.value} value={option.value}>
// //                 {option.label}
// //               </MenuItem>
// //             ))}
// //           </Select>
// //         </FormControl>
// //       )}

// //       {/* حقول Shutdown - تظهر فقط في حالة Shutdown */}
// //       {showShutdownFields && (
// //         <React.Fragment>
// //             <Divider sx={{ my: 0.5 }} />
// //             <Typography variant="subtitle2" color="error">Shutdown Details</Typography>

// //             {/* Trip Reason Dropdown */}
// //             <FormControl fullWidth>
// //               <InputLabel>Trip Reason</InputLabel>
// //               <Select
// //                 name="tripReason"
// //                 value={formData.tripReason}
// //                 onChange={handleChange}
// //                 label="Trip Reason"
// //               >
// //                 {['FO', 'MO', 'PO', 'PE', 'OMC','Re-Start','Re-Synck'].map((reason) => (
// //                   <MenuItem key={reason} value={reason}>
// //                     {reason}
// //                   </MenuItem>
// //                 ))}
// //               </Select>
// //             </FormControl>

// //             {/* FO Sub-Reason Dropdown - تظهر فقط إذا كان سبب الإيقاف هو FO */}
// //             {showFoSubReason && (
// //               <FormControl fullWidth>
// //                 <InputLabel>FO Sub-Reason</InputLabel>
// //                 <Select
// //                   name="foReason"
// //                   value={formData.foReason}
// //                   onChange={handleChange}
// //                   label="FO Sub-Reason"
// //                 >
// //                   {['U1', 'U2', 'U3', 'SF'].map((reason) => (
// //                     <MenuItem key={reason} value={reason}>
// //                       {reason}
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             )}
// //             <Divider sx={{ my: 0.5 }} />
// //         </React.Fragment>
// //       )}
      
// //       {/* مثال لملخص البيانات (تم تحديثه ليعكس أسباب الإيقاف) */}
// //         <TextField
// //         label="Summary Data"
// //         name="Summary"
// //         value={`Location: ${formData.location} | Status: ${formData.selectStstusMenu}${showRatching ? ` | Ratching: ${formData.selectedRatching}` : ''}${showShutdownFields ? ` | Trip Reason: ${formData.tripReason || 'N/A'}${showFoSubReason ? ` (Sub: ${formData.foReason || 'N/A'})` : ''}` : ''}`}
// //         multiline
// //         rows={3}
// //         fullWidth
// //         disabled
// //       />

// //     </FormContainer>
// //   );
// // };
// // ----------------------------------------------------------------------

// /**
//  * نموذج الخزانات (TanksForm)
//  */
// // const TanksForm = () => {
// //   const [formData, setFormData] = useState({
// //     location: '', EventDate: '', EventTime: '', TypeStatus: '', ValveStatus: '', TankTag: '',
// //     isDoubleOperation: false, TypeStatus2: '', ValveStatus2: '', TankTag2: '',
// //   });

// //   const handleChange = (e) => {
// //     const { name, value, checked, type } = e.target;
// //     let newFormData = {
// //         ...formData,
// //         [name]: type === 'checkbox' ? checked : value,
// //     };

// //     // عند تغيير الموقع، يجب مسح قيمة TypeStatus لتطبيق التصفية الجديدة
// //     if (name === 'location') {
// //         newFormData.TypeStatus = '';
// //         newFormData.TypeStatus2 = '';
// //         newFormData.TankTag = '';
// //         newFormData.TankTag2 = '';
// //     }
// //     // عند تغيير النوع، يجب مسح قيمة TankTag لتطبيق التصفية الجديدة
// //     if (name === 'TypeStatus') {
// //         newFormData.TankTag = '';
// //     }
// //     if (name === 'TypeStatus2') {
// //         newFormData.TankTag2 = '';
// //     }

// //     setFormData(newFormData);
// //   };

// //   // ----------------------------------------------------------------------
// //   // منطق تصفية TypeStatus بناءً على الموقع (المطلب الجديد)
// //   // ----------------------------------------------------------------------
// //   const getFilteredTypeStatus = (location) => {
// //     const loc = location.toUpperCase().trim();
// //     let allowedTypes = []; // قائمة بخيارات الـ value المسموح بها

// //     if (loc.includes('TANK#6') || loc.includes('TANK#8')) {
// //         allowedTypes = ['FILLING', 'FEEDING', 'RETUERN', 'MAINTENANCE'];
// //     } else if (loc.includes('TANK#7')) {
// //         allowedTypes = ['FILLING', 'FEEDING', 'MAINTENANCE'];
// //     } else if (loc.includes('TANK#9') || loc.includes('TANK#11')) {
// //         allowedTypes = ['FILLING', 'SERVICE', 'RETUERN', 'MAINTENANCE'];
// //     } else if (loc.includes('TANK#10') || loc.includes('TANK#12') || loc.includes('TANK#13')) {
// //         allowedTypes = ['MAINTENANCE', 'FILLING', 'FEEDING', 'RETUERN'];
// //     } else if (loc.includes('TANK#15') || loc.includes('TANK#16')) {
// //         allowedTypes = ['MAINTENANCE', 'FILLING', 'SERVICE', 'RETUERN'];
// //     } else if (loc.includes('TANK#14') || loc.includes('TANK#17') || loc.includes('TANK#18')) {
// //         allowedTypes = ['MAINTENANCE', 'FILLING', 'SERVICE'];
// //     } else {
// //         // في حالة عدم تطابق الموقع مع أي قاعدة، يتم عرض جميع الخيارات
// //         return TYPE_STATUS_MENU;
// //     }

// //     // تصفية القائمة الأصلية بناءً على القيم المسموح بها
// //     return TYPE_STATUS_MENU.filter(menuItem => allowedTypes.includes(menuItem.value));
// //   };

// //   // ----------------------------------------------------------------------
// //   // منطق تصفية TankTag بناءً على الموقع و TypeStatus (المنطق الأصلي)
// //   // ----------------------------------------------------------------------

// //   const getOperationText = (typeStatus, location, tankTag, valveStatus) => {
// //     switch (typeStatus) {
// //       case 'FEEDING': return `Location: ${location} | VALVE TO | Tank: ${tankTag} | Status: ${valveStatus}`;
// //       case 'RETUERN': return `Location: ${location} | VALVE FROM | Tank: ${tankTag} | Status: ${valveStatus}`;
// //       case 'FILLING': return `Location: ${location} | VALVE BY | Tank: ${tankTag} | Status: ${valveStatus}`;
// //       case 'SERVICE': return `Location: ${location} | VALVE TO | Tank: ${tankTag} | Status: ${valveStatus}`;
// //       case 'MAINTENANCE': return `Location: UNDER MAINTENANCE`;
// //       default: return '';
// //     }
// //   };

// //   const operationData = `${getOperationText(formData.TypeStatus, formData.location, formData.TankTag, formData.ValveStatus)}${formData.isDoubleOperation ? `\n-- Double Operation --\n${getOperationText(formData.TypeStatus2, formData.location, formData.TankTag2, formData.ValveStatus2)}` : ''}`;

// //   // تحويل الموقع إلى حالة علوية لتطبيق قواعد التصفية
// //   const loc = formData.location.toUpperCase().trim();
// //   const isTank678 = ['TANK#6', 'TANK#7', 'TANK#8'].some(t => loc.includes(t));
// //   const isTank911 = ['TANK#9', 'TANK#11'].some(t => loc.includes(t));
// //   const isTank101213 = ['TANK#10', 'TANK#12', 'TANK#13'].some(t => loc.includes(t));
// //   const isTank141516 = ['TANK#14', 'TANK#15', 'TANK#16'].some(t => loc.includes(t));
// //   const isTank161718 = ['TANK#16', 'TANK#17', 'TANK#18'].some(t => loc.includes(t));


// //   const getFilteredTankTags = (typeStatus) => {
// //     if (!typeStatus) return TANK_TAGS_MENU;

// //     let allowedTags = [];
// //     if (isTank678) {
// //       if (typeStatus === 'FILLING') allowedTags = ['FUS'];
// //       if (['FEEDING', 'RETUERN'].includes(typeStatus)) allowedTags = ['29 PPS'];
// //     } else if (isTank911) {
// //       if (typeStatus === 'FILLING') allowedTags = ['29 PPS'];
// //       if (typeStatus === 'RETUERN') allowedTags = ['DIESEL GTS'];
// //     } else if (isTank101213) {
// //       if (typeStatus === 'FILLING') allowedTags = ['FUS'];
// //       if (['FEEDING', 'RETUERN'].includes(typeStatus)) allowedTags = ['COTP'];
// //     } else if (isTank141516) {
// //       if (typeStatus === 'FILLING') allowedTags = ['COTP'];
// //       if (typeStatus === 'SERVICE') allowedTags = ['GT#19'];
// //       if (typeStatus === 'RETUERN') allowedTags = ['GT#19', 'CRUDE GTS'];
// //     } else if (isTank161718) {
// //       if (typeStatus === 'FILLING') allowedTags = ['COTP'];
// //       if (typeStatus === 'SERVICE') allowedTags = ['GT#26'];
// //       if (typeStatus === 'RETUERN') allowedTags = ['GT#26', 'CRUDE GTS'];
// //     }

// //     if (allowedTags.length > 0) {
// //       return TANK_TAGS_MENU.filter(tag => allowedTags.includes(tag.value));
// //     }

// //     return TANK_TAGS_MENU; // Default if no specific condition met
// //   };

// //   // تطبيق منطق التصفية
// //   const filteredTypeStatus1 = getFilteredTypeStatus(formData.location);
// //   const filteredTankTags1 = getFilteredTankTags(formData.TypeStatus);

// //   const filteredTypeStatus2 = getFilteredTypeStatus(formData.location);
// //   const filteredTankTags2 = getFilteredTankTags(formData.TypeStatus2);


// //   return (
// //     <FormContainer>
// //       <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
// //       <DateTimeField label="Event Date (YYYY-MM-DD)" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
// //       <DateTimeField label="Event Time (HH:mm)" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />

// //       <FormControl fullWidth>
// //         <InputLabel>Operation Type (1)</InputLabel>
// //         <Select
// //           name="TypeStatus"
// //           value={formData.TypeStatus}
// //           onChange={handleChange}
// //           label="Operation Type (1)"
// //           // تعطيل القائمة إذا لم يدخل المستخدم الموقع بعد لتجنب الأخطاء
// //           disabled={formData.location.trim() === ''}
// //         >
// //           {filteredTypeStatus1.map((option) => (
// //             <MenuItem key={option.value} value={option.value}>
// //               {option.label}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>

// //       <FormControl fullWidth disabled={formData.TypeStatus === 'MAINTENANCE' || formData.TypeStatus === ''}>
// //         <InputLabel>Valve Status (1)</InputLabel>
// //         <Select
// //           name="ValveStatus"
// //           value={formData.ValveStatus}
// //           onChange={handleChange}
// //           label="Valve Status (1)"
// //         >
// //           {VALVE_STATUS_MENU.map((option) => (
// //             <MenuItem key={option.value} value={option.value}>
// //               {option.label}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>

// //       <FormControl fullWidth disabled={formData.TypeStatus === 'MAINTENANCE' || formData.TypeStatus === ''}>
// //         <InputLabel>Tank Tag (1)</InputLabel>
// //         <Select
// //           name="TankTag"
// //           value={formData.TankTag}
// //           onChange={handleChange}
// //           label="Tank Tag (1)"
// //         >
// //           {filteredTankTags1.map((option) => (
// //             <MenuItem key={option.value} value={option.value}>
// //               {option.label}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>

// //       <FormControlLabel
// //         control={<Checkbox checked={formData.isDoubleOperation} onChange={handleChange} name="isDoubleOperation" />}
// //         label="Is there another operation?"
// //       />

// //       {formData.isDoubleOperation && (
// //         <React.Fragment>
// //           <Divider sx={{ my: 1 }} />
// //           <Typography variant="subtitle1" color="primary">Double Operation</Typography>

// //           <FormControl fullWidth>
// //             <InputLabel>Operation Type (2)</InputLabel>
// //             <Select
// //               name="TypeStatus2"
// //               value={formData.TypeStatus2}
// //               onChange={handleChange}
// //               label="Operation Type (2)"
// //               disabled={formData.location.trim() === ''}
// //             >
// //               {filteredTypeStatus2.map((option) => (
// //                 <MenuItem key={option.value} value={option.value}>
// //                   {option.label}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>

// //           <FormControl fullWidth disabled={formData.TypeStatus2 === 'MAINTENANCE' || formData.TypeStatus2 === ''}>
// //             <InputLabel>Valve Status (2)</InputLabel>
// //             <Select
// //               name="ValveStatus2"
// //               value={formData.ValveStatus2}
// //               onChange={handleChange}
// //               label="Valve Status (2)"
// //             >
// //               {VALVE_STATUS_MENU.map((option) => (
// //                 <MenuItem key={option.value} value={option.value}>
// //                   {option.label}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>

// //           <FormControl fullWidth disabled={formData.TypeStatus2 === 'MAINTENANCE' || formData.TypeStatus2 === ''}>
// //             <InputLabel>Tank Tag (2)</InputLabel>
// //             <Select
// //               name="TankTag2"
// //               value={formData.TankTag2}
// //               onChange={handleChange}
// //               label="Tank Tag (2)"
// //             >
// //               {filteredTankTags2.map((option) => (
// //                 <MenuItem key={option.value} value={option.value}>
// //                   {option.label}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>
// //         </React.Fragment>
// //       )}

// //       <TextField
// //         label="Operation Data (Fuel Summary)"
// //         name="OperationData"
// //         value={operationData}
// //         multiline
// //         rows={4}
// //         fullWidth
// //         disabled // هذا الحقل للعرض فقط
// //       />
// //     </FormContainer>
// //   );
// // };

// // ----------------------------------------------------------------------

// /**
//  * نموذج المحولات (TransformerForm)
//  */
// // const TransformerForm = () => {
// //   const [formData, setFormData] = useState({
// //     location: '', EventDate: '', EventTime: '', transformerAction: '', IER: '',
// //     linkToUnit: false, EventText: '', selectStstusMenu: '', selectedRatching: ''
// //   });

// //   const handleChange = (e) => {
// //     const { name, value, checked, type } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: type === 'checkbox' ? checked : value,
// //     });
// //   };

// //   const showIER = formData.transformerAction === 'DE-ENERGIZE & EARTH';
// //   const showUnitStatus = formData.linkToUnit;

// //   return (
// //     <FormContainer>
// //       <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
// //       <DateTimeField label="Event Date (YYYY-MM-DD)" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
// //       <DateTimeField label="Event Time (HH:mm)" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />

// //       <FormControl fullWidth>
// //         <InputLabel>Transformer Action</InputLabel>
// //         <Select
// //           name="transformerAction"
// //           value={formData.transformerAction}
// //           onChange={handleChange}
// //           label="Transformer Action"
// //         >
// //           {['TRIP', 'ENERGIZE', 'DE-ENERGIZE', 'DE-ENERGIZE & EARTH'].map((action) => (
// //             <MenuItem key={action} value={action}>
// //               {action}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>

// //       {showIER && (
// //         <TextField label="IER" name="IER" value={formData.IER} onChange={handleChange} fullWidth />
// //       )}

// //       <FormControlLabel
// //         control={<Checkbox checked={formData.linkToUnit} onChange={handleChange} name="linkToUnit" />}
// //         label="Transformer link to unit status"
// //       />

// //       {showUnitStatus && (
// //         <React.Fragment>
// //           <TextField label="Event Text" name="EventText" value={formData.EventText} onChange={handleChange} multiline rows={2} fullWidth />

// //           <FormControl fullWidth>
// //             <InputLabel>Unit Status</InputLabel>
// //             <Select
// //               name="selectStstusMenu"
// //               value={formData.selectStstusMenu}
// //               onChange={handleChange}
// //               label="Unit Status"
// //             >
// //               {STATUS_MENU.map((option) => (
// //                 <MenuItem key={option.value} value={option.value}>
// //                   {option.label}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>

// //           <FormControl fullWidth>
// //             <InputLabel>Ratching Status</InputLabel>
// //             <Select
// //               name="selectedRatching"
// //               value={formData.selectedRatching}
// //               onChange={handleChange}
// //               label="Ratching Status"
// //             >
// //               {RATCHING_MENU.map((option) => (
// //                 <MenuItem key={option.value} value={option.value}>
// //                   {option.label}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>
// //         </React.Fragment>
// //       )}
// //     </FormContainer>
// //   );
// // };

// // ----------------------------------------------------------------------

// /**
//  * نموذج العمليات العامة (generalOperationForm)
//  */
// // const GeneralOperationForm = () => {
// //   const [formData, setFormData] = useState({
// //     location: '', EventDate: '', EventTime: '', EventText: '',
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   return (
// //     <FormContainer>
// //       <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
// //       <DateTimeField label="Event Date (YYYY-MM-DD)" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
// //       <DateTimeField label="Event Time (HH:mm)" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />
// //       <TextField label="Event Text" name="EventText" value={formData.EventText} onChange={handleChange} multiline rows={4} fullWidth />
// //     </FormContainer>
// //   );
// // };

// // ----------------------------------------------------------------------

// /**
//  * نموذج الملاحظات (noteForm)
//  */
// // const NoteForm = () => {
// //   const [formData, setFormData] = useState({
// //     location: '', EventDate: '', EventTime: '', EventText: '',
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   return (
// //     <FormContainer>
// //       <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
// //       <DateTimeField label="Event Date (YYYY-MM-DD)" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
// //       <DateTimeField label="Event Time (HH:mm)" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />
// //       <TextField label="Event Text (Note)" name="EventText" value={formData.EventText} onChange={handleChange} multiline rows={4} fullWidth />
// //     </FormContainer>
// //   );
// // };

// // ----------------------------------------------------------------------

// /**
//  * نموذج BSDE (BsdeForm)
//  */
// // const BsdeForm = () => {
// //   const [formData, setFormData] = useState({
// //     location: '', EventDate: '', EventTime: '', EventText: '', operationType: '', unitStatus: ''
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   return (
// //     <FormContainer>
// //       <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
// //       <DateTimeField label="Event Date (YYYY-MM-DD)" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
// //       <DateTimeField label="Event Time (HH:mm)" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />
// //       <TextField label="Event Text" name="EventText" value={formData.EventText} onChange={handleChange} multiline rows={2} fullWidth />

// //       <FormControl fullWidth>
// //         <InputLabel>Operation Type</InputLabel>
// //         <Select
// //           name="operationType"
// //           value={formData.operationType}
// //           onChange={handleChange}
// //           label="Operation Type"
// //         >
// //           {['FSNL', 'LOAD'].map((type) => (
// //             <MenuItem key={type} value={type}>
// //               {type}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>

// //       <FormControl fullWidth>
// //         <InputLabel>Unit Status</InputLabel>
// //         <Select
// //           name="unitStatus"
// //           value={formData.unitStatus}
// //           onChange={handleChange}
// //           label="Unit Status"
// //         >
// //           {['Shutdown', 'In Service'].map((status) => (
// //             <MenuItem key={status} value={status}>
// //               {status}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </FormControl>
// //     </FormContainer>
// //   );
// // };

// // ----------------------------------------------------------------------
// // المكون الرئيسي للتطبيق
// // ----------------------------------------------------------------------

// // export default function AppForms() {
// //   const forms = [
// //     { title: '1. StartUp Form 🚀', component: <StartUpForm /> },
// //     { title: '2. Stop Form 🛑', component: <StopForm /> },
// //     { title: '3. Trip Form 💥', component: <TripForm /> },
// //     { title: '4. Change Form 🔄', component: <ChangeForm /> },
// //     { title: '5. Tanks Operation Form ⛽', component: <TanksForm /> },
// //     { title: '6. Transformer Form ⚡', component: <TransformerForm /> },
// //     { title: '7. General Operation Form 📝', component: <GeneralOperationForm /> },
// //     { title: '8. BSDE Form (Example) 📊', component: <BsdeForm /> },
// //     { title: '9. Note Form 📌', component: <NoteForm /> },
// //   ];

// //   return (
// //     <Container maxWidth="xl" sx={{ py: 4 }}>
// //       <Typography variant="h3" gutterBottom align="center" color="primary">
// //         Professional ReactJS Forms UI - MUI Grid + Cards
// //       </Typography>
// //       <Divider sx={{ mb: 4 }} />

// //       <Grid container spacing={4}>
// //         {forms.map((form, index) => (
// //           <Grid item xs={12} sm={6}  key={index}>
// //             <CardStyled elevation={4}>
// //               <CardContent>
// //                 <Typography variant="h5" component="div" gutterBottom color="text.secondary">
// //                   {form.title}
// //                 </Typography>
// //                 <Divider sx={{ mb: 2 }} />
// //                 {form.component}
// //                 <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
// //                   <Button variant="contained" color="primary">
// //                     Save / Edit
// //                   </Button>
// //                 </Box>
// //               </CardContent>
// //             </CardStyled>
// //           </Grid>
// //         ))}
// //       </Grid>
// //     </Container>
// //   );
// // }