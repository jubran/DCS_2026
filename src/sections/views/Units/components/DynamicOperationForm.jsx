import React from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
} from "@mui/material";

import { useFormService } from "./services/useFormService";
import { useFieldRenderer } from "./services/useFieldRenderer";
import { RATCHING_MENU } from './global/constants';
import DynamicTanksForm from "./global/tank/TanksForm";

const DynamicOperationForm = ({ selectedOperation, data }) => {
  const {
    formData,
    validationErrors,
    dateValue,
    timeValue,
    showRatching,
    showTripReason,
    showFoSubReason,
    operation,
    groupedFields,
    handleDateChange,
    handleTimeChange,
    handleChange,
    handleSubmit,
  } = useFormService(selectedOperation, data);

  const { renderField } = useFieldRenderer({
    formData,
    validationErrors,
    dateValue,
    timeValue,
    handleChange,
    handleDateChange,
    handleTimeChange,
  });
  console.log('groupedFields:', );

  if (!operation) {
    return <Typography color="error">⚠️ اختر العملية لعرض الحقول</Typography>;
  }
  if (operation === "tank") {
    return <DynamicTanksForm data={data.location} />;
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
    '& .MuiInputBase-input': { fontSize: 15 , fontWeight: 600 },
    '& .MuiInputLabel-root': { fontSize: 15 , fontWeight: 600  },
  }}
    >
      {/* Level 1 */}
      {groupedFields.level1.length > 0 && (
        <Box

          mt={2}
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={2}
          flexWrap="wrap"
          width="70%"
        >
          {groupedFields.level1.map(renderField)}
        </Box>
      )}

      {/* Level 2 */}
      {groupedFields.level2.length > 0 && (
        <Box
          mt={2}
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={2}
          flexWrap="wrap"
          width="70%"
        >
          {groupedFields.level2.map(renderField)}
        </Box>
      )}

      {/* Level 3 */}
      {groupedFields.level3.length > 0 && (
        <Box
         mt={2}
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={2}
          flexWrap="wrap"
          width="70%"

        >
          {groupedFields.level3.map(renderField)}
        </Box>
      )}

      {/* Level 4 with Conditional Fields */}
      {groupedFields.level4.length > 0 && (
        <Box
        mt={2}
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={2}
          flexWrap="nowrap"
          width="70%"
         
        >
          {showRatching && (
            <FormControl
              sx={{ width: "200px" }}
              required
              error={!!validationErrors.selectedRatching}
            >
              <InputLabel>Ratching Status</InputLabel>
              <Select
                name="selectedRatching"
                value={formData.selectedRatching || ""}
                onChange={handleChange}
                label="Ratching Status"
              >
                {RATCHING_MENU.map((r) => (
                  <MenuItem key={r.value} value={r.label}>
                    {r.label}
                  </MenuItem>
                ))}
              </Select>
              {!!validationErrors.selectedRatching && (
                <FormHelperText>
                  {validationErrors.selectedRatching}
                </FormHelperText>
              )}
            </FormControl>
          )}
          {groupedFields.level4.map(renderField)}
          {showTripReason && (
            <>
              {/* <Divider orientation="vertical" flexItem /> */}
              <FormControl
                sx={{ width: "200px" }}
                required
                error={!!validationErrors.tripReason}
              >
                <InputLabel>نوع الخروج</InputLabel>
                <Select
                  name="tripReason"
                  value={formData.tripReason || ""}
                  onChange={handleChange}
                  label="Trip Reason"
                >
                  {["FO", "MO", "PO", "PE", "OMC", "Re-Start", "Re-Synch"].map((reason) => (
                    <MenuItem key={reason} value={reason}>
                      {reason}
                    </MenuItem>
                  ))}
                </Select>
                {!!validationErrors.tripReason && (
                  <FormHelperText>
                    {validationErrors.tripReason}
                  </FormHelperText>
                )}
              </FormControl>
            </>
          )}
        </Box>
      )}

      {/* Level 5 */}
 
{ showFoSubReason && (
  <Box
   mt={2}
    display="flex"
    flexDirection="row"
    alignItems="center"
    gap={2}
    flexWrap="nowrap"
    width="100%"
  >
   {groupedFields.level5.map(renderField)}
    {showFoSubReason && (
      <>
      <FormControl
        sx={{ width: "200px" }}
        required
        error={!!validationErrors.foReason}
      >
        <InputLabel>تصنيف FO</InputLabel>
        <Select
          name="foReason"
          value={formData.foReason || ""}
          onChange={handleChange}
          label="FO Sub-Reason"
        >
          {["U1", "U2", "U3", "SF"].map((reason) => (
            <MenuItem key={reason} value={reason}>
              {reason}
            </MenuItem>
          ))}
        </Select>
        {!!validationErrors.foReason && (
          <FormHelperText>{validationErrors.foReason}</FormHelperText>
        )}

       
      </FormControl>
      <FormControl
        sx={{ width: "200px" }}
        required
        error={!!validationErrors.foReason}
      >
       {/* <InputLabel>FO Sub-Reason</InputLabel> */}
       <TextField
          name="sapOrder"
          label="رقم أمر SAP"
          value={formData.sapOrder || ""}
          onChange={handleChange}
          sx={{ width: "200px"}}
          required
          error={!!validationErrors.sapOrder}
          helperText={validationErrors.sapOrder || ""}
        />
        </FormControl>
        </>
    )}
    
  
  </Box>
  
)}


<Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3, width: "200px" }}
      >
           {selectedOperation === 'edit' ? 'تحديث العملية' : 'إرسال العملية'}
      </Button>
      </Box>
    </Box>
  );
};

export default DynamicOperationForm;