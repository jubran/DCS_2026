// // 📅 تنسيقات التاريخ والوقت
// export const INPUT_DATE_FORMAT = "DD-MM-YYYY";
// export const DB_DATE_FORMAT = "YYYY-MM-DD";
// export const TIME_FORMAT = "HH:mm";

// // 🎨 إعدادات التنسيق للحقول

// // 🏷️ قوائم الاختيار (Select Menus)
// export const RATCHING_MENU = [
//   { value: "in_service", label: "Ratching In Service" },
//   { value: "out_of_service", label: "Ratching Not Working" },

// ];

// export const STATUS_MENU = [
//   { value: "in_service", label: "In Service" },
//   { value: "stand_by", label: "Stand By" },
//   { value: "shutdown", label: "Shutdown" },

// ];

// export const TYPE_STATUS_MENU = [
//   { value: 'SERVICE', label: 'SERVICE' },
//   { value: 'FEEDING', label: 'FEEDING' },
//   { value: 'FILLING', label: 'FILLING' },
//   { value: 'RETUERN', label: 'RETUERN' },
//   { value: 'MAINTENANCE', label: 'MAINTENANCE' },
// ];

// export const VALVE_STATUS_MENU = [
//   { value: "open", label: "Open" },
//   { value: "closed", label: "Closed" },
//   { value: "partially_open", label: "Partially Open" },
//   { value: "maintenance", label: "Under Maintenance" },
// ];

// export const TANK_TAGS_MENU = [
//   { value: "tag_001", label: "TANK-001" },
//   { value: "tag_002", label: "TANK-002" },
//   { value: "tag_003", label: "TANK-003" },
//   { value: "tag_004", label: "TANK-004" },
//   { value: "tag_005", label: "TANK-005" },
// ];
// export const TANK_CONFIG = {
//   TYPE_RULES: {
//     'TANK#6': ['FILLING', 'FEEDING', 'RETUERN', 'MAINTENANCE'],
//     'TANK#7': ['FILLING', 'FEEDING', 'MAINTENANCE'],
//     // ... باقي القواعد
//   },
//   TAG_RULES: {
//     'TANK#6': {
//       'FILLING': ['FUS'],
//       'FEEDING': ['29 PPS'],
//       'RETUERN': ['29 PPS']
//     },
//     // ... باقي القواعد
//   }
// };
// // 🔧 أسباب التريب (Trip Reasons)
// export const TRIP_REASONS = [
//   "FO",
//   "MO", 
//   "PO",
//   "PE",
//   "OMC",
//   "Re-Start",
//   "Re-Synch"
// ];

// export const FO_SUB_REASONS = ["U1", "U2", "U3", "SF"];

// // 🏭 أنواع العمليات (Operation Types)
// export const OPERATION_TYPES = {
//   START: "start",
//   STOP: "stop", 
//   TRIP: "trip",
//   CHANGE: "change",
//   BSDE: "bsde",
//   TRANSFORMER: "transformer",
//   TANK: "tank"
// };

// // 📊 أنواع الحقول (Field Types)
// export const FIELD_TYPES = {
//   TEXT: "text",
//   TEXTAREA: "textarea",
//   DATE: "date",
//   TIME: "time", 
//   SELECT: "select",
//   CHECKBOX: "checkbox"
// };

// // 🎯 مستويات الحقول (Field Levels)
// export const FIELD_LEVELS = {
//   LEVEL_1: 1,
//   LEVEL_2: 2,
//   LEVEL_3: 3,
//   LEVEL_4: 4,
//   LEVEL_5: 5
// };

// // 📝 رسائل التحقق (Validation Messages)
// export const VALIDATION_MESSAGES = {
//   REQUIRED: (fieldName) => `${fieldName} مطلوب.`,
//   INVALID_DATE: "تاريخ غير صحيح",
//   INVALID_TIME: "وقت غير صحيح",
//   INVALID_FORMAT: "تنسيق غير صحيح"
// };

// // 🎨 أبعاد الحقول (Field Dimensions)
// export const FIELD_WIDTHS = {
//   SMALL: "120px",
//   MEDIUM: "150px", 
//   LARGE: "200px",
//   FULL: "632px"
// };

// // 🔄 إجراءات المحولات (Transformer Actions)
// export const TRANSFORMER_ACTIONS = [
//   "DE-ENERGIZE & EARTH",
//   "DE-ENERGIZE",
//   "ENERGIZE",
//   "TRIP",
// ];

// // 📋 أنواع عمليات BSDE
// export const BSDE_OPERATION_TYPES = ["FSNL", "LOAD"];

// // 🏗️ هيكل الحقول الأساسي لكل عملية
// export const BASE_FIELD_CONFIGS = {
//   COMMON: [
//     {
//       type: FIELD_TYPES.TEXT,
//       name: "location",
//       label: "الموقع",
//       width: FIELD_WIDTHS.LARGE,
//       level: FIELD_LEVELS.LEVEL_1,
//       required: true,
//       disabled: true,
//     },
//     {
//       type: FIELD_TYPES.DATE,
//       name: "eventDate",
//       label: "التاريخ",
//       width: FIELD_WIDTHS.LARGE,
//       level: FIELD_LEVELS.LEVEL_1,
//       required: true
//     },
//     {
//       type: FIELD_TYPES.TIME,
//       name: "eventTime",
//       label: "وقت الحدث",
//       width: FIELD_WIDTHS.LARGE,
//       level: FIELD_LEVELS.LEVEL_1,
//       required: true
//     },
//     {
//       type: FIELD_TYPES.TEXT,
//       name: "eventText",
//       label: "وصف الحدث",
//       multiline: true,
//       level: FIELD_LEVELS.LEVEL_3,
//       width: FIELD_WIDTHS.FULL,
//       required: true
//     }
//   ]
// };

// // 🌐 إعدادات التطبيق
// export const APP_CONFIG = {
//   SUPPORTED_OPERATIONS: ["start", "stop", "trip", "change", "bsde", "transformer", "tank"],
//   GT_LOCATION_PREFIX: "GT",
//   DEFAULT_DATE_FORMAT: DB_DATE_FORMAT,
//   DEFAULT_TIME_FORMAT: TIME_FORMAT
// };

// // يمكنك أيضًا تصدير كل شيء ككائن واحد إذا أردت
// export default {
//   // Date Formats
//   INPUT_DATE_FORMAT,
//   DB_DATE_FORMAT,
//   TIME_FORMAT,

  
//   // Menus
//   RATCHING_MENU,
//   STATUS_MENU,
//   TYPE_STATUS_MENU,
//   VALVE_STATUS_MENU,
//   TANK_TAGS_MENU,
  
//   // Reasons
//   TRIP_REASONS,
//   FO_SUB_REASONS,
  
//   // Operations
//   OPERATION_TYPES,
//   FIELD_TYPES,
//   FIELD_LEVELS,
  
//   // Messages
//   VALIDATION_MESSAGES,
  
//   // Config
//   APP_CONFIG
// };