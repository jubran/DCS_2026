import { useState } from "react";
import dayjs from "dayjs";
import useSWR from "swr";

import Card from "@mui/material/Card";
import { CardHeader } from "@mui/material";
import ShowDataGrid from "./ShowDataGrid";
import DataGridToolbar from "./DataGridToolbar";
import { Box } from "@mui/system";

export const fetcher = url => fetch(url).then(res => res.json());

export default function EventsViewPage() {
  // 1) تاريخ اليوم الافتراضي
  const [dateValue, setDateValue] = useState(dayjs());

  // 2) الصيغة 'YYYY-MM-DD' تستخدم في مفتاح SWR
  const date = dateValue.format("YYYY-MM-DD");

  // 3) useSWR تعيد الجلب أوتوماتيكياً عند تغيّر 'date'
  const { data, error, isLoading } = useSWR(
    `/api/api.php?action=dateQuery&dateQuery=${date}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

 



  // 4) واجهة المستخدم
  return (
    <Card sx={{ p: 2 }}>
    <CardHeader title="ملخص هذا اليوم" />
      

      {/* Toolbar يسمح للمستخدم بتغيير التاريخ */}
      <DataGridToolbar
        dateValue={dateValue}
        setDateValue={setDateValue}
      />

      {/* معالجة الأخطاء والحالة */}
      {error && (
        <p style={{ color: "red" }}>
          حدث خطأ أثناء جلب البيانات: {error.message}
        </p>
      )}
      {isLoading && <p>جاري التحميل...</p>}

      {/* عرض الجدول إذا وصلت البيانات */}
      {!isLoading && data && (
        <ShowDataGrid rows1={data} />
      )}

      {/* رسالة بسيطة إذا لا يوجد أحداث */}
      {!isLoading && data && data.length === 0 && (
        <p>لا توجد فعاليات لهذا التاريخ.</p>
      )}
    </Card>
  );
}
