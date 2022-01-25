import React from 'react';
import SelectInput from './ShippingMethodSelect';
import { SHIPPING_METHOD } from '../../../config';
import useShippingMethodFormContext from '../hooks/useShippingMethodFormContext';
import useShippingMethodCartContext from '../hooks/useShippingMethodCartContext';
import { _objToArray } from '../../../utils';
import { __ } from '../../../i18n';

function ShippingMethodList() {
  const {
    fields,
    submitHandler,
    setFieldValue,
    selectedMethod,
    setFieldTouched,
  } = useShippingMethodFormContext();
  const { methodsAvailable, methodList } = useShippingMethodCartContext();

  const { carrierCode: methodCarrierCode, methodCode: methodMethodCode } =
    selectedMethod || {};
  const selectedMethodId = `${methodCarrierCode}__${methodMethodCode}`;

  // const [selectedShippingMethod, changeShippingMethod] = useState('');

  const handleShippingMethodSelection = async (event) => {
    const methodSelected = methodList[event.target.value];
    const { carrierCode, methodCode, id: methodId } = methodSelected;

    if (methodId === selectedMethodId) {
      return;
    }

    setFieldValue(SHIPPING_METHOD, { carrierCode, methodCode });
    setFieldTouched(fields.carrierCode, true);
    setFieldTouched(fields.methodCode, true);
    await submitHandler({ carrierCode, methodCode });
  };

  if (!methodsAvailable) {
    return <></>;
  }

  return (
    <div className="py-4 border-b-2 border-container-lightner">
      <SelectInput
        label={__('Способ доставки')}
        name="shippingMethod"
        options={_objToArray(methodList)}
        onChange={handleShippingMethodSelection}
      />
    </div>
  );
}

export default ShippingMethodList;
