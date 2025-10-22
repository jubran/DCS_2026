import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Divider, Button, Box } from '@mui/material';
import {
  StartUpForm, StopForm, TripForm, ChangeForm, TanksForm,
  TransformerForm, GeneralOperationForm, BsdeForm, NoteForm
} from './components/forms';
import { CardStyled } from './components/CardStyled';



const AppForms = ({ operationData, operationType }) => {
  const data = operationData || {};
  console.log('Received data in AppForms:', data.state);

  // جميع النماذج الممكنة - كدوال ترجع المكونات
  const formsMap = {
    تشغيل: (data) => <StartUpForm data={data.state} />,
    إيقاف: (data) => <StopForm data={data.state} />,
    رحلة: (data) => <TripForm data={data.state} />,
    تحويل: (data) => <ChangeForm data={data.state} />,
    خزانات: (data) => <TanksForm data={data.state} />,
    محول: (data) => <TransformerForm data={data.state} />,
    عام: (data) => <GeneralOperationForm data={data.state} />,
    bsde: (data) => <BsdeForm data={data.state} />,
    ملاحظات: (data) => <NoteForm data={data.state} />,
  };

  // عرض النموذج المناسب
  const selectedForm = formsMap[operationType]
    ? formsMap[operationType](data)
    : (
      <Typography color="text.secondary">
        ⚠️ لم يتم العثور على نموذج مطابق لنوع العملية: {operationType}
      </Typography>
    );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center" color="primary">
        مرحبا بك في نظام إدارة العمليات
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <CardStyled elevation={4}>
        <CardContent>
          <Typography variant="h5" gutterBottom color="text.secondary">
            {`نموذج العملية: ${operationType || "غير محدد"}`}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {selectedForm}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary">
              Save / Edit
            </Button>
          </Box>
        </CardContent>
      </CardStyled>
    </Container>
  );
};



export default AppForms;