import { useLocation } from "react-router-dom";
import { Typography, Box, Divider, Container } from "@mui/material";
import { useSettingsContext } from "src/components/settings";
import AppForms from "./AppForms";

export default function UnitManagerForm() {
  const settings = useSettingsContext();
  const routerLocation = useLocation(); // ✅ تغيير الاسم لتجنب التداخل
  const { selectedOperation, location: unitLocation } = routerLocation.state || {};

  // 🔍 نتحقق إن كان الموقع يبدأ بـ GT
  const isGT = unitLocation?.toUpperCase().startsWith("GT");

  // 🧠 دالة لتوليد النص حسب نوع العملية
  const getOperationMessage = () => {
    switch (selectedOperation?.toLowerCase()) {
      case "start":
        return `سوف تقوم بإدخال عملية تشغيل ${isGT ? "للوحدة" : " لـ"} ${unitLocation || ""}`;
      case "stop":
        return `سوف تقوم بإدخال عملية إيقاف ${isGT ? "للوحدة" : " لـ"} ${unitLocation || ""}`;
      case "change":
        return `سوف تقوم بإدخال عملية تبديل ${isGT ? "للوحدة" : " لـ"} ${unitLocation || ""}`;
      case "trip":
        return `سوف تقوم بإدخال عملية فصل ${isGT ? "للوحدة" : " لـ"} ${unitLocation || ""}`;
      case "isgt":
        return `سوف تقوم بإدخال عملية ISGT ${isGT ? "للوحدة" : " لـ"} ${unitLocation || ""}`;
      default:
        return "مرحبًا بك في نظام إدارة العمليات";
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
        {selectedOperation && unitLocation ? (
      <Typography
        color="primary"
        variant="h5" sx={{ mb: 3 }}
      >
        {getOperationMessage()}
      </Typography>
        ) : (


      <Typography variant="h5" sx={{ mb: 3 }}>
        البيانات الخاصة بإدارة العمليات للوحدات
      </Typography>
        )}
      <Divider sx={{ mb: 3 }} />

      {selectedOperation && unitLocation ? (
        <Box>
          <AppForms
            operationData={routerLocation}
            operationType={selectedOperation}
          />
        </Box>
      ) : (
        <Box>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            ⚠️ لم يتم تمرير بيانات العملية أو الموقع من الصفحة الرئيسية.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
