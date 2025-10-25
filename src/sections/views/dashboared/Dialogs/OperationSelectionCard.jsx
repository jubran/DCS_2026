import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  FormControlLabel,
  Checkbox,
  useTheme,
  Grid,
  Divider
} from '@mui/material';

// صف بيانات بسيط
const DataRow = ({ label, value }) => (
  <Grid container spacing={1} alignItems="center" width="100%" py={0.5}>
    <Grid item xs={2}>
      <Typography
        fontSize="0.90rem"
        mb={0}
        sx={{
          textTransform: "uppercase",
          color: "text.secondary",
          textShadow: "0 1px 2px rgba(0,0,0,0.1)"
        }}
      >
        {label}
      </Typography>
    </Grid>

    <Grid item xs={3} display="flex" justifyContent="flex-start">
      <Typography
        fontWeight={800}
        fontSize="0.9rem"
        sx={{
          textTransform: "uppercase",
          color: "success.dark",
          textShadow: "0 1px 2px rgba(0,0,0,0.1)"
        }}
      >
        {value}
      </Typography>
    </Grid>
  </Grid>
);

// بطاقة اختيار العملية
const OperationSelectionCard = ({ onActionSelect, data }) => {
  const theme = useTheme();
  const [selectedAction, setSelectedAction] = useState(null);

  // تحديد الأزرار حسب بداية الموقع
  const getActionsForLocation = () => {
    if (data.location?.startsWith('TANK')) {
      return [
        { name: 'tank', label: `إجراء عملية تغيير على ${data.location} ` },
      
      ];
    } else if (data.location?.startsWith('FUS')) {
      return [
        { name: 'start', label: 'تشغيل' },
        { name: 'trip', label: 'TRIP' },
      ];
    }  else if ( data.location?.match( /SP#(\d+)/ )){
      return [
        { name: 'start', label: 'تشغيل' },
        { name: 'trip', label: 'إيقاف أو  TRIP أو تحويل' },
      ];
    } else {
      return [
        { name: 'start', label: 'تشغيل' },
        { name: 'stop', label: 'إيقاف' },
        { name: 'change', label: 'تحويل' },
        { name: 'trip', label: 'TRIP' },
      ];
    }
  };

  const actions = getActionsForLocation();

  // دالة التغيير
  const handleActionChange = (action) => {
    const newAction = selectedAction?.name === action.name ? null : action;
    setSelectedAction(newAction);
    onActionSelect(newAction);
  };

  // تنسيق الأزرار حسب نوع العملية
  const getButtonStyles = (action) => {
    let colorKey;
    let mainColor;

    switch (action.name) {
      case 'start':
        colorKey = theme.palette.success.main;
        mainColor = 'white';
        break;
      case 'stop':
        colorKey = theme.palette.warning.main;
        mainColor = 'black';
        break;
      case 'change':
        colorKey = theme.palette.info.main;
        mainColor = 'white';
        break;
      case 'trip':
        colorKey = theme.palette.error.dark;
        mainColor = 'white';
        break;
      default:
        colorKey = theme.palette.primary.main;
        mainColor = 'white';
    }

    const isChecked = selectedAction?.name === action.name;

    return {
      flex: 1,
      m: 0,
      borderRadius: 1,
      px: 2,
      py: 1.5,
      bgcolor: isChecked ? colorKey : theme.palette.background.paper,
      border: isChecked ? `1px solid ${colorKey}` : `1px solid ${theme.palette.divider}`,
      color: isChecked ? mainColor : theme.palette.text.primary,
      transition: 'all 0.2s ease-in-out',
      justifyContent: 'center',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      '& .MuiCheckbox-root': {
        position: 'absolute',
        opacity: 0,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        margin: 0,
        cursor: 'pointer',
      },
      '& .MuiFormControlLabel-label': {
        fontWeight: isChecked ? 'bold' : 'normal',
        fontSize: '0.95rem',
        textAlign: 'center',
        width: '100%',
        zIndex: 1,
        position: 'relative'
      },
      '&:hover': {
        bgcolor: isChecked ? colorKey : theme.palette.action.hover,
        transform: 'translateY(-1px)',
        boxShadow: 1
      },
      '&:active': {
        transform: 'translateY(0)',
      }
    };
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box>
        <Typography
          fontSize="0.95rem"
          mb={0.5}
          sx={{
            textTransform: 'uppercase',
            color: 'text.secondary',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          تنفيذ العملية على
        </Typography>

        <Typography
          fontWeight={800}
          fontSize="1.5rem"
          sx={{
            textTransform: 'uppercase',
            color: 'success.dark',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          {data.location}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box mb={3} display="flex" flexDirection="column" gap={0.5}>
          <DataRow label="الوضع الحالي" value={data.status1} />
          <DataRow label="الإسم" value="جبران حسن اليحيوي" />
        </Box>

        <Typography
          variant="subtitle2"
          color="text.secondary"
          mb={2}
          fontWeight={500}
        >
          اختر نوع العملية:
        </Typography>
      </Box>

      <Box display="flex" gap={1.5} mb={3}>
        {actions.map((action) => (
          <FormControlLabel
            key={action.name}
            control={
              <Checkbox
                checked={selectedAction?.name === action.name}
                onChange={() => handleActionChange(action)}
                name={action.name}
              />
            }
            label={action.label}
            sx={getButtonStyles(action)}
          />
        ))}
      </Box>
    </Card>
  );
};

export default OperationSelectionCard;
