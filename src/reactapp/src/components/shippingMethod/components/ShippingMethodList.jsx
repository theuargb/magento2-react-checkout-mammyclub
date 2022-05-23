import React, { useState, useMemo } from 'react';
import SelectInput from './ShippingMethodSelect';
import { SHIPPING_METHOD } from '../../../config';
import useShippingMethodFormContext from '../hooks/useShippingMethodFormContext';
import useShippingMethodCartContext from '../hooks/useShippingMethodCartContext';
import { _objToArray } from '../../../utils';
import { __ } from '../../../i18n';
import InfoPopups from '../../InfoPopups/InfoPopups';

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
  const [isShippingMethodChangeByUser, setShippingMethodChangeByUser] =
    useState(false);

  const handleShippingMethodSelection = async (event) => {
    const methodSelected = methodList[event.target.value];
    const { carrierCode, methodCode, id: methodId } = methodSelected;

    if (methodId === selectedMethodId) {
      return;
    }

    setFieldValue(SHIPPING_METHOD, { carrierCode, methodCode });
    setFieldTouched(fields.carrierCode, true);
    setFieldTouched(fields.methodCode, true);

    setShippingMethodChangeByUser(true);
    await submitHandler({ carrierCode, methodCode });
  };
  /*  Сохранение метода доставки.
  Если пользователем не будет выбран метод доставки, то методом доставки останется первый доступный */
  /* eslint-disable */
  useMemo(
    () => {
      if (!isShippingMethodChangeByUser && methodsAvailable) {
        setFieldTouched(fields.carrierCode, true);
        setFieldTouched(fields.methodCode, true);
        const methodListKeys = Object.keys(methodList);
        const methodSelected = methodList[methodListKeys[0]];
        const { carrierCode, methodCode, id: methodId } = methodSelected;
        
        setFieldValue(SHIPPING_METHOD, { carrierCode, methodCode });
        submitHandler({ carrierCode, methodCode });
      }
    },
    [methodsAvailable],
  );
  /*  ========================================================================================  */

  if (!methodsAvailable) {
    return <></>;
  }

  return (
    <div className="py-4 border-b-2 border-container-lightner relative">
      <SelectInput
        label={__('Shipping method')}
        name="shippingMethod"
        options={_objToArray(methodList)}
        onChange={handleShippingMethodSelection}
      />
      <InfoPopups
        positionStyles="absolute top-0 right-0 mt-6 pr-2"
        label={__('Delivery')}
        className="absolute top-0 right-0"
        CmsPageIdentifier="kontent-popapa-dostavka"
      />
    </div>
  );
}

export default ShippingMethodList;
