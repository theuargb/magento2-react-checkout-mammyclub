import React, { useState } from 'react';
import { number } from 'prop-types';
import { formikDataShape } from '../../../../utils/propTypes';
import InPostGeoWidget from '../../../../shippingMethods/InPost/components/InPostGeoWidget';
import setInpostPoint from '../../../../api/cart/setInpostPoint/setInpostPoint';
import InPostAddressFieldSet from './InPostAddressFieldSet';
import useShippingAddressFormikContext from '../../hooks/useShippingAddressFormikContext';
import { __ } from '../../../../i18n';

const InPostGeoWidgetForm = ({ formikData, type }) => {
  const { setFieldValue } = formikData;
  const { fields } = useShippingAddressFormikContext();
  const [message, setMessage] = useState({});
  const [pointSelected, setPointSelected] = useState(false);

  const setMessageOnWidget = (messageObj) => {
    setMessage(messageObj);
    setTimeout(() => {
      setMessage({});
    }, 3000);
  };

  const onPointCallback = async (response = null) => {
    try {
      const selectedPointData = await setInpostPoint(response, type);
      if (selectedPointData?.status === 1) {
        const pointAddress = {
          line1: selectedPointData?.point_data?.address?.line1,
          line2: selectedPointData?.point_data?.address?.line2,
          location_description:
            selectedPointData?.point_data?.location_description,
          point_name: selectedPointData?.point_data?.name,
        };
        setFieldValue(`${fields.street}[0]`, pointAddress?.line1);
        setFieldValue(`${fields.street}[1]`, pointAddress?.line2);
        setFieldValue(
          `${fields.street}[2]`,
          `№${pointAddress?.point_name}, ${pointAddress?.location_description}`
        );

        setPointSelected(true);
        if (selectedPointData?.message) {
          setMessageOnWidget({
            message: selectedPointData?.message,
            type: 'success',
          });
        }
      } else if (selectedPointData?.message) {
        setMessageOnWidget({
          message: selectedPointData?.message,
          type: 'error',
        });
      } else {
        setMessageOnWidget({
          message: __('Something went wrong'),
          type: 'error',
        });
      }
    } catch (error) {
      setMessageOnWidget({
        message: __('Something went wrong'),
        type: 'error',
      });
    }
  };

  return (
    <div>
      {message?.message && (
        <div>
          <p
            className={`px-2 py-1 ${
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
  type: number.isRequired,
};

export default InPostGeoWidgetForm;
