import React from 'react';
import useShippingMethodCartContext from '../hooks/useShippingMethodCartContext';
import { __ } from '../../../i18n';

function NoShippingMethodInfoBox() {
  const { methodsAvailable } = useShippingMethodCartContext();

  if (methodsAvailable) {
    return <></>;
  }

  return (
    <div className="py-4 border-b-2 border-container-lightner relative">
      <label
        htmlFor="no-shipping-methods"
        className="text-gray text-base mb-0.5"
      >
        {__('Shipping method')}
      </label>
      <input
        label={__('Shipping method')}
        id="no-shipping-methods"
        type="text"
        className="indent-0 w-full border form-select xs:block form-input text-base "
      />
    </div>
  );
}

export default NoShippingMethodInfoBox;
