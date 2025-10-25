// import React, { useState } from 'react';
// import { Container, Grid, Card, CardContent, Typography, Divider, Button, Box } from '@mui/material';
// import {
//   StartUpForm, StopForm, TripForm, ChangeForm, TanksForm,
//   TransformerForm, GeneralOperationForm, BsdeForm, NoteForm
// } from './components/forms';
// import { CardStyled } from './components/CardStyled';



// const AppForms = ({ operationData }) => {
//   const [activeForm, setActiveForm] = useState('StartUp')
//   const data = operationData || {};
//   console.log('Received data in AppForms:', data.state);
//   const forms = [
//     { title: '1. StartUp Form 🚀', component: <StartUpForm data={data.state}/> },
//     { title: '2. Stop Form 🛑', component: <StopForm /> },
//     { title: '3. Trip Form 💥', component: <TripForm /> },
//     { title: '4. Change Form 🔄', component: <ChangeForm /> },
//     { title: '5. Tanks Operation Form ⛽', component: <TanksForm /> },
//     { title: '6. Transformer Form ⚡', component: <TransformerForm /> },
//     { title: '7. General Operation Form 📝', component: <GeneralOperationForm /> },
//     { title: '8. BSDE Form (Example) 📊', component: <BsdeForm /> },
//     { title: '9. Note Form 📌', component: <NoteForm /> },
//   ];
//   return (
//     <Container maxWidth="xl" sx={{ py: 4 }}>
//       <Typography variant="h3" gutterBottom align="center" color="primary">
//        مرحبا بك في نظام إدارة العمليات
//       </Typography>
//       <Divider sx={{ mb: 4 }} />
      
//       <Grid container spacing={4}>
//         {forms.map((form, index) => (
//           <Grid item xs={12} sm={6} key={index}>
//             <CardStyled elevation={4}>
//               <CardContent>
//                 <Typography variant="h5" gutterBottom color="text.secondary">
//                   {form.title}
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />
//                 {form.component}
//                 <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
//                   <Button variant="contained" color="primary">
//                     Save / Edit
//                   </Button>
//                 </Box>
//               </CardContent>
//             </CardStyled>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

// export default AppForms;