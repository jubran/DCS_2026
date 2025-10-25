import { useState, useMemo } from 'react';
import { 
  TYPE_STATUS_MENU, 
  VALVE_STATUS_MENU, 
  TANK_TAGS_MENU, 
  TANK_CONFIG 
} from '../global/constants';

export const useTankFormService = () => {
  const [formData, setFormData] = useState({
    location: 'TANK#7', 
    EventDate: '', 
    EventTime: '', 
    TypeStatus: '', 
    ValveStatus: '', 
    TankTag: '',
    isDoubleOperation: false, 
    TypeStatus2: '', 
    ValveStatus2: '', 
    TankTag2: '',
    OperationData: ''
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };

    // إعادة تعيين الحقول المعتمدة عند تغيير الموقع
    if (name === 'location') {
      newFormData.TypeStatus = '';
      newFormData.TankTag = '';
      newFormData.TypeStatus2 = '';
      newFormData.TankTag2 = '';
      newFormData.ValveStatus = '';
      newFormData.ValveStatus2 = '';
    }

    // إعادة تعيين التانك تاغ عند تغيير نوع العملية
    if (name === 'TypeStatus') newFormData.TankTag = '';
    if (name === 'TypeStatus2') newFormData.TankTag2 = '';

    setFormData(newFormData);
  };

  return {
    formData,
    setFormData,
    handleChange,
  };
};

export const useTankLogicService = (formData) => {
  const location = (formData.location || '').toUpperCase().trim();

  // ✅ دالة إرجاع أنواع العمليات حسب الموقع - مُصححة
  const getFilteredTypeStatus = useMemo(() => {
    const rules = TANK_CONFIG.TYPE_RULES || {};
    
    // البحث عن الخزان في القواعد
    for (const [tank, allowedTypes] of Object.entries(rules)) {
      if (location.includes(tank)) {
        // إرجاع الخيارات المطابقة من TYPE_STATUS_MENU
        return TYPE_STATUS_MENU.filter(opt => 
          allowedTypes.includes(opt.value)
        );
      }
    }
    
    // إذا لم يتم العثور على قواعد، إرجاع القائمة الكاملة
    return TYPE_STATUS_MENU;
  }, [location]);

  // ✅ دالة إرجاع التانكات حسب نوع العملية والموقع - مُصححة
  const getFilteredTankTags = (typeStatus) => {
    if (!typeStatus) return [];
    
    const rules = TANK_CONFIG.TAG_RULES || {};
    
    // البحث عن الخزان في القواعد
    for (const [tank, typeRules] of Object.entries(rules)) {
      if (location.includes(tank) && typeRules[typeStatus]) {
        const allowedTags = typeRules[typeStatus];
        // إرجاع التانكات المسموح بها من TANK_TAGS_MENU
        return TANK_TAGS_MENU.filter(tag => 
          allowedTags.includes(tag.value)
        );
      }
    }
    
    // إذا لم يتم العثور على قواعد، إرجاع القائمة الكاملة
    return TANK_TAGS_MENU;
  };

  // ✅ نص العملية - مُصحح
  const getOperationText = (typeStatus, location, tankTag, valveStatus) => {
    if (!typeStatus) return '';
    
    const valveLabel = VALVE_STATUS_MENU.find(v => v.value === valveStatus)?.label || valveStatus;
    const tankLabel = TANK_TAGS_MENU.find(t => t.value === tankTag)?.label || tankTag;
    
    const templates = {
      FEEDING: `Location: ${location} | VALVE TO | Tank: ${tankLabel} | Status: ${valveLabel}`,
      RETURN: `Location: ${location} | VALVE FROM | Tank: ${tankLabel} | Status: ${valveLabel}`,
      FILLING: `Location: ${location} | VALVE BY | Tank: ${tankLabel} | Status: ${valveLabel}`,
      SERVICE: `Location: ${location} | VALVE TO | Tank: ${tankLabel} | Status: ${valveLabel}`,
      MAINTENANCE: `Location: ${location} | UNDER MAINTENANCE`,
    };
    
    return templates[typeStatus] || `Location: ${location} | Operation: ${typeStatus}`;
  };

  // ✅ دمج العمليات
  const operationData = useMemo(() => {
    const main = getOperationText(
      formData.TypeStatus,
      formData.location,
      formData.TankTag,
      formData.ValveStatus
    );

    if (!formData.isDoubleOperation) return main;

    const second = getOperationText(
      formData.TypeStatus2,
      formData.location,
      formData.TankTag2,
      formData.ValveStatus2
    );

    return second ? `${main}\n-- Double Operation --\n${second}` : main;
  }, [formData]);

  return {
    getFilteredTypeStatus,
    getFilteredTankTags,
    operationData,
  };
};