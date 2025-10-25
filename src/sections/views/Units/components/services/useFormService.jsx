import { useState, useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { 
  DB_DATE_FORMAT, 
  TIME_FORMAT 
} from '../global/constants';
import { useFieldService } from "./useFieldService";
import { useConditionalLogic } from "./useConditionalLogic";
dayjs.extend(customParseFormat);

export const INPUT_DATE_FORMAT = "DD-MM-YYYY";


export const useFormService = (selectedOperation, initialData) => {
  const operation = selectedOperation?.toLowerCase();
  const isGT = initialData.location?.toUpperCase()?.startsWith("GT");

  const [validationErrors, setValidationErrors] = useState({});
  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);

  const [formData, setFormData] = useState({
    location: initialData?.location || "",
    eventDate: "",
    eventTime: "",
    eventText: "",
    note: "",
    selectStstusMenu: initialData.operation === "trip" ? "Shutdown" : "",
    selectedRatching: "",
    tripReason: "",
    foReason: "",
    flameTime: "",
    fsnlTime: "",
    synchTime: "",
    transformerAction: "",
    IER: "",
    linkToUnit: false,
    typeStatus: "",
    valveStatus: "",
    tankTag: "",
    typeStatus2: "",
    valveStatus2: "",
    tankTag2: "",
    isDoubleOperation: false,
  });

  // Logic services
  const { showRatching, showTripReason, showFoSubReason, showIER, showUnitStatus, showDoubleOperation  } = useConditionalLogic(
    operation,
    isGT,
    formData
  );

  const { operationFields, fields, groupedFields } = useFieldService(operation, isGT);

  // Initialize dates
  useEffect(() => {
    const initialDate = initialData.dayDate ? dayjs(initialData.dayDate) : dayjs();
    const initialTime = initialData.dayTime ? dayjs(initialData.dayTime, TIME_FORMAT) : dayjs();

    const finalDate = initialDate.isValid() ? initialDate : dayjs();
    const finalTime = initialTime.isValid() ? initialTime : dayjs();

    setDateValue(finalDate.toDate());
    setTimeValue(finalTime.toDate());

    setFormData((prev) => ({
      ...prev,
      eventDate: finalDate.format(DB_DATE_FORMAT),
      eventTime: finalTime.format(TIME_FORMAT),
    }));
  }, [initialData.dayDate, initialData.dayTime]);

  // Set default Ratching
  useEffect(() => {
    if (showRatching && !formData.selectedRatching) {
      setFormData((prev) => ({
        ...prev,
        selectedRatching: "Ratching In Service",
      }));
    }
  }, [showRatching, formData.selectedRatching]);

  // Handlers
  const handleDateChange = (newValue) => {
    let finalValue = dayjs.isDayjs(newValue) ? newValue : dayjs(newValue);
    const dateObj = finalValue.toDate();

    setDateValue(dateObj);
    setFormData((prev) => ({
      ...prev,
      eventDate: finalValue.format(DB_DATE_FORMAT),
    }));
    setValidationErrors((prev) => ({ ...prev, eventDate: undefined }));
  };

  const handleTimeChange = (newValue) => {
    let validValue = dayjs.isDayjs(newValue) ? newValue : dayjs(newValue);
    const timeObj = validValue.toDate();

    setTimeValue(timeObj);
    setFormData((prev) => ({
      ...prev,
      eventTime: validValue.format(TIME_FORMAT),
    }));
    setValidationErrors((prev) => ({ ...prev, eventTime: undefined }));
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const errors = {};
    const currentFields = operationFields[operation] || [];
    let isValid = true;

    currentFields.forEach((field) => {
      if (field.required && field.type !== "checkbox" && !formData[field.name]) {
        errors[field.name] = `${field.label} مطلوب.`;
        isValid = false;
      }
    });

    if (showRatching && !formData.selectedRatching) {
      errors.selectedRatching = "حالة Ratching مطلوبة.";
      isValid = false;
    }
    if (showTripReason && !formData.tripReason) {
      errors.tripReason = "سبب Trip مطلوب.";
      isValid = false;
    }
    if (showFoSubReason && !formData.foReason) {
      errors.foReason = "سبب FO الفرعي مطلوب.";
      isValid = false;
    }
  

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data is Valid:", formData);
      alert("تم إرسال النموذج بنجاح!");
      return true;
    }
    return false;
  };

  return {
    // State
    formData,
    validationErrors,
    dateValue,
    timeValue,
    
    // Logic
    showRatching,
    showTripReason,
    showFoSubReason,
    showIER,
    showUnitStatus,
    showDoubleOperation,
    
    // Fields
    operation,
    fields,
    groupedFields,
    
    // Handlers
    handleDateChange,
    handleTimeChange,
    handleChange,
    handleSubmit,
    
    // Utilities
    validateForm,
  };
};