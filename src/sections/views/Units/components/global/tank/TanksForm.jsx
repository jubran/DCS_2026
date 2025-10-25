import React from 'react';
import { Divider, Typography, Box, TextField } from '@mui/material';
import { TankFormFields, renderField } from './TankFormFields';
import { FormContainer } from '../FormContainer';
import { useTankFormService, useTankLogicService } from '../../services/tankFormService';
import { VALVE_STATUS_MENU } from '..';

const DynamicTanksForm = (data) => {
  const { formData, handleChange } = useTankFormService();
  const { 
    getFilteredTypeStatus, 
    getFilteredTankTags, 
    operationData 
  } = useTankLogicService(formData);

  const handlers = {
    handleChange,
    getFilteredTypeStatus,
    getFilteredTankTags,
    VALVE_STATUS_MENU
  };

  // تحديث operationData في formData
  React.useEffect(() => {
    if (formData.OperationData !== operationData) {
      handleChange({
        target: { name: 'OperationData', value: operationData }
      });
    }
  }, [operationData, formData.OperationData, handleChange]);

  return (
    <FormContainer>
      {/* الحقول الأساسية */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Basic Information
        </Typography>
        {/* <TextField value={data.data} /> */}
        {TankFormFields.primary.map((field, index) => (
          <Box key={field.name} sx={{ mb: 2 }}>
            {renderField(field, formData, handlers)}
          </Box>
        ))}
      </Box>

      {/* العملية الأولى */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Primary Operation
        </Typography>
        {TankFormFields.operation1.map((field, index) => (
          <Box key={field.name} sx={{ mb: 2 }}>
            {renderField(field, formData, handlers)}
          </Box>
        ))}
      </Box>

      {/* Double Operation Checkbox */}
      <Box sx={{ mb: 3 }}>
        {renderField(TankFormFields.special[0], formData, handlers)}
      </Box>

      {/* العملية الثانية (إذا كانت مفعلة) */}
      {formData.isDoubleOperation && (
        <Box sx={{ mb: 3 }}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Secondary Operation
          </Typography>
          
          {TankFormFields.operation2.map((field, index) => (
            <Box key={field.name} sx={{ mb: 2 }}>
              {renderField(field, formData, handlers)}
            </Box>
          ))}
        </Box>
      )}

      {/* Operation Data Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Operation Summary
        </Typography>
        {renderField(
          { ...TankFormFields.special[1], value: operationData }, 
          formData, 
          handlers
        )}
      </Box>
    </FormContainer>
  );
};

export default DynamicTanksForm;