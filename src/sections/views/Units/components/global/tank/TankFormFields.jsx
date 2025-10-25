import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
  Typography
} from '@mui/material';

export const TankFormFields = {
  // الحقول الأساسية
  primary: [
    {
      type: 'text',
      name: 'location',
      label: 'Location',
      component: 'textfield',
      fullWidth: true
    },
    // استخدم حقول HTML البسيطة date/time بدل DateTimeField
    {
      type: 'date',
      name: 'EventDate',
      label: 'Event Date',
      component: 'date'
    },
    {
      type: 'time',
      name: 'EventTime',
      label: 'Event Time',
      component: 'time'
    }
  ],

  // العملية الأولى
  operation1: [
    {
      type: 'select',
      name: 'TypeStatus',
      label: 'Operation Type (1)',
      component: 'select',
      dependencies: ['location'],
      disabledCondition: (formData) => (formData.location || '').trim() === ''
    },
    {
      type: 'select',
      name: 'ValveStatus',
      label: 'Valve Status (1)',
      component: 'select',
      optionsSource: 'VALVE_STATUS_MENU',
      disabledCondition: (formData) => formData.TypeStatus === 'MAINTENANCE' || !formData.TypeStatus
    },
    {
      type: 'select',
      name: 'TankTag',
      label: 'Tank Tag (1)',
      component: 'select',
      optionsSource: 'dynamic',
      disabledCondition: (formData) => formData.TypeStatus === 'MAINTENANCE' || !formData.TypeStatus
    }
  ],

  // العملية الثانية
  operation2: [
    {
      type: 'select',
      name: 'TypeStatus2',
      label: 'Operation Type (2)',
      component: 'select',
      dependencies: ['location'],
      disabledCondition: (formData) => (formData.location || '').trim() === ''
    },
    {
      type: 'select',
      name: 'ValveStatus2',
      label: 'Valve Status (2)',
      component: 'select',
      optionsSource: 'VALVE_STATUS_MENU',
      disabledCondition: (formData) => formData.TypeStatus2 === 'MAINTENANCE' || !formData.TypeStatus2
    },
    {
      type: 'select',
      name: 'TankTag2',
      label: 'Tank Tag (2)',
      component: 'select',
      optionsSource: 'dynamic',
      disabledCondition: (formData) => formData.TypeStatus2 === 'MAINTENANCE' || !formData.TypeStatus2
    }
  ],

  // الحقول الخاصة
  special: [
    {
      type: 'checkbox',
      name: 'isDoubleOperation',
      label: 'Is there another operation?',
      component: 'checkbox'
    },
    {
      type: 'textarea',
      name: 'OperationData',
      label: 'Operation Data (Fuel Summary)',
      component: 'textarea',
      disabled: true,
      rows: 4,
      fullWidth: true
    }
  ]
};

export const renderField = (field, formData, handlers, options = {}) => {
  const {
    handleChange,
    getFilteredTypeStatus,
    getFilteredTankTags,
    VALVE_STATUS_MENU
  } = handlers;

  const value = formData[field.name] ?? '';
  const disabled = field.disabledCondition ? field.disabledCondition(formData) : field.disabled;

  const commonProps = {
    name: field.name,
    value: value,
    onChange: handleChange,
    disabled: disabled,
    fullWidth: field.fullWidth,
    label: field.label
  };

  switch (field.component) {
    case 'textfield':
      return <TextField {...commonProps} />;

    // جديد: حقول date/time بسيطة تتعامل مع handleChange (event.target.value)
    case 'date':
      return (
        <TextField
          {...commonProps}
          type="date"
          InputLabelProps={{ shrink: true }}
        />
      );

    case 'time':
      return (
        <TextField
          {...commonProps}
          type="time"
          InputLabelProps={{ shrink: true }}
        />
      );

    case 'textarea':
      return (
        <TextField
          {...commonProps}
          multiline
          rows={field.rows || 4}
        />
      );

    case 'checkbox':
      return (
        <FormControlLabel
          control={<Checkbox {...commonProps} checked={!!value} />}
          label={field.label}
        />
      );

    case 'select':
      let selectOptions = [];

      if (field.optionsSource === 'VALVE_STATUS_MENU') {
        selectOptions = VALVE_STATUS_MENU || [];
      } else if (field.optionsSource === 'dynamic') {
        // TypeStatus fields: getFilteredTypeStatus قد يكون إما مصفوفة خيارات أو دالة
        if (field.name === 'TypeStatus' || field.name === 'TypeStatus2') {
    selectOptions = getFilteredTypeStatus; // ← ليست دالة بل مصفوفة جاهزة الآن
        } else if (field.name === 'TankTag') {
          selectOptions = typeof getFilteredTankTags === 'function' ? getFilteredTankTags(formData.TypeStatus) : [];
        } else if (field.name === 'TankTag2') {
          selectOptions = typeof getFilteredTankTags === 'function' ? getFilteredTankTags(formData.TypeStatus2) : [];
        }
      }

      return (
        <FormControl fullWidth disabled={disabled}>
          <InputLabel>{field.label}</InputLabel>
          <Select {...commonProps} label={field.label}>
            {selectOptions && selectOptions.length > 0 ? (
              selectOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              // عرض عنصر واحد يخبر المستخدم أنه لا توجد خيارات
              <MenuItem value="" disabled>
                لا توجد خيارات
              </MenuItem>
            )}
          </Select>
        </FormControl>
      );

    default:
      return null;
  }
};
