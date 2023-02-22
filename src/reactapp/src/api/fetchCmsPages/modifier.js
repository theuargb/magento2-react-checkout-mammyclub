import _get from 'lodash.get';

export default function fetchCmsPagesModifier(result) {
  const cmsRightSidebar = _get(result, 'data.firstPage') || {};
  const cmsPaymentPopup = _get(result, 'data.secondPage') || {};
  const cmsDeliveryPopup = _get(result, 'data.thirdPage') || {};

  return {
    cmsDeliveryPopup,
    cmsPaymentPopup,
    cmsRightSidebar,
  };
}
