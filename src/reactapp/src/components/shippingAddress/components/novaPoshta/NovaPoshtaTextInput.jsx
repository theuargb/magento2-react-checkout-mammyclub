import React from 'react';

import { useFormik } from 'formik';
import { string } from 'prop-types';

const NovaPoshtaTextInput = ({
  id,
  name,
  type,
  value,
  onChange,
  className,
  label,
}) => {
  const formik = useFormik({
    initialValues: {
      street: '',
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor={id}>
        <input
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          className={className}
        />
        {label}
      </label>
    </form>
  );
};

NovaPoshtaTextInput.propTypes = {
  id: string,
  type: string,
  name: string,
  label: string,
  onChange: string,
  value: string,
  className: string,
};

NovaPoshtaTextInput.defaultProps = {
  id: '',
  type: '',
  label: '',
  onChange: '',
  value: '',
  className: '',
  name: '',
};
export default NovaPoshtaTextInput;
