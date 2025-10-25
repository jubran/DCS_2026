import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Box, fontFamily, fontWeight, padding, textAlign } from "@mui/system";




export const TextFieldComponent = ({ 
  field, 
  value, 
  onChange, 
  error, 
  helperText, 
  multiline = false,
  minRows = 1,
  sx = {},
  InputProps = {},
  inputProps = {},
  ...props 
}) => {
  
  const isEventText = field.name === "eventText";
  const isMultiline = multiline || field.multiline;

  // الأنماط الأساسية
  const baseStyles = {
    width: field.width || 180,
    textAlign: 'right',
    ...sx
  };

  // أنماط خاصة لـ eventText
  const eventTextStyles = isEventText ? {
    '& .MuiInputBase-input': { 
      fontSize: 15,
      fontFamily: 'inherit',
    },
    '& .MuiInputBase-root': { 
      fontSize: 15,
      alignItems: 'flex-start',
      minHeight: '80px',
    },
  } : {};

  // إعدادات الـ input الخاصة
  const getInputProps = () => {
    if (isEventText) {
      return {
        style: {
          fontSize: 17,
          direction: 'ltr',
          resize: 'vertical',
          minHeight: '30px',
          fontWeight: '700 !important',
          ...inputProps.style
        },
        ...inputProps
      };
    }
    return inputProps;
  };
  

  // إعدادات الـ InputProps الخاصة
  const getInputPropsComponent = () => {
    if (isEventText) {
      return {
        sx: {
          '& textarea': {
            resize: 'vertical',
            fontSize: 14,
            direction: 'ltr',
            padding: '2px',
          },
          ...InputProps.sx
        },
        ...InputProps
      };
    }
    return InputProps;
  };

  const textFieldProps = {
    name: field.name,
    label: field.label,
    value: value || "",
    onChange: onChange,
    multiline: isMultiline,
    rows: isMultiline ? (field.multiline ? 2 : minRows) : 1,
    minRows: isMultiline ? minRows : undefined,
    sx: { ...baseStyles, ...eventTextStyles },
    required: field.required || false,
    error: error,
    helperText: helperText || "",
    InputProps: getInputPropsComponent(),
    inputProps: getInputProps(),
    disabled: field.disabled || false,
    ...props
  };

  return (
    <Box>
      <TextField {...textFieldProps} />
    </Box>
  );
};

export const DateFieldComponent = ({ field, value, onChange, error, helperText }) => (
  <DatePicker
    label={field.label}
    value={value}
    onChange={onChange}
    format={"yyyy-MM-dd"}
    sx={{ width: field.width || 180 }}
    slotProps={{
      textField: {
        required: field.required || false,
        error: error,
        helperText: helperText || "",
      },
    }}
  />
);

export const TimeFieldComponent = ({ field, value, onChange, error, helperText }) => (
  <TimePicker
    label={field.label}
    value={value}
    onChange={onChange}
    format="HH:mm"
    slotProps={{
      textField: {
        sx: {
          width: field.width || 180,
          '& input': {
            letterSpacing: '3px',
            textAlign: 'center',
            // fontVariantNumeric: 'tabular-nums',
            fontWeight: '800 !important',
            fontSize: '15px !important',
            
          },
        },
        InputProps: { endAdornment: null },
        required: field.required || false,
        error: error,
        helperText: helperText || "",
      },
    }}
  />
);

export const SelectFieldComponent = ({ field, value, onChange, error, helperText }) => (
  <FormControl
    sx={{ width: field.width || 200 }}
    required={field.required || false}
    error={error}
  >
    <InputLabel>{field.label}</InputLabel>
    <Select
      name={field.name}
      value={value || field.default || ""}
      onChange={onChange}
      label={field.label}
    >
      {field.options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </Select>
    {error && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export const CheckboxFieldComponent = ({ field, value, onChange, error }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={value || false}
        onChange={onChange}
        name={field.name}
      />
    }
    label={field.label}
  />
);
