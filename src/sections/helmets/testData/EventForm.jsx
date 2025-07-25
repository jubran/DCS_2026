import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Autocomplete,
  Button,
  DialogActions,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { memo, useState } from "react";
import { NumberFormatBase, usePatternFormat } from "react-number-format";
import Iconify from "src/components/iconify";
import { useBoolean } from "src/hooks/use-boolean";

const locations = [
  {
    id: "1",
    location: "GT21",
  },
  {
    id: "2",
    location: "GT27",
  },
  {
    id: "3",
    location: "GT30",
  },
  {
    id: "4",
    location: "GT20",
  },
  {
    id: "5",
    location: "SKID#1 SP#1",
  },
];
const status1 = [
  {
    id: "1",
    status: "In Service",
  },
  {
    id: "2",
    status: "Stand By",
  },
  {
    id: "3",
    status: "Shutdown",
  },
];

const ShippingForm = memo(function ShippingForm({
  onSubmit,
  productId,
  onClose,
}) {
  const data = productId;
  const confirm = useBoolean();
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderDetails = {
      ...Object.fromEntries(formData),
    };
    onSubmit(orderDetails);
  }
  return (
    <form onSubmit={handleSubmit}>
      <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
        تحديث عملية فنية على رقم المرجع {data.id} بواسطة <h4>{data.id} </h4>
      </Alert>
      <Box display="grid" rowGap={3}>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
          }}
        >
          <FormControl>
            <Autocomplete
              defaultValue={data.location}
              options={locations.map((option) => option.location)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="location"
                  label="الموقع"
                  inputProps={{
                    style: { fontWeight: "bolder" },
                    ...params.inputProps,
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="status1">الحالة</InputLabel>
            <Select
              name="status1"
              labelId="status1"
              id="demo-simple-select"
              label="الحالة"
              sx={{
                "& .MuiSelect-select": {
                  fontWeight: "bold",
                },
              }}
              defaultValue={data.status1}
            >
              {status1.map((n) => (
                <MenuItem
                  key={n.id}
                  value={n.status}
                  style={{ fontWeight: "bold" }}
                >
                  {n.status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="date1"
                label="التاريخ"
                value={dayjs(data.date1)}
                format="YYYY-MM-DD"
                variant="subtitle"
                sx={{
                  "& .MuiInputBase-input": {
                    fontWeight: "bold",
                  },
                }}
              />
            </LocalizationProvider>
          </FormControl>
          <TimeFormatFour
            label="الوقت"
            mask="_"
            name="time1"
            customInput={TextField}
            value={data.time1}
            inputProps={{
              style: {
                fontFamily: "sans-serif",
                fontWeight: "bold",
                textTransform: "Uppercase",
              },
            }}
          />
        </Box>
        {data.synch ? (
          <Box
            columnGap={3}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(3, 1fr)",
            }}
          >
            <FormControl>
              <TextField
                name="flame"
                defaultValue={data.flame}
                label="الإحتراق"
                inputProps={{
                  style: {
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    textTransform: "Uppercase",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">RPM</InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <TimeFormatFour
              label="FSNL"
              mask="_"
              customInput={TextField}
              value={data.fsnl}
              inputProps={{
                style: {
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  textTransform: "Uppercase",
                },
              }}
            />
            <TimeFormatFour
              label="SYNCH"
              name="synch"
              mask="_"
              customInput={TextField}
              value={data.synch}
              inputProps={{
                style: {
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  textTransform: "Uppercase",
                },
              }}
            />
          </Box>
        ) : null}

        <Box display="grid">
          <TextField
            dir="ltr"
            multiline
            rows={2}
            fullwidth
            defaultValue={data.action}
            name="action"
            label="الحدث"
            inputProps={{
              style: {
                fontFamily: "sans-serif",
                fontWeight: "bold",
                textTransform: "Uppercase",
              },
            }}
          />
        </Box>
        <Box display="grid">
          <TextField
            error={data.note.length > 0 ? true : false}
            dir="ltr"
            name="notes"
            defaultValue={data.note}
            label={data.note.length > 0 ? "ملاحظات" : "لاتوجد ملاحظة"}
            inputProps={{
              style: {
                color: "" == data.note.length > 0 ? "" : "red",
                fontFamily: "sans-serif",
                fontWeight: "bold",
                textTransform: "Uppercase",
              },
            }}
          />
        </Box>
      </Box>
      ;
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          الغاء
        </Button>

        <LoadingButton
          type="submit"
          variant="outlined"
          color="error"
          endIcon={<Iconify icon="solar:pen-bold" />}
        >
          تحديث
        </LoadingButton>
      </DialogActions>
    </form>
  );
});
function TimeFormatFour(props) {
  const { format, ...rest } = usePatternFormat({ ...props, format: "##:##" });
  const _format = (val) => {
    let hours = val.substring(0, 2);
    const minutes = val.substring(2, 4);
    if (hours.length === 1 && hours[0] > 2) {
      hours = `0${hours[0]}`;
    } else if (hours.length === 2) {
      if (Number(hours) === 0) {
        hours = `00`;
      } else if (Number(hours) > 23) {
        hours = "00";
      }
    }

    return format(`${hours}${minutes}`);
  };

  return <NumberFormatBase format={_format} {...rest} />;
}
export default ShippingForm;
