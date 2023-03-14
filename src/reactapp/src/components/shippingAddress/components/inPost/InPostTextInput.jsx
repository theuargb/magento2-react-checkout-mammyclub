import React from 'react';

import _get from 'lodash.get';
import { useFormik } from 'formik';
import { string } from 'prop-types';
import { formikDataShape } from '../../../../utils/propTypes';
import { _replace } from '../../../../utils';

const InPostTextInput = ({ id, name, type, className, label, formikData }) => {
  const formik = useFormik({
    initialValues: {
      street: '',
    },
  });
  const { setFieldValue, setFieldTouched, formSectionValues, formSectionId } =
    formikData;

  const relativeFieldName = _replace(name, formSectionId).replace('.', '');
  const value = _get(formSectionValues, relativeFieldName, '') || '';
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor={id} className="mb-0">
        <p className="text-base text-gray">{label}</p>

        <input
          id={id}
          name={name}
          type={type || 'text'}
          value={value}
          className={className}
          onChange={(event) => {
            const newValue = event.target.value;
            setFieldTouched(name, newValue);
            setFieldValue(name, newValue);
          }}
          style={{ textIndent: '0px' }}
          disabled
        />
      </label>
    </form>
  );
};

InPostTextInput.propTypes = {
  id: string,
  type: string,
  name: string,
  label: string,
  className: string,
  formikData: formikDataShape.isRequired,
};

InPostTextInput.defaultProps = {
  id: '',
  type: '',
  label: '',
  className: '',
  name: '',
};
export default InPostTextInput;
