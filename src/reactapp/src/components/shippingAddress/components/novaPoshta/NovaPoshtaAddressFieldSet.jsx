import React from 'react';
import { node } from 'prop-types';
import NovaPoshtaTextInput from './NovaPoshtaTextInput';
import useShippingAddressFormikContext from '../../hooks/useShippingAddressFormikContext';
import { __ } from '../../../../i18n';
import { formikDataShape } from '../../../../utils/propTypes';

function NovaPoshtaAddressFieldSet({ children, formikData, ...rest }) {
  const { fields } = useShippingAddressFormikContext();
  const { onBlur, onFocus } = rest;
  return (
    <div className="flex justify-between space-x-2">
      <div className="w-full grow-1">{children}</div>
      <div className="basis-1/5 grow-0">
        <NovaPoshtaTextInput
          label={__('House')}
          type="houseNumber"
          name={`${fields.street}[1]`}
          id="houseNumber"
          formikData={formikData}
          className="border-2 w-full form-input"
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>
      <div className="basis-1/5 grow-0">
        <NovaPoshtaTextInput
          label={__('Apartment')}
          type="apart"
          name={`${fields.street}[2]`}
          id="apart"
          formikData={formikData}
          className="border-2 w-full form-input"
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>
    </div>
  );
}

NovaPoshtaAddressFieldSet.propTypes = {
  children: node.isRequired,
  formikData: formikDataShape.isRequired,
};

export default NovaPoshtaAddressFieldSet;
