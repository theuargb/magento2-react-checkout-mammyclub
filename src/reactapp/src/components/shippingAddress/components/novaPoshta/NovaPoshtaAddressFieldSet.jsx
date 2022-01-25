import React from 'react';
// import { useFormik } from 'formik';
import { node } from 'prop-types';
import NovaPoshtaTextInput from './NovaPoshtaTextInput';
import useShippingAddressFormikContext from '../../hooks/useShippingAddressFormikContext';
import { __ } from '../../../../i18n';
import { formikDataShape } from '../../../../utils/propTypes';

function NovaPoshtaAddressFieldSet({ children, formikData }) {
  // const formik = useFormik({
  //   initialValues: {
  //     street: '',
  //     houseNubmer: '',
  //     apart: '',
  //   },
  // });
  const { fields } = useShippingAddressFormikContext();
  return (
    <div className="flex justify-between space-x-2">
      <div className="w-full grow-1">{children}</div>
      <div className="basis-1/5 grow-0">
        <NovaPoshtaTextInput
          label={__('Дом')}
          type="houseNumber"
          name={`${fields.street}[1]`}
          id="houseNumber"
          // value={formik.values.houseNumber}
          formikData={formikData}
          // onChange={formik.handleChange}
          className="border-2 w-full form-input"
        />
      </div>
      <div className="basis-1/5 grow-0">
        <NovaPoshtaTextInput
          label={__('Квартира')}
          type="apart"
          name={`${fields.street}[2]`}
          id="apart"
          // value={formik.values.apart}
          formikData={formikData}
          // onChange={formik.handleChange}
          className="border-2 w-full form-input"
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
