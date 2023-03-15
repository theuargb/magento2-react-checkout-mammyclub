import React, { useState, useEffect } from 'react';
import fetchPaymentMethodsPrzelewy24 from '../../../../../api/paymentMethods/fetchPaymentMethodsPrzelewy24';
import Item from './Item';
import usePaymentMethodFormContext from '../../../hooks/usePaymentMethodFormContext';
import usePaymentMethodCartContext from '../../../hooks/usePaymentMethodCartContext';

function AvailablePaymentMethods() {
  const { fields, formikData } = usePaymentMethodFormContext();
  const { totalAmount } = usePaymentMethodCartContext();
  const { setFieldValue, setFieldTouched } = formikData;

  const [availableMethods, setMethods] = useState({});
  const [selected, setSelected] = useState(null);
  const getMethods = async () => {
    const methodsList = await fetchPaymentMethodsPrzelewy24(null, totalAmount);
    setMethods(methodsList);
  };
  const onSelect = (id) => {
    setFieldValue(fields.method, id);
    setFieldValue(fields.regulationAccept, true);
    setFieldTouched(fields.method, true);
    setFieldTouched(fields.regulationAccept, true);
    setSelected(id);
  };
  useEffect(() => {
    getMethods();
  }, []);
  return (
    <ul className="mt-4 grid grid-cols-3 space-y-2 space-x-2">
      {availableMethods.data &&
        availableMethods?.data?.przelewy24PaymentMethods.map((method) => (
          <Item method={method} onSelect={onSelect} selected={selected} />
        ))}
    </ul>
  );
}

export default AvailablePaymentMethods;
