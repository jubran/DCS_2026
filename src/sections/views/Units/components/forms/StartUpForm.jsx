import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import DateTimeField from './DateTimeField';
import { STATUS_MENU } from '../global';



const StartUpForm = ({data}) => {
  const [formData, setFormData] = useState({
    location: data?.location || '', EventDate: '', EventTime: '', flameTime: '', synckTime: '',
    EventText: '', selectStstusMenu: 'In Service', note: ''
  });
console.log('Data in StartUpForm:', data);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
      <DateTimeField label="Event Date" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
      <DateTimeField label="Event Time" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />
      <TextField label="Flame Time" name="flameTime" value={formData.flameTime} onChange={handleChange} />
      <TextField label="Synck Time" name="synckTime" value={formData.synckTime} onChange={handleChange} />
      <TextField label="Event Text" name="EventText" value={formData.EventText} onChange={handleChange} multiline rows={2} />
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          name="selectStstusMenu"
          value={formData.selectStstusMenu}
          onChange={handleChange}
          disabled
        >
          {STATUS_MENU.map((s) => (
            <MenuItem key={s.value} value={s.value} disabled={s.value !== 'In Service'}>
              {s.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField label="Note" name="note" value={formData.note} onChange={handleChange} multiline rows={2} />
    </Box>
  );
};

export default StartUpForm;
