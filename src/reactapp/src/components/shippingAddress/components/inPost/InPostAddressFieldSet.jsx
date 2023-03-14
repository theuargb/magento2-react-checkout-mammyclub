import React from 'react';
import { bool } from 'prop-types';
import useShippingAddressFormikContext from '../../hooks/useShippingAddressFormikContext';
import { __ } from '../../../../i18n';
import { formikDataShape } from '../../../../utils/propTypes';
import InPostTextInput from './InPostTextInput';

function InPostAddressFieldSet({ formikData, isPointSelected }) {
  const { fields, shippingValues } = useShippingAddressFormikContext();
  if (!isPointSelected) {
    return (
      <div className="-mt-1 border-container-lightner border-2 mb-2 border-t-0 p-1">
        <p className="text-gray my-2 text-base">
          {__('Point is not selected')}
        </p>
        <InPostTextInput
          name={`${fields.street}[0]`}
          id="line1"
          formikData={formikData}
          className="border-0 p-0 m-0 text-base  mb-0.5 w-full"
          type="hidden"
        />
        <InPostTextInput
          name={`${fields.street}[1]`}
          id="line1"
          formikData={formikData}
          className="border-0 p-0 m-0 text-base  mb-0.5 w-full"
          type="hidden"
        />
        <InPostTextInput
          name={`${fields.street}[2]`}
          id="location_description"
          formikData={formikData}
          className="border-0 p-0 m-0 text-base  mb-0.5 w-full"
          type="hidden"
        />
      </div>
    );
  }
  return (
    <div className="-mt-1 border-container-lightner border-2 mb-2 border-t-0 p-1">
      <InPostTextInput
        name={`${fields.street}[0]`}
        id="line1"
        formikData={formikData}
        className="border-0 p-0 m-0 text-base  mb-0.5 w-full"
        type="hidden"
      />
      <InPostTextInput
        name={`${fields.street}[1]`}
        id="line1"
        formikData={formikData}
        className="border-0 p-0 m-0 text-base  mb-0.5 w-full"
        type="hidden"
      />
      <InPostTextInput
        name={`${fields.street}[2]`}
        id="location_description"
        formikData={formikData}
        className="border-0 p-0 m-0 text-base  mb-0.5 w-full"
        type="hidden"
      />
      <p className="text-gray my-2 text-base">{__('Selected Point:')}</p>
      <ul>
        <li className="relative pl-4 flex flex-wrap content-center align-center mb-0 w-full">
          <span className="absolute left-1 top-2 w-1 h-1 bg-old_green-main flex" />
          <p className="text-base  mb-2 w-full">{shippingValues.street[0]}</p>
        </li>
        <li className="relative pl-4 flex flex-wrap content-center align-center mb-0 w-full">
          <span className="absolute left-1 top-2 w-1 h-1 bg-old_green-main flex" />
          <p className="text-base  mb-2 w-full">{shippingValues.street[1]}</p>
        </li>
        <li className="relative pl-4 flex flex-wrap content-center align-center mb-0 w-full">
          <span className="absolute left-1 top-2 w-1 h-1 bg-old_green-main flex" />
          <p className="text-base  mb-2 w-full">{shippingValues.street[2]}</p>
        </li>
      </ul>
    </div>
  );
}

InPostAddressFieldSet.propTypes = {
  formikData: formikDataShape.isRequired,
  isPointSelected: bool,
};
InPostAddressFieldSet.defaultProps = {
  isPointSelected: false,
};

export default InPostAddressFieldSet;
