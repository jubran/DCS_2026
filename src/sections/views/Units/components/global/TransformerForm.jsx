import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import DateTimeField from '../../delete2/forms2/DateTimeField';
import { FormControlLabel, Checkbox } from '@mui/material';
import { FormContainer } from './FormContainer';
import { STATUS_MENU, RATCHING_MENU } from '.';

const TransformerForm = () => {
  const [formData, setFormData] = useState({
    location: '', EventDate: '', EventTime: '', transformerAction: '', IER: '',
    linkToUnit: false, EventText: '', selectStstusMenu: '', selectedRatching: ''
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const showIER = formData.transformerAction === 'DE-ENERGIZE & EARTH';
  const showUnitStatus = formData.linkToUnit;

  return (
    <FormContainer>
      <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
      <DateTimeField label="Event Date (YYYY-MM-DD)" type="date" name="EventDate" value={formData.EventDate} onChange={handleChange} />
      <DateTimeField label="Event Time (HH:mm)" type="time" name="EventTime" value={formData.EventTime} onChange={handleChange} />

      <FormControl fullWidth>
        <InputLabel>Transformer Action</InputLabel>
        <Select
          name="transformerAction"
          value={formData.transformerAction}
          onChange={handleChange}
          label="Transformer Action"
        >
          {['TRIP', 'ENERGIZE', 'DE-ENERGIZE', 'DE-ENERGIZE & EARTH'].map((action) => (
            <MenuItem key={action} value={action}>
              {action}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {showIER && (
        <TextField label="IER" name="IER" value={formData.IER} onChange={handleChange} fullWidth />
      )}

      <FormControlLabel
        control={<Checkbox checked={formData.linkToUnit} onChange={handleChange} name="linkToUnit" />}
        label="Transformer link to unit status"
      />

      {showUnitStatus && (
        <React.Fragment>
          <TextField label="Event Text" name="EventText" value={formData.EventText} onChange={handleChange} multiline rows={2} fullWidth />

          <FormControl fullWidth>
            <InputLabel>Unit Status</InputLabel>
            <Select
              name="selectStstusMenu"
              value={formData.selectStstusMenu}
              onChange={handleChange}
              label="Unit Status"
            >
              {STATUS_MENU.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Ratching Status</InputLabel>
            <Select
              name="selectedRatching"
              value={formData.selectedRatching}
              onChange={handleChange}
              label="Ratching Status"
            >
              {RATCHING_MENU.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </React.Fragment>
      )}
    </FormContainer>
  );
};

export default TransformerForm;