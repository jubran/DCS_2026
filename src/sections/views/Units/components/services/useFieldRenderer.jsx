import {
  TextFieldComponent,
  DateFieldComponent,
  TimeFieldComponent,
  SelectFieldComponent,
  CheckboxFieldComponent, 
} from "../global/FormComponents";


export const useFieldRenderer = ({
  formData,
  validationErrors,
  dateValue,
  timeValue,
  handleChange,
  handleDateChange,
  handleTimeChange,
}) => {
  const renderField = (field) => {
    const fieldHasError = !!validationErrors[field.name];
    const helperText = fieldHasError
      ? validationErrors[field.name]
      : field.helperText;
    const value = formData[field.name];

    const commonProps = {
      field,
      value,
      error: fieldHasError,
      helperText,
      onChange: handleChange,
    };

    switch (field.type) {
      case "text":
        if (field.name === "eventText") {
          return (
            <TextFieldComponent
              key={field.name}
              {...commonProps}
              multiline
              minRows={2}
            />
          );
        }
        return <TextFieldComponent key={field.name} {...commonProps} />;


      case "date":
        return (
          <DateFieldComponent
            key={field.name}
            {...commonProps}
            value={dateValue}
            onChange={handleDateChange}
          />
        );

      case "time":
        return (
          <TimeFieldComponent
            key={field.name}
            {...commonProps}
            value={timeValue}
            onChange={handleTimeChange}
          />
        );
      case "select":
        return <SelectFieldComponent key={field.name} {...commonProps} />;

      case "checkbox":
        return <CheckboxFieldComponent key={field.name} {...commonProps} />;

      default:
        return null;
    }
  };

  return { renderField };
};
