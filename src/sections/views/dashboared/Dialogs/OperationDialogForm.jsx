import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Alert, 
  Button, 
  Grid,
  Typography
} from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import OperationSelectionCard from './OperationSelectionCard';

// المكون الرئيسي
export default function OperationDialogForm({ data, open, onClose }) {
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleActionSelect = (action) => {
    setSelectedOperation(action);
  };

  const handleClose = () => {
    setSelectedOperation(null); // reset
    if (typeof onClose === 'function') onClose();
  };

 const handleUpdate = async () => {
    try {
      setLoading(true);
      console.log(`Updating operation: ${selectedOperation}`, { payload: data });

      // محاكاة تأخير
      await new Promise((r) => setTimeout(r, 500));

      // ✅ هنا نرسل البيانات إلى صفحة UnitManagerForm
      navigate("units", {
        state: {
          selectedOperation: selectedOperation.name,
          location: data.location,
          dayDate : '2024-06-15', // مثال على تاريخ
          dayTime : '14:30' // مثال على وقت
        },
      });

      handleClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      fullWidth 
      maxWidth={false} 
      open={open} 
      onClose={handleClose}
      PaperProps={{ 
        sx: { 
          maxWidth: 720,
          borderRadius: 2
        },
      }}
    >
      <DialogTitle sx={{ 
        
        textAlign: 'center',
        bgcolor: 'primary.main',
        color: 'white'
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: '500' }}>
 الرجاء اختيار نوع العملية
          </Typography>
       
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        <Alert 
          
          variant="outlined" 
          severity={selectedOperation ? "success" : "error"} 
          sx={{ mb: 3, marginTop:2, fontSize: '0.95rem' }}
          icon={<Icon icon={selectedOperation ? "mdi:check-circle" : "mdi:information"} />}
        >
          {selectedOperation ? (
            <Typography variant="body1" sx={{color:"", fontWeight:""}}>
               العملية المختارة : {selectedOperation.label}
            </Typography>
          ) : (
          <Typography variant="body1" color="error">
            لم يتم إختيار أي عملية 
          </Typography>)}
        </Alert>

        {/* مكون اختيار العملية */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <OperationSelectionCard onActionSelect={handleActionSelect} data={data} />
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button 
          variant="outlined" 
          onClick={handleClose}
          color="error"
          sx={{
            width:"100px"
          }}
        >
          إلغاء
        </Button>
        
        <LoadingButton 
          type="button" 
          variant="contained" 
          loading={loading}
          color="primary"
          onClick={handleUpdate} 
          disabled={!selectedOperation}
          sx={{
            width:1
          }}
        >
          إستمرار
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}