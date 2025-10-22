import React, { useState } from 'react';
import { TextField,
} from '@mui/material';
import { FormContainer } from '../FormContainer';
import DateTimeField from './DateTimeField';


const NoteForm = () => {
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
      <TextField label="Event Text (Note)" name="EventText" value={formData.EventText} onChange={handleChange} multiline rows={4} fullWidth />
    </FormContainer>
  );
};

export default NoteForm;