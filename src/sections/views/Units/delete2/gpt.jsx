// import React, { useState } from 'react';
// import { Grid, Card, CardContent, Typography, TextField, MenuItem, FormControlLabel, Checkbox, Button } from '@mui/material';

// const statusOptions = ['In Service', 'Stand By', 'Shutdown'];
// const ratchingOptions = ['Ratching In Service', 'Ratching Not Working'];
// const tripOptions = ['FO', 'MO', 'PO', 'PE', 'OMC'];
// const foOptions = ['U1', 'SF', 'U2', 'U3'];
// const typeStatusOptions = ['SERVICE', 'FEEDING', 'FILLING', 'RETUERN', 'MAINTENANCE'];
// const valveStatusOptions = ['OPEN', 'CLOSE'];
// const tankTagOptions = ['GT#19', 'GT#26', 'FUS', '29 PPS', 'COTP', 'CRUDE GTS', 'DIESEL GTS'];

// const FormField = ({ label, value, onChange, type = 'text', select = false, options = [] }) => (
//   <TextField
//     fullWidth
//     label={label}
//     value={value}
//     onChange={onChange}
//     type={type}
//     select={select}
//     size="small"
//     margin="dense"
//   >
//     {select && options.map((opt) => (
//       <MenuItem key={opt} value={opt}>{opt}</MenuItem>
//     ))}
//   </TextField>
// );

// const BaseForm = ({ title, children, onSubmit }) => (
//   <Card className="rounded-2xl shadow-lg p-4">
//     <CardContent>
//       <Typography variant="h6" gutterBottom>{title}</Typography>
//       <Grid container spacing={2}>{children}</Grid>
//       <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={onSubmit}>Save / Edit</Button>
//     </CardContent>
//   </Card>
// );

// export default function OperationsDashboard() {
//   const [formsData, setFormsData] = useState({});
//   const handleChange = (form, field) => (e) => {
//     setFormsData({ ...formsData, [form]: { ...formsData[form], [field]: e.target.value } });
//   };

//   return (
//     <Grid container spacing={3} p={2}>
//       {/* StartUpForm */}
//       <Grid item xs={12} md={6} lg={4}>
//         <BaseForm title="StartUp Form">
//           <FormField label="Location" value={formsData.StartUp?.location || ''} onChange={handleChange('StartUp', 'location')} />
//           <FormField label="Event Date" type="date" value={formsData.StartUp?.EventDate || ''} onChange={handleChange('StartUp', 'EventDate')} />
//           <FormField label="Event Time" type="time" value={formsData.StartUp?.EventTime || ''} onChange={handleChange('StartUp', 'EventTime')} />
//           <FormField label="Flame Time" value={formsData.StartUp?.flameTime || ''} onChange={handleChange('StartUp', 'flameTime')} />
//           <FormField label="Sync Time" value={formsData.StartUp?.synckTime || ''} onChange={handleChange('StartUp', 'synckTime')} />
//           <FormField label="Event Text" value={formsData.StartUp?.EventText || ''} onChange={handleChange('StartUp', 'EventText')} />
//           <FormField label="Status" select options={statusOptions} value={'In Service'} onChange={() => {}} />
//           <FormField label="Note" value={formsData.StartUp?.note || ''} onChange={handleChange('StartUp', 'note')} />
//         </BaseForm>
//       </Grid>

//       {/* StopForm */}
//       <Grid item xs={12} md={6} lg={4}>
//         <BaseForm title="Stop Form">
//           <FormField label="Location" value={formsData.Stop?.location || ''} onChange={handleChange('Stop', 'location')} />
//           <FormField label="Event Date" type="date" value={formsData.Stop?.EventDate || ''} onChange={handleChange('Stop', 'EventDate')} />
//           <FormField label="Event Time" type="time" value={formsData.Stop?.EventTime || ''} onChange={handleChange('Stop', 'EventTime')} />
//           <FormField label="Event Text" value={formsData.Stop?.EventText || ''} onChange={handleChange('Stop', 'EventText')} />
//           <FormField label="Ratching" select options={ratchingOptions} value={formsData.Stop?.Ratching || ''} onChange={handleChange('Stop', 'Ratching')} />
//           <FormField label="Status" select options={statusOptions} value={'Stand By'} onChange={() => {}} />
//           <FormField label="Note" value={formsData.Stop?.note || ''} onChange={handleChange('Stop', 'note')} />
//         </BaseForm>
//       </Grid>

//       {/* TripForm */}
//       <Grid item xs={12} md={6} lg={4}>
//         <BaseForm title="Trip Form">
//           <FormField label="Location" value={formsData.Trip?.location || ''} onChange={handleChange('Trip', 'location')} />
//           <FormField label="Event Date" type="date" value={formsData.Trip?.EventDate || ''} onChange={handleChange('Trip', 'EventDate')} />
//           <FormField label="Event Time" type="time" value={formsData.Trip?.EventTime || ''} onChange={handleChange('Trip', 'EventTime')} />
//           <FormField label="Event Text" value={formsData.Trip?.EventText || ''} onChange={handleChange('Trip', 'EventText')} />
//           <FormField label="Ratching" select options={ratchingOptions} value={formsData.Trip?.Ratching || ''} onChange={handleChange('Trip', 'Ratching')} />
//           <FormField label="Status" select options={statusOptions} value={'Shutdown'} onChange={() => {}} />
//         </BaseForm>
//       </Grid>

//       {/* ChangeForm */}
//       <Grid item xs={12} md={6} lg={4}>
//         <BaseForm title="Change Form">
//           <FormField label="Location" value={formsData.Change?.location || ''} onChange={handleChange('Change', 'location')} />
//           <FormField label="Event Date" type="date" value={formsData.Change?.EventDate || ''} onChange={handleChange('Change', 'EventDate')} />
//           <FormField label="Event Time" type="time" value={formsData.Change?.EventTime || ''} onChange={handleChange('Change', 'EventTime')} />
//           <FormField label="Event Text" value={formsData.Change?.EventText || ''} onChange={handleChange('Change', 'EventText')} />
//           <FormField label="Status" select options={statusOptions} value={formsData.Change?.Status || ''} onChange={handleChange('Change', 'Status')} />
//           {(formsData.Change?.Status === 'Stand By' || formsData.Change?.Status === 'Shutdown') && (
//             <FormField label="Ratching" select options={ratchingOptions} value={formsData.Change?.Ratching || ''} onChange={handleChange('Change', 'Ratching')} />
//           )}
//         </BaseForm>
//       </Grid>
//     </Grid>
//   );
// }
