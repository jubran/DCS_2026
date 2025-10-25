import React from 'react';
import { Container, CardContent, Typography, Divider } from '@mui/material';
import DynamicOperationForm from './components/DynamicOperationForm';
import { CardStyled } from './components/global/CardStyled';

const AppForms = ({ operationData, operationType }) => {
  const data = operationData?.state || {};



  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
   

      <CardStyled elevation={4}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="text.secondary">
            {`نموذج العملية: ${operationType || "غير محدد"}`}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <DynamicOperationForm
            selectedOperation={data.selectedOperation}
            data={data}
          />
        </CardContent>
      </CardStyled>
    </Container>
  );
};

export default AppForms;
