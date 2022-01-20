import React from 'react';
import { useFormik } from 'formik';
import NovaPoshtaTextInput from './NovaPoshtaTextInput';

function NovaPoshtaAddressFieldSet() {
  const formik = useFormik({
    initialValues: {
      street: '',
      houseNubmer: '',
      apart: '',
    },
  });
  return (
    <div>
      <NovaPoshtaTextInput
        label="Улица"
        type="street"
        name="street"
        id="street"
        value={formik.values.street}
        onChange={formik.handleChange}
        className="border-2"
      />
      <NovaPoshtaTextInput
        label="Дом"
        type="houseNumber"
        name="houseNumber"
        id="houseNumber"
        value={formik.values.houseNumber}
        onChange={formik.handleChange}
        className="border-2"
      />
      <NovaPoshtaTextInput
        label="Квартира"
        type="apart"
        name="apart"
        id="apart"
        value={formik.values.apart}
        onChange={formik.handleChange}
        className="border-2"
      />
    </div>
  );
}

export default NovaPoshtaAddressFieldSet;
