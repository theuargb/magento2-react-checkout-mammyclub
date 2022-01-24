import React from 'react';
import { useFormik } from 'formik';
import NovaPoshtaTextInput from './NovaPoshtaTextInput';
import useShippingAddressFormikContext from '../../hooks/useShippingAddressFormikContext';

function NovaPoshtaAddressFieldSet() {
  const formik = useFormik({
    initialValues: {
      street: '',
      houseNubmer: '',
      apart: '',
    },
  });
  const { fields } = useShippingAddressFormikContext();
  return (
    <div className="flex justify-between space-x-2">
      <div className="basis-3/5 flex-auto">
        <NovaPoshtaTextInput
          label="Улица"
          type="street"
          name={`${fields.street}[0]`}
          id="street"
          value={formik.values.street}
          onChange={formik.handleChange}
          className="border-2 w-full form-input"
        />
      </div>
      <div className="basis-1/5 flex-1">
        <NovaPoshtaTextInput
          label="Дом"
          type="houseNumber"
          name={`${fields.street}[1]`}
          id="houseNumber"
          value={formik.values.houseNumber}
          onChange={formik.handleChange}
          className="border-2 w-full form-input"
        />
      </div>
      <div className="basis-1/5 flex-1">
        <NovaPoshtaTextInput
          label="Квартира"
          type="apart"
          name={`${fields.street}[2]`}
          id="apart"
          value={formik.values.apart}
          onChange={formik.handleChange}
          className="border-2 w-full form-input"
        />
      </div>
    </div>
  );
}

export default NovaPoshtaAddressFieldSet;
