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

// مكون صف البيانات (DataRow)
const DataRow = ({ label, value }) => (
<Grid
  container
  spacing={1}
  alignItems="center"
  width="100%"
  py={0.5}
>
  {/* العمود الأول: العنوان */}
  <Grid item xs={2}>
    <Typography
       fontSize="0.90rem"
      mb={0}     
      sx={{ 
        textTransform: "uppercase",
        color:"text.secondary",
        textShadow: "0 1px 2px rgba(0,0,0,0.1)"
      }}
    >
      {label}
    </Typography>
  </Grid>

  {/* العمود الثاني: القيمة */}
  <Grid
    item
    xs={3}
    display="flex"
    justifyContent="flex-start"
  >
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
)

// مكون بطاقة اختيار العملية
const OperationSelectionCard = ({ onActionSelect , data }) => {
  const theme = useTheme();
  console.log("Data in OperationSelectionCard:", data);
  // State لتخزين العملية المختارة
  const [selectedAction, setSelectedAction] = useState(null);

  // دالة لمعالجة التغيير في الـ Checkbox
  const handleActionChange = (action) => {
    const newAction = selectedAction === action ? null : action;
    setSelectedAction(newAction);
    // تمرير القيمة الجديدة إلى المكون الأب
    onActionSelect(newAction);
  };

  // دالة مساعدة لتنسيق الأزرار
  const getButtonStyles = (action) => {
    let colorKey;
    let mainColor;

    // تعيين الألوان المطلوبة
    if (action === 'تشغيل') {
      colorKey = theme.palette.success.main;
      mainColor = 'white';
    } else if (action === 'إيقاف') {
      colorKey = theme.palette.warning.main;
      mainColor = 'black';
    } else if (action === 'تحويل') {
      colorKey = theme.palette.error.main;
      mainColor = 'white';
    }

    const isChecked = selectedAction === action;
    
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
      
      // إخفاء Checkbox الافتراضي
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
    <Card sx={{ 
      p: 3, 
      borderRadius: 2, 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: `1px solid ${theme.palette.divider}`
    }}>
 
       <Box>
    {/* العنوان الرئيسي */}
    <Typography
      fontSize="0.95rem"
      mb={0.5}     
      sx={{ 
        textTransform: "uppercase",
        color:"text.secondary",
        textShadow: "0 1px 2px rgba(0,0,0,0.1)"
      }}
    >
      تنفيذ العملية على
    </Typography>

    <Typography
       fontWeight={800}
      fontSize="1.5rem"
      sx={{ 
        textTransform: "uppercase",
        color: "success.dark",
        textShadow: "0 1px 2px rgba(0,0,0,0.1)"
      }}
    >
      {data.location}
    </Typography>
<Divider sx={{ my: 2 }} />
    {/* تفاصيل العملية */}
    <Box
      mb={3}
      display="flex"
      flexDirection="column"
      gap={0.5}
    >
      <DataRow label="الوضع الحالي" value={data.status1} />
      <DataRow label="الإسم" value="جبران حسن اليحيوي" />
    </Box>

    {/* اختيار نوع العملية */}
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
        {['تشغيل', 'إيقاف', 'تحويل'].map((action) => (
          <FormControlLabel
            key={action}
            control={
              <Checkbox 
                checked={selectedAction === action}
                onChange={() => handleActionChange(action)}
                name={action}
              />
            }
            label={action}
            sx={getButtonStyles(action)}
          />
        ))}
      </Box>
    </Card>
  );
};

export default OperationSelectionCard;