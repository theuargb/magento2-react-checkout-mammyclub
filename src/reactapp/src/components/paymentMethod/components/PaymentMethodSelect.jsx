import React from 'react';
import { Field } from 'formik';
import { arrayOf, bool, shape, string } from 'prop-types';

function PaymentMethodSelect({
  id,
  name,
  label,
  options,
  helpText,
  required,
  isHidden,
  placeholder,
  ...rest
}) {
  const inputId = id || name;

  return (
    <div className={`mt-2 form-control ${isHidden && 'hidden'}`}>
      <Field
        as="select"
        name={name}
        id={inputId}
        placeholder={placeholder}
        className="indent-0 w-full border form-select xs:block form-input text-base "
        {...rest}
      >
        {options.map((option) => {
          const methodName = option.label;
          return (
            <option key={option.value} value={option.value} className="p-0 m-0">
              {methodName}
            </option>
          );
        })}
      </Field>
      <div className="text-xs" id={`${inputId}-help`} tabIndex="-1">
        {helpText}
      </div>
    </div>
  );
}

PaymentMethodSelect.propTypes = {
  id: string,
  required: bool,
  isHidden: bool,
  helpText: string,
  placeholder: string,
  name: string.isRequired,
  label: string.isRequired,
  options: arrayOf(
    shape({
      value: string,
      options: string,
    })
  ),
};

PaymentMethodSelect.defaultProps = {
  id: '',
  options: [],
  helpText: '',
  required: false,
  placeholder: '',
  isHidden: false,
};

export default PaymentMethodSelect;
