
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import DateTimeField from './DateTimeField';
import { FormContainer } from '../FormContainer';


const GeneralOperationForm = () => {
  const [formData, setFormData] = useState({
    location: '', EventDate: '', EventTime: '', EventText: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
      <DateTimeField label="Event Date (YYYY-MM-DD)" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
      <DateTimeField label="Event Time (HH:mm)" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />
      <TextField label="Event Text" name="EventText" value={formData.EventText} onChange={handleChange} multiline rows={4} fullWidth />
    </FormContainer>
  );
};

export default GeneralOperationForm;