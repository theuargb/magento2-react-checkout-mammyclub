import React from 'react';
import useShippingAddressFormikContext from '../../hooks/useShippingAddressFormikContext';
import { __ } from '../../../../i18n';
import { formikDataShape } from '../../../../utils/propTypes';
import InPostTextInput from './InPostTextInput';

function InPostAddressFieldSet({ formikData }) {
  const { fields } = useShippingAddressFormikContext();
  return (
    <div className="">
      <div className="w-full">
        <InPostTextInput
          label={__('Line 1')}
          name={`${fields.street}[0]`}
          id="line1"
          formikData={formikData}
          className="border-2 w-full form-input"
        />
      </div>
      <div className="w-full">
        <InPostTextInput
          label={__('Line 2')}
          name={`${fields.street}[1]`}
          id="line1"
          formikData={formikData}
          className="border-2 w-full form-input"
        />
      </div>
      <div className="w-full">
        <InPostTextInput
          label={__('Location Description')}
          name={`${fields.street}[2]`}
          id="location_description"
          formikData={formikData}
          className="border-2 w-full form-input"
        />
      </div>
    </div>
  );
}

InPostAddressFieldSet.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default InPostAddressFieldSet;
