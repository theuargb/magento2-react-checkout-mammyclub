import React from 'react';
import { __ } from '../../../i18n';

function NoPaymentMethodInfoBox() {
  return (
    <div className="py-4 border-b-2 border-container-lightner relative">
      <p className="text-base text-gray mb-0.5">
        {__('Способ оплаты (обязательно)')}
        <sup className="text-red-500"> *</sup>
      </p>
      <input
        id="no-shipping-methods"
        type="text"
        className="indent-0 w-full border form-select xs:block form-input text-base "
      />
    </div>
  );
}

export default NoPaymentMethodInfoBox;
