import React from 'react';
import { ErrorMessage, Field } from 'formik';
import { arrayOf, bool, shape, string } from 'prop-types';

function ShippingMethodSelect({
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
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="text-gray text-base mb-0.5">
          {label}
          {required && <sup> *</sup>}
        </label>
        <div
          id={`${inputId}-feedback`}
          className="feedback text-sm md:text-xs text-right"
        >
          <ErrorMessage name={name}>
            {(msg) => msg.replace('%1', label)}
          </ErrorMessage>
        </div>
      </div>
      <Field
        as="select"
        name={name}
        id={inputId}
        placeholder={placeholder}
        className="indent-0 w-full border form-select xs:block form-input text-base "
        {...rest}
      >
        {options.map((option) => {
          const methodName = option.methodTitle;

          return (
            <option
              key={option.value}
              value={option.id}
              className="p-0 m-0"
              selected={rest.selectedMethodId === option.id}
            >
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

ShippingMethodSelect.propTypes = {
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

ShippingMethodSelect.defaultProps = {
  id: '',
  options: [],
  helpText: '',
  required: false,
  placeholder: '',
  isHidden: false,
};

export default ShippingMethodSelect;
