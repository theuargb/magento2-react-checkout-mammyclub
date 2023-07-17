import React, { useState, useMemo } from 'react';
import { object } from 'prop-types';
import SelectInput from './ShippingMethodSelect';
import { SHIPPING_METHOD } from '../../../config';
import useShippingMethodFormContext from '../hooks/useShippingMethodFormContext';
import useShippingMethodCartContext from '../hooks/useShippingMethodCartContext';
import { _objToArray } from '../../../utils';
import { __ } from '../../../i18n';
import InfoPopups from '../../cmsPages/components/InfoPopups';

function ShippingMethodList({ cmsHtmlContent }) {
  const {
    fields,
    submitHandler,
    setFieldValue,
    selectedMethod,
    setFieldTouched,
    formSectionValues,
  } = useShippingMethodFormContext();
  const { methodsAvailable, methodList } = useShippingMethodCartContext();
  const { carrierCode: methodCarrierCode, methodCode: methodMethodCode } =
    selectedMethod || {};
  const selectedMethodId = `${methodCarrierCode}__${methodMethodCode}`;

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
  Если пользователем не будет выбран метод доставки и в корзине он еще не содержится, то методом доставки останется первый доступный */
  /* eslint-disable */
  useMemo(() => {
    if (
      !isShippingMethodChangeByUser &&
      methodCarrierCode === '' &&
      methodMethodCode === '' &&
      methodsAvailable
    ) {
      setFieldTouched(fields.carrierCode, true);
      setFieldTouched(fields.methodCode, true);
      const methodListKeys = Object.keys(methodList);
      const methodSelected = methodList[methodListKeys[0]];
      const { carrierCode, methodCode, id: methodId } = methodSelected;

      setFieldValue(SHIPPING_METHOD, { carrierCode, methodCode });
      submitHandler({ carrierCode, methodCode });
    } else if (methodCarrierCode && methodMethodCode) {
      if (
        formSectionValues.carrierCode !== methodCarrierCode &&
        formSectionValues.methodCode !== methodMethodCode
      )
        setFieldValue(SHIPPING_METHOD, { methodCarrierCode, methodMethodCode });
    }
  }, [methodsAvailable, methodCarrierCode, methodMethodCode]);
  /*  ========================================================================================  */

  if (!methodsAvailable) {
    return <></>;
  }

  return (
    <div
      className={`py-4 ${
        methodCarrierCode ===
        methodList[Object.keys(methodList)[0]]?.carrierCode
          ? ''
          : 'border-b-2'
      } border-container-lightner relative`}
    >
      <SelectInput
        label={__('Shipping method')}
        name="shippingMethod"
        options={_objToArray(methodList)}
        onChange={handleShippingMethodSelection}
        selectedMethodId={selectedMethodId}
      />
      <InfoPopups
        positionStyles="absolute top-0 right-0 mt-6 pr-2"
        label={__('Delivery')}
        className="absolute top-0 right-0"
        cmsHtmlContent={cmsHtmlContent}
      />
    </div>
  );
}

ShippingMethodList.propTypes = {
  cmsHtmlContent: object,
};

ShippingMethodList.defaultProps = {
  cmsHtmlContent: {},
};

export default ShippingMethodList;
