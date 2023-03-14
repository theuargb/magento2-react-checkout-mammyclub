import React from 'react';
import { number } from 'prop-types';

import { formikDataShape } from '../../../../utils/propTypes';
import InPostGeoWidget from '../../../../shippingMethods/InPost/components/InPostGeoWidget';
import setInpostPoint from '../../../../api/cart/setInpostPoint/setInpostPoint';
import InPostAddressFieldSet from './InPostAddressFieldSet';
import useShippingAddressFormikContext from '../../hooks/useShippingAddressFormikContext';

const InPostGeoWidgetForm = ({ formikData, type }) => {
  const { setFieldValue } = formikData;
  const { fields } = useShippingAddressFormikContext();

  const onPointCallback = async (response = null) => {
    if (!response) {
      response.name = 'POP-BIA57';
    }
    const selectedPointData = await setInpostPoint(response, type);
    const pointAddress = {
      line1: selectedPointData?.point_data?.address?.line1,
      line2: selectedPointData?.point_data?.address?.line2,
      location_description: selectedPointData?.point_data?.location_description,
      point_name: selectedPointData?.point_data?.name,
    };
    setFieldValue(`${fields.street}[0]`, pointAddress?.line1);
    setFieldValue(`${fields.street}[1]`, pointAddress?.line2);
    setFieldValue(
      `${fields.street}[2]`,
      `№${pointAddress?.point_name}, ${pointAddress?.location_description}`
    );
  };

  return (
    <div>
      <InPostGeoWidget onPointCallback={onPointCallback} />
      <InPostAddressFieldSet formikData={formikData} />
    </div>
  );
};

InPostGeoWidgetForm.propTypes = {
  formikData: formikDataShape.isRequired,
  type: number.isRequired,
};

export default InPostGeoWidgetForm;
