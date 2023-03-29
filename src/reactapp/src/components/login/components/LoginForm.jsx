import React, { useEffect, useMemo, useState } from 'react';
import { useFormikContext } from 'formik';

import TextInput from '../../common/Form/TextInput';
import { __ } from '../../../i18n';
import useLoginFormContext from '../hooks/useLoginFormContext';
import useLoginAppContext from '../hooks/useLoginAppContext';
import useLoginCartContext from '../hooks/useLoginCartContext';

const przelewy24Mehods = ['przelewy24', 'przelewy24_card'];

function LoginForm() {
  const { fields, formikData, handleKeyDown } = useLoginFormContext();
  const { isLoggedIn } = useLoginAppContext();
  const { selectedPaymentMethodCode: cartPaymentMethod } =
    useLoginCartContext();
  const { values } = useFormikContext();

  const selectedPaymentMethod = useMemo(
    () => values?.payment_method?.code,
    [values]
  );

  const [isPrzelewy24Selected, setPrzelewy24SelectedStatus] = useState(false);

  useEffect(() => {
    const isSelectedMethodPrzelewy24 = przelewy24Mehods.some(
      (method) =>
        method === cartPaymentMethod || method === selectedPaymentMethod
    );
    setPrzelewy24SelectedStatus(isSelectedMethodPrzelewy24);
  }, [cartPaymentMethod, selectedPaymentMethod]);

  return (
    !isLoggedIn && (
      <>
        <div>
          <TextInput
            type="email"
            required={isPrzelewy24Selected}
            label={__('Email')}
            name={fields.email}
            formikData={formikData}
            onKeyDown={handleKeyDown}
          />
          <p className="text-gray-extralighter text-base mt-1">
            {__('Here we will send all documents confirming the purchase')}
          </p>
        </div>
      </>
    )
  );
}

export default LoginForm;
