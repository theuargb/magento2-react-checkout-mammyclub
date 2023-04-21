import React, { useState, useEffect } from 'react';
import { paymentMethodShape } from '../utility';
import fetchPaymentMethodsPrzelewy24 from '../api/fetchPaymentMethodsPrzelewy24/fetchPaymentMethodsPrzelewy24';
// import fetchPaymentMethodsPrzelewy24 from '../../../../../api/paymentMethods/fetchPaymentMethodsPrzelewy24';
import Item from './AvailablePaymentMethods/Item';
import usePaymentMethodFormContext from '../../../../components/paymentMethod/hooks/usePaymentMethodFormContext';
// import usePaymentMethodFormContext from '../../../hooks/usePaymentMethodFormContext';
import usePaymentMethodCartContext from '../../../../components/paymentMethod/hooks/usePaymentMethodCartContext';
// import usePaymentMethodCartContext from '../../../hooks/usePaymentMethodCartContext';

function AvailablePaymentMethods({ selected, method }) {
  const isSelected = method.code === selected.code;
  const { fields, formikData } = usePaymentMethodFormContext();
  const { totalAmount } = usePaymentMethodCartContext();
  const { setFieldValue, setFieldTouched } = formikData;

  const [availableMethods, setMethods] = useState({});
  const [selectedSubPayment, setSelected] = useState(null);
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
  if (isSelected) {
    return (
      <ul className="mt-4 grid grid-cols-3 space-y-2 space-x-2">
        {availableMethods.data &&
          availableMethods?.data?.przelewy24PaymentMethods.map((subMethod) => (
            <Item
              method={subMethod}
              onSelect={onSelect}
              selected={selectedSubPayment}
            />
          ))}
      </ul>
    );
  }
  return false;
}

AvailablePaymentMethods.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
};

export default AvailablePaymentMethods;
