import React, { useState } from 'react';
import _get from 'lodash.get';
import { object } from 'prop-types';
import SelectInput from './PaymentMethodSelect';
import { __ } from '../../../i18n';
import { _objToArray } from '../../../utils';
import usePaymentMethodCartContext from '../hooks/usePaymentMethodCartContext';
import usePaymentMethodFormContext from '../hooks/usePaymentMethodFormContext';
import InfoPopups from '../../InfoPopups/InfoPopups';

function PaymentMethodList({ methodRenderers }) {
  const { fields, submitHandler, formikData } = usePaymentMethodFormContext();
  const { methodList } = usePaymentMethodCartContext();
  const { setFieldValue, setFieldTouched } = formikData;

  const [isPaymentMethodChangeByUser, setPaymentMethodChangeByUser] =
    useState(false);

  const handlePaymentMethodSelection = async (event) => {
    const methodSelected = _get(methodList, `${event.target.value}.code`);
    console.log(methodSelected);

    if (!methodSelected) {
      return;
    }
    await setFieldValue(fields.code, methodSelected);

    setFieldTouched(fields.code, true);

    // don't need to save payment method in case the method opted has a custom
    // renderer. This is because custom payment renderers may have custom
    // functionalities associated with them. So if in case they want to perform
    // save payment operation upon selection, then they need to deal with it there.
    if (!methodRenderers[methodSelected]) {
      await submitHandler(methodSelected);
      setPaymentMethodChangeByUser(true);
    }
  };

  const methodListForSelect = [];
  _objToArray(methodList).forEach((method) => {
    const value = method.code;
    const label = method.title;
    methodListForSelect.push({ label, value });
  });

  /*  Сохранение метода оплаты.
  Если пользователем не будет выбран метод оплаты, то выбранный метод будет 
  первый из списка доступных */
  if (
    !isPaymentMethodChangeByUser &&
    methodList &&
    formikData?.formSectionValues.code.length === 0
  ) {
    setFieldTouched(fields.code, true);
    const methodSelected = _get(methodList, methodListForSelect[0].value);

    (async () => {
      if (methodRenderers[methodSelected]) {
        return;
      }
      await setFieldValue(fields.code, methodListForSelect[0].value);
      await submitHandler(methodListForSelect[0].value);
    })();
  }
  /*  ========================================================================================  */

  return (
    <div className="react-select pt-4 pb-5 border-t-2 border-b-2 border-container-lightner">
      <p className="text-base text-gray mb-0.5">
        {__('Payment method (required)')}
        <sup className="text-red-500"> *</sup>
      </p>
      <SelectInput
        options={methodListForSelect}
        onChange={handlePaymentMethodSelection}
        name="city"
      />
      <InfoPopups
        positionStyles="absolute top-0 right-0 mt-6 mr-6"
        label={__('Payment')}
        className="absolute top-0 right-0"
        CmsPageIdentifier="kontent-popapa-oplata"
      />
    </div>
  );
}

PaymentMethodList.propTypes = {
  methodRenderers: object,
};

PaymentMethodList.defaultProps = {
  methodRenderers: {},
};

export default PaymentMethodList;
