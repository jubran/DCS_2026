export const useConditionalLogic = (operation, isGT, formData) => {
  const showRatching =
    (isGT && ["stop", "trip", "change"].includes(operation)) ||
    (operation === "transformer" && formData.linkToUnit);

  const showTripReason =
    isGT &&
    ["trip", "change", "stop"].includes(operation) &&
    formData.selectStstusMenu === "Shutdown";

  const showFoSubReason = showTripReason && formData.tripReason === "FO";
  const showIER = formData.transformerAction === "DE-ENERGIZE & EARTH";
  const showUnitStatus = formData.linkToUnit;
  const showDoubleOperation = operation === "tank" && formData.isDoubleOperation;

  return {
    showRatching,
    showTripReason,
    showFoSubReason,
    showIER,
    showUnitStatus,
    showDoubleOperation,
  };
};