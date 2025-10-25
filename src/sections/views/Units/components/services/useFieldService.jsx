import { 
  FIELD_TYPES, 
  FIELD_LEVELS, 
  FIELD_WIDTHS,
  BASE_FIELD_CONFIGS 
} from '../global/constants';
export const useFieldService = (operation, isGT) => {
  const baseFields = {
    start: [
       ...BASE_FIELD_CONFIGS.COMMON,
      ...(isGT ? getGTStartFields() : []),
      {
        type: "select",
        name: "selectStstusMenu",
        label: "الحالة",
        options: ["In Service"],
        default: "In Service",
        width: FIELD_WIDTHS.LARGE,
        level: FIELD_LEVELS.LEVEL_4,
        required: true,
      },
    ],
    stop: getSTCFields("stop", ["Stand By", "Shutdown"], "Stand By"),
    trip: getSTCFields("trip", ["Shutdown", "Stand By"], ""),
    change: getSTCFields("change", ["Stand By", "Shutdown"], "Stand By"),
    bsde: getBSDEFields(),
  };

  const operationFields = baseFields;
  const fields = operationFields[operation] || [];

  const groupedFields = {
    level1: fields.filter((field) => field.level === 1),
    level2: fields.filter((field) => field.level === 2),
    level3: fields.filter((field) => field.level === 3),
    level4: fields.filter((field) => field.level === 4),
    level5: fields.filter((field) => field.level === 5),
  };

  return {
    // operationFields,
    fields,
    groupedFields,
  };
};

const getGTStartFields = () => [
  {
    type: FIELD_TYPES.TEXT,
    name: "flameTime",
    label: "Flame RPM",
    width: FIELD_WIDTHS.MEDIUM,
    level: FIELD_LEVELS.LEVEL_2,
    required: true,
  },
  {
    type: FIELD_TYPES.TEXT,
    name: "fsnlTime",
    label: "FSNL Time",
    width: FIELD_WIDTHS.MEDIUM,
    level: FIELD_LEVELS.LEVEL_2,
    required: true,
  },
  {
    type: FIELD_TYPES.TEXT,
    name: "synchTime",
    label: "Synch Time",
    width: FIELD_WIDTHS.MEDIUM,
    level: FIELD_LEVELS.LEVEL_2,
    required: true,
  },
];

const getSTCFields = (operation, options, defaultVal) => [
   ...BASE_FIELD_CONFIGS.COMMON,
  {
    type: "select",
    name: "selectStstusMenu",
    label: "الحالة",
    options,
    default: defaultVal,
    width: FIELD_WIDTHS.LARGE,
    level: FIELD_LEVELS.LEVEL_4,
    required: true,
  },
 
];

const getBSDEFields = () => [
 ...BASE_FIELD_CONFIGS.COMMON,
  {
    type: "select",
    name: "operationType",
    label: "نوع التشغيل",
    options: ["FSNL", "LOAD"],
    width: FIELD_WIDTHS.LARGE,
    level: FIELD_LEVELS.LEVEL_4,
    required: true,
  },
  {
    type: "select",
    name: "unitStatus",
    label: "اللحالة",
    options: ["Shutdown", "In Service"],
    width: FIELD_WIDTHS.LARGE,
    level: FIELD_LEVELS.LEVEL_4,
    required: true,
  },
  
];