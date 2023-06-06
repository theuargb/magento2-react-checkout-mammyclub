import React, { useState } from 'react';
import { bool } from 'prop-types';
import { formikDataShape } from '../../../../utils/propTypes';
import InPostGeoWidget from '../../../../shippingMethods/InPost/components/InPostGeoWidget';
import InPostAddressFieldSet from './InPostAddressFieldSet';
import useShippingAddressFormikContext from '../../hooks/useShippingAddressFormikContext';
import { __ } from '../../../../i18n';

const InPostGeoWidgetForm = ({ formikData, cod, ...rest }) => {
  const { setFieldValue } = formikData;
  const { fields } = useShippingAddressFormikContext();
  const [message, setMessage] = useState({});
  const [pointSelected, setPointSelected] = useState(false);
  const { updateAddressAction } = rest;

  const setMessageOnWidget = (messageObj) => {
    setMessage(messageObj);
    setTimeout(() => {
      setMessage({});
    }, 3000);
  };

  const onPointCallback = async (response = null) => {
    if (!response?.address) {
      setMessageOnWidget({
        message: __('Something went wrong'),
        type: 'error',
      });
      setPointSelected(false);
      return;
    }
    const pointAddress = {
      line1: response.address?.line1,
      line2: response.address?.line2,
      location_description: response.location_description,
      point_name: response.name,
    };
    if (!cod) {
      setFieldValue(`${fields.street}[0]`, pointAddress?.line1);
      setFieldValue(`${fields.street}[1]`, pointAddress?.line2);
      setFieldValue(
        `${fields.street}[2]`,
        `№${pointAddress?.point_name}, ${pointAddress?.location_description}`
      );

      setPointSelected(true);
      setMessageOnWidget({
        message: __('The point has been recorded'),
        type: 'success',
      });
    } else if (0 in response?.payment_type) {
      setFieldValue(`${fields.street}[0]`, '');
      setFieldValue(`${fields.street}[1]`, '');
      setFieldValue(`${fields.street}[2]`, '');
      setMessageOnWidget({
        message: __(
          'The selected pickup point does not support payment on delivery'
        ),
        type: 'error',
      });
      setPointSelected(false);
    } else {
      setFieldValue(`${fields.street}[0]`, pointAddress?.line1);
      setFieldValue(`${fields.street}[1]`, pointAddress?.line2);
      setFieldValue(
        `${fields.street}[2]`,
        `№${pointAddress?.point_name}, ${pointAddress?.location_description}`
      );

      setPointSelected(true);
      setMessageOnWidget({
        message: __('The point has been recorded'),
        type: 'success',
      });
    }
    updateAddressAction();
  };

  return (
    <div className="relative pt-5">
      {message?.message && (
        <div className="absolute -top-2 left-0">
          <p
            className={` py-1 ${
              message.type === 'error' ? 'text-red-500' : 'text-green'
            }`}
          >
            {message.message}
          </p>
        </div>
      )}
      <InPostGeoWidget onPointCallback={onPointCallback} />
      <InPostAddressFieldSet
        formikData={formikData}
        isPointSelected={pointSelected}
      />
    </div>
  );
};

InPostGeoWidgetForm.propTypes = {
  formikData: formikDataShape.isRequired,
  cod: bool.isRequired,
};

export default InPostGeoWidgetForm;
