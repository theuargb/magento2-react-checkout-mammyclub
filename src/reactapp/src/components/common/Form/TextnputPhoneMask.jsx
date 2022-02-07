import React, { useState } from 'react';
import _get from 'lodash.get';
import { bool, string, func, shape } from 'prop-types';
import InputMask from 'react-input-mask';

import { ErrorMessage, Field } from 'formik';

import { _replace } from '../../../utils';
import { formikDataShape } from '../../../utils/propTypes';

function TextInputPhoneMask({
  id,
  name,
  type,
  label,
  width,
  helpText,
  required,
  isHidden,
  className,
  formikData,
  placeholder,
  actions,
  ...rest
}) {
  const {
    setFieldValue,
    formSectionId,
    setFieldTouched,
    formSectionErrors,
    formSectionValues,
    formSectionTouched,
  } = formikData;
  const inputId = id || name;
  const relativeFieldName = _replace(name, formSectionId).replace('.', '');
  const hasFieldError = !!_get(formSectionErrors, relativeFieldName);
  const value = _get(formSectionValues, relativeFieldName, '') || '';
  const hasFieldTouched = !!_get(formSectionTouched, relativeFieldName);

  const [fieldInFocus, setFocusState] = useState(false);
  const hasError = hasFieldError && hasFieldTouched && !fieldInFocus;

  return (
    <div className={`mt-4 form-control ${isHidden ? 'hidden' : ''}`}>
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={inputId} className="mb-0.5 text-base text-gray">
            {label}
            {required && <sup className="text-red-500"> *</sup>}
          </label>
        )}
        <div
          className={`feedback text-sm md:text-xs text-right ${
            hasError ? 'text-red-500' : 'text-green-500'
          }`}
        >
          <ErrorMessage name={name}>
            {(msg) => msg.replace('%1', label)}
          </ErrorMessage>
        </div>
      </div>
      <Field
        name={name}
        id={inputId}
        value={value}
        type={type || 'text'}
        placeholder={placeholder}
        render={({ field }) => (
          <InputMask
            {...field}
            className={`form-input ${
              hasError ? 'border-dashed border-red-500' : ''
            } ${className} ${width || 'w-full'}`}
            {...rest}
            mask="+38(999) 999-99-99"
            type="text"
            onChange={(event) => {
              const newValue = event.target.value;
              setFieldTouched(name, newValue);
              setFieldValue(name, newValue);
              actions.saveAddress();
              console.log('123123');
              setFocusState(true);
            }}
            onBlur={() => setFocusState(false)}
          />
        )}
      />
      <div className="text-xs ">{helpText}</div>
    </div>
  );
}

TextInputPhoneMask.propTypes = {
  id: string,
  type: string,
  label: string,
  width: string,
  required: bool,
  isHidden: bool,
  helpText: string,
  className: string,
  placeholder: string,
  name: string.isRequired,
  formikData: formikDataShape.isRequired,
  actions: shape({
    saveAddress: func,
  }),
};

TextInputPhoneMask.defaultProps = {
  id: '',
  label: '',
  width: '',
  helpText: '',
  type: 'text',
  className: '',
  required: false,
  placeholder: '',
  isHidden: false,
  actions: {
    saveAddress: () => {},
  },
};

export default TextInputPhoneMask;
