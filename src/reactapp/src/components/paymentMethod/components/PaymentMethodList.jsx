import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { object } from 'prop-types';
import _get from 'lodash.get';
import SelectInput from './PaymentMethodSelect';
import { __ } from '../../../i18n';
import { _objToArray } from '../../../utils';
import usePaymentMethodCartContext from '../hooks/usePaymentMethodCartContext';
import usePaymentMethodFormContext from '../hooks/usePaymentMethodFormContext';
import InfoPopups from '../../cmsPages/components/InfoPopups';
import AvailablePaymentMethods from './Przlewy24/AvailablePaymentMethods/AvailablePaymentMethods';

function PaymentMethodList({ cmsHtmlContent }) {
  const { fields, formikData } = usePaymentMethodFormContext();
  const { values } = useFormikContext();
  const { methodList, selectedPaymentMethod } = usePaymentMethodCartContext();
  const { setFieldValue, setFieldTouched } = formikData;
  const [isPaymentMethodSaved, saveInitialPaymentMethod] = useState(false);
  const [przlewy24Selected, setPrzlewy24Selected] = useState(
    values?.payment_method?.code === 'przelewy24'
  );

  const handlePaymentMethodSelection = async (event) => {
    const methodSelected = _get(methodList, `${event.target.value}.code`);

    if (!methodSelected) {
      return;
    }
    await setFieldValue(fields.code, methodSelected);
    setFieldTouched(fields.code, true);
    setPrzlewy24Selected(methodSelected === 'przelewy24');
  };

  const methodListForSelect = [];
  _objToArray(methodList).forEach((method) => {
    const value = method.code;
    const label = method.title;
    methodListForSelect.push({ label, value });
  });

  const isPaymentMethodSelected = selectedPaymentMethod.code.lenght > 0;

  /*  Сохранение метода оплаты.
  Если пользователем не будет выбран метод оплаты, то выбранный метод будет 
  первый из списка доступных */
  useEffect(() => {
    if (!isPaymentMethodSaved && !isPaymentMethodSelected && methodList) {
      setFieldTouched(fields.code, true);
      values.payment_method.code = methodListForSelect[0].value;
      saveInitialPaymentMethod(true);
    }
  }, [methodList]);
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
        name="paymentMethod"
      />
      {przlewy24Selected && <AvailablePaymentMethods />}
      <InfoPopups
        positionStyles="absolute top-0 right-0 mt-6 mr-6"
        label={__('Payment')}
        className="absolute top-0 right-0"
        cmsHtmlContent={cmsHtmlContent}
      />
    </div>
  );
}

PaymentMethodList.propTypes = {
  cmsHtmlContent: object,
};

PaymentMethodList.defaultProps = {
  cmsHtmlContent: {},
};

export default PaymentMethodList;
