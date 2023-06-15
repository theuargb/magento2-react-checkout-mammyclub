import React, { useState } from 'react';
import { bool } from 'prop-types';
import { formikDataShape } from '../../../../utils/propTypes';
import InPostGeoWidget from '../../../../shippingMethods/InPost/components/InPostGeoWidget';
import InPostPointFieldSet from './InPostPointFieldSet';
import useShippingAddressFormikContext from '../../hooks/useShippingAddressFormikContext';
import { __ } from '../../../../i18n';
import setInpostPoint from '../../../../api/cart/setInpostPoint/setInpostPoint';

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
    const splittedLine = pointAddress.line2.split(' ');
    const postCodeFromLine = splittedLine[0];
    const cityFromLine = splittedLine[1];

    try {
      // request to Select controller, set point_name to shippingAddress
      const selectedPointData = await setInpostPoint(response, cod);
      // set response data to fields
      if (selectedPointData?.status === 1) {
        setFieldValue(fields.city, cityFromLine);
        setFieldValue(`${fields.street}[0]`, pointAddress?.line1);
        setFieldValue(fields.zipcode, postCodeFromLine);

        setPointSelected(true);
        setMessageOnWidget({
          message: __('The point has been recorded'),
          type: 'success',
        });
      } else {
        setFieldValue(fields.city, '');
        setFieldValue(`${fields.street}[0]`, '');
        setFieldValue(fields.zipcode, '');
        setMessageOnWidget({
          message: __(
            'The selected pickup point does not support payment on delivery'
          ),
          type: 'error',
        });
        setPointSelected(false);
      }
      // trigger request to update Shipping Address in cart
      updateAddressAction();
    } catch (error) {
      setMessageOnWidget({
        message: __('Something went wrong'),
        type: 'error',
      });
    }
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
      <InPostPointFieldSet
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
