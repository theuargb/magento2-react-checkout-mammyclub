import React from 'react';
import { ErrorMessage, Field } from 'formik';
import { arrayOf, bool, shape, string } from 'prop-types';
import { __ } from '../../../i18n';

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
        <label htmlFor={inputId} className="md:text-sm">
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
        className={`w-full p-2 border form-select xs:block max-w-md `}
        {...rest}
      >
        <option value="">{__('-- Please Select --')}</option>
        {options.map((option) => {
          const methodName = `${option.carrierTitle} (${option.methodTitle}): `;
          return (
            <option key={option.value} value={option.id}>
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
